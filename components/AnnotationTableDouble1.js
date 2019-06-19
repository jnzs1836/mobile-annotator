import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, TouchableOpacity, Button} from 'react-native';
import { Input } from 'react-native-elements';
import { Table, Row, Rows, Cell, TableWrapper, Col, Cols } from 'react-native-table-component';
import {initTableOne, addOneInTable1, backToSettingUp} from "../actions/annotatingTable1";
import {submitAnnotation} from '../api'

class AnnotationTableDouble1 extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
        }
    }



  render() {


        // go back to edit the meta data

      // convert 0.04 => 4%
      const formatFloat = (value) => (100 * value).toFixed(0) + "%" ;
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
                        <Text style={styles.btnText}>{ this.props.tableData[key]}</Text>
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
                ['发球/第三拍', rowTextPair("得分", '失分'),
                    rowTouchablePair("playerA1ScoreService","playerA1LoseService"), // data
                    rowTouchablePair("playerB1ScoreService","playerB1LoseService"),
                    formatFloat(stageRatio.attackAfterService.score), formatFloat(stageRatio.attackAfterService.usage),
                    ],
                ['相持',rowTextPair("接发球", '第四拍'),
                     rowTouchablePair("serviceReceptionScore","forthStrokeScore"), // data
                     rowTouchablePair("serviceReceptionLose","forthStrokeLose"), // data
                    formatFloat(stageRatio.attackAfterServiceReception.score), formatFloat(stageRatio.attackAfterServiceReception.usage)],
                ['合计',rowTextPair("得分", '失分'),
                    rightRowTouchableElement("fifthStrokeLaterScore"), rightRowTouchableElement("fifthStrokeLaterLose"),
                    formatFloat(stageRatio.sustainedRally.score), formatFloat(stageRatio.sustainedRally.usage)],
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
              <Col data={['A','GOD', '失分', '得分率', '使用率']} style={styles.head} heightArr={tableLeftSideHeight} textStyle={styles.text} />
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
              <Cols data={tableData} style={styles.head} heightArr={tableCenterHeight} textStyle={styles.text} />

            {/*<Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>*/}
          </TableWrapper>
        </Table>


       </View>

    );
  }
}




export default AnnotationTableDouble1


const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', flexDirection:"column" },

    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },

    head: { flex: 1, backgroundColor: '#c8e1ff' },

    title: { flex: 2, backgroundColor: '#f6f8fa' },

    titleText: { marginRight: 6, textAlign:'right' },

    text: { textAlign: 'center' },

    leftRowElement:{
        width: "100%", height: "100%", backgroundColor: '#c8e1ff', borderRightWidth:1, justifyContent: "center"
    },
    rightRowElement:{
        width: "100%", height: "100%", backgroundColor: '#c8e1ff',  justifyContent: "center"
    },
    btn: { width: "100%", height: "100%", backgroundColor: '#c8e1ff', borderRightWidth:0, textAlign:"center", textAlignVertical:"center" },

    btnText: { textAlign: 'center' },


    rowPair:{
        width: "100%",
        height: "100%",
        elevation:0,
        borderWidth:0
    }
});
