import classes from './Meal.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const Meal = (props) => {
    return (
        <div key={props.id} className={classes.meal}>
            <div className={classes.boxLeft}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${props.price}</div>
            </div>
            <div className={classes.boxRight}>
                <div className={classes.amount}>
                    Amount <Input type="number" value="1" />
                </div>
                <div className={classes.button}><Button text="+ Add" /></div>
            </div>
        </div>
    );
};

export default Meal;