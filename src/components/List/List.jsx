import React, { useContext, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import cls from './List.module.scss';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import Product from '../../Product/Product';

const List = ({ products }) => {
  const { updateProduct: update } = useContext(FirebaseContext);
  const [activeModal, setActiveModal] = useState(false);
  const [isShowModal, setIsShowModal] = useState(true);
  const [product, setProduct] = useState({});
  const properties = Product.PROPERTIES;

  const onConfirm = event => {
    event.preventDefault();

    for (const prop of properties) {
      if (product[prop] === undefined) return;
    }
    update(product);
    setActiveModal(false);
  };

  const onCancel = () => {
    setProduct({});
    setActiveModal(false);
  };

  const changeProperty = (prop, event) => {
    setProduct({
      ...product,
      [prop]: event.target.value
    });
  };

  const openModal = item => {
    setProduct(item);
    setActiveModal(true);
  };
  return (
    <>
      <ul className={cls.list}>
        {products.length ? (
          products.map(item => {
            return (
              <ListItem
                item={item}
                key={Date.now() * Math.random() * Math.random()}
                openModal={openModal}
                setIsShowModal={setIsShowModal}
              />
            );
          })
        ) : (
          <span>There are no products...</span>
        )}
      </ul>

      <Modal active={activeModal} setActive={setActiveModal}>
        {isShowModal ? (
          Product.PROPERTIES.map(prop => (
            <span key={Date.now() * Math.random()}>
              <h4>{prop}</h4>
              <p>{product[prop]}</p>
              <br />
            </span>
          ))
        ) : (
          <>
            {properties.map((prop, i) => (
              <>
                <Input
                  key={i}
                  placeholder={`${prop}`}
                  value={product[prop] || ''}
                  onChange={changeProperty.bind(null, prop)}
                />
                <br />
              </>
            ))}
            <Button onClick={onConfirm}>Confirm</Button>
            <br />
            <Button onClick={onCancel}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default List;
