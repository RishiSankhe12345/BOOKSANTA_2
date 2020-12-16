import { Component } from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'

export default class WelcomeScreen extends Component{
    constructor(){
        super()
        this.state={emailId:'', password:'', isModalVisible:false, FirstName:'', LastName:'', Adress:'', ContactNo:'', confirmPassword:''}
    }

showModel=()=>{
    return(<Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
        <View style={styles.modalConatiner}>
            <ScrollView style={{width:"100%"}}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                    <Text stylw={styles.modalTitle}>
                        Registration
                    </Text>
                    <TextInput style={styles.formTextInput} placeholder={"FirstName"} maxLength={8} onChangeText={(text)=>{
                        this.setState({
                            FirstName:text
                        })
                    }}/>
                    <TextInput style={styles.formTextInput} placeholder={"LastName"} maxLength={8} onChangeText={(text)=>{
                        this.setState({
                            LastName:text
                        })
                    }}/>
                    <TextInput style={styles.formTextInput} placeholder={"ContactNo"} maxLength={10} keyboardType={'numerical'} onChangeText={(text)=>{
                        this.setState({
                            ContactNo:text
                        })
                    }}/>
                    <TextInput style={styles.formTextInput} placeholder={"Adress"} multiline={true} onChangeText={(text)=>{
                        this.setState({
                            Adress:text
                        })
                    }}/>
                    <TextInput style={styles.formTextInput} placeholder={"emailId"} keyboardType={'email-adress'} onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>
                    <TextInput style={styles.formTextInput} placeholder={"password"} secureTextEntry={true} onChangeText={(text)=>{
                        this.setState({
                            confirmPassword:text
                        })
                    }}/>
                    <View style={styles.modalBackButton}>
                        <TouchableOpacity style={styles.registerButton} onPress={()=> this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
                            <Text style={styles.registerButtonText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                        <TouchableOpacity style={styles.cancelButton} onPress={()=>this.setState({"isModalVisible":false})}>
                            <Text style={styles.cancelButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    </Modal>
    )
}

userLogIn=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        return Alert.alert("Successfully Logged In")
    })
    .catch((error)=>{
        var errorCode= error.code
        var errorMessage= error.message
        return Alert.alert(errorMessage)
    })
}

userSignUp=(emailId,password)=>{
    firebase.auth().createUserWithEmailAndPassword(emailId,password)
    .then((response)=>{
        return Alert.alert("User Added Successfully")
    })
    .catch((error)=>{
        var errorCode= error.code
        var errorMessage= error.message
        return Alert.alert(errorMessage)
    })
}

render(){
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}> 
            </View> 
            { this.showModal() }
        <View style={styles.profileContainer}>
        <SantaClaus/>
        <Text style={styles.text}>Book Santa</Text>
        </View>    
        <View style={styles.buttonContainer}>
        <TextInput 
        style={styles.loginBox}
        placeholder="example@santa.com"
        placeholderTextColor="#ffff"
        keyboardType='email-adress'
        onChangeText={(text)=>{
            this.setState({
                emailId:text
            })
        }}
        />
        <TextInput 
        style={styles.loginBox}
        placeholder="password"
        secureTextEntry={true}
        placeholderTextColor="#ffff"
        keyboardType='email-adress'
        onChangeText={(text)=>{
            this.setState({
                password:text
            })
        }}
        />
        <TouchableOpacity style={[styles.button, {marginBottom:20, marginTop:20}]} 
        onPress={()=>{
            this.userLogIn(this.state.emailId, this.state.password)
        }}
        >
        <Text style={styles.buttonText}>
        LogIn
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
        onPress={()=>{
            this.userSignUp(this.state.emailId, this.state.password)
        }}
        >
        <Text style={styles.buttonText}>
        SignIn
        </Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}
}