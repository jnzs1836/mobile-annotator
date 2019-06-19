import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, Modal, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AnnotationSettingUp from '../components/AnnotationSettingUp'
import AnnotationTableSingle1 from '../components/AnnotationTableSingle1'
import AnnotationTableDouble1 from '../components/AnnotationTableDouble1'
import {
    addOneInTable1,
    backToSettingUp,
    initTableOne,
    setMetaDataItem,
    setUpTable
} from "../actions/annotatingTable1";
import { connect } from "react-redux";
import { submitAnnotation } from "../api";

class Annotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {

        const _isSingleGame = (entry) => {
        if(entry === 'single-man' ||
            entry === 'single-woman' ||
            entry === 'single-man-in-team' ||
            entry === 'single-woman-in-team'
        ){
            return true;
        }else{
            return false;
        }
    }


        // Left button on the bottom
        const _back = (event)=>{
            if( this.props.status === "ANNOTATING"){
                this.props.backToSettingUp();
            }else{
                this.props.navigation.back();
            }
        };

        // Right button on the bottom
        const _step = (event) => {
            if( this.props.status === "ANNOTATING" ){
                if(submitAnnotation({})){
                    alert("Save Successful")
                    this.props.navigation.navigate('Home')
                }else{
                    alert("something wrong")
                }
            }else{
                this.props.submitSettingUp();
            }

        };
        const modalContent =
            //
            this.props.status !== "ANNOTATING"? (<AnnotationSettingUp data={this.props.metaData} set={this.props.setMetaDataItem}/>):

                _isSingleGame(this.props.metaData.entry)?

                (
                    <AnnotationTableSingle1
                        initTable={this.props.initTableOne}
                        addOne={this.props.mutateTableOne}
                        navigation={this.props.navigation}
                        tableData={ this.props.tableOneData}
                    />
                    ):
                    (
                      <AnnotationTableDouble1
                        initTable={this.props.initTableOne}
                        addOne={this.props.mutateTableOne}
                        navigation={this.props.navigation}
                        tableData={ this.props.tableOneData}
                    />
                    )

    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}>
          {modalContent}
          <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.bottomBtnView} onPress={() => _back()}>
                      <View >
                          <Text style={styles.bottomBtnText}>返回</Text>
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.bottomBtnView} onPress={() => _step()}>
                      <View >
                          <Text style={styles.bottomBtnText}>确认</Text>
                      </View>
                  </TouchableOpacity>
          </View>

      </View>
    );
  }
};


function mapStateToProps(state) {
  return {
      metaData: state.annotatingTable1.metaData,
      tableOneData: state.annotatingTable1.tableData,
      status: state.annotatingTable1.status,
  }
}

function mapDispatchToProps(dispatch) {
  return {
      initTableOne: () => dispatch(initTableOne()),
      mutateTableOne: (key) => dispatch(addOneInTable1(key)),
      submitSettingUp: (settings) => dispatch(setUpTable(settings)),
      backToSettingUp: ()=>dispatch(backToSettingUp()),
      setMetaDataItem: (item)=>dispatch(setMetaDataItem(item))

  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Annotation)


const styles = StyleSheet.create({
    annotateOne: {

    },
    buttonGroup: {
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 0,
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    bottomBtnContainer:{

    },
    bottomBtnView: {
        width: "50%",
        height: 40,
        backgroundColor: '#2089e0',
        borderRightWidth:0,
        flex:1,
        flexShrink: 2,
        borderRadius: 2,
        alignItems: "center",
        flexDirection: "column",
        textAlignVertical: "center",
        padding: 10,
        margin: 10,
    },

    bottomBtnText:{
        textAlignVertical: "center",
        textAlign: 'center',
        color: "white",
    },
})