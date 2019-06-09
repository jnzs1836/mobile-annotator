import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Table, Row, Rows, Cell, TableWrapper, Col, Cols } from 'react-native-table-component';


export default class Annotation extends Component {






    constructor(props) {
        super(props);
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>{value}</Text>
                </View>
            </TouchableOpacity>
        );

        const leftRowTouchableElement =  (value) => (
            <TouchableOpacity  onPress={() => this._alertIndex(value)}>
                <View style={styles.leftRowElement}>
                    <Text style={styles.btnText}>{value}</Text>
                </View>
            </TouchableOpacity>
        );

        const rightRowTouchableElement =  (value) => (
            <TouchableOpacity  onPress={() => this._alertIndex(value)}>
                <View style={styles.rightRowElement}>
                    <Text style={styles.btnText}>{value}</Text>
                </View>
            </TouchableOpacity>
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


        this.state = {
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
            tableData: [
                ['发球抢攻段', rowTextPair("发球", '第三拍'),rowTouchablePair(2,3), rowTouchablePair(2,3), 'c', 'd'],
                ['接发球抢攻段',rowTextPair("接发球", '第四拍'), rowTouchablePair(2,3), rowTouchablePair(2,3), 'c', 'd'],
                ['相持段','第五拍及以后', 'a', "S", 'c', 'd'],
            ],

        }






        // const inputCell= (value)=>(
           // {/*<Input*/}
                // placeholder={value}
                // onChangeText={()=>{}}
            // />
        // );
        // this.state = {
        //     tableHeadFirst: ["发球抢攻阶段",'接发球抢攻段',"sas"],
        //     tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
        //     tableData: [
        //         [inputCell('1'), '2', '3', '4'],
        //         [inputCell('1'), 'b', 'c', 'd'],
        //         ['1', '2', '3', '4'],
        //         ['a', 'b', 'c', 'd']
        //     ],
        //     leftHead:['A',"得分","失分"],
        // }
    //
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
        }


  render() {


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
        <Table style={{flexDirection: 'row'}}>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 80}}>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={['A','得分', '失分', '得分率', '失分率']} style={styles.head} heightArr={tableLeftSideHeight} textStyle={styles.text} />
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
              <Cols data={this.state.tableData} style={styles.head} heightArr={tableCenterHeight} textStyle={styles.text} />

            {/*<Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>*/}
          </TableWrapper>
        </Table>
      </View>
    );
  }
};

const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

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
    btn: { width: "100%", height: "100%", backgroundColor: '#c8e1ff', borderRightWidth:2 },

    btnText: { textAlign: 'center' },

    rowPair:{
        width: "100%",
        height: "100%",
        elevation:0,
        borderWidth:0
    }
});
