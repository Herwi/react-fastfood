import classes from './Card.module.css';

const Card = (props) => {
    let styles = classes.card;
    styles += props.topMargin ? ' ' + classes.topMargin : '';
    styles += props.dark ? ' ' + classes.dark : '';
    styles += props.small ? ' ' + classes.small : '';

    return (
        <div className={styles}>
            {props.children}
        </div>
    );
};

export default Card;