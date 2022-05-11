import React, { useCallback } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { AddPhotoAlternate } from '@material-ui/icons';
import { storage } from '../../firebase';
import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = ({ setImages, images }) => {
  const classes = useStyles();

  const deleteImage = useCallback(
    async (id) => {
      const isConfirm = window.confirm('この画像を削除しますか？');
      if (isConfirm) {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        return storage.ref('images').child(id).delete();
      } else {
        return false;
      }
    },
    [setImages, images]
  );
  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files[0];
      let blob = new Blob([file], { type: 'image/jpeg' });
      const S = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
      const N = 16;
      const filename = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      const uploadRef = storage.ref('images').child(filename);
      const uplaodTask = uploadRef.put(blob);
      uplaodTask
        .then(() => {
          uplaodTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = { id: filename, path: downloadURL };
            setImages((prevState) => [...prevState, newImage]);
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    [setImages]
  );

  return (
    <div>
      <div className={'p-grid__list-images'}>
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview
              key={image.id}
              id={image.id}
              path={image.path}
              deleteImage={deleteImage}
            />
          ))}
      </div>
      <div className={'u-text-right'}>
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternate />
            <input
              className={'u-display-none'}
              type='file'
              id='image'
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
