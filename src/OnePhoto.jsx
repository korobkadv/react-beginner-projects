import React from "react";

export const OnePhoto = ({ photoOnePost }) => {

  return (
    <div className="photoOnePost">
      <img src={photoOnePost.photos[0]} alt="Item" key={photoOnePost.photos[0]} />
      <img src={photoOnePost.photos[1]} alt="Item" key={photoOnePost.photos[1]} />
      <img src={photoOnePost.photos[2]} alt="Item" key={photoOnePost.photos[2]} />
      <img src={photoOnePost.photos[3]} alt="Item" key={photoOnePost.photos[3]} />
    </div>
  );
};
