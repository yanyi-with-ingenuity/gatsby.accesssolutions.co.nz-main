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

const ListCherryPickers = ({data}) => {
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
                        <h2>Cherry Pickers - Petrol</h2>
                    </div>
                    <div>
                        <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                            <thead>
                            <tr>
                                <th className="t_30">Name</th>
                                <th className="t_10">Working Height</th>
                                <th className="t_10">Platform Capacity</th>
                                <th className="t_10">Weight</th>
                                <th className="t_10">Platform Height</th>
                                <th className="t_10">Platform Length</th>
                                <th className="t_10">Platform Width</th>
                                <th className="t_10">Specs</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.cherry_pickers_petrol.edges
                                .sort((a, b) => parseFloat(a.node.frontmatter.spec.working_height) > parseFloat(b.node.frontmatter.spec.working_height) ? 1 : -1)
                                .map((entry, i) => (
                                <tr key={`data_` + i}>
                                    <td data-label="Name:&nbsp;"><Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link></td>
                                    <td data-label="Working Height:&nbsp;">{entry.node.frontmatter.spec.working_height}</td>
                                    <td data-label="Platform Capacity:&nbsp;">{entry.node.frontmatter.spec.platform_capacity}</td>
                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight}</td>
                                    <td data-label="Platform Height:&nbsp;">{entry.node.frontmatter.spec.platform_height}</td>
                                    <td data-label="Platform Length:&nbsp;">{entry.node.frontmatter.spec.platform_length}</td>
                                    <td data-label="Platform Width:&nbsp;">{entry.node.frontmatter.spec.platform_width}</td>
                                    <td data-label="Specs:&nbsp;">
                                        {entry.node.frontmatter.spec.pdf.name !== '' && 
                                        <a href={`/images/uploads/${entry.node.frontmatter.spec.pdf.name}.pdf`} rel="noopener nofollow noreferrer" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn_arrow" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                        </svg>
                                        PDF
                                        </a>
                                    }
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

export default ListCherryPickers;

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
        cherry_pickers_petrol: allMarkdownRemark(filter: {frontmatter: {category: {eq: "cherry_pickers_petrol"}}}) {
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
