import { FaShoppingCart } from 'react-icons/fa';
import classes from './CartInfo.module.css'

const CartInfo = () => {
    return (
        <div className={classes.cart}>
            <FaShoppingCart className={classes.icon} />
            Your Cart
            <div className={classes.amount}>2</div>
        </div>
    );
};

export default CartInfo;