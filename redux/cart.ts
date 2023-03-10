import {createSlice,PayloadAction} from '@reduxjs/toolkit'

const products = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        update: (state:Array<object>,action:PayloadAction<{data:object}>):any => {
            if(state.length == 0) {
                return [action.payload.data]
            }
        },
        
    }
})

export const {} = products.actions

export default products.reducer