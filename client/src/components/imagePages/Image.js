import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";



export const SingleImage = ({ image, publicId }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <Link to={`/imageDetails/${image.id}`}>
            <strong>{image.title}</strong>
        </Link>
        <img src={image.src}></img>
        {/* to display right after upload(?)
        <Image cloudName="dkndgz1ge" publicId={publicId}/> */}
        </CardBody>

    </Card>
  );
};