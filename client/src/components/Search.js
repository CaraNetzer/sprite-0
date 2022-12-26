import { React, useEffect, useState } from 'react';
import { searchDbImages } from '../managers/ImageManager';
import { SingleImage } from './imagePages/Image';
import { useParams, useLocation } from "react-router-dom";


export const Search = (props) => {

    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");

    const { id } = useParams();
    let location = useLocation();


    const searchImages = (e) => {
        e.preventDefault()

        searchDbImages(query)
            .then(setSearchResults);
    }

    useEffect(() => {
        if (id != undefined) {
            searchDbImages(id)
            .then(setSearchResults)
            .then(setQuery(id));
        }
    }, [])

    useEffect(() => {
        //on return to this page, results will still be there
        window.history.replaceState(null, "Sprite[0]", `/search/${query.toString()}`);
    },[query])

    return (
        <>
            <div className="search-container">
                <form className='search-form' onSubmit={(e) => searchImages(e)}>
                    <input id="search-input" type="text" placeholder="Search by tags, notes, and titles" name="search"
                        onChange={event => setQuery(event.target.value)}/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{searchResults.length > 0 ? searchResults?.map((i) => (
							<>
								<div className="tile is-parent board-tile">
									<SingleImage key={i.id} image={i} setSearchResults={setSearchResults} query={query} />
								</div>
							</>
						)) : ""}
					</div>
				</div>
			</div>
        </>
    );
}