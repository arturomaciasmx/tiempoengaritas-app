import { configureStore } from "@reduxjs/toolkit";
import citiesRecucer from "./citiesSlice";
import portsReducer from "./portsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cities: citiesRecucer,
    ports: portsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch