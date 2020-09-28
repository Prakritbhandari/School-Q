import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class askScreen extends Component{
    constructor(){
      super();
      this.state ={
        userId : firebase.auth().currentUser.email,
        question:"",
        status:""
      }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addQuestion =(question)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('questions').add({
            "user_id": userId,
            "question":question,
            "request_id"  : randomRequestId,
            "answer" : "",
            status:"asked",         
        })
    
        this.setState({
            question :'',
        })
    
        return Alert.alert("Question Successfully Asked")
      }

      render(){
        return(
            <View style={{flex:1}}>
              <Text style={{ fontSize: 20}}>Answer Questions</Text>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                  <TextInput
                    style ={styles.formTextInput}
                    placeholder={"Type the Question"}
                    onChangeText={(text)=>{
                        this.setState({
                            question:text
                        })
                    }}
                    value={this.state.question}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{this.addQuestion(this.state.question)}}
                    >
                    <Text>Ask</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
        keyBoardStyle : {
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        },
        formTextInput:{
          width:"75%",
          height:35,
          alignSelf:'center',
          borderColor:'#00FFFF',
          borderRadius:10,
          borderWidth:1,
          marginTop:20,
          padding:10,
        },
        button:{
          width:"75%",
          height:50,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:10,
          backgroundColor:"#00FFFF",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 16,
          marginTop:20
          },
        }
      )