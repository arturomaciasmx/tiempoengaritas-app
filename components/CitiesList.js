import CITIES from '../data/cities'
import { View, ScrollView, TouchableOpacity, Text} from 'react-native'

const CitiesList = ({setCity, toggleOverlay}) => {
  return (
    <View style={{ height: 400, width: 300 }}>
      <ScrollView>
        {CITIES.map((city, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCity(city.name)
              toggleOverlay()
            }}
          >
            <Text
              key={index}
              style={{
                fontSize: 18,
                paddingVertical: 10,
                textTransform: "capitalize",
              }}
            >
              {city.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CitiesList;
