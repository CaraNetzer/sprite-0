import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from '../imagePages/Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";



export const MyProfile = ({ imageList }) => {
	const [images, setImages] = useState([]);


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
						{images.length > 0 ? images?.filter(i => i.userId == userObject.id).map((image) => (
							<>
								<div key={image.id} className="tile is-parent board-tile">
									<SingleImage image={image}/>
								</div>
							</>
						)) : <p>No images yet</p>}
					</div>
				</div>
			</div>
		</>
	);
};