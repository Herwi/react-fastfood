import MainHeader from './components/MainHeader/MainHeader';
import Card from './components/UI/Card/Card';
import MealsList from './components/MealsList/MealsList';

const App = () => {
  return (
    <>
      <MainHeader />
      <Card topMargin={true} dark={true} small={true}>
        <h1>Delicious food, delivered to you</h1>
        <center>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</center>
      </Card>
      <MealsList />
    </>
  );
}

export default App;
