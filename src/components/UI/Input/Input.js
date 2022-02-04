import classes from './Input.module.css';

const Input = (props) => {
    return (
        <input className={classes.input} type={props.type} onChange={props.onChange} value={props.value} />
    );
};

export default Input;