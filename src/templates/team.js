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

const Team = ({data}) => {
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
                        <h2>{entry.frontmatter.section}</h2>
                    </div>
                </div>
            </div>
            <main className="layout entry grey">
                <div className="entry__container">
                    <div className="entry__flex flex__space-between">
                        <article className="article text">
                            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
                        </article>
                        <aside className="aside">
                            {entry.frontmatter.aside.map((item, i) => (
                                <Link key={`item_` + i + ``} to={item.url} title={item.title}>
                                    <GatsbyImage image={item.image.childImageSharp.gatsbyImageData} alt={item.title} style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </Link>
                            ))}
                        </aside>
                    </div>
                </div>
            </main>
            <div className="layout team grey">
                <div className="team__container">
                    <h2>Auckland Depot - Head Office</h2>
                    <div className="staff__division">
                        {entry.frontmatter.auckland.map((entry, i) => (
                        <div key={`auckland_` + i + ``} className="staff">
                            <div className="staff__image">
                                <GatsbyImage image={entry.image.childImageSharp.gatsbyImageData} alt={entry.name} style={{ width: "100%", height: "100%", display: "block" }} imgStyle={{ objectFit: "fit" }} />
                            </div>
                            <h3>{entry.name}</h3>
                            <h4>{entry.position}</h4>
                            <ul>
                                <li><a href={`tel:` + entry.tel + ``} title={entry.phone}>{entry.phone}</a></li>
                                <li><a href={`mailto:` + entry.email + ``} title={entry.email}>{entry.email}</a></li>
                            </ul>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Team;

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
                auckland {
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 324, placeholder: NONE)
                        }
                    }
                    name
                    position
                    email
                    tel
                    phone
                }
			}
			fields {
                slug
			}
			html
		}
	}
`