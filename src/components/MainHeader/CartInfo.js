import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import classes from './CartInfo.module.css'
import CartContext from '../../store/CartContext';

const CartInfo = () => {
    const cartCtx = useContext(CartContext);
    return (
        <div className={classes.cart}>
            <FaShoppingCart className={classes.icon} />
            <div className={classes.cartLabel}>Your Cart</div>
            <div className={classes.amount}>{cartCtx.totalAmount}</div>
        </div>
    );
};

export default CartInfo;