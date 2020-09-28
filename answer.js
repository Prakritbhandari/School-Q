
import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal,ScrollView,Alert,TextInput,
  KeyboardAvoidingView} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class AnswerScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId                    : firebase.auth().currentUser.email,
      userName                  : "",
      recieverId                : this.props.navigation.getParam('details')["user_id"],
      requestId                 : this.props.navigation.getParam('details')["request_id"],
      question                  : this.props.navigation.getParam('details')["question"],
      recieverName              : '',
      recieverRequestDocId      : '',
      IsModalVisible : false,
      answer : ''
    }
  }

  getAnswer =()=>{
    this.requestRef = db.collection("question")
    .onSnapshot((snapshot)=>{
      var answer = snapshot.docs.map((doc) => doc.data())
      this.setState({
        answer : answer
      });
    })
  }

  updateStatus=()=>{
    db.collection('questions').add({
      "request_id"          : this.state.requestId,
      "requested_by"        : this.state.recieverName,
      "donor_id"            : this.state.userId,
      "status"              : "Answered",
      "answer"              : this.state.answer,
    })
  }


  showModal = ()=>{
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.IsModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >Answer</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={this.state.answer}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              answer: text
            })
          }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.updateStatus(),
                ()=>this.setState({IsModalVisible:false})
              }
            >
            <Text style={styles.registerButtonText}>Answer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({IsModalVisible:false})}
            >
            <Text style={{color:'#00FFFF'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
}



  getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverName    : doc.data().first_name,
        })
      })
    });

    db.collection('questions').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({recieverRequestDocId:doc.id})
     })
  })}


  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }




  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId)
  }


    render(){
      return(
        <View style={styles.container}>
          {
            this.showModal()
          }
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Answer Question", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Question"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Question : {this.state.question}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
            </Card>
          </View>          
          <View style={{flex:0.3}}>
            <Card
                title={"Answer"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Answer : {this.state.answer}</Text>
              </Card>
            </Card>
          </View>

          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.setState({IsModalVisible:true})}
                  >
                  <Text>Answer</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'aqua',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
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
    marginLeft:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30,
    marginLeft:50

  },
  registerButtonText:{
    color:'#00FFFF',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
    marginLeft:50
  },
})
