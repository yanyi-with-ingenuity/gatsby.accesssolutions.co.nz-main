import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'
import Form from '../components/enquiry'
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

const EntryTelehandlers = ({data}) => {
    const entry = data.markdownRemark
    return (
        <div className="page">
            <Header />
            <main className="layout entry_specs">
                <div className="entry__container">
                    <div className="entry__flex flex__space-between">
                        <article className="article text">
                            <h1>{entry.frontmatter.heading}</h1>
                            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
                        </article>
                    </div>
                    <div className="grid grid_1_2_1 gap_16">
                        <div>
                            <GatsbyImage image={entry.frontmatter.image.childImageSharp.gatsbyImageData} alt={entry.frontmatter.heading} style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                        </div>
                        <div className="specs_heading">
                            <h2>Specifications</h2>
                            <table className="specs" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                <tr>
                                    <th>Brand</th>
                                    <td>{entry.frontmatter.spec.brand}</td>
                                </tr>
                                <tr>
                                    <th>Model</th>
                                    <td>{entry.frontmatter.spec.model}</td>
                                </tr>
                                <tr>
                                    <th>Platform height (m)</th>
                                    <td>{entry.frontmatter.spec.platform_height}</td>
                                </tr>
                                <tr>
                                    <th>Working height (m)</th>
                                    <td>{entry.frontmatter.spec.working_height}</td>
                                </tr>
                                <tr>
                                    <th>Platform capacity (kg)</th>
                                    <td>{entry.frontmatter.spec.platform_capacity}</td>
                                </tr>
                                <tr>
                                    <th>Overall width (m)</th>
                                    <td>{entry.frontmatter.spec.overall_width}</td>
                                </tr>
                                <tr>
                                    <th>Overall height (m)</th>
                                    <td>{entry.frontmatter.spec.overall_height}</td>
                                </tr>
                                <tr>
                                    <th>Weight (kg)</th>
                                    <td>{entry.frontmatter.spec.weight}</td>
                                </tr>
                                <tr>
                                    <th>Platform length (m)</th>
                                    <td>{entry.frontmatter.spec.platform_length}</td>
                                </tr>
                                <tr>
                                    <th>Platform width (m)</th>
                                    <td>{entry.frontmatter.spec.platform_width}</td>
                                </tr>
                                <tr>
                                    <th>Up over height (m)</th>
                                    <td>{entry.frontmatter.spec.up_over_height}</td>
                                </tr>
                                <tr>
                                    <th>Horizontal reach (m)</th>
                                    <td>{entry.frontmatter.spec.horizontal_reach}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="btn_specs">
                                <a href={`/images/uploads/${entry.frontmatter.spec.pdf.name}.pdf`} rel="nofollow nopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn_arrow" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                    </svg>
                                    Download Specifications
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className="form_quote">
                                <h3>Get a quote</h3>
                                <Form props={entry.frontmatter.heading} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default EntryTelehandlers;

export const query = graphql`
	query($slug: String!) {
		markdownRemark( fields: { slug: { eq: $slug } }) {
			frontmatter {
				page_title
				meta_description
                category
                heading
                image {
                    childImageSharp {
                        gatsbyImageData(
                            width: 800,
                            quality: 100, 
                            placeholder: NONE
                        )
                    }
                }
                spec {
                    brand
                    model
                    platform_height
                    working_height
                    platform_capacity
                    overall_width
                    overall_height
                    weight
                    platform_length
                    platform_width
                    up_over_height
                    horizontal_reach
                    pdf {
                        publicURL
                        name
                    }
                }
			}
			fields {
                slug
			}
			html
		}
	}
`
