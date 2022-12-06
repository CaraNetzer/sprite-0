import React from "react";

const baseUrl = '/api/Image';

export const getAllImages = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const getImage = (id) => {
    return fetch(`/api/Image/${id}`)
      .then((res) => res.json());
};

export const getUserImagesById = (userId) => {
  return fetch(`/api/post/getUserImagesById?id=${userId}`)
    .then((res) => res.json());
}

export const addImage = (image) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(image)
  });
};

export const deleteImage = (id) => {
  return fetch(`/api/image/${id}`, {
      method: "DELETE"
    })
};

export const editImage = (image) => {
  return fetch(`/api/image/${image.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });
};