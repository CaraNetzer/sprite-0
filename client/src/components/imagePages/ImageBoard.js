import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from './Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { UploadWidget } from "./UploadWidget";


const PostList = () => {
	const [images, setImages] = useState([]);
	const [publicId, setPublicId] = useState("")


	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	useEffect(() => {
		getAllImages().then(i => setImages(i));
	}, []);

	return (
		<>
			<UploadWidget publicId={publicId} setPublicId={setPublicId} />
			<h1>Images</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="cards-column">
						{images.length > 0 ? images?.map((image) => (
							<>
								<SingleImage key={image.id} image={image} publicId={publicId}/>
							</>
						)) : <p>No images yet</p>}
					</div>
				</div>
			</div>
		</>
	);
};

export default PostList;