import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";



export const SingleImage = ({ image, publicId }) => {
	return (
		<figure className="board-image tile is-child ">		
			<img className="image" src={image.src}></img>
		</figure>
	);
};