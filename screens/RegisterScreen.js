import { StatusBar } from "expo-status-bar"
import React, { useLayoutEffect, useState } from "react"
import {View,StyleSheet, KeyboardAvoidingView} from 'react-native'
import { Input ,Button,Text,} from "react-native-elements"
import { SafeAreaView } from 'react-navigation'
import { auth } from "../Firebase"


const Register = ({navigation}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [imageUrl,setImageUrl]=useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"abc"
        })
    },[navigation])

    const register=()=>{
         auth.createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
            })
        }).catch(err=>alert(err.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <Text h3 style={{marginBottom:50}}>
                Create Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(val)=>setName(val)}
                />
                <Input
                    placeholder="Email"
                    type="Email"
                    value={email}
                    onChangeText={(val)=>setEmail(val)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(val)=>setPassword(val)}
                />
                <Input
                    placeholder="ProfilePicture value (Optional)"
                    type="Email"
                    value={imageUrl}
                    onChangeText={(val)=>setImageUrl(val)}
                    onSubmitEditing={register}
                />

            </View>
            <Button
                containerStyle={styles.button}
                title="register"
                onPress={register}
                raised
            />
        </SafeAreaView>
    )
}

export default Register

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    }
})
