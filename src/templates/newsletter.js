import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Seo from '../components/seo'

const url = "//accesssolutions.us17.list-manage.com/subscribe/post?u=ed7a7193a5e2aa16d6ee80c4d&id=c25206c3c8";

const CustomForm = ({ status, message, onValidated }) => {
    let email, fname, lname;
    const submit = () =>
        email &&
        fname &&
        lname &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value
        });
    return (
        <div>
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && (
                <div
                style={{ color: "red" }}
                dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                style={{ color: "green" }}
                dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            <label htmlFor="email" className="newsletter_label">Email address <span className="asterisk">*</span></label>
            <input
                ref={node => (email = node)}
                type="email"
                id="email"
                className="newsletter_field"
            />
            <br />
            <label htmlFor="fname" className="newsletter_label">First name</label>
            <input
                ref={node => (fname = node)}
                type="text"
                id="fname"
                className="newsletter_field"
            />
            <br />
            <label htmlFor="lname" className="newsletter_label">Last name</label>
            <input
                ref={node => (lname = node)}
                type="text"
                id="lname"
                className="newsletter_field"
            />
            <br />
            <button onClick={submit} className="newsletter_btn">
                Submit
            </button>
        </div>
    );
};

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

const Newsletter = ({data}) => {
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
                            <div className="newsletter">
                                <h2>Subscribe to our Newsletter</h2>
                                <p><span>*</span> indicates required</p>
                                <MailchimpSubscribe
                                    url={url}
                                    render={({ subscribe, status, message }) => (
                                        <CustomForm
                                        status={status}
                                        message={message}
                                        onValidated={formData => subscribe(formData)}
                                        />
                                    )}
                                />
                            </div>
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

export default Newsletter;

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
			}
			fields {
                slug
			}
			html
		}
	}
`
