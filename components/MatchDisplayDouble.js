import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Table, Row, Rows, Cell, TableWrapper, Col, Cols } from 'react-native-table-component';
import GameListView from './GameListView'
import {submitAnnotation} from '../api'
import {calculateGameScores} from '../utlis/match'




// MatchDisplayDouble
// Description: 双打表格查看

class MatchDisplayDouble extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
        }
        this.props.initTable();
    }


  //  Render the interface


  render() {


        let game = 0;
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


        // ------------------------------------------------------------------------------------------------------

        // RowTouchableElement
        // 表格的基本组成元素，可点击元素
        // 用于产生点击即加1的表格项
        // 之所以区分左右,是考虑左右样式不同的原因


        // Left touchable element
        // Generate a touchable element which could be used to record data
        const leftRowDataElement =  (key) => (
            <View style={styles.leftRowElement}>
                <View>
                    <Text style={styles.btnText}>{this.props.tableData[key]}</Text>
                </View>
            </View>

        );

        // Left touchable element
        // Generate a touchable element which could be used to record data
        const rightRowDataElement =  (key) => (
            <View style={styles.rightRowElement}>
                    <View >
                        <Text style={styles.btnText}>{ this.props.tableData[key]}</Text>
                    </View>
            </View>
        );



        // ------------------------------------------------------------------------------------------------------------------
        // RowTextElement
        // 表格的基本组成元素，文本元素
        // 用于产生说明性文本表格项
        // 之所以区分左右,是考虑左右样式不同的原因

      const _onRevert = ()=>{
          console.log("HELLO WORLD")
          this.props.revert(game);
      }

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


        // ----------------------------------------------------------------------------------------
        // 将两个元素组成为pair
        const rowTextPair = (i,j)=>(
            <Row data ={[leftRowTextElement(i), rightRowTextElement(j)]} style={styles.rowPair} textStyle={styles.text} borderStyle={{borderColor: 'transparent'}}/>
        )
        const rowDataPair = (i,j)=>(
            <Row data ={[leftRowDataElement(i), rightRowDataElement(j)]} style={styles.rowPair} textStyle={styles.text} borderStyle={{borderColor: 'transparent'}}/>
        );



        // ------------------------------------------------------------------------------------
        // calculate numbers
        // 产生计算而成的数字,例如成功率
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


        let playerA1Score = this.props.tableData.playerA1OpeningScore + this.props.tableData.playerA1SustainedScore;
        let playerA1Lose = this.props.tableData.playerA1OpeningLose + this.props.tableData.playerA1SustainedLose;
        let playerA2Score = this.props.tableData.playerA1OpeningScore + this.props.tableData.playerA1SustainedScore;
        let playerA2Lose = this.props.tableData.playerA2OpeningLose + this.props.tableData.playerA2SustainedLose;

        let openingScore = this.props.tableData.playerA1OpeningScore + this.props.tableData.playerA2OpeningScore
        let openingLose = this.props.tableData.playerA1OpeningLose + this.props.tableData.playerA2OpeningLose;
        let sustainedScore = this.props.tableData.playerA1SustainedScore + this.props.tableData.playerA2SustainedScore;
        let sustainedLose = this.props.tableData.playerA1SustainedLose + this.props.tableData.playerA2SustainedLose


        let allScore = openingScore + sustainedScore;
        let allLose = openingLose + sustainedLose;

      //   -----------------------------------------------------------------------------------------

      // 设置表格布局
      let tableData =  [
                ['发球/第三拍', rowTextPair("得分", '失分'),
                    rowDataPair("playerA1OpeningScore","playerA1OpeningLose"), // data
                    rowDataPair("playerA2OpeningScore","playerA2OpeningLose"),
                    rowTextPair(openingScore, openingLose),
                    ],
                ['相持',rowTextPair("得分", '失分'),
                     rowDataPair("playerA1SustainedScore","playerA1SustainedLose"), // data
                     rowDataPair("playerA2SustainedScore","playerA2SustainedLose"), // data
                    rowTextPair(sustainedScore, sustainedLose)],
                ['合计',rowTextPair("得分", '失分'),
                    rowTextPair(playerA1Score, playerA1Lose),
                    rowTextPair(playerA2Score, playerA2Lose),
                    rowTextPair(allScore, allLose)
                ]
            ,
            ];


        // ----------------------------------------------------------------------------------------
        // Define the heights of cells in the table
        const tableHeight = {
            firstHead:60,
            secondHead:60,
            scoreRow:60,
            sumRow:60,
        };

        const tableCenterHeight =
                [
                    tableHeight.firstHead, tableHeight.secondHead,
                    tableHeight.scoreRow, tableHeight.scoreRow,
                    tableHeight.sumRow
                ];
        const tableLeftSideHeight=
                [
                    tableHeight.firstHead + tableHeight.secondHead,
                    tableHeight.scoreRow, tableHeight.scoreRow,
                    tableHeight.sumRow
                ];
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

        let games =calculateGameScores(this.props.allGamesData, 'double');


    //   --------------------------------------------------------------------------------
    return (

      <View style={styles.container}>
        <Table style={{flexDirection: 'row', height: 301}}>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 80}}>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={['A',this.props.playerA1, this.props.playerA1, '合计']} style={styles.head} heightArr={tableLeftSideHeight} textStyle={styles.text} />
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
              <Cols data={tableData} style={styles.head} heightArr={tableCenterHeight} textStyle={styles.text} />

            {/*<Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>*/}
          </TableWrapper>
        </Table>

          <GameListView
            games={games}
            teamA={this.props.playerA1 + " " + this.props.playerA2}
            teamB={this.props.playerB1 + " " + this.props.playerB2}
            switchGame={this.props.switchGame}
          />
          
       </View>

    );
  }
}




export default MatchDisplayDouble


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
    },

    revertButton: {
        marginTop: 30,
    }
});
