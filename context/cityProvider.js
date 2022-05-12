import React,{ createContext, useContext, useState, useEffect } from "react";

const CityContext = createContext()

const CityProvider = ({children}) => {

    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);

    const getCities = () => {
      return fetch("http://137.184.228.33:7000/api/cities")
        .then((response) => response.json())
        .then((json) => {
          setCities(json);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      getCities();
    }, []);


    return <CityContext.Provider value={{ city, setCity, cities, setCities }}>
        {children}
      </CityContext.Provider>
}

export const useCity = () => useContext(CityContext)

export default CityProvider
