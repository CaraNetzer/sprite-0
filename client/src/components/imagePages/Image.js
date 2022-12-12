import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { getFolderImage } from "../../managers/FolderManager";



export const SingleImage = ({ image, setImages }) => {

	const navigate = useNavigate();

	const [folderImage, setFolderImage] = useState("");

	useEffect(() => {
		getFolderImage(image.id).then(setFolderImage)
	},[])

	const addFavorite = (e) => {
		e.preventDefault();

		const folderImage = {
			folderId: 1,
			imageId: image.id
		}

		console.log({folderImage})
	}

	const removeFavorite = (e) => {
		e.preventDefault();


		//console.log({folderImage})
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
						<i onClick={(e) => {							
							e.target.classList.toggle("fa-heart-o");
							{folderImage ? removeFavorite(e) : addFavorite(e)};
						}} className="icon heart fa fa-heart-o fa-heart"></i>
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