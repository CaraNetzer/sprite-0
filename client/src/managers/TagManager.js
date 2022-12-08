import React from 'react';

const baseUrl = '/api/tag';

export const getAllTags = () => {
    return fetch(baseUrl)
        .then((res) => res.json());
};

export const getById = (id) => {  //http GET by id parameter 
    return fetch(`https://localhost:5001/api/tag/${id}`)
        .then((res) => res.json());
};

export const addTag = (tag) => {
    return fetch(`https://localhost:5001/api/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((res) => res.json());
};
export const addImageTag = (imageTag) => {
    return fetch(`https://localhost:5001/api/tag/AddImageTag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageTag),
      }).then((res) => res.json());
};

export const deleteTag = (id) => {
    return fetch(`https://localhost:5001/api/tag/${id}`, {
      method: "DELETE"
    })
  };

  export const editTag = (tag) => {
    return fetch(`https://localhost:5001/api/tag/${tag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((res) => res.json())
};
