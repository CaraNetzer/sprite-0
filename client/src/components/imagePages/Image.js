import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";



export const SingleImage = ({ image }) => {

	const navigate = useNavigate();

	return (
		<figure className="board-image tile is-child">


			<img onClick={() => navigate(`/image/${image.id}`)} className="image" src={image.src}></img>

			<Container className="not-hover">
				<Row className="row">
					<Col className="on-top">
						<i onClick={() => {
							let elem = document.querySelector("heart fa fa-heart-o");
							elem.classList.toggle("fa-heart fa-heart-o");
						}} className="icon heart fa fa-heart-o"></i>
					</Col>
					<Col className="on-top">
						<i onClick={() => {
							let elem = document.querySelector("fa fa-long-arrow-up");
							elem.classList.toggle("outlined-arrow");
						}} className=" icon fa fa-long-arrow-up"></i>
						<span className="hover-clickable"> {image.upvotes} </span>
						<i onClick={() => {
							let elem = document.querySelector("fa fa-long-arrow-down");
							elem.classList.toggle("outlined-arrow");
						}} className=" icon fa fa-long-arrow-down"></i>
						<span className="hover-clickable"> {image.downvotes} </span>
					</Col>
				</Row>
			</Container>

		</figure>
	);
};