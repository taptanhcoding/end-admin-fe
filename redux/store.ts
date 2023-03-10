import {configureStore } from '@reduxjs/toolkit'
import customer from './customer'
import products from './cart'

export default configureStore({
    reducer: {
        products,
        user: customer
    }
})