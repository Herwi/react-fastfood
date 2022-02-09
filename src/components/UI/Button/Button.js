import classes from './Button.module.css';

const Button = props => {
    let className = classes.button;
    if(props.inline) {
        className += " " + classes.inline;
    }
    return (
        <button className={className} onClick={props.onClick}>{props.text}</button>
    );
};

export default Button;