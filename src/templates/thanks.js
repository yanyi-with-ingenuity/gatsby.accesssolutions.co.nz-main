import React from 'react'
import { graphql } from 'gatsby'
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

const Thanks = ({data}) => {
    const entry = data.markdownRemark
    //console.log('entry: ', entry);
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
            <main className="layout entry grey">
                <div className="entry__container">
                    <div className="entry__flex flex__space-between">
                        <article className="article text">
                            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
                        </article>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Thanks;

export const query = graphql`
	query($slug: String!) {
		markdownRemark( fields: { slug: { eq: $slug } }) {
			frontmatter {
                section
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
			}
			fields {
                slug
			}
			html
		}
	}
`
