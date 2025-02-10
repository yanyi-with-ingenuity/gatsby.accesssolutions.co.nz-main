require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.accesssolutions.co.nz",
    title: "Access Solutions",
    url: "https://www.accesssolutions.co.nz", // No trailing slash allowed!
    titleTemplate: "",
    description: "",
    twitterUsername: "",
    image: "", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
          placeholder: `none`,
          backgroundColor: `transparent`
        },
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
                name: 'uploads'
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: { 
              maxWidth: 640,
              withWebp: false,
              tracedSVG: false,
              backgroundColor: `none`,
              quality: 100,
              wrapperStyle: 'margin-left: 0!important; margin-right: 0!important;',
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "uploads",
        path: `${__dirname}/static/images/uploads`,
      },
      __key: "uploads",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
          id: `GTM-5Q4KRS`,
          includeInDevelopment: false
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:400,700`,
          `Barlow\:400,700`
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                frontmatter {
                  heading
                  title
                  category
                  spec {
                    working_height
                    platform_capacity
                    weight
                    platform_height
                    platform_length
                    platform_width
                    pdf {
                      publicURL
                      name
                    }
                  }
                }
                rawMarkdownBody
                fields {
                  slug
                }
              }
            }
          }
        `,
        index: ['heading', 'title'],
        store: ['id', 'slug', 'heading', 'title', 'category', 'spec'],
        normalizer: ({ data }) => {
          if (!data || !data.allMarkdownRemark || !data.allMarkdownRemark.nodes) {
            console.error('Unexpected data structure:', JSON.stringify(data, null, 2));
            return [];
          }
          return data.allMarkdownRemark.nodes.map((node) => {
            if (!node || !node.frontmatter) {
              console.error('Unexpected node structure:', JSON.stringify(node, null, 2));
              return null;
            }
            const heading = node.frontmatter.heading || node.frontmatter.title;
            if (!heading) {
              console.warn('Node missing heading/title:', node.id);
              return null;
            }
            return {
              id: node.id,
              slug: node.fields.slug,
              heading: heading,
              title: node.frontmatter.title || heading,
              category: node.frontmatter.category,
              spec: node.frontmatter.spec
            };
          }).filter(Boolean);
        },
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        enableIdentityWidget: true,
        includeRobots: false,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
