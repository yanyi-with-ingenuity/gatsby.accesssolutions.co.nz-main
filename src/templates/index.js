import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'
import Seo from '../components/seo'

const Flickity =
  typeof window !== "undefined"
    ? require("react-flickity-component")
    : () => null

const fade =
  typeof window !== "undefined"
    ? require("flickity-fade")
    : () => null

const flickityOptions = {
    prevNextButtons: true,
    pageDots: false,
    cellSelector: '.slider__primary-slider-cell',
    wrapAround: false,
    setGallerySize: false,
    cellAlign: 'center',
    autoPlay: true,
    fade: true
}

function Slider(slides) {
    //console.log('slides: ', slides);
    //console.log('fade: ', fade);
    return (
        <Flickity
            className={'slider slider__primary-slider'}
            elementType={'div'}
            options={flickityOptions}
            disableImagesLoaded={false}
            reloadOnUpdate={true}
            static={true}
        >
            {slides.data.map((slide, i) => (
                <div key={`slide_` + i + ``} className="slider__primary-slider-cell">
                  
                    <div className="slides_layout slides_absolute">
                        <div className="slides_960">
                        {slide.align === 'right' && 
                        <div className="slides_grid slides_grid_2 slides_gap slides_align_items_baseline slides_height">
                            <div>
                                &nbsp;
                            </div>
                            <div className={slide.text ? 'slides_text slides_relative' : 'slides_text slides_relative'}>
                                {slide.size === 'large' &&
                                    <h2>{slide.text}</h2>
                                }
                                {slide.size === 'small' &&
                                    <h3>{slide.text}</h3>
                                }
                                <a href={slide.link} className="slides_btn">{slide.button}</a>
                                <div className="slides_small_image">
                                    {slide.small_image ? <GatsbyImage 
                                        image={slide.small_image.childImageSharp.gatsbyImageData} 
                                        alt={slide.text} 
                                        style={{ width: '120px', display: "block" }} 
                                        imgStyle={{ objectFit: "contain" }} /> 
                                    : ''}
                                </div>
                            </div>
                        </div>
                        }
                        {slide.align === 'left' && 
                        <div className="slides_grid slides_grid_2 slides_gap slides_align_items_baseline slides_height">
                            <div className={slide.text ? 'slides_text slides_bg' : 'slides_text'}>
                                {slide.size === 'large' &&
                                    <h2>{slide.text}</h2>
                                }
                                {slide.size === 'small' &&
                                    <h3>{slide.text}</h3>
                                }
                                <a href={slide.link} className="slides_btn">{slide.button}</a>
                            </div>
                            <div>
                                &nbsp;
                            </div>
                        </div>
                        }
                        </div>
                    </div>
                  
                <GatsbyImage 
                    image={slide.image.childImageSharp.gatsbyImageData} 
                    alt={`slide_` + i + ``} 
                    style={{ width: "100%", height: "100%", display: "block" }} 
                    imgStyle={{ objectFit: "fit" }} 
                />
                </div>
            ))}
        </Flickity>
    )
}

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

const HomePage = ({data}) => {
    const entry = data.markdownRemark
    //console.log('entry: ', entry);
    return (
        <div className="page">
            <Header />
            <div className="layout grey">
                <div className="slider__container">
                    <div className="slider__block">
                        <Slider data={entry.frontmatter.slides} />
                    </div>
                </div>
            </div>
            <main className="layout home grey">
                <div className="home__container">
                    <div className="home__flex flex__space-between">
                        <aside className="home__img">
                            <StaticImage src="../images/abt_img.png" alt="Kiwi as" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                        </aside>
                        <article className="home__intro text">
                            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
                        </article>
                    </div>
                </div>
            </main>
            <div className="layout grey">
                <div className="ads__container">
                    <div className="ads__flex flex__space-around flex__align-items ad_gap">
                        <div className="ad">
                            <Link to="/find-solutions/">
                                <StaticImage src="../images/step-1.jpg" alt="Find solutions" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                            </Link>
                        </div>
                        <div className="ad">
                            <Link to="/newsletter/">
                                <StaticImage src="../images/step-2.jpg" alt="Newsletter sign up" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />  
                            </Link>
                        </div>
                        <div className="ad">
                            <Link to="/careers/">
                                <StaticImage src="../images/step-3.jpg" alt="Careers" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;

export const query = graphql`
	query($slug: String!) {
		markdownRemark( fields: { slug: { eq: $slug } }) {
			frontmatter {
				page_title
				meta_description
                slides {
                    image {
                        childImageSharp {
                            gatsbyImageData(
                                width: 800, 
                                placeholder: NONE,
                                quality: 100,
                            )
                        }
                    }
                    text
                    button
                    link
                    align
                    size
                    small_image {
                        childImageSharp {
                            gatsbyImageData(
                                width: 240, 
                                placeholder: NONE,
                                quality: 100,
                            )
                        }
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
