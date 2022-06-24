import { configureStore } from "@reduxjs/toolkit";
import citiesRecucer from "./citiesSlice";

export default configureStore({
  reducer: {
    cities: citiesRecucer 
  }
})