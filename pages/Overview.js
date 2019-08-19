import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, ScrollView, FlatList} from 'react-native';
import { Input, Button, ListItem, Divider } from 'react-native-elements';
import {connect} from 'react-redux';
import {
    addOneInTable1,
    backToSettingUp,
    initTableOne,
    setMetaDataItem,
    setUpTable
} from "../actions/annotatingTable1";




class Overview extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {


        let keyExtractor = (item, index) => index.toString()

      const renderItem = ({ item }) => (
          <ListItem
                          title={item.name}
                          subtitle={item.date}
                          bottomDivider={true}
                          onPress={()=>{this.props.navigation.navigate('Home', {
                              'matchId': item.id,
                          })}}

                      />
          )

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
          <Divider/>
          <FlatList
              keyExtractor={keyExtractor}
              data={this.props.matches}
              renderItem={renderItem}
          />


      </View>
    );
  }
};



function mapStateToProps(state) {
  return {
      matches: state.annotationList.list,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)

const styles = StyleSheet.create({
    annotateOne: {
        width:"100%",
        height:100,
    },
    item:{

    }
})