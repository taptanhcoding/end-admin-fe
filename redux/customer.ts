import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userData, userState } from "../configs/user";


interface actionType {
    data: userData
}

const customer = createSlice({
    name: 'user',
    initialState: {
        data: {},
        isLogin: false
    },
    reducers: {
        login: (state:userState,action:PayloadAction< actionType>):any => {
            return ({
                data: action.payload.data,
                isLogin: true
            })
        },
        logout: (state:userState):any => {
            return ({
                data: {},
                isLogin: false
            })
        },
        update: (state:userState,action:PayloadAction< actionType>):any => {
        }

    }
})


export const  {login,logout,update} = customer.actions
export default customer.reducer