import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert, Picker, TextInput} from 'react-native';
import { Divider,  Input, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";



export default class AnnotationSettingUp extends Component {

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
            playerB1:"",
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
        if(this.state.entry === 'single-man' ||
            this.state.entry === 'single-woman' ||
            this.state.entry === 'single-man-in-team' ||
            this.state.entry === 'single-woman-in-team'
        ){
            return true;
        }else{
            return false;
        }
    }
    handleSubmit(event) {
        this.setState({value: event.target.value});

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
                    <Text>
                        A方运动员1
                    </Text>
                    <Input
                        label="A方运动员1"
                        placeholder='运动员A1'
                        onChangeText={(text)=>this.setState({playerA1:text})}
                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        B方运动员1
                    </Text>
                    <Input
                        label="B方运动员1"
                        placeholder='运动员B1'
                        onChangeText={(text)=>this.setState({playerB1:text})}
                    />
                </View>
            </View>
        }else{
            playersInput = <View>
                <View style={styles.row}>
                    <Text>
                        A方运动员1
                    </Text>
                    <Input
                        label="A方运动员1"
                        placeholder='运动员A1'
                        onChangeText={(text)=>this.setState({playerA1:text})}


                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        A方运动员2
                    </Text>
                    <Input
                        label="A方运动员2"
                        placeholder='运动员A2'
                        onChangeText={(text)=>this.setState({playerA2:text})}

                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        B方运动员1
                    </Text>
                    <Input
                        label="B方运动员1"
                        placeholder='运动员B1'
                        onChangeText={(text)=>this.setState({playerB1:text})}
                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        B方运动员2
                    </Text>
                    <Input
                        label="B方运动员2"
                        placeholder='运动员B2'
                        onChangeText={(text)=>this.setState({playerB2:text})}
                    />
                </View>
            </View>
        }
    return (
      <View style={styles.container}>


          <Button title={this.formattedDate()}
                  onPress={this.showDateTimePicker}
                  type="outline"
          />

          <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}

          />


          <View style={styles.row}>
              <Text>
                  比赛地点
              </Text>
              <Input
                  label="比赛地点"
                  placeholder='北京'
                  onChangeText={(text)=>this.setState({place:text})}
              />
          </View>

          <View style={styles.row}>

              <Text>
                  比赛类型
              </Text>

              <Picker
                  selectedValue={this.state.type}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.setState({type: itemValue})
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


          <View style={styles.row}>

              <Text>
                  比赛项目
              </Text>

              <Picker
                  selectedValue={this.state.entry}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.setState({entry: itemValue})
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
          <View style={styles.row}>

              <Text>
                  比赛项目
              </Text>

              <Picker
                  selectedValue={this.state.round}
                  style={styles.entryPicker}
                  onValueChange={(itemValue, itemIndex) =>
                      this.setState({round: itemValue})
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

          <Divider/>

          {playersInput}





      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingLeft: 30,
        paddingRight: 30,
      },
    entryPicker:{
        width: "100%",
        height: 50,
    },
    entryContainer:{

    },

    row:{
      flexDirection: "row"
    }
})