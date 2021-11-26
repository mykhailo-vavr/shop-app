import React from 'react';
import Container from '../Container/Container';
import cls from './Header.module.scss';

const Header = () => {
  return (
    <div className={cls.header}>
      <Container>
        <h1 className={cls.title}>ShopApp</h1>
      </Container>
    </div>
  );
};

export default Header;
