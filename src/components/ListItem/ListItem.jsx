import React, { useContext, useState } from 'react';
import Button from '../../UI/Button/Button';
import cls from './ListItem.module.scss';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import Modal from '../../UI/Modal/Modal';

const ListItem = ({ item, openModal, setIsShowModal }) => {
  const { removeProduct: remove } = useContext(FirebaseContext);
  const [activeModal, setActiveModal] = useState(false);

  const onRemove = event => {
    event.stopPropagation();
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  const onConfirm = () => {
    remove(item.id);
    closeModal();
  };

  return (
    <>
      <li
        className={cls.item}
        onClick={() => {
          setIsShowModal(true);
          openModal(item);
        }}
      >
        <span>{item.name}</span>
        <span className={cls.btn_container}>
          <Button
            onClick={event => {
              event.stopPropagation();
              setIsShowModal(false);
              openModal(item);
            }}
          >
            Edit
          </Button>
          <Button onClick={onRemove}>Remove</Button>
        </span>
      </li>
      <Modal active={activeModal} setActive={setActiveModal}>
        <Button onClick={onConfirm}>Confirm</Button>
        <br />
        <Button onClick={closeModal}>Cancel</Button>
      </Modal>
    </>
  );
};

export default ListItem;
