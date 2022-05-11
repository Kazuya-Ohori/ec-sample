import React from 'react';

const ImagePreview = ({ deleteImage, id, path }) => {
  return (
    <div className={'p-media__thumb'} onClick={() => deleteImage(id)}>
      <img alt='プレビュー画像' src={path} />
    </div>
  );
};

export default ImagePreview;
