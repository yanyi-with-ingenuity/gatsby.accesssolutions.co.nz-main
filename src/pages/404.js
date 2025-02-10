import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'

// markup
const NotFoundPage = () => {
  return (
    <div className="page">
            <Header />
            <div className="layout banner_bg grey">
                <div className="banner__container relative">
                    <div className="absolute banner_img">
                      <StaticImage src="../images/Scissor_Lifts.jpg" alt="Banner" style={{ width: "100%", height: "100%", display: "block" }} imgStyle={{ objectFit: "cover" }}  />
                    </div>
                    <div className="banner relative">
                        <h2>Page not found</h2>
                    </div>
                </div>
            </div>
            <main className="layout entry grey">
                <div className="entry__container">
                    <div className="entry__flex flex__space-between">
                        <article className="article text">
                            <p>We couldn’t find what you were looking for.</p>
                            <p><Link to="/">back to home</Link></p>
                        </article>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
  )
}

export default NotFoundPage
