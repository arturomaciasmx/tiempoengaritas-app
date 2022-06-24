import {createAsyncThunk ,createSlice} from "@reduxjs/toolkit"

export const fetchCities = createAsyncThunk('cities/fetchCities', async() => {
  const response = await fetch('http://137.184.228.33:7000/api/cities/')
    .then(response => response.json());
    return response
})

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    currentCity: null,
    cities: [],
  },
  reducers: {
    setCurrentCity(state, action) {
      console.log(action.payload);
      // state.currentCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload
    })
  }
})

export const cities = (state) =>  state.cities.cities

export default citiesSlice.reducer
