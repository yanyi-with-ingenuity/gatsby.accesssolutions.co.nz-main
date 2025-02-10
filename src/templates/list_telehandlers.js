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

const ListTelehandlers = ({data}) => {
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
            <Footer />
        </div>
    )
}

export default ListTelehandlers;

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
                        gatsbyImageData(
                            width: 800, 
                            placeholder: NONE
                        )
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
        telehandlers_diesel: allMarkdownRemark(filter: {frontmatter: {category: {eq: "telehandlers_diesel"}}}) {
            edges {
                node {
                    frontmatter {
                        heading
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
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
