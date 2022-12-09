import { React, useState } from 'react';
import { searchDbImages } from '../managers/ImageManager';
import { SingleImage } from './imagePages/Image';


export const Search = () => {
    const data = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");


    const searchImages = (e) => {
        e.preventDefault()

        searchDbImages(query)
            .then(setSearchResults);
    }

    return (
        <>
            <div class="search-container">
                <form onSubmit={(e) => searchImages(e)}>
                    <input id="search-input" type="text" placeholder="Search by tags, notes, and titles" name="search"
                        onChange={event => setQuery(event.target.value)}/>
                        <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
            <div className="results">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{searchResults.length > 0 ? searchResults?.map((i) => (
							<>
								<div key={i.id} className="tile is-parent board-tile">
									<SingleImage image={i}/>
								</div>
							</>
						)) : ""}
					</div>
				</div>
			</div>
        </>
    );
}