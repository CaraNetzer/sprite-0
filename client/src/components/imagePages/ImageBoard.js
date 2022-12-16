import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from './Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { getAllTags } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";


const ImageBoard = ({ imageList, setImages, images, changeColor }) => {

	const [tags, setAllTags] = useState([])

	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	const navigate = useNavigate();

	useEffect(() => {
		getAllImages().then(i => setImages(i));
	}, [imageList]);

	useEffect(() => {
		getAllTags().then(setAllTags);
	}, [])

	return (
		<div>

			<h4 id="tag-list-title">Tags<span style={{ fontSize: 36 }}>🏷️</span></h4>
			<div id="home-page">
				<ListGroup className="tag-list-item">
					{tags?.map(t =>
						<ListGroupItem className="tag-list-item-text"
							action
							tag="button"
							onClick={() => navigate(`/search/${t.name}`)}>
							<span id="arrow">➡</span> <span id="tag-text">{t.name}</span>
						</ListGroupItem>
					)}
				</ListGroup>
				<div className="container">
					<div className="row justify-content-center">
						<div className="tile is-ancestor board">
							{images.length > 0 ? images?.map((thisImage) => (
								<>
									<div className="tile is-parent board-tile">
										<SingleImage changeColor={changeColor} key={thisImage.id} image={thisImage} setImages={setImages} />
									</div>
								</>
							)) : <p>No images yet</p>}
						</div>
					</div>
				</div>
			</div >
		</div>
	);
};

export default ImageBoard;