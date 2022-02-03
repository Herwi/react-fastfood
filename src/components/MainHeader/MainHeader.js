import classes from './MainHeader.module.css';
import CartInfo from './CartInfo';

const MainHeader = () => {
    return (
        <header className={classes.header}>
            FastFood
            <CartInfo />
        </header>
    );
};

export default MainHeader;