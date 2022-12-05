import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Image = ({ image }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <Link to={`/imageDetails/${image.id}`}>
            <strong>{image.title}</strong>
        </Link>
        <Image cloudName="dkndgz1ge" publicId={image.imageLocation}/>
        </CardBody>

    </Card>
  );
};