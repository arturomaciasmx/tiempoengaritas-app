import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPorts = createAsyncThunk('ports/fetchPorts', async(city) => {
  const response = await fetch("http://137.184.228.33:7000/api/" + city)
      .then((response) => response.json())
      .catch((error) => {
        console.error("error: " + error);
      });
  return response
})

const portsSlice = createSlice({
  name: "ports",
  initialState: {
    ports: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPorts.fulfilled, (state, action) => {
      state.ports = action.payload
    })
  }
})

export const ports = (state) => state.ports.ports

export default portsSlice.reducer