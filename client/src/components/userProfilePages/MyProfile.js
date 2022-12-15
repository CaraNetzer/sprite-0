import React, { useState, useEffect, useContext } from "react";
import { SingleImage } from '../imagePages/Image';
import { getAllImages } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { getFoldersByUser, getFolderImages } from "../../managers/FolderManager";
import { getImage } from "../../managers/ImageManager";


export const MyProfile = ({ imageList, setImages, images }) => {
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
			<h2 className="page-header">My Uploads</h2>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{images.length > 0 ? images?.filter(i => i.userId == userObject.id).map((image) => (
							<>
								<div key={image.id} className="tile is-parent board-tile">
									<SingleImage image={image} setFavorites={setFavorites} setImages={setImages}/>
								</div>
							</>
						)) : <p>No images yet</p>}
					</div>
				</div>
			</div>
			<h2 className="page-header">My Favorites</h2>
			<div className="container">
				<div className="row justify-content-center">
					<div className="tile is-ancestor board">
						{favorites.length > 0 ? favorites?.map((image) => (
							<>
								<div key={image.id} className="tile is-parent board-tile">
									<SingleImage setFavorites={setFavorites} image={image} setImages={setImages} />
								</div>
							</>
						)) : <p>No favorites yet</p>}
					</div>
				</div>
			</div>
		</>
	);
};