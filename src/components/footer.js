import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"

class FooterMobile extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            showMobile: false,
            navChild: ''
        }
    }

    handleNavChild = e => {
        e.preventDefault();
        let target = e.target.getAttribute('data-id');
        if (this.state.navChild === target) { 
            this.setState({
                navChild: ''
            });
        } else {
            this.setState({
                navChild: target
            })
        }
        console.log(`Child:`, this.state.navChild);
        console.log(`Target:`, target);
    }

    render () {
        function getNav (allMarkdownRemarkGroup, nav) {
            let result = [];
            for (let edges of allMarkdownRemarkGroup) {
                for (let item of edges.edges) {
                    if (item.node.frontmatter.nav === nav) {
                        result.push(item.node)
                    }
                }
            }
            result.sort(function(a, b) {
                return a.frontmatter.nav_order - b.frontmatter.nav_order;
            });
            return result;
        }
        
        const NavSection = (entry) => {
            return (
                <ul data-ul={entry.navChild} className={this.state.navChild === `${entry.navChild}` ? `show` : `footer__closed`}>
                    {entry.navSectionItems.map( (entry, i) => (<li key={i}><Link to={entry.fields.slug}>{entry.frontmatter.title}</Link></li>) )}
                </ul>
            )
        }

        return (
            <div>
                <div className="layout blue">
                    <div className="footer__nav__container">
                        <div className="footer__nav__flex flex__space-between">
                            <nav className="footer__nav">
                                <h3><span className="border__left"><button onClick={this.handleNavChild} data-id="child_1" title="Access equipment">Access equipment</button></span></h3>
                                <NavSection navChild="child_1" navSectionItems={getNav(this.props.data.group, 'access_equipment')} />
                            </nav>
                            <nav className="footer__nav">
                                <h3><span className="border__left"><button onClick={this.handleNavChild} data-id="child_2" title="Kiwiscaf scaffolding">Kiwiscaf scaffolding</button></span></h3>
                                <NavSection navChild="child_2" navSectionItems={getNav(this.props.data.group, 'kiwiscaf_scaffolding')} />
                            </nav>
                            <nav className="footer__nav">
                                <h3><span className="border__left"><button onClick={this.handleNavChild} data-id="child_3" title="Event products">Event products</button></span></h3>
                                <NavSection navChild="child_3" navSectionItems={getNav(this.props.data.group, 'event_products')} />
                            </nav>
                            <nav className="footer__nav">
                                <h3><span className="border__left"><button onClick={this.handleNavChild} data-id="child_4" title="Equipment for sale">Equipment for sale</button></span></h3>
                                <NavSection navChild="child_4" navSectionItems={getNav(this.props.data.group, 'equipment_for_sale')} />
                            </nav>
                            <nav className="footer__nav footer_img">
                                <div className="footer__ad">
                                    <a href="https://forkliftsolutions.co.nz/" target="_blank" rel="nofollow noopener noreferrer"><StaticImage src="../images/forklift.png" alt="Forklift Solutions" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} /></a> 
                                </div>
                                <a href="https://www.generatorsolutions.co.nz/" target="_blank" rel="nofollow noopener noreferrer"><StaticImage src="../images/generator.png" alt="Generator Solutions" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} /></a>
                            </nav>
                            <nav className="footer_on">
                                <div className="footer__nav">
                                    <h3><span className="border__left"><button onClick={this.handleNavChild} data-id="child_5" title="About Access Solutions">About Access Solutions</button></span></h3>
                                    <ul data-ul="child_5" className={this.state.navChild === `child_5` ? `show` : `footer__closed`}>
                                        <li><Link to="/about-us/" title="Our Company">Our Company</Link></li>
                                        <li><Link to="/team/" title="Our Team">Our Team</Link></li>
                                        <li><Link to="/newsletter/" title="Newsletter Sign Up">Newsletter Sign Up</Link></li>
                                        <li><Link to="/account-application/" title="Account Application">Account Application</Link></li>
                                        <li><Link to="/contact-us/" title="Contact">Contact</Link></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <footer className="layout yellow mobile__off">
                    <div className="footer__container">
                        <div className="footer__flex flex__space-between">
                            <div className="footer__col2">
                                <div className="footer footer__full">
                                    <h3><span className="border__left"><Link to="#" title="About">About Access Solutions</Link></span></h3>
                                    <div className="footer__flex flex__space-between">
                                        <div className="footer__half">
                                            <ul className="footer__closed">
                                                <li><Link to="/about-us/" title="Our Company">Our Company</Link></li>
                                                <li><Link to="/team/" title="Our Team">Our Team</Link></li>
                                                <li><Link to="/our-history/" title="Our History">Our History</Link></li>
                                                <li><Link to="/locations/" title="Locations">Locations</Link></li>
                                                <li><Link to="/sustainability-policy/" title="Sustainability Policy">Sustainability Policy</Link></li>
                                            </ul>
                                        </div>
                                        <div className="footer__half">
                                            <ul className="footer__closed">
                                                <li><Link to="/contact-us/" title="Contact">Contact Us</Link></li>
                                                <li><a href="https://www.flickr.com/photos/accesssolutions/albums" title="Photo Gallery" target="_blank" rel="nofollow noopener noreferrer">Photo Gallery</a></li>
                                                <li><Link to="/newsletter/" title="Newsletter Sign Up">Newsletter Sign Up</Link></li>
                                                <li><Link to="/account-application/" title="Account Application">Account Application</Link></li>
                                                <li><Link to="/terms/" title="Terms &amp; Conditions">Terms &amp; Conditions</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <h3><span className="border__left"><Link to="/careers/" title="Careers" className="careers" rel="nofollow noopener noreferrer">Careers at Access Solutions</Link></span></h3>
                            </div>
                            <div className="footer">
                                <h3><span className="border__left"><Link to="/video-training/" title="Video Training" className="careers" rel="nofollow noopener noreferrer">Video Training</Link></span></h3>
                            </div>
                            <div className="footer footer__img">
                                <Link to="/download-phoneapp/" title="Download our new phone app" target="_blank" rel="nofollow noopener"><StaticImage src="../images/ftr_img2.jpg" alt="Download our new phone app" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }}  /></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

const FooterMobileNav = () => (
    <StaticQuery
        query={graphql`
            query {
                allMarkdownRemark {
                    group(field: {frontmatter: {nav: SELECT}}) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                    nav
                                    nav_order
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={(data) => (
            <FooterMobile data={data.allMarkdownRemark} />
        )}
    />
)

export default FooterMobileNav