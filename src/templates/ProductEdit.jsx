import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImageArea, SetSizesArea } from '../components/Products';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [name, setName] = useState(''),
    [desctiption, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [price, setPrice] = useState(''),
    [images, setImages] = useState(''),
    [sizes, setSizes] = useState([]);

  console.log(productId);

  const inputName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (e) => {
      setPrice(e.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'bottoms', name: 'ボトムス' },
    { id: 'shrits', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
  ];

  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'mens', name: 'メンズ' },
    { id: 'ladies', name: 'レディース' },
  ];

  useEffect(() => {
    if (productId) {
      db.collection('products')
        .doc(productId)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          const {
            images,
            name,
            description,
            category,
            gender,
            price,
            sizes = [],
          } = data;
          setImages(images);
          setName(name);
          setDescription(description);
          setCategory(category);
          setGender(gender);
          setPrice(price);
          setSizes(sizes);
        });
    }
  }, [productId]);

  return (
    <section>
      <h2 className={'u-text__headline u-text-center'}>商品の登録・編集</h2>
      <div className={'c-section-container'}>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          label={'商品名'}
          required={true}
          value={name}
          onChange={inputName}
        />
        <TextInput
          label={'商品説明'}
          required={true}
          multiline={true}
          value={desctiption}
          rows={5}
          onChange={inputDescription}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          select={setCategory}
          options={categories}
          value={category}
        />
        <SelectBox
          label={'タイプ'}
          required={true}
          select={setGender}
          options={genders}
          value={gender}
        />
        <TextInput
          label={'価格'}
          required={true}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
        <div className={'module-spacer--small'} />
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className={'module-spacer--small'} />
        <div className={'center'}>
          <PrimaryButton
            label={'商品情報を登録'}
            onClick={() =>
              dispatch(
                saveProduct(
                  productId,
                  name,
                  desctiption,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
