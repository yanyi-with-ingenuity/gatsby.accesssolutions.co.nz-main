"use strict";

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require('fs');

exports.onCreateNode = ({ node, getNode, actions }) => { 
  const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                template
              }
            }
          }
        }
      }
    `).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve(`src/templates/${String(node.frontmatter.template)}.js`),
                    context: {
                        slug: node.fields.slug
                    },
                })
            })
            resolve()
        })
    })
}

exports.onPostBuild = async ({graphql}) => {

  // telehandlers
  await graphql(`
    {
      markdownRemark( fields: { slug: { eq: "/access-equipment/telehandlers/" } }) {
        frontmatter {
          title
          heading
          image {
            publicURL
          }
        }
        fields {
          slug
        }
        html
      }
    }
  `).then(result => {

    let str = `${result.data.markdownRemark.html}`
    let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

    let json = {
      'title': `${result.data.markdownRemark.frontmatter.title}`,
      'image': `${result.data.markdownRemark.frontmatter.image.publicURL}`,
      'html': str_replace,
    };

    try {
        fs.writeFileSync('./src/data/telehandlers.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
        console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved telehandlers.json');

  })

  // about-us
  await graphql(`
    {
      markdownRemark( fields: { slug: { eq: "/about-us/" } }) {
        frontmatter {
          section
          title
          heading
          image {
            publicURL
          }
        }
        fields {
          slug
        }
        html
      }
    }
  `).then(result => {

    let str = `${result.data.markdownRemark.html}`
    let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

    let json = {
      'section': `${result.data.markdownRemark.frontmatter.section}`,
      'title': `${result.data.markdownRemark.frontmatter.title}`,
      'image': `${result.data.markdownRemark.frontmatter.image.publicURL}`,
      'html': str_replace,
    };

    try {
        fs.writeFileSync('./src/data/about-us.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
        console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved about-us.json');

  })

  // careers
  await graphql(`
    {
      markdownRemark( fields: { slug: { eq: "/careers/" } }) {
        frontmatter {
          section
          title
          heading
          image {
            publicURL
          }
        }
        fields {
          slug
        }
        html
      }
    }
  `).then(result => {

    let str = `${result.data.markdownRemark.html}`
    let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

    let json = {
      'section': `${result.data.markdownRemark.frontmatter.section}`,
      'title': `${result.data.markdownRemark.frontmatter.title}`,
      'image': `${result.data.markdownRemark.frontmatter.image.publicURL}`,
      'html': str_replace,
    };

    try {
        fs.writeFileSync('./src/data/careers.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
        console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved careers.json');

  })

  // scaffolding
  await graphql(`
    {
      allMarkdownRemark(filter: {fields: {slug: {glob: "*/kiwiscaf-scaffolding/*"}}}) {
        edges {
          node {
            frontmatter {
              title
              image {
                publicURL
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {

    let array = [];

    result.data.allMarkdownRemark.edges.map(entry => {
      let title = entry.node.frontmatter.title;
      let item = title.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_')
      array.push({
        ...entry.node,
        item,
      })
    });

    let json = {}
    for (let entry of array) 
    {
      let str = `${entry.html}`
      let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

      json[entry.item] = {
        'title': `${entry.frontmatter.title}`,
        'image': `${entry.frontmatter.image.publicURL}`,
        'html': str_replace,
      };
    }

    try {
      fs.writeFileSync('./src/data/scaffolding.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
      console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved scaffolding.json');
    
  })

  // events
  await graphql(`
    {
      allMarkdownRemark(filter: {fields: {slug: {glob: "*/event-products/*"}}}) {
        edges {
          node {
            frontmatter {
              title
              image {
                publicURL
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {

    let array = [];

    result.data.allMarkdownRemark.edges.map(entry => {
      let title = entry.node.frontmatter.title;
      let item = title.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_')
      //console.log('✅ item', item);
      array.push({
        ...entry.node,
        item,
      })
    });

    let json = {}
    for (let entry of array) 
    {
      let str = `${entry.html}`
      let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

      json[entry.item] = {
        'title': `${entry.frontmatter.title}`,
        'image': `${entry.frontmatter.image.publicURL}`,
        'html': str_replace,
      };
    }

    try {
      fs.writeFileSync('./src/data/events.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
      console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved events.json');
    
  })

  // locations
  await graphql(`
    {
      markdownRemark( fields: { slug: { eq: "/locations/" } }) {
        frontmatter {
          title
          image {
            publicURL
          }
        }
        html
      }
    }
  `).then(result => {

    let str = `${result.data.markdownRemark.html}`
    let str_replace = str.replace(/\/static\//g, 'https://www.accesssolutions.co.nz/static/')

    let json = {
      'title': `${result.data.markdownRemark.frontmatter.title}`,
      'image': `${result.data.markdownRemark.frontmatter.image.publicURL}`,
      'html': str_replace,
    };

    try {
      fs.writeFileSync('./src/data/locations.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
      console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved locations.json');
    
  })

  // team
  await graphql(`
    {
      markdownRemark( fields: { slug: { eq: "/team/" } }) {
        frontmatter {
          auckland {
              image {
                relativePath
              }
              name
              position
              email
              tel
              phone
          }
        }
        html
      }
    }
  `).then(result => {

    console.log('✅ processing team.json');
    
    let array = [];

    for (let entry of result.data.markdownRemark.frontmatter.auckland) {
      array.push({
        name: entry.name,
        designation: entry.position,
        location: 'AUCKLAND DEPOT - HEAD OFFICE',
        location_level: 1,
        phone: entry.phone,
        mobile: entry.phone,
        email: entry.email,
        updated_at: '2019-03-31 22:37:12',
        create_at: '2017-09-18 15:00:48',
        status: 'A',
        image: entry.image.relativePath,
      })
    }

    let data = array.map((entry, i) => {
      return {
        ...entry,
        id: i,
        level: i,
      }
    })

    //console.log('data: ', data);

    let auckland = data.filter(entry => entry.location === 'AUCKLAND DEPOT - HEAD OFFICE');

    let json = [
      {
        location: 'AUCKLAND DEPOT - HEAD OFFICE',
        members: auckland,
      },
    ]

    //console.log('✅ json: ', json);

    try {
      fs.writeFileSync('./src/data/team.json', JSON.stringify(json), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
      console.log('❌ Cannot write file!', err);
    }
    console.log('✅ saved team.json');
    
  })

  // products
  await graphql(`
    {
      allMarkdownRemark(filter: {frontmatter: {product: {eq: "equipment"}}}) {
        edges {
          node {
            frontmatter {
              category
              spec {
                id
                brand
                environment
                fuel_type
                horizontal_reach
                job_type
                lifting_capacity
                model
                overall_height
                overall_width
                platform_capacity
                platform_height
                platform_length
                platform_width
                terrain
                up_over_height
                weight
                working_height
                pdf {
                  name
                }
                category_id
              }
              heading
              image {
                relativePath
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {

    console.log('✅ processing products.json');
    let array = [];

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      array.push({
        name: node.frontmatter.heading,
        description: "",
        brand: node.frontmatter.spec.brand,
        model: node.frontmatter.spec.model,
        document: `${node.frontmatter.spec.pdf !== null ? `product_document\/${node.frontmatter.spec.pdf.name}.pdf` : ''}`,
        image: `product\/${node.frontmatter.image.relativePath}`,
        seo_url: node.frontmatter.spec.model,
        meta_title: node.frontmatter.spec.model,
        meta_keywords: node.frontmatter.spec.model,
        meta_description: node.frontmatter.spec.model,
        status: "A",
        created_at: "2017-08-23 12:23:21",
        updated_at: "2017-08-23 12:23:21",
        platform_height: node.frontmatter.spec.platform_height,
        working_height: node.frontmatter.spec.working_height,
        platform_capacity: node.frontmatter.spec.platform_capacity,
        overall_width: node.frontmatter.spec.overall_width,
        overall_height: node.frontmatter.spec.overall_height,
        overall_length: node.frontmatter.spec.overall_length,
        weight: node.frontmatter.spec.weight,
        platform_length: node.frontmatter.spec.platform_length,
        platform_width: node.frontmatter.spec.platform_width,
        up_over_height: node.frontmatter.spec.up_over_height,
        horizontal_reach: node.frontmatter.spec.horizontal_reach,
        category: node.frontmatter.spec.category_id,
        subcategory_name: node.frontmatter.category,
        subcategory_id: null,
        sort_order: null,
        sub_category: null,
        environment: node.frontmatter.spec.environment,
        job_type: node.frontmatter.spec.job_type,
        terrain: node.frontmatter.spec.terrain,
        fuel_type: node.frontmatter.spec.fuel_type,
        lifting_capacity: node.frontmatter.spec.lifting_capacity,
      })
      console.log(`✅ node.frontmatter.heading: `, node.frontmatter.heading);
      // console.log(`✅ node.frontmatter.spec.lifting_capacity: `, node.frontmatter.spec.lifting_capacity);
    })

    let data = array.map((entry, i) => {
      return {
        ...entry,
        id: i,
      }
    })

    // data for product list
    try {
      fs.writeFileSync(`./src/data/products.json`, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
    } catch (err) {
      console.log('❌ Cannot write file!', err);
    }
    console.log(`✅ saved products.json`);

    // create product apis
    data.forEach((entry) => {

      let template = `import data from '../../data/products.json'

export default function handler(req, res) {

  let product_id = ${entry.id}

  let product = data.find( entry => {
    return (
      product_id === entry.id
    )
  })

  res.status(200).json(
    {
      "status": true,
      "message": "Successfully fetched",
      "data": product
    }
  )
}`

      try {
        fs.writeFileSync(`./src/api/product/${entry.id}.js`, template, { encoding: 'utf8', flag: 'w' });
      } catch (err) {
        console.log('❌ Cannot write file!', err);
      }
      console.log(`✅ saved ${entry.id}.json`);
    })

  })

}