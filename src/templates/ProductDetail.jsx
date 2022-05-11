import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { returnCodeToBr } from '../utils';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 34,
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products')
      .doc(productId)
      .get()
      .then((doc) => {
        console.log(doc);
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  return (
    <section className={'c-section-wrapin'}>
      {product && (
        <div className={'p-grid__row'}>
          <div className={classes.sliderBox}></div>
          <div className={classes.detail}>
            <h2 className={'u-text__headline'}>{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className={'module-spacer--small'} />
            <div className={'module-spacer--small'} />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
