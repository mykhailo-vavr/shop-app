import React, { useContext, useState } from 'react';
import Input from '../../UI/Input/Input';
import cls from './Form.module.scss';
import Button from '../../UI/Button/Button';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import Modal from '../../UI/Modal/Modal';
import Product from '../../Product/Product';

const Form = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [product, setProduct] = useState({});
  const { createProduct: create } = useContext(FirebaseContext);
  const properties = Product.PROPERTIES;

  const onConfirm = event => {
    event.preventDefault();

    for (const prop of properties) {
      if (product[prop] === undefined) return;
    }
    create(new Product(product));
    setProduct({});
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

  return (
    <>
      <Button onClick={() => setActiveModal(true)}>
        Add product
      </Button>
      <Modal active={activeModal} setActive={setActiveModal}>
        <div className={cls.form}>
          {properties.map((prop, i) => (
            <Input
              key={i}
              placeholder={`${prop}`}
              value={product[prop] || ''}
              onChange={changeProperty.bind(null, prop)}
            />
          ))}

          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
};

export default Form;
