import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, TouchableOpacity, Button} from 'react-native';
import { Input } from 'react-native-elements';
import { Table, Row, Rows, Cell, TableWrapper, Col, Cols } from 'react-native-table-component';
import {connect} from 'react-redux'
import {initTableOne, addOneInTable1, backToSettingUp} from "../actions/annotatingTable1";
import {submitAnnotation} from '../api'

class AnnotationTableSingle1 extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
        }






    }



  render() {


        // go back to edit the meta data
        const _backToEditMeta = (event)=>{
            this.props.back();
        };


        const _onSave = (event) => {
            if(submitAnnotation({})){
                alert("Save Successful")
                this.props.navigation.navigate('Home')

            }else{
                alert("something wrong")
            }
        };
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>{value}</Text>
                </View>
            </TouchableOpacity>
        );

        const leftRowTouchableElement =  (key) => (
            <View style={styles.leftRowElement}>
                <TouchableOpacity  onPress={() => this.props.addOne(key)}>
                <View>
                    <Text style={styles.btnText}>{this.props.tableData[key]}</Text>
                </View>
            </TouchableOpacity>
            </View>

        );

        const rightRowTouchableElement =  (key) => (
            <View style={styles.rightRowElement}>
                <TouchableOpacity  onPress={() => this.props.addOne(key)}>
                    <View >
                        <Text style={styles.btnText}>{this.props.tableData[key]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );


        const leftRowTextElement = (value)=> (

            <View style={styles.leftRowElement}>
                <Text>
                    {value}
                </Text>
            </View>
        );
        const rightRowTextElement = (value)=> (

            <View style={styles.rightRowElement}>
                <Text>
                    {value}
                </Text>
            </View>
        )

        const rowTextPair = (i,j)=>(
            <Row data ={[leftRowTextElement(i), rightRowTextElement(j)]} style={styles.rowPair} textStyle={styles.text} borderStyle={{borderColor: 'transparent'}}/>
        )
        const rowTouchablePair = (i,j)=>(
            <Row data ={[leftRowTouchableElement(i), rightRowTouchableElement(j)]} style={styles.rowPair} textStyle={styles.text} borderStyle={{borderColor: 'transparent'}}/>
        );

        let sum = 0;
        for(let key of Object.keys(this.props.tableData)){
            sum += this.props.tableData[key]
        }
        sum = sum >0 ? sum: 1;
        let stageUsage = {
            attackAfterService: this.props.tableData.serviceScore + this.props.tableData.serviceLose +
                this.props.tableData.thirdStrokeLose + this.props.tableData.thirdStrokeScore,
            attackAfterServiceReception: this.props.tableData.serviceReceptionScore + this.props.tableData.serviceReceptionLose +
                this.props.tableData.forthStrokeLose + this.props.tableData.forthStrokeScore ,
            sustainedRally: this.props.tableData.forthStrokeScore + this.props.tableData.forthStrokeLose,
        };
        for( let key of Object.keys(stageUsage)){
            stageUsage[key] = stageUsage[key] > 0?stageUsage[key]:100;
        }
        let stageRatio = {
            attackAfterService:{
                score: (this.props.tableData.serviceScore + this.props.tableData.thirdStrokeScore) / stageUsage.attackAfterService,
                usage: (stageUsage.attackAfterService === 100? 0 : stageUsage.attackAfterService)  / sum,
            },
            attackAfterServiceReception:{
                score: (this.props.tableData.serviceReceptionScore + this.props.tableData.forthStrokeScore) / stageUsage.attackAfterServiceReception,
                usage:  (stageUsage.attackAfterServiceReception === 100 ? 0: stageUsage.attackAfterServiceReception)  / sum
            },
            sustainedRally: {
                score: this.props.tableData.fifthStrokeLaterScore /  (this.props.tableData.fifthStrokeLaterScore + this.props.tableData.fifthStrokeLaterLose > 0? this.props.tableData.fifthStrokeLaterScore + this.props.tableData.fifthStrokeLaterLose:1),
                usage: this.props.tableData.fifthStrokeLaterScore + this.props.tableData.fifthStrokeLaterLose / sum
            }
        }


        let tableData =  [
                ['发球抢攻段', rowTextPair("发球", '第三拍'),
                    rowTouchablePair("thirdStrokeScore","thirdStrokeLose"), // data
                    rowTouchablePair("serviceLose","thirdStrokeLose"),
                    stageRatio.attackAfterService.score, stageRatio.attackAfterService.usage,
                    ],
                ['接发球抢攻段',rowTextPair("接发球", '第四拍'),
                     rowTouchablePair("serviceReceptionScore","forthStrokeScore"), // data
                     rowTouchablePair("serviceReceptionLose","forthStrokeLose"), // data
                    stageRatio.attackAfterServiceReception.score, stageRatio.attackAfterServiceReception.usage],
                ['相持段','第五拍及以后',
                    rightRowTouchableElement("fifthStrokeLaterScore"), rightRowTouchableElement("fifthStrokeLaterLose"),
                    stageRatio.sustainedRally.score, stageRatio.sustainedRally.usage],
            ];
        // Define the heights of cells in the table
        const tableHeight = {
            firstHead:60,
            secondHead:60,
            scoreRow:60,
            ratioRow:60,
        };

        const tableCenterHeight =
                [
                    tableHeight.firstHead, tableHeight.secondHead,
                    tableHeight.scoreRow, tableHeight.scoreRow,
                    tableHeight.ratioRow, tableHeight.ratioRow
                ];
        const tableLeftSideHeight=
                [
                    tableHeight.firstHead + tableHeight.secondHead,
                    tableHeight.scoreRow, tableHeight.scoreRow,
                    tableHeight.ratioRow, tableHeight.ratioRow
                ];
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

    return (

      <View style={styles.container}>
        <Table style={{flexDirection: 'row', height: 361}}>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 80}}>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={['A','得分', '失分', '得分率', '使用率']} style={styles.head} heightArr={tableLeftSideHeight} textStyle={styles.text} />
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
              <Cols data={tableData} style={styles.head} heightArr={tableCenterHeight} textStyle={styles.text} />

            {/*<Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>*/}
          </TableWrapper>
        </Table>

          <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.bottomBtnView} onPress={() => _backToEditMeta()}>
                      <View >
                          <Text style={styles.bottomBtnText}>返回</Text>
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.bottomBtnView} onPress={() => _onSave()}>
                      <View >
                          <Text style={styles.bottomBtnText}>提交</Text>
                      </View>
                  </TouchableOpacity>

              {/*<Button style={{width:300}} title={"           返回           "}/>*/}
              {/*<Button style={styles.bottomButton} title={"           提交           "}/>*/}


          </View>
       </View>

    );
  }
}

//32 137 224
function mapStateToProps(state) {
  return {
    tableData: state.annotatingTable1.tableData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initTable: () => dispatch(initTableOne()),
      addOne: (key) => dispatch(addOneInTable1(key)),
      back: ()=>dispatch(backToSettingUp()),
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(AnnotationTableSingle1)


const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', flexDirection:"column" },

    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },

    head: { flex: 1, backgroundColor: '#c8e1ff' },

    title: { flex: 2, backgroundColor: '#f6f8fa' },

    titleText: { marginRight: 6, textAlign:'right' },

    text: { textAlign: 'center' },

    leftRowElement:{
        width: "100%", height: "100%", backgroundColor: '#c8e1ff', borderRightWidth:1
    },
    rightRowElement:{
        width: "100%", height: "100%", backgroundColor: '#c8e1ff'
    },
    btn: { width: "100%", height: "100%", backgroundColor: '#c8e1ff', borderRightWidth:0 },

    btnText: { textAlign: 'center' },

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
    rowPair:{
        width: "100%",
        height: "100%",
        elevation:0,
        borderWidth:0
    }
});
