import MainHeader from './components/MainHeader/MainHeader';
import Modal from './components/UI/Modal/Modal';
import Card from './components/UI/Card/Card';
import MealsList from './components/MealsList/MealsList';

const App = () => {
  return (
    <>
      <MainHeader />
      <Modal onClose={() => {
        console.log("onClose");
      }}>Modal content</Modal>
      <Card topMargin={true} dark={true} small={true}>
        <h1>Delicious food, delivered to you</h1>
        <center>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</center>
      </Card>
      <MealsList />
    </>
  );
}

export default App;
