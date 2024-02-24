import React, {useState, useEffect} from 'react';
import {Text,TextInput,TouchableOpacity,SafeAreaView,StyleSheet,Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = 'd9f6c4ec519f4dfea6d191751242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  return (
    
    <SafeAreaView style={styles.container}>

      <View style={styles.containerImg}>
      <Image source={require('./assets/nube.png')}
        style={styles.image}/>
      </View>
      <Text style={styles.title}>Welcome to Weather App!</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your location"
        value={city}
        onChangeText={text => {
          setCity(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.weatherText}>Get Weather 🌡️</Text>
      </TouchableOpacity>
      {error && (
        <Text>{error}</Text>
      )}
      {weatherData && (
        <View style={styles.containerInf}>
          <Text style={styles.Inftext}>City: <Text style={styles.InftextOut}>{weatherData.location.name}</Text></Text>
          <Text style={styles.Inftext}>Temperature: <Text style={styles.InftextOut}>{weatherData.current.temp_c}</Text></Text>
          <Text style={styles.Inftext}>Description: <Text style={styles.InftextOut}>{weatherData.current.condition.text}</Text></Text>
        </View>
      )}
      
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 147, 165, 0.4)',
  },
  image:{
    height:250,
    width:300,
    opacity:0.8,
  },
  containerImg:{
    padding:30,
    top:-70,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    top:-40,
    bottom:20,
    fontSize: 28,
    fontWeight: 'bold',
    color:'white',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    top:-30,
    bottom:25,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 233, 233, 0.5)',
    borderColor:'rgba(255, 255, 255, 1)',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: '20%',
    color:'white',
    width: 250,
  },
  button: {
    backgroundColor: 'rgba(233, 233, 233, 0.5)',
    width: 250,
    height: 35,
    borderRadius: 5,
    borderColor:'rgba(255, 255, 255, 1)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
  },
  weatherText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  containerInf:{
    top:20,
    bottom:25,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 233, 233, 0.5)',
    borderColor:'rgba(255, 255, 255, 1)',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: '20%',
    color:'white',
    width: 250,
  },
  Inftext:{
    fontWeight: 'bold',
    color: 'rgba(245, 245, 245, 0.9)',
    fontSize: 20,
    textAlign: 'left',
  },
  InftextOut:{
    color: '#ffff',
    fontSize: 16,
    textAlign: 'right',
  }
});