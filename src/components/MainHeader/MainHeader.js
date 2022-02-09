import { useState } from 'react';
import Cart from '../Cart/Cart';
import classes from './MainHeader.module.css';
import CartInfo from './CartInfo';

const MainHeader = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const onCloseCartHandler = () => {
        setModalVisible(false);
    };
    const onOpelCartHandler = () => {
        setModalVisible(true);
    };
    return (
        <>
            {modalVisible ? <Cart onClose={onCloseCartHandler} /> : ''}
            <header className={classes.header}>
                FastFood
            <CartInfo onClick={onOpelCartHandler}/>
            </header>
        </>
    );
};

export default MainHeader;