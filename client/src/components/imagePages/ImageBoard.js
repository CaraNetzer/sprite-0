import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from './Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";


const ImageBoard = ({ imageList, setImages, images }) => {
	
	const [publicId, setPublicId] = useState("")


	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	useEffect(() => {
		getAllImages().then(i => setImages(i));
	}, [imageList]);

	return (
		<>			
			<h1>Images</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{images.length > 0 ? images?.map((image) => (
							<>
								<div  className="tile is-parent board-tile">
									<SingleImage key={image.id} image={image} setImages={setImages}/>
								</div>
							</>
						)) : <p>No images yet</p>}
					</div>
				</div>
			</div>
		</>
	);
};

export default ImageBoard;