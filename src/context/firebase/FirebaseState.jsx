import React, { useReducer } from 'react';
import { FirebaseContext } from './firebaseContext';
import { firebaseReducer } from './firebaseReducer';
import axios from 'axios';

const url =
  'https://shopapp-7ffc8-default-rtdb.europe-west1.firebasedatabase.app';

const FirebaseState = ({ children }) => {
  const initialState = {
    products: []
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const createProduct = async product => {
    await axios.put(`${url}/products/${product.id}.json`, product);
    dispatch({ type: 'CREATE', payload: product });
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${url}/products.json`);
    if (res.data) {
      const payload = Object.keys(res.data).map(key => res.data[key]);
      dispatch({ type: 'FETCH', payload });
    }
  };

  const removeProduct = async id => {
    await axios.delete(`${url}/products/${id}.json`);
    dispatch({
      type: 'REMOVE',
      payload: id
    });
  };

  const updateProduct = async product => {
    await axios.put(`${url}/products/${product.id}.json`, product);
    dispatch({
      type: 'UPDATE',
      payload: product
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        createProduct,
        fetchProducts,
        removeProduct,
        updateProduct,
        products: state.products
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
