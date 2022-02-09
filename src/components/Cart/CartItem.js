import classes from './CartItem.module.css';
import Button from '../UI/Button/Button';

const CartItem = props => {
    const onAddHandler = () => {
        props.onAdd({ id: props.id, amount: 1 });
    }
    const onRemoveHandler = () => {
        props.onRemove(props.id, 1);
    }
    return (
        <div className={classes.meal}>
            <div className={classes.boxLeft}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.price}>
                    ${props.price}
                    <div className={classes.amount}>x {props.amount}</div>
                </div>
            </div>
            <div className={classes.boxRight}>
                <div className={classes.button}>
                    <Button text="-" inline={true} onClick={onRemoveHandler} />
                    <Button text="+" inline={true} onClick={onAddHandler} />
                </div>
            </div>
        </div>
    );
};

export default CartItem;