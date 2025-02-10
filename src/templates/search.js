import React, { useState } from 'react';
import { Link, graphql } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch';
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

const SearchResults = ({data}) => {

    const entry = data.markdownRemark
    console.log('data: ', data)

    const {search} = typeof window !== 'undefined' ? window.location : '';
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);
    console.log('results: ', results);

    let pages = results.filter(entry => entry.category === null)
    console.log('pages: ', pages);

    let products = results.filter(entry => entry.category !== null)
    console.log('products: ', products);

    return (
        <div className="page">
            <Header />
            <div className="layout banner_bg grey">
                <div className="banner__container relative">
                    <div className="absolute banner_img">
                        <GatsbyImage image={entry.frontmatter.image.childImageSharp.gatsbyImageData} alt={entry.frontmatter.section} style={{ width: "100%", height: "100%", display: "block" }} imgStyle={{ objectFit: "cover" }} />
                    </div>
                    <div className="banner relative">
                        <h2>{entry.frontmatter.section}</h2>
                    </div>
                </div>
            </div>
            <main className="layout grey">
                <div className="search_container"> 
                    <div className="search_results">
                        <h1>You have searched for: {searchQuery}</h1>
                        <div className="search_results_pages">
                            {pages.length > 0 ?
                                <>
                                {pages.map((entry, i) => (
                                    <div key={`page_${i}`}>
                                        <h3><Link to={entry.slug}>{entry.heading}</Link></h3>
                                        <p>{entry.excerpt} <Link to={entry.slug}>Read more</Link></p>
                                    </div>
                                ))}
                                </>
                                : 'No search results found'
                            }
                        </div>
                        <h2>{searchQuery} in products</h2>
                        {products.length > 0 ?
                        <>
                            <table className="data__table" border="0" cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="t_30">Name</th>
                                        <th className="t_10">Working Height</th>
                                        <th className="t_10">Platform Capacity</th>
                                        <th className="t_10">Weight</th>
                                        <th className="t_10">Platform Height</th>
                                        <th className="t_10">Platform Length</th>
                                        <th className="t_10">Platform Width</th>
                                        <th className="t_10">Specs</th>
                                    </tr>
                                </thead>  
                                <tbody>
                                    {products
                                    .sort((a, b) => parseFloat(a.spec.working_height) > parseFloat(b.spec.working_height) ? 1 : -1)
                                    .map((entry, i) => (
                                        <tr key={`product_${i}`}>
                                            <td data-label="Name:&nbsp;"><Link to={entry.slug}>{entry.heading}</Link></td>
                                            <td data-label="Working Height:&nbsp;">{entry.spec.working_height !== null ? `` + entry.spec.working_height + ` m` : '-'}</td>
                                            <td data-label="Platform Capacity:&nbsp;">{entry.spec.platform_capacity !== null ? `` + entry.spec.platform_capacity + ` kg` : '-'}</td>
                                            <td data-label="Weight:&nbsp;">{entry.spec.weight !== null ? `` + entry.spec.weight + ` kg` : '-'}</td>
                                            <td data-label="Platform Height:&nbsp;">{entry.spec.platform_height !== null ? `` + entry.spec.platform_height + ` m` : '-'}</td>
                                            <td data-label="Platform Length:&nbsp;">{entry.spec.platform_length !== null ? `` + entry.spec.platform_length + ` m` : '-'}</td>
                                            <td data-label="Platform Width:&nbsp;">{entry.spec.platform_width !== null ? `` + entry.spec.platform_width + ` m ` : '-'}</td>
                                            <td data-label="Specs:&nbsp;">
                                                {entry.spec.pdf.name !== '' && 
                                                <a href={`/images/uploads/${entry.spec.pdf.name}.pdf`} rel="noopener nofollow noreferrer" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="btn_arrow" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                                </svg>
                                                PDF
                                                </a>
                                            }
                                            </td>
                                        </tr>     
                                    ))}
                                </tbody>
                            </table>
                        </>
                        : 'No products found' }
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export const query = graphql`
    query($slug: String!) {
        localSearchPages {
            store
            index
        }
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

export default SearchResults;