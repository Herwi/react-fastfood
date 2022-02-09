import { useContext } from 'react';
import Modal from "../UI/Modal/Modal";
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    let cartList = cartCtx.items.map(i =>
        <CartItem
            key={i.id}
            name={i.name}
            price={i.price}
            id={i.id}
            amount={i.amount}
            onAdd={cartCtx.addItem}
            onRemove={cartCtx.removeItem}
        />
    );
    if (cartCtx.items.length === 0) {
        cartList = "No items in shopping cart.";
    }

    return (
        <Modal onClose={props.onClose}>
            {cartList}
            <div className={classes.summary}>
                <div>Total Price</div>
                <div className={classes.boxRight}>${cartCtx.totalPrice}</div>
            </div>
        </Modal>
    );
};

export default Cart;