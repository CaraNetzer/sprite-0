import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { addImageToFolder, removeImageFromFolder, getFoldersByUser, getImageFolders } from "../../managers/FolderManager";



export const SingleImage = ({ image, setImages }) => {

	const navigate = useNavigate();

	const localUser = localStorage.getItem("userProfile")
	const userObject = JSON.parse(localUser)

	const [favorite, setFavorite] = useState(false);
	const [userFolders, setUserFolders] = useState("");
	const [foldersThisImageIsIn, setFoldersThisImageIsIn] = useState([]);

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

		addImageToFolder(imageFolder).then(getImageFolders(image.id)).then(setFoldersThisImageIsIn);
	}

	const removeFavorite = (e) => {
		e.preventDefault();

		const imageFolder = {
			folderId: userFolders.find(f => f.userId == userObject.id && f.name == "Favorites").id,
			imageId: image.id
		}

		removeImageFromFolder(imageFolder).then(getImageFolders(image.id)).then(setFoldersThisImageIsIn);
	}

	const upvote = (e) => {
		e.preventDefault();

	}

	const downvote = (e) => {
		e.preventDefault();

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
						<i onClick={(e) => {
							e.target.classList.toggle("selected-arrow");
							upvote(e);
						}} className=" icon fa fa-long-arrow-up"></i>
						<span className="arrow-text"> {image.upvotes} </span>
						<i onClick={(e) => {
							e.target.classList.toggle("selected-arrow");
							downvote(e);
						}} className=" icon fa fa-long-arrow-down"></i>
						<span className="arrow-text"> {image.downvotes} </span>
					</Col>
				</Row>
			</Container>

		</figure>
	);
};