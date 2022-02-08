import Card from '../Card/Card';

import classes from './Modal.module.css';

const Modal = props => {
    const stopPropagation = e => {
        e.stopPropagation();
    };
    return (
        <div className={classes.modalBg} onClick={props.onClose}>
            <div className={classes.modalContent} onClick={stopPropagation}>
                <Card>
                    {props.children}
                </Card>
            </div>
        </div>
    );
};

export default Modal;