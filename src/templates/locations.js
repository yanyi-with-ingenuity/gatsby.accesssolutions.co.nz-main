import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
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

const Locations = ({data}) => {
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
                        <aside className="aside">
                            {entry.frontmatter.aside.map( (item, i) => (
                                <Link key={`item_` + i + ``} to={item.url} title={item.title}>
                                    <GatsbyImage image={item.image.childImageSharp.gatsbyImageData} alt={item.title} style={{ width: "100%", height: "100%", display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </Link>
                            ))}
                        </aside>
                    </div>
                </div>
            </main>
            <div className="layout locations grey">
                <div className="locations__container">
                    <div className="location white">
                        <h2>Auckland</h2>
                        <div className="location__flex flex__space-between">
                            <div className="location__col">
                                <div className="location__border">
                                    <StaticImage src="../images/auckland.jpg" alt="Auckland" style={{ display: "block" }} imgStyle={{ objectFit: "cover" }} />
                                </div>
                            </div>
                            <div className="location__col location__border location__map">
                                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.3245747166907!2d174.82157311529286!3d-36.90650327992676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d49229bbcdcb9%3A0xbe05b176881cddf!2s100+Leonard+Rd%2C+Mount+Wellington%2C+Auckland+1060!5e0!3m2!1sen!2snz!4v1504157755666" style={{ border: "0" }} allowFullScreen="" height="100%" frameBorder="0" width="100%"></iframe>
                            </div>
                            <div className="location__col">
                                <ul>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path className="secondary" d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z"/></svg>
                                        <address><strong>Auckland Depot: 100 Leonard Road, Mt Wellington, Auckland, 1060</strong></address>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M4 2h4a1 1 0 0 1 .98.8l1 5a1 1 0 0 1-.27.9l-2.52 2.52a12.05 12.05 0 0 0 5.59 5.59l2.51-2.52a1 1 0 0 1 .9-.27l5 1c.47.1.81.5.81.98v4a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M22 10a1 1 0 0 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1 0-2 8 8 0 0 1 8 8zm-4 0a1 1 0 0 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 0-2 4 4 0 0 1 4 4z"/></svg>
                                        <a href="tel:095794221" title="09 579 4221">09 579 4221</a> or <a href="tel:0800653343" title="0800 653 343">0800 653 343</a>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"/><path className="secondary" d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"/></svg>
                                        <a href="mailto:info@accesssolutions.co.nz" title="info@accesssolutions.co.nz">Email us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="location white">
                        <h2>Hautapu</h2>
                        <div className="location__flex flex__space-between">
                            <div className="location__col">
                                <div className="location__border">
                                    <StaticImage src="../images/wellington.jpg" alt="Auckland" style={{ display: "block" }} imgStyle={{ objectFit: "cover" }} />
                                </div>
                            </div>
                            <div className="location__col location__border location__map">
                                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12599.667124214611!2d175.43077202878106!3d-37.862237571963455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d6d02cc98552a59%3A0x815c19ca78e321a4!2s280%20Peake%20Road%2C%20Pukemoremore%203493!5e0!3m2!1sen!2snz!4v1713486095991!5m2!1sen!2snz" style={{ border: "0" }} allowFullScreen="" height="100%" frameBorder="0" width="100%"></iframe>
                            </div>
                            <div className="location__col">
                                <ul>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path className="secondary" d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z"/></svg>
                                        <address><strong>Hautapu Depot: 280a Peake Road, Hautapu, Cambridge</strong></address>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M4 2h4a1 1 0 0 1 .98.8l1 5a1 1 0 0 1-.27.9l-2.52 2.52a12.05 12.05 0 0 0 5.59 5.59l2.51-2.52a1 1 0 0 1 .9-.27l5 1c.47.1.81.5.81.98v4a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M22 10a1 1 0 0 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1 0-2 8 8 0 0 1 8 8zm-4 0a1 1 0 0 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 0-2 4 4 0 0 1 4 4z"/></svg>
                                        <a href="tel:0800653343" title="0800 653 343">0800 653 343</a>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"/><path className="secondary" d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"/></svg>
                                        <a href="mailto:info@accesssolutions.co.nz" title="info@accesssolutions.co.nz">Email us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="location white">
                        <h2>Christchurch</h2>
                        <div className="location__flex flex__space-between">
                            <div className="location__col">
                                <div className="location__border">
                                    <StaticImage src="../images/christchurch.jpg" alt="Auckland" style={{ display: "block" }} imgStyle={{ objectFit: "cover" }} />
                                </div>
                            </div>
                            <div className="location__col location__border location__map">
                                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.1834854539634!2d172.55306151549408!3d-43.54021697912522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d31f551ead35dd5%3A0x6fefb5e36d71e902!2s28+Nga+Mahi+Rd%2C+Sockburn%2C+Christchurch+8042!5e0!3m2!1sen!2snz!4v1504157994467" style={{ border: "0" }} allowFullScreen="" height="100%" frameBorder="0" width="100%"></iframe>
                            </div>
                            <div className="location__col">
                                <ul>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path className="secondary" d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z"/></svg>
                                        <address><strong>Christchurch Depot: 28 Nga Mahi Road, Sockburn, Christchurch</strong></address>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M4 2h4a1 1 0 0 1 .98.8l1 5a1 1 0 0 1-.27.9l-2.52 2.52a12.05 12.05 0 0 0 5.59 5.59l2.51-2.52a1 1 0 0 1 .9-.27l5 1c.47.1.81.5.81.98v4a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M22 10a1 1 0 0 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1 0-2 8 8 0 0 1 8 8zm-4 0a1 1 0 0 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 0-2 4 4 0 0 1 4 4z"/></svg>
                                        <a href="tel:033436103" title="03 343 6103">03 343 6103</a> or <a href="tel:0800653343" title="0800 653 343">0800 653 343</a>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"><path className="primary" d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"/><path className="secondary" d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"/></svg>
                                        <a href="mailto:info@accesssolutions.co.nz" title="info@accesssolutions.co.nz">Email us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Locations;

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
	}
`
