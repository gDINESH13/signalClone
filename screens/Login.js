import React,{useState,useEffect} from 'react'
import { StyleSheet,View,Text,KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { StatusBar } from 'expo-status-bar'
import {Button,Image} from 'react-native-elements'
import { Input } from 'react-native-elements/dist/input/Input'
import { auth } from '../Firebase'


const Login = ({navigation}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    useEffect(() => {
        const unSubscribe=auth.onAuthStateChanged(authUser=>{
            if (authUser){
                navigation.replace('home')
            }
        });
        return () => {
            unSubscribe()   
        }
    }, [])

    const signIn=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch(err=>console.log(err))
    }

    const register=()=>{
        navigation.navigate('register')
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <Image
                source={{
                    uri:'https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8'
                }}
                style={styles.signalImage}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="email"
                    autoFocus
                    type="Email"
                    value={email}
                    onChangeText={(val)=>setEmail(val)}
                />
                <Input
                    placeholder="password"
                    autoFocus
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={pass=>setPassword(pass)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Login"
                onPress={signIn}
            />

            <Button
                containerStyle={styles.button}
                title="Register"
                type="outline"
                color="#2C6BED"
                onPress={register}
            />
        </SafeAreaView>
        
    )
}

export default Login

const styles=StyleSheet.create({
    signalImage:{
        width:200,
        height:200,
        borderRadius:20},
    button:{
        width:200,
        marginTop:10,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    inputContainer:{
        width:200,
        marginTop:10
    }
})
