import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from '../imagePages/Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";


export const UserProfile = ({ imageList, setImages, images }) => {

    const { id } = useParams();

	useEffect(() => {
		getAllImages().then(i => setImages(i.filter(i => i.userId == id)));
	}, [imageList]);

	return (
		<>			
			<h2 className="page-header">{images[0]?.user.username}'s Uploads</h2>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{images.length > 0 ? images.map((image) => (
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