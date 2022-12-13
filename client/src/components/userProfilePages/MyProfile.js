import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from '../imagePages/Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { getFoldersByUser, getFolderImages } from "../../managers/FolderManager";
import { getImage } from "../../managers/ImageManager";


export const MyProfile = ({ imageList }) => {
	const [images, setImages] = useState([]);
	const [userFolders, setUserFolders] = useState([]);
	const [favorites, setFavorites] = useState([]);

	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	useEffect(() => {
		getAllImages().then(i => setImages(i));
	}, [imageList]);

	useEffect(() => {
		getFoldersByUser(userObject.id).then(setUserFolders);
	}, [])

	useEffect(() => {
		if (userFolders?.find(f => f.name == "Favorites")) {
			const favoritesFolderId = userFolders.find(f => f.name == "Favorites").id
			getFolderImages(favoritesFolderId).then(setFavorites);
		}
	}, [userFolders])

	return (
		<>
			<h1>My Uploads</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{images.length > 0 ? images?.filter(i => i.userId == userObject.id).map((image) => (
							<>
								<div key={image.id} className="tile is-parent board-tile">
									<SingleImage image={image} />
								</div>
							</>
						)) : <p>No images yet</p>}
					</div>
				</div>
			</div>
			<h1>My Favorites</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{favorites.length > 0 ? favorites?.map((image) => (
							<>
								<div key={image.id} className="tile is-parent board-tile">
									<SingleImage image={image} />
								</div>
							</>
						)) : <p>No favorites yet</p>}
					</div>
				</div>
			</div>
		</>
	);
};