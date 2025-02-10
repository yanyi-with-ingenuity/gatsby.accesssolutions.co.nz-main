import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import FormSearch from '../components/form_search'

class Header extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            showMobile: false,
            navChild: ''
        }
    }

    handleClick = e => {
        e.preventDefault();
        this.setState(prevState => ({
            showMobile: !prevState.showMobile
        }));
        //console.log(`Menu:`, this.state.showMobile);
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
        //console.log(`Child:`, this.state.navChild);
        //console.log(`Target:`, target);
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
        
        const NavSection = (p) => <ol>
            {p.navSectionItems.map( (p, i) => (<li key={i}><Link to={p.fields.slug}>{p.frontmatter.title}</Link></li>) )}
        </ol>

        const NavMobileSection = (p) => <ul className={this.state.navChild === `${p.navChild}` ? `show` : ``}>
        {p.navSectionItems.map( (p, i) => (<li key={i}><Link to={p.fields.slug}>&gt; {p.frontmatter.title}</Link></li>) )}
        </ul>

        return (
            <div>
                <header className="layout header yellow">
                    <div className="header__container">
                        <div className="header__flex flex__space-between">
                            <div className="logo">
                                <Link to="/" title="Access Solutions"><StaticImage src="../images/logo.png" alt="Access Solutions" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} /></Link>
                            </div>
                            <div className="phone">
                                <h3><a href="tel:0800653333" title="0800 653 343" rel="nofollow noopener">0800 653 343</a></h3>
                                <ul>
                                    <li>Experience</li>
                                    <li>|</li>
                                    <li>Safety</li>
                                    <li>|</li>
                                    <li>Innovation</li>
                                </ul>
                            </div>
                            <div className="nav__hamburger">
                                <button onClick={this.handleClick} id="nav-icon3" className={this.state.showMobile === true ? `open` : ``}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <nav className="layout yellow mobile__off">
                    <div className="nav__container nav nav_flex_bottom">
                        <div className="nav_left">
                        <ul className="sf-menu">
                            <li><Link to="#" title="Products">Equipment</Link>
                                <ul className="products">
                                    <div className="flex flex__space-between">
                                        <div className="nav__col">
                                            <h3><span className="border__left">Access Equipment</span></h3>
                                            <div>
                                                <NavSection navSectionItems={getNav(this.props.data.group, 'access_equipment')} />
                                            </div>
                                        </div>
                                        <div className="nav__col">
                                            <h3><span className="border__left">Kiwiscaf Scaffolding</span></h3>
                                            <div>
                                                <NavSection navSectionItems={getNav(this.props.data.group, 'kiwiscaf_scaffolding')} />
                                            </div>
                                        </div>
                                        <div className="nav__col">
                                            <h3><span className="border__left">Event Products</span></h3>
                                            <div>
                                                <NavSection navSectionItems={getNav(this.props.data.group, 'event_products')} />
                                            </div>
                                        </div>
                                        <div className="nav__col">
                                            <h3><span className="border__left">Equipment for sale</span></h3>
                                            <div>
                                                <NavSection navSectionItems={getNav(this.props.data.group, 'equipment_for_sale')} />
                                            </div>
                                        </div>
                                        <div className="nav__col">
                                            <StaticImage src="../images/ftr_img1.jpg" alt="Forklift Solutions" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li><a href="/find-solutions/" title="Find a solution">Find a solution</a></li>
                            <li><Link to="/locations/" activeClassName="active" title="Locations">Locations</Link></li>
                            <li><a href="https://www.trainingsolutions.co.nz/w/" title="Training" target="_blank" rel="noopener nofollow noreferrer">Training</a></li>
                        </ul>
                        </div>
                        <div className="nav_right">
                            <FormSearch />
                        </div>
                    </div>
                </nav>
                <nav className={this.state.showMobile === true ? `layout yellow` : `layout yellow mobile_hide`}>
                    <div className="nav__mobile">
                        <ul>
                            <li><button onClick={this.handleNavChild} data-id="child_1">&gt; Equipment</button>
                                <ul data-ul="child_1" className={this.state.navChild === `child_1` ? `` : `mobile_child_hide`}>
                                    <li><span>Access Equipment</span>
                                        <NavMobileSection navSectionItems={getNav(this.props.data.group, 'access_equipment')} />
                                    </li>
                                    <li><span>Kiwiscaf Scaffolding</span>
                                        <NavMobileSection navSectionItems={getNav(this.props.data.group, 'kiwiscaf_scaffolding')} />
                                    </li>
                                    <li><span>Event Products</span>
                                        <NavMobileSection navSectionItems={getNav(this.props.data.group, 'event_products')} />
                                    </li>
                                    <li><span>Equipment for sale</span>
                                        <NavMobileSection navSectionItems={getNav(this.props.data.group, 'equipment_for_sale')} />
                                    </li>
                                </ul>
                            </li>
                            <li><a href="/find-solutions/" title="Find a solution">&gt; Find a solution</a></li>
                            <li><Link to="/locations/" activeClassName="active" title="Locations">&gt; Locations</Link></li>
                            <li><a href="https://www.trainingsolutions.co.nz/w/" title="Training" target="_blank" rel="noopener nofollow noreferrer">&gt; Training</a></li>
                            <li><Link to="/contact-us/" activeClassName="active" title="Contact us">&gt; Contact Us</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const HeaderNav = () => (
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
            <Header data={data.allMarkdownRemark} />
        )}
    />
)

export default HeaderNav;
