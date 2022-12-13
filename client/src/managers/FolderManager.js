import React from 'react';

const baseUrl = '/api/folder';



export const getFoldersByUser = (userId) => {
  return fetch(`https://localhost:5001/api/folder/GetByUser?userId=${userId}`)
    .then((res) => res.json());
};


export const addImageToFolder = (folderImage) => {
  return fetch(`https://localhost:5001/api/folder/AddToImageFolder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folderImage),
  })
};

export const removeImageFromFolder = (folderImage) => {
  return fetch(`https://localhost:5001/api/folder/RemoveFromImageFolder`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folderImage),
  })
}

export const getImageFolders = (imageId) => {
  return fetch(`https://localhost:5001/api/folder/GetImageFolders?imageId=${imageId}`)
    .then((res) => res.json());
};

export const getFolderImages = (folderId) => {
  return fetch(`https://localhost:5001/api/folder/GetFolderImages?folderId=${folderId}`)
    .then((res) => res.json());
};