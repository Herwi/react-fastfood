import React, { useEffect, useReducer } from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id, amount) => { }
});

const itemsListReducer = (state, action) => {
    let tmp = state.items;
    switch (action.type) {
        case 'addItem':
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
            return { items: tmp, totalAmount: action.item.amount + state.totalAmount };
        case 'setItems':
            return { items: action.items, totalAmount: action.totalAmount };
        case 'removeItem':
            let toRemove = 0;
            tmp = state.items.reduce((res, i) => {
                if (i.id === action.id) {
                    if (action.amount >= i.amount) {
                        toRemove = i.amount;
                        return res;
                    }
                    else {
                        toRemove = action.amount;
                        return res.push({ ...i, amount: i.amount - action.amount });
                    }
                }
                return res.push(i);
            });
            return { items: tmp, totalAmount: state.totalAmount - toRemove };
        default:
            throw new Error();
    }
};

export const CartContextProvider = (props) => {
    const [itemsList, dispatchItemsList] = useReducer(itemsListReducer, { items: [], totalAmount: 0 });

    useEffect(() => {
        try {
            const storedItemsList = JSON.parse(localStorage.getItem('itemsList'));
            if (storedItemsList.items && Array.isArray(storedItemsList.items)) {
                dispatchItemsList({
                    type: 'setItems',
                    items: storedItemsList.items,
                    totalAmount: storedItemsList.totalAmount
                });
            }
            else localStorage.setItem('itemsList', '{ "items": [], "totalAmount": 0 }');
        } catch (e) {
            localStorage.setItem('itemsList', '{ "items": [], "totalAmount": 0 }');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('itemsList', JSON.stringify(itemsList));
    }, [itemsList]);

    const addItemHandler = (item) => {
        dispatchItemsList({ type: 'addItem', item })
    };

    const removeItemHandler = (id, amount) => {
        dispatchItemsList({ type: 'removeItem', id, amount })
    };

    return (
        <CartContext.Provider value={{
            items: itemsList.items,
            totalAmount: itemsList.totalAmount,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;