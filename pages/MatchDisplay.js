import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Input, Button, ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchMatch } from 'api'
import MatchDisplaySingle from '../components/MatchDisplaySingle';
import MatchDisplayDouble from '../components/MatchDisplayDouble';
import {calculateGameScores} from '../utlis/match'
class MatchDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    switchGame(newlyChosenGame){
        this.setState({
            gameVisible: newlyChosenGame,
        })
    }

    _isSingleGame() {
        if (this.state.data.entry === 'single-man' ||
            this.state.data.entry === 'single-woman' ||
            this.state.data.entry === 'single-man-in-team' ||
            this.state.data.entry === 'single-woman-in-team'
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        const { navigation } = this.props;
        const matchId = navigation.getParam('matchId', 'NO-ID Found');
        fetchMatch({ matchId }).then(res => {
            this.setState({
                data: res.tableData,
                gameVisible: res.gameVisible,
                meta: res.metaData,
                loaded: true,
            })
        });



        if (this.state.loaded) {
            if (this._isSingleGame()) {
                return (
                    <View>
                        <MatchDisplaySingle
                            navigation={this.props.navigation}
                            tableData={this.state.data[this.state.gameVisible]}
                            gameId={this.state.gameVisible}
                            switchGame={this.switchGame}
                            allGamesData={this.state.data}
                        />
                    </View>
                )
            } else {
                return (
                    <View>
                        <MatchDisplayDouble
                            navigation={this.props.navigation}
                            tableData={this.state.data[this.state.gameVisible]}
                            gameId={this.state.gameVisible}
                            playerA1={this.state.metaData.playerA1}
                            playerA2={this.state.metaData.playerA2}
                            playerB1={this.state.metaData.playerB1}
                            playerB2={this.state.metaData.playerB2}
                            switchGame={this.switchGame}
                            allGamesData={this.state.data}
                        />
                    </View>
                )
            }
        } else {
            return (
                <View>
                    <Text>
                        加载中
                    </Text>

                </View>
            )
        }
    }
};


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchDisplay)

const styles = StyleSheet.create({})