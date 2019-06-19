import React, {Component} from 'react';
import {View, Text,  StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import {loginAction} from '../api'


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
        };
    }


    static navigationOptions = {
        // title: 'Welcome',
    };


    _onPressLogin(){
        let signed = loginAction({
            password:"correct"
        })
        if(signed){
            this.props.navigation.navigate('Home')
        }else{
            this.props.navigation.navigate('Home')
        }
        Alert.alert('user'+ this.state.user);

    }
  render() {
        let players;
        if(this.state)
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}>
        <View style={styles.headContainer}>
          <Text style={styles.headline} >
            兵乓球比赛记录系统
          </Text>
        </View>
        <View style={styles.bodyContainer}>

          <Input
              placeholder='用户名'
              leftIcon={<Icon
                  name='user'
                  size={24}
                  color='black'/>}
              style={styles.user_name}
              onChangeText={(text) => this.setState({user:text})}
          />
            <Text>
                {this.state.user}
            </Text>
          <Input
              placeholder='密码'
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              style={styles.password}
              onChangeText={(text) => this.setState({password:text})}

          />


          <View style={styles.button_group}>
            <Button
                onPress={()=>this.props.navigation.navigate('Home')}
                containerStyle={styles.info_button}
                icon={<Icon
                    name="arrow-right"
                    size={15}
                    color="white"

                />

                }
                type="solid"

                title="登陆"
            />
            <Button
                onPress={this._onPressLogin}
                containerStyle={styles.login_button}
                icon={<Icon
                    name="sign-in"
                    size={15}
                    color="white"

                />

                }

                title="登陆"
            />


          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    user_name: {
            flex: 1,
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 3,
            flexShrink: 2,
          },
    password:{
            flex: 1,
            width: '100%',
            height: 100,
            flexGrow: 3,
            flexShrink: 2,
          },
    login_button: {
              flex: 1,
              width: "100%",
              height: '100%',
              // paddingLeft: 10,
              // paddingRight: 15,
              flexGrow: 2,
            },
    info_button: {
              flex: 1,
              width: "100%",
              height: '80%',
              // paddingLeft: 15,
              paddingRight: 10,
              flexGrow: 2,
            },
    button_group: {
            flex: 1,
            flexDirection:"row",
            justifyContent: "center",
            width: '100%',
            height: 100,
            flexGrow: 3,
            paddingTop: 30,
            paddingLeft: 10,
            // paddingRight: 30,
          },
    headline: {
            paddingTop:70,
            paddingBottom:30,
            flex: 1,
            width: '100%',
            height: 100,
            fontSize:33,
            fontFamily:"sans-serif",
            textAlign:"center",

          },
    headContainer: {
        flex: 1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        flexGrow: 2,

    },
    bodyContainer: {
          flex: 1,
          width: '100%',
          height: 100,
          alignItems: 'center',
          paddingHorizontal: "15%",
          flexGrow: 4,
        }
});