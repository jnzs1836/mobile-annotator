import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, TouchableOpacity, Button} from 'react-native';
import { ListItem } from 'react-native-elements';



// GameListView

// props:
// games (list):
// [ {
//   a: ,
//   b: ,
//   }
//]
export default class GameListView extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        const switchGame  = (game)=>{
            this.props.switchGame(game);
        }

        return (
            <View style={styles.container}>

                {
                    this.props.games.map((g, i) => (

                        <TouchableOpacity
                            onPress={() => switchGame(i)}
                            style={styles.gameCell}
                            key={i}>
                            <View style={styles.sideRow}>
                                <Text style={styles.teamName}>
                                    {this.props.teamA}
                                </Text>
                                <Text style={styles.teamScore}>
                                    {g.a}
                                </Text>
                            </View>

                            <View style={styles.sideRow}>
                                <Text style={styles.teamName}>
                                    {this.props.teamB}
                                </Text>
                                <Text style={styles.teamScore}>
                                    {g.b}
                                </Text>
                            </View>


                        </TouchableOpacity>

                    ))
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    gameCell: {
        borderWidth: 1,
        flexDirection: "column",
        flexShrink:2,
        flexGrow: 2,
    },
    sideRow: {
        flexDirection: "row",

    },
    teamName: {
        flexShrink: 1,
    },
    teamScore: {
        alignSelf: "flex-end",
        flexShrink:  0
    }
})