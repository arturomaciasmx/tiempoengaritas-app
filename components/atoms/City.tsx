import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../src/app/hooks";
import { setCurrentCity } from "../../src/redux/citiesSlice";

const City = (props) => {    
    const dispatch = useAppDispatch();
    const _storeCity = async (city) => {
      try {
        await AsyncStorage.setItem("@city", city);
        dispatch(setCurrentCity(city));
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };
  
    return props.city.ciudades.map((ciudad, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
            _storeCity(ciudad.slug);
            if (props.toggleOverlay) props.toggleOverlay();
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 15, color: "#505050" }}>
          {ciudad.name}
        </Text>
      </TouchableOpacity>
    ));
  };

  export default City