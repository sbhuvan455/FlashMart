import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: {},
    quantity: 0,
    price: 0
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { _id, name, price, quantity, images, qty } = action.payload;

            if(state.items[_id]){
                state.items[_id].qty++;
                state.price += price;
                state.quantity++;
            }else{
                state.items[_id] = {
                    name,
                    price,
                    quantity,
                    images,
                    qty,
                }
                state.price += price;
                state.quantity++;
            }

        },
        removeItem: (state, action) => {
            const { _id, price, qty } = action.payload;

            if(qty > 0){
                state.items[_id].qty--;
                state.price -= price;
                state.quantity--;
            }else{
                delete state.items[_id];
                state.quantity--;
                state.price -= price;
            }
        },
        clearCart: (state) => {
            state.items = {};
            quantity = 0;
            price = 0;
        }
    }
})


export const {
    addItem,
    removeItem,
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer