import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";



export const SingleImage = ({ image }) => {

	const navigate = useNavigate();

	return (
		<figure className="board-image tile is-child ">		
			<img onClick={() => navigate(`/image/${image.id}`)} className="image" src={image.src}></img>
		</figure>
	);
};