import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { addImageToFolder, removeImageFromFolder, getFoldersByUser, getImageFolders, getFolderImages } from "../../managers/FolderManager";
import { editImage } from "../../managers/ImageManager";



export const SingleImage = ({ image, setFavorites }) => {

	const navigate = useNavigate();

	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	const [favorite, setFavorite] = useState(false);
	const [userFolders, setUserFolders] = useState("");
	const [foldersThisImageIsIn, setFoldersThisImageIsIn] = useState([]);

	const [upvoted, setUpvoted] = useState(false);
	const [downvoted, setDownvoted] = useState(false);

	useEffect(() => {
		getFoldersByUser(userObject.id).then(setUserFolders);
		getImageFolders(image.id).then(setFoldersThisImageIsIn)
	}, [])

	useEffect(() => {
		if (foldersThisImageIsIn.length > 0) {
			if (foldersThisImageIsIn?.find(f => f.name == "Favorites" && f.userId == userObject.id)) {
				setFavorite(true)
			} else {
				setFavorite(false)
			}
		} else {
			setFavorite(false)
		}
	}, [foldersThisImageIsIn])

	const addFavorite = (e) => {
		e.preventDefault();

		const imageFolder = {
			folderId: userFolders.find(f => f.userId == userObject.id && f.name == "Favorites").id,
			imageId: image.id
		}

		addImageToFolder(imageFolder).then(() => getImageFolders(image.id)).then(setFoldersThisImageIsIn)
			.then( () => {
				const favoritesFolderId = userFolders.find(f => f.name == "Favorites").id
				getFolderImages(favoritesFolderId).then(setFavorites);
			})

	}

	const removeFavorite = (e) => {
		e.preventDefault();

		const imageFolder = {
			folderId: userFolders.find(f => f.userId == userObject.id && f.name == "Favorites").id,
			imageId: image.id
		}

		removeImageFromFolder(imageFolder).then(() => getImageFolders(image.id)).then(setFoldersThisImageIsIn)
			.then( () => {
				const favoritesFolderId = userFolders.find(f => f.name == "Favorites").id
				getFolderImages(favoritesFolderId).then(setFavorites);
			})
	}

	const upvote = (e) => {
		e.preventDefault();
		const updatedImage = { ...image }
		updatedImage.upvotes = updatedImage.upvotes + 1
		updatedImage.User = null;
		editImage(updatedImage)
			//.then()
	}
	
	const downvote = (e) => {
		e.preventDefault();
		const updatedImage = { ...image }
		updatedImage.upvotes = updatedImage.upvotes - 1
		updatedImage.User = null;
		editImage(updatedImage)
			//.then()
	}


	return (
		<figure className="board-image tile is-child">


			<img onClick={() => navigate(`/image/${image.id}`)} className="image" src={image.src}></img>

			<Container className="not-hover">
				<Row className="icon-row">
					<Col className="on-top">
						{favorite
							? <i onClick={(e) => {
								e.target.classList.toggle("fa-heart-o");
								{ favorite ? removeFavorite(e) : addFavorite(e) };
							}} className="icon heart fa fa-heart">

							</i>
							: <i onClick={(e) => {
								e.target.classList.toggle("fa-heart-o");
								{ favorite ? removeFavorite(e) : addFavorite(e) };
							}} className="icon heart fa fa-heart-o fa-heart">

							</i>
						}
					</Col>
					<Col className="on-top">
						{upvoted
							? <i onClick={(e) => {
								setUpvoted(false)
								e.target.classList.toggle("selected-arrow-up");
								downvote(e);
							}} className=" icon fa fa-long-arrow-up"></i>

							: <i onClick={(e) => {
								setUpvoted(true)
								e.target.classList.toggle("selected-arrow-up");
								upvote(e);
							}} className=" icon fa fa-long-arrow-up"></i>
						}						
						<span className="arrow-text"> {image.upvotes} </span>
						{downvoted
							? <i onClick={(e) => {
								setDownvoted(false)
								e.target.classList.toggle("selected-arrow-down");
								upvote(e);
							}} className=" icon fa fa-long-arrow-down"></i>
							
							: <i onClick={(e) => {
								setDownvoted(true)
								e.target.classList.toggle("selected-arrow-down");
								downvote(e);
							}} className=" icon fa fa-long-arrow-down"></i>
						}												
					</Col>
				</Row>
			</Container>

		</figure>
	);
};