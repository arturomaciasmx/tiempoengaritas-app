import {createAsyncThunk ,createSlice} from "@reduxjs/toolkit"

export const fetchCities = createAsyncThunk('cities/fetchCities', async() => {
  try {
    const response = await fetch('http://137.184.228.33:7000/api/cities/')
    .then(response => response.json());
    return response;
  } catch (e) {
    console.log('error');
    console.log(e);
  }
})

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    currentCity: null,
    cities: [],
  },
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload
    })
  }
})

export const {setCurrentCity} = citiesSlice.actions

export const cities = (state) =>  state.cities.cities
export const currentCity = (state) => state.cities.currentCity

export default citiesSlice.reducer
