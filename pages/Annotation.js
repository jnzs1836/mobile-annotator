import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AnnotationSettingUp from '../components/AnnotationSettingUp'


export default class Annotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}>
          <AnnotationSettingUp/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    annotateOne: {

    }
})