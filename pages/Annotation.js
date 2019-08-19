import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AnnotationSettingUp from '../components/AnnotationSettingUp'
import AnnotationTableSingle1 from '../components/AnnotationTableSingle1'
import AnnotationTableDouble1 from '../components/AnnotationTableDouble1'
import { calculateGameScores } from '../utlis/match'
import {
    addOneInSingleTable1,
    backToSettingUp,
    initTableOne,
    setMetaDataItem,
    setUpTable,

    initTableDoubleOne,
    addOneInDoubleTable2, revertDoubleOne, revertSingleOne, switchDouble, switchSingle
} from "../actions/annotating";
import { connect } from "react-redux";
import { submitAnnotation } from "../api";

class Annotation extends Component {

    static navigationOptions = {
        headerTitle: "记录",

    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const _isSingleGame = (entry) => {
            if (entry === 'single-man' ||
                entry === 'single-woman' ||
                entry === 'single-man-in-team' ||
                entry === 'single-woman-in-team'
            ) {
                return true;
            } else {
                return false;
            }
        }


        // Left button on the bottom

        const backText = this.props.status === "ANNOTATING" ? "撤销" : "返回"
        const _back = (event) => {
            let revert = () => {
                if (_isSingleGame(this.props.metaData.entry)) {
                    this.props.revertTableSingleOne(this.props.tableSingleOneGameVisible);
                } else {
                    this.props.revertTableDoubleOne(this.props.tableDoubleOneGameVisible);
                }

            }
            if (this.props.status === "ANNOTATING") {
                revert();
                // this.props.backToSettingUp();
            } else {
                this.props.navigation.back();
            }
        };

        // Right button on the bottom
        const _step = (event) => {
            if (this.props.status === "ANNOTATING") {
                if (submitAnnotation({})) {
                    alert("Save Successful")
                    this.props.navigation.navigate('Home')
                } else {
                    alert("something wrong")
                }
            } else {
                this.props.submitSettingUp();
            }

        };

        const modalContent =
            //
            this.props.status !== "ANNOTATING" ? (
                    <AnnotationSettingUp data={this.props.metaData} set={this.props.setMetaDataItem}/>) :

                _isSingleGame(this.props.metaData.entry) ?

                    (
                        <AnnotationTableSingle1
                            initTable={this.props.initTableOne}
                            addOne={this.props.mutateTableSingleOne}
                            navigation={this.props.navigation}
                            tableData={this.props.tableSingleOneData}
                            gameId={this.props.tableSingleOneGameVisible}
                            revert={this.props.revertTableSingleOne}
                            switchGame={this.props.switchGameDouble}
                            allGamesData={this.props.tableDataSingle}
                        />
                    ) :
                    (
                        <AnnotationTableDouble1
                            initTable={this.props.initTableDoubleOne}
                            addOne={this.props.mutateTableDoubleOne}
                            navigation={this.props.navigation}
                            tableData={this.props.tableDoubleOneData}
                            gameId={this.props.tableDoubleOneGameVisible}
                            playerA1={this.props.metaData.playerA1}
                            playerA2={this.props.metaData.playerA2}
                            playerB1={this.props.metaData.playerB1}
                            playerB2={this.props.metaData.playerB2}
                            revert={this.props.revertTableDoubleOne}
                            switchGame={this.props.switchGameDouble}
                            allGamesData={this.props.tableDataDouble}
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
                        <View>
                            <Text style={styles.bottomBtnText}>{backText}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomBtnView} onPress={() => _step()}>
                        <View>
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
        metaData: state.annotatingMetaData.metaData,
        status: state.annotatingMetaData.status,

        tableDataSingle: state.annotatingSingleTable1.tableData,
        tableDataDouble: state.annotatingDoubleTable1.tableData,
        tableSingleOneData: state.annotatingSingleTable1.tableData[state.annotatingDoubleTable1.gameVisible],
        tableSingleOneGameVisible: state.annotatingSingleTable1.gameVisible,

        tableDoubleOneData: state.annotatingDoubleTable1.tableData[state.annotatingSingleTable1.gameVisible],
        tableDoubleOneGameVisible: state.annotatingDoubleTable1.gameVisible,

    }
}


// Connect dispatches to props

function mapDispatchToProps(dispatch) {
    return {


        initTableOne: () => dispatch(initTableOne()),

        submitSettingUp: (settings) => dispatch(setUpTable(settings)),
        backToSettingUp: () => dispatch(backToSettingUp()),
        setMetaDataItem: (item) => dispatch(setMetaDataItem(item)),

        mutateTableSingleOne: (key, value, game) => dispatch(addOneInSingleTable1(key, value, game)),


        initTableDoubleOne: () => dispatch(initTableDoubleOne()),
        mutateTableDoubleOne: (key, value, game) => dispatch(addOneInDoubleTable2(key, value, game)),

        revertTableDoubleOne: (game) => dispatch(revertDoubleOne(game)),
        revertTableSingleOne: (game) => dispatch(revertSingleOne(game)),
        switchGameSingle: (game) => dispatch(switchSingle(game)),
        switchGameDouble: (game) => dispatch(switchDouble(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Annotation)


const styles = StyleSheet.create({
    annotateOne: {},
    buttonGroup: {
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 0,
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    bottomBtnContainer: {},
    bottomBtnView: {
        width: "50%",
        height: 40,
        backgroundColor: '#2089e0',
        borderRightWidth: 0,
        flex: 1,
        flexShrink: 2,
        borderRadius: 2,
        alignItems: "center",
        flexDirection: "column",
        textAlignVertical: "center",
        padding: 10,
        margin: 10,
    },

    bottomBtnText: {
        textAlignVertical: "center",
        textAlign: 'center',
        color: "white",
    },
});