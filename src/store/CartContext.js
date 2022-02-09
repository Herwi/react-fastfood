import React, { useEffect, useReducer } from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
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
            return { ...state, items: tmp, totalAmount: action.item.amount + state.totalAmount };
        case 'setItems':
            return { items: action.items, totalAmount: action.totalAmount, totalPrice: action.totalPrice };
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
                        return [...res, { ...i, amount: i.amount - action.amount }];
                    }
                }
                return [...res, i];
            }, []);
            return { ...state, items: tmp, totalAmount: state.totalAmount - toRemove };
        case 'calcTotalPrice':
            let totalPrice = 0;
            for (let i of state.items) {
                totalPrice += Math.round(+i.amount * +i.price * 100) / 100;
            }
            return { ...state, totalPrice: Math.round(totalPrice * 100) / 100 }
        default:
            throw new Error();
    }
};

export const CartContextProvider = (props) => {
    const [itemsList, dispatchItemsList] = useReducer(itemsListReducer, { items: [], totalAmount: 0, totalPrice: 0 });

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
            else localStorage.setItem('itemsList', '{ "items": [], "totalAmount": 0, "totalPrice": 0 }');
        } catch (e) {
            localStorage.setItem('itemsList', '{ "items": [], "totalAmount": 0, "totalPrice": 0 }');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('itemsList', JSON.stringify(itemsList));
    }, [itemsList]);

    useEffect(() => {
        dispatchItemsList({ type: 'calcTotalPrice' })
    }, [itemsList.totalAmount]);

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
            totalPrice: itemsList.totalPrice,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;