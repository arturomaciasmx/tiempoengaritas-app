import { configureStore } from "@reduxjs/toolkit";
import citiesRecucer from "./citiesSlice";
import portsReducer from "./portsSlice";

export default configureStore({
  reducer: {
    cities: citiesRecucer,
    ports: portsReducer,
  }
})