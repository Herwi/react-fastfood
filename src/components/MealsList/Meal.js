import { useContext, useState } from 'react';
import CartContext from '../../store/CartContext';

import classes from './Meal.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const Meal = (props) => {
    const cartCtx = useContext(CartContext);
    const [amount, setAmount] = useState(1);

    const onAmountChangeHandler = event => {
        setAmount(event.target.value);
    };

    const onAddItemHandler = () => {
        cartCtx.addItem({id: props.id, name: props.name, amount: parseInt(amount), description: props.description, price: props.price})
    };

    return (
        <div key={props.id} className={classes.meal}>
            <div className={classes.boxLeft}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${props.price}</div>
            </div>
            <div className={classes.boxRight}>
                <div className={classes.amount}>
                    Amount <Input type="number" value={amount} onChange={onAmountChangeHandler} />
                </div>
                <div className={classes.button}>
                    <Button text="+ Add" onClick={onAddItemHandler} />
                </div>
            </div>
        </div>
    );
};

export default Meal;