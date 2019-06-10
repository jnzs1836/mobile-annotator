import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, Modal} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AnnotationSettingUp from '../components/AnnotationSettingUp'
import AnnotationTableSingle1 from '../components/AnnotationTableSingle1'
import { addOneInTable1, initTableOne } from "../actions/annotatingTable1";
import { connect } from "react-redux";

class Annotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {

        const modalContent =
            this.props.status !== "ANNOTATING"? (<AnnotationSettingUp/>): (
                    <AnnotationTableSingle1 navigation={this.props.navigation}/>
                    )

    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}>
          <Modal>
              {modalContent}
          </Modal>

        {/*<AnnotationSettingUp/>*/}
          {/*<AnnotationTableSingle1/>*/}
      </View>
    );
  }
};


function mapStateToProps(state) {
  return {
      tableData: state.annotatingTable1.tableData,
      status: state.annotatingTable1.status,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initTable: () => dispatch(initTableOne()),
      addOne: (key) => dispatch(addOneInTable1(key))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Annotation)


const styles = StyleSheet.create({
    annotateOne: {

    },
    buttonGroup: {
        // flexDirection: "row",
        // backgroundColor: "red",
        // width: "100%",
    },
    button:{
        // backgroundColor: "grey",
        // width: "100%",
        // flex: 2,
    },
})