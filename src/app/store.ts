import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import yogaSlice from "../features/yoga/yogaSlice";

export const store = configureStore({
  reducer: {
    yogaSlice: yogaSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
