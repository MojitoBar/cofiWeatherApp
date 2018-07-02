import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from "./weather";

const API_KEY = "b719e4ef6551206d836fbb0812901195";


export default class App extends Component {
  state = {
    isLoaded: false,
    error: null
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: error
        })
      }
    )
  }

  _getWeather = (lat, long) => {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}")
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
  }

  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style = {styles.container}>
        {isLoaded ? (
          <Weather/>
        ) : (
          <View style = {styles.loading}>
            <Text style = {styles.loadingText}>Getting the fucking weather</Text>
            {error ? <Text style = {styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  loadingText:{
    fontSize: 38,
    marginBottom: 24
  }
});
