import Products from '../Products/Products';
import Container from '../Container/Container';
import Form from '../Form/Form';
import cls from './Main.module.scss';

const Main = () => {
  return (
    <div className={cls.main}>
      <Container>
        <Form />
        <Products />
      </Container>
    </div>
  );
};

export default Main;
