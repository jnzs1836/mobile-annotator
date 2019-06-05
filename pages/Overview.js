import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class Overview extends Component {

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
          <Button
            containerStyle={styles.annotateOne}
            onPress={()=>{this.props.navigation.navigate("Annotating")}}
            title="开始记录"
          >

          </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    annotateOne: {
        width:"100%",
        height:100,
    }
})