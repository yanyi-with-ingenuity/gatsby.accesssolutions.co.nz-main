import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'
import Seo from '../components/seo'

export const Head = ({ data }) => {
  const entry = data.markdownRemark
  return (
    <Seo 
      title={entry.frontmatter.page_title}
      description={entry.frontmatter.meta_description}
      image=""
      pathname="/"
    />
  )
}

const ListForklifts = ({data}) => {
    const entry = data.markdownRemark
    //console.log('entry: ', data);
    return (
        <div className="page">
            <Header />
            <div className="layout banner_bg grey">
                <div className="banner__container relative">
                    <div className="absolute banner_img">
                        <GatsbyImage image={entry.frontmatter.image.childImageSharp.gatsbyImageData} alt={entry.frontmatter.heading} style={{ width: "100%", height: "100%", display: "block" }} imgStyle={{ objectFit: "cover" }} />
                    </div>
                    <div className="banner relative">
                        <h2>{entry.frontmatter.heading}</h2>
                    </div>
                </div>
            </div>
            <main className="layout list_entry grey">
                <div className="entry__container">
                    <div className="entry__flex flex__space-between">
                        <article className="article text">
                            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
                        </article>
                        <aside className="aside">
                            {entry.frontmatter.aside.map( (item, i) => (
                                <Link key={`item_` + i + ``} to={item.url} title={item.title}>
                                    <GatsbyImage image={item.image.childImageSharp.gatsbyImageData} alt={item.title} style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </Link>
                            ))}
                        </aside>
                    </div>
                </div>
            </main>
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - Manual</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_manual.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - Electric</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_electric.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - LPG</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_lpg.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - Petrol &amp; LPG</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_petrol_lpg.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - Diesel</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_diesel.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="layout category_entry grey">
                <div className="entry__container">
                    <div className="list">
                        <h2>Fork Lifts - Rough Terrain Diesel</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="t_30">Name</th>
                                    <th className="t_10">Lifting Capacity</th>
                                    <th className="t_10">Weight</th>
                                    <th className="t_10">Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.fork_lifts_rough_terrain_diesel.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Specs:&nbsp;">
                                        <Link to={entry.node.fields.slug} className="view">View</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListForklifts;

export const query = graphql`
	query($slug: String!) {
		markdownRemark( fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				page_title
				meta_description
                heading
                image {
                    childImageSharp {
                        gatsbyImageData(width: 1024, placeholder: NONE)
                    }
                }
                aside {
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 272, placeholder: NONE)
                        }
                    }
                    title
                    url
                }
			}
			fields {
                slug
			}
			html
		}
        fork_lifts_manual: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_manual"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        fork_lifts_electric: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_electric"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        fork_lifts_lpg: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_lpg"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        fork_lifts_petrol_lpg: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_petrol_lpg"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        fork_lifts_diesel: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_diesel"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        fork_lifts_rough_terrain_diesel: allMarkdownRemark(filter: {frontmatter: {category: {eq: "fork_lifts_rough_terrain_diesel"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
                        spec {
                            lifting_capacity
                            weight
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
