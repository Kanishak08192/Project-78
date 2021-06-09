import React from 'react';
import {  View, Text,TouchableOpacity,StyleSheet, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';
import db from '../config'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state=({
            emailId:'',
            password:''
        })
    }

    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            ()=>{
                return alert("Successfully Login")
            }
        ).catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
        
    }

    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            return alert("user added successfully")
        }).catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
    }
    render(){
        return(
            <KeyboardAvoidingView style={
                styles.container
            }>
                <View style={styles.profileContainer}>
                    <Image
                    source={
                        require("../assets/barter.jpg")
                    }
                    style={{
                        width:200,
                        height:200
                    }}/>
                    <Text style={
                        styles.title
                    }>Book Santa</Text>
                </View>
           <View style={styles.buttonContainer}>
               
               <TextInput
               placeholder="abc@example.com"
               keyboardType="email-address"
               onChangeText={(text)=>{
                   this.setState({
                       emailId:text
                   })
               }}
               style={styles.loginBox}/>

               <TextInput
               placeholder='password'
               secureTextEntry={true}
               onChangeText={(text)=>{
                   this.setState({
                       password:text
                   })
               }}
               style={styles.loginBox}/>

           </View> 

           <View>
               <TouchableOpacity
               style={[styles.button,{marginBottom:20,marginTop:20}]}
               onPress={()=>{
                this.userLogin(this.state.emailId,this.state.password)
            }}>
                <Text style={
                   styles.buttonText
                }>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
                this.userSignUp(this.state.emailId,this.state.password)
            }} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
           </View>

           </KeyboardAvoidingView>
           
        )
    }
}

const styles = StyleSheet.create({ container:{ flex:1, backgroundColor:'#F8BE85' },
profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', }, 
title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' },
loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 },
button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, },
buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 },
buttonContainer:{ flex:1, alignItems:'center' } })