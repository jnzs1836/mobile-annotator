/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './reducers/index'
// Import pages
import Login from './pages/Login'
import Overview from './pages/Overview'
import Annotation from './pages/Annotation'


import {createStackNavigator, createAppContainer} from 'react-navigation';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


// Create a navigator
const MainNavigator = createStackNavigator({
    Annotating: {screen: Annotation},
    Login: {screen: Login},
    Home: {screen: Overview},

});

const AppNavigator = createAppContainer(MainNavigator)
const store = createStore(combineReducers);

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // ...
  }

  render() {
    return (
      <Provider store={ store }>
        <AppNavigator
        />
      </Provider>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
