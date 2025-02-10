import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
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

const EntryForkLifts = ({data}) => {
    const entry = data.markdownRemark
    //console.log('entry: ', entry);
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
                                    {/*<tr>*/}
                                    {/*    <th>Brand</th>*/}
                                    {/*    <td>{entry.frontmatter.spec.brand}</td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <th>Model</th>
                                        <td>{entry.frontmatter.spec.model}</td>
                                    </tr>
                                    <tr>
                                        <th>Lifting capacity (kg)</th>
                                        <td>{entry.frontmatter.spec.lifting_capacity}</td>
                                    </tr>
                                    <tr>
                                        <th>Weight (kg)</th>
                                        <td>{entry.frontmatter.spec.weight}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="form_quote">
                                <h3>Get a quote</h3>
                                <Form props={entry.frontmatter.heading} />
                            </div>
                            <div className="form_img">
                                <a href='https://forkliftsolutions.co.nz/fair-wear-tear' title='Fair wear tear' target="_blank" rel="nofollow noopner noreferrer">
                                    <StaticImage src='../images/fair_wear_tear.jpg' alt='Fair wear tear' style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default EntryForkLifts;

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
                    lifting_capacity
                    weight
                }
			}
			fields {
                slug
			}
			html
		}
	}
`
