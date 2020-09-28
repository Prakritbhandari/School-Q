import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class answerScreen extends Component{
    constructor(){
        super()
        this.state = {
            userId  : firebase.auth().currentUser.email,
            questions : []
          }
        this.requestRef= null
    }

    getQuestions=()=>{
        this.requestRef = db.collection("questions")
        .onSnapshot((snapshot)=>{
          var questions = snapshot.docs.map((doc) => doc.data())
          this.setState({
            questions : questions
          });
        })
    }



componentDidMount(){
  this.getQuestions()
}

componentWillUnmount(){
  this.requestRef();
}

keyExtractor = (item, index) => index.toString()

renderItem = ( {item, i} ) =>{
  return (
    <ListItem
      key={i}
      title={item.question}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
          <TouchableOpacity style={styles.button}
          onPress ={()=>{
            this.props.navigation.navigate("answer",{"details": item})
          }}
          >
            <Text style={{color:'#ffff'}}>View</Text>
          </TouchableOpacity>
        }
      bottomDivider
    />
  )
}

render(){
  return(
    <View style={{flex:1}}>
      <Text style={{ fontSize: 20}}>Answer Questions</Text>
      <View style={{flex:1}}>
        {
          this.state.questions.length === 0
          ?(
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20}}>Questions</Text>
            </View>
          )
          :(
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.questions}
              renderItem={this.renderItem}
            />
          )
        }
      </View>
    </View>
  )
}
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#00FFFF",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})

