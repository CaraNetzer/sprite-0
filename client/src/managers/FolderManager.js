import React from 'react';

const baseUrl = '/api/folder';



export const getById = (id) => {
  return fetch(`https://localhost:5001/api/folder/${id}`)
    .then((res) => res.json());
};


export const addFolderImage = (folderImage) => {
  return fetch(`https://localhost:5001/api/folder/AddFolderImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folderImage),
  }).then((res) => res.json());
};

export const removeFolderImage = (folderImage) => {
  return fetch(`https://localhost:5001/api/folder/removeFolderImage`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folderImage),
  })
}

export const getFolderImage = (imageId) => {
  return fetch(`https://localhost:5001/api/tag/GetFolderImages?imageId=${imageId}`)
    .then((res) => res.json());
};