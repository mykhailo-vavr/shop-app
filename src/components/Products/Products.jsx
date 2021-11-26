import React, { useContext, useEffect, useState } from 'react';
import List from '../List/List';
import cls from './Products.module.scss';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import Select from '../../UI/Select/Select';

const Products = () => {
  const { products, fetchProducts } = useContext(FirebaseContext);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const options = [
    {
      value: 'name',
      title: 'By name'
    },
    {
      value: 'count',
      title: 'By count'
    }
  ];

  const [sortQuery, setSortQuery] = useState('name');

  const sortedProducts = sortQuery => {
    return [...products].sort((a, b) => {
      if (!isNaN(+a[sortQuery])) {
        return +b[sortQuery] - +a[sortQuery];
      }

      return a[sortQuery].localeCompare(b[sortQuery]);
    });
  };

  return (
    <div className={cls.wrapper}>
      <Select
        options={options}
        defaultOption="Sort by..."
        value={sortQuery}
        onChange={query => setSortQuery(query)}
      />
      <List products={sortedProducts(sortQuery)} />
    </div>
  );
};

export default Products;
