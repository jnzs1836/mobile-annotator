import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, Picker, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { Divider,  Input, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";



class AnnotationSettingUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,

        //    Date
            date:Date.now(),
            year:2000,
            month:1,
            day:1,
        //
            place:"Hangzhou",
            type:"",
            // double singe men women mixed
            entry:"",
            round:"",
            playerA1:"运动员A1",
            playerB1: "运动员B1",
            playerA2: "运动员A2",
            playerB2: "运动员B2",
            ...this.props.data,
        };
    }

    formattedDate(){
        if(this.state.date instanceof Date){
            return this.state.date.toLocaleDateString("zh-CN")	;
        }else{
            let tmp = new Date()
            return tmp.toLocaleDateString("zh-CN");

        }
    }
    _isSingleGame(){
        if(this.props.data.entry === 'single-man' ||
            this.props.data.entry === 'single-woman' ||
            this.props.data.entry === 'single-man-in-team' ||
            this.props.data.entry === 'single-woman-in-team'
        ){
            return true;
        }else{
            return false;
        }
    }
    _onSubmit = () => {
        this.props.submitSettingUp(this.state);
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });

    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });

    };


    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({date:date});
        this.hideDateTimePicker();
    };




  render() {
        let playersInput;
        if(this._isSingleGame()){
            playersInput = <View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        A方运动员1
                    </Text>
                    <Input
                        style={styles.input}
                        defaultValue={this.props.data.playerA1}
                        onChangeText={(text)=>this.props.set({playerA1:text})}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        B方运动员1
                    </Text>
                    <Input
                        style={styles.playerInput}
                        defaultValue={this.props.data.playerB1}
                        onChangeText={(text)=>this.props.set({playerB1:text})}
                    />
                </View>
            </View>
        }else{
            playersInput = <View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        A方运动员1
                    </Text>
                    <Input
                        style={styles.playerInput}
                        defaultValue={this.props.data.playerA1}
                        onChangeText={(text)=>this.props.set({playerA1:text})}


                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        A方运动员2
                    </Text>
                    <Input
                        style={styles.playerInput}
                        defaultValue={this.props.data.playerA2}
                        onChangeText={(text)=>this.props.set({playerA2:text})}

                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        B方运动员1
                    </Text>
                    <Input
                        style={styles.playerInput}
                        defaultValue={this.props.data.playerB1}
                        onChangeText={(text)=>this.props.set({playerB1:text})}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        B方运动员2
                    </Text>
                    <Input
                        style={styles.playerInput}
                        defaultValue={this.props.data.playerB2}
                        onChangeText={(text)=>this.props.set({playerB2:text})}
                    />
                </View>
            </View>
        }
    return (
      <View style={styles.container}>
        <ScrollView>

            <View style={styles.row}>
                <Text style={styles.label}>
                  比赛时间
              </Text>
                 <TouchableOpacity onPress={this.showDateTimePicker}>
                     <Text style={styles.input}>
                         {this.formattedDate()}
                         </Text>
                 </TouchableOpacity>
            </View>




          <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
          />


          <View style={styles.row}>
              <Text style={styles.label}>
                  比赛地点
              </Text>
              <Input
                  style={styles.input}
                  defaultValue={this.props.data.place}
                  onChangeText={(text)=>this.props.set({place:text})}
              />
          </View>

          <View style={styles.row}>

              <Text style={styles.label}>
                  比赛类型
              </Text>
              <View style={styles.entryContainer}>

              <Picker
                  selectedValue={this.props.data.type}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.props.set({type: itemValue})
                  }>
                  <Picker.Item label="公开赛" value="championships" />
                  <Picker.Item label="世乒赛" value="ittf-worlds" />
                  <Picker.Item label="世界杯" value="world-cup" />
                  <Picker.Item label="奥运会" value="olympics" />
                  <Picker.Item label="乒超联赛" value="single-woman-in-team" />
                  <Picker.Item label="亚运会" value="asia-olympics" />
                  <Picker.Item label="亚锦赛" value="asia-championship" />
                  <Picker.Item label="亚洲杯" value="asia-cup" />
                  <Picker.Item label="奥运选拔赛" value="olympics-selection" />
                  <Picker.Item label="队内赛" value="team-competition" />
                  <Picker.Item label="欧亚对抗赛" value="asia-europe" />
                  <Picker.Item label="其他" value="others" />
              </Picker>
                  </View>

          </View>


          <View style={styles.row}>

              <Text style={styles.label}>
                  比赛项目
              </Text>

              <View style={styles.entryContainer}>
              <Picker
                  selectedValue={this.props.data.entry}
                  itemStyle={{  textAlign: 'right', fontSize: 14, right:0 }}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.props.set({entry: itemValue})
                  }>
                  <Picker.Item label="男团单打" value="single-man-in-team" />
                  <Picker.Item label="男团双打" value="single-men-in-team" />
                  <Picker.Item label="男单" value="single-man" />
                  <Picker.Item label="男双" value="double-men" />
                  <Picker.Item label="女团单打" value="single-woman-in-team" />
                  <Picker.Item label="女团双打" value="double-women-in-team" />
                  <Picker.Item label="女单" value="single-woman" />
                  <Picker.Item label="女双" value="double-women" />
                  <Picker.Item label="混双" value="double-mixed" />
              </Picker>

              </View>
          </View>
          <View style={styles.row}>

              <Text style={styles.label}>
                  比赛项目
              </Text>

              <View style={styles.entryContainer}>
              <Picker
                  selectedValue={this.props.data.round}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.props.set({round: itemValue})
                  }>
                  <Picker.Item label="决赛" value="final" />
                  <Picker.Item label="半决赛" value="semi-final" />
                  <Picker.Item label="四分之一决赛" value="quarter-final" />
                  <Picker.Item label="八分之一决赛" value="eighth-final" />
                  <Picker.Item label="十六分之一决赛" value="sixteenth-final" />
                  <Picker.Item label="小组赛第一轮" value="group-first" />
                  <Picker.Item label="小组赛第二轮" value="group-second" />
                  <Picker.Item label="小组赛第三轮" value="group-third" />
                  <Picker.Item label="其他" value="others" />
              </Picker>

              </View>
          </View>

          <Divider style={styles.divider1}/>


          {playersInput}



</ScrollView>
      </View>

    );
  }
}





export default AnnotationSettingUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingLeft: 30,
        paddingRight: 30,
      },
    entryPicker:{

    },
    entryContainer:{
        height: 50,
        right: 0,
        width: "70%",

    },

    row:{
      flexDirection: "row",
        paddingBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        fontSize: 14,
    },
    submit: {
        height: "60px",
        width: "100%",
        marginTop: 30,
    },
    input: {
      textAlign: "left",
        fontSize: 16,
        textAlignVertical:"bottom",
        paddingBottom: 0,
    },
    label: {
        textAlignVertical:"bottom",
        // paddingRight: 10,
        // flex: 5,
        // flexShrink: 1,
        flexGrow: 2,
        width: "30%",
        fontSize: 16,

    },
    playerInput: {
        // flex: 3,

        width: "70%",
        textAlignVertical:"bottom",
        paddingBottom: 0,
        alignItems: "flex-end",
        fontSize: 16,


        // flexShrink: 3,
        // flexGrow: 3,
    },
    divider1: {
        marginTop: 10,
        marginBottom: 25,
    },
    divider2: {
        marginTop: 10,
        marginBottom: 35,
    },
});