import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CityContext = createContext()

const CityProvider = ({children}) => {

    const [city, setCity] = useState(null);

    const getSoredCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem("@city");
        if (storedCity !== null) {
          setCity(storedCity);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    // const getSoredCity = () => {
    //     const storedCity = AsyncStorage.getItem("@city");
    //     if (storedCity !== null) {
    //       setCity(storedCity);
    //     }
    // };

    useEffect(() => {
        getSoredCity();
    }, [city]);

    return (
      <CityContext.Provider value={{ city, setCity }}>
        {children}
      </CityContext.Provider>
    );
}

export const useCity = () => useContext(CityContext)

export default CityProvider
