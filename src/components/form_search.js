import React from 'react'
import { useState } from 'react';
import { StaticImage } from "gatsby-plugin-image"

const FormSearch = () => {

    const {search} = typeof window !== 'undefined' ? window.location : '';
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '');
    //console.log('searchQuery: ', searchQuery);

    const submitHandler = async e => {
        e.preventDefault();
        window.location.replace(`/search/?s=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="search" method="get" autoComplete="off">
            <form className="search_form" onSubmit={submitHandler} action="">
                <label className="visually-hidden">Site Search</label>
                <div className="search_icon">
                    <button type="submit" className="search_btn">
                        <StaticImage src="../images/search_icon.jpg" alt="Search" style={{ display: "block" }} imgStyle={{ objectFit: "contain" }} />
                    </button>
                </div>
                <input placeholder="Search" value={searchQuery} onInput={(e) => setSearchQuery(e.target.value)} type="text" name="s" placeholder="Search" className="search_field" />
            </form>
        </div>
    )
};

export default FormSearch;