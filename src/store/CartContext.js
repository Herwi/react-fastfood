import React, { useEffect, useReducer } from 'react';

const CartContext = React.createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id, amount) => { }
});

const itemsListReducer = (state, action) => {
    let tmp = null;
    switch (action.type) {
        case 'addItem':
            tmp = [...state];
            let index = null;
            if (tmp.some((i, ind) => {
                if (i.id === action.item.id) {
                    index = ind;
                    return true;
                }
                return false;
            })) {
                tmp[index].amount += action.item.amount;
            }
            else tmp.push(action.item);
            localStorage.setItem('itemsList', JSON.stringify(tmp));
            return tmp;
        case 'setItems':
            return action.items;
        case 'removeItem':
            tmp = state.reduce((res, i) => {
                if (i.id === action.id) {
                    return action.amount >= i.amount ? res : res.push({ ...i, amount: i.amount - action.amount });
                }
                return res.push(i);
            });
            return tmp;
        default:
            throw new Error();
    }
};

export const CartContextProvider = (props) => {
    const [itemsList, dispatchItemsList] = useReducer(itemsListReducer, []);

    let jsonItems = JSON.stringify(itemsList);

    useEffect(() => {
        try {
            const storedItemsList = JSON.parse(localStorage.getItem('itemsList'));
            if (Array.isArray(storedItemsList)) {
                dispatchItemsList({ type: 'setItems', items: storedItemsList });
            }
            else localStorage.setItem('itemsList', '[]');
        } catch (e) {
            localStorage.setItem('itemsList', '[]');
        }
    }, []);

    useEffect(() => {
        console.log('save to localStorage')
        localStorage.setItem('itemsList', jsonItems);
    }, [jsonItems, itemsList]);

    const addItemHandler = (item) => {
        dispatchItemsList({ type: 'addItem', item })
    };

    const removeItemHandler = (id, amount) => {
        dispatchItemsList({ type: 'removeItem', id, amount })
    };

    return (
        <CartContext.Provider value={{
            items: itemsList,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;