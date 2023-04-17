import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productInOrder } from "../configs/product";

type stateOrder = Array<productInOrder>;
type actionType = PayloadAction<{
  data: productInOrder;
  quanity? :number
}>;
const products = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    add: (state: stateOrder, action: actionType): any => {
      return action.payload?.data;
    },
    update: (state: stateOrder, action: actionType): any => {
      if (state.length == 0) {
        return [action.payload?.data];
      } else {
        if (
          state.find(
            (pr) =>
              pr?.productCode == action?.payload?.data?.productCode &&
              pr?.option?.color == action.payload?.data?.option?.color
          )
        ) {
          return state.forEach((pr) => {
            if (
              pr?.productCode == action.payload?.data?.productCode &&
              pr?.option?.color == action?.payload?.data?.option?.color
            ) {
              pr.option.quanity += action?.payload?.data?.option?.quanity;
            }
          });

          //   return [...state,action.payload.data];
        } else {
          return [...state, action.payload?.data];
        }
      }
    },
    updateFromCart: (state: stateOrder, action: actionType): any => {
      if (state.length == 0) {
        return [];
      } else {
        if (
          state.find(
            (pr) =>
              pr?.productCode == action?.payload?.data?.productCode &&
              pr?.option?.color == action.payload?.data?.option?.color
          )
        ) {
          if (action?.payload?.quanity === 0)
            return state.filter(
              (pr) =>
                pr?.productCode !== action?.payload?.data?.productCode &&
                pr?.option?.color !== action.payload?.data?.option?.color
            );
          else {
            return state.forEach((pr) => {
              if (
                pr?.productCode == action.payload?.data?.productCode &&
                pr?.option?.color == action?.payload?.data?.option?.color
              ) {
                pr.option.quanity = action?.payload?.quanity;
              }
            });
          }

          //   return [...state,action.payload.data];
        } else {
          return [...state, action.payload?.data];
        }
      }
    },
    deleteOne: (state: stateOrder, action: actionType): any => {
      return state.filter(
        (pr) =>
          pr.option?.color !== action.payload?.data?.option?.color &&
          pr?.productCode !== action.payload?.data?.productCode
      );
    },
    deleteAll: (state: stateOrder): any => {
      return [];
    },
  },
});

export const { add, update, updateFromCart, deleteOne, deleteAll } =
  products.actions;

export default products.reducer;
