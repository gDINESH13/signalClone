import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet,View,Text, TouchableOpacity, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, ScrollView, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign,SimpleLineIcons} from 'react-native-vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native'
import { auth,db } from '../Firebase'
import  firebase from 'firebase';

const Chat = ({ navigation,route}) => {

    const [input,setInput]=useState('')
    const [messages,setMessages]=useState([])

    useLayoutEffect(()=>{
        const unsubscribe=db.collection('chats').doc(route.params.id)
        .collection('messages').orderBy('timeStamp','desc')
        .onSnapshot((snap)=>{
            setMessages( snap.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            }))
            )
        })
        
        return unsubscribe;
    },[route])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chat',
            headerTitleAlign:'center',
            headerTitle:()=>(
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                    <Avatar rounded
                    source={{

                        uri:messages[0]?.data.photoURL||
                        'https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-11.jpg'
                    }}
                    />
                    <Text style={{
                        color:'white',
                        marginLeft:10,
                        fontWeight:'700'
                    }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity style={{
                    marginLeft:20,
                }}
                onPress={()=>navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24}
                        color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20,
                    }}>
                    <TouchableOpacity>
                            <Ionicons
                                name="videocam" size={24} color="white"
                           />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="phone"
                            size={24} color="white"
                            
                        />
                    </TouchableOpacity>
                </View>
            )   
        })
    },[navigation,messages])

    const sendMessage=()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id)
        .collection('messages')
        .add({
            timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        setInput('')
    }

    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'white',
        }}>
            <StatusBar style="light"/>

            <KeyboardAvoidingView
                behavior={Platform.OS==='ios' ? 'padding':'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    Keyboard.dismiss();
                }}>
                <>
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {messages.map(({id,data})=>(
                            data.email===auth.currentUser.email? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            containerStyle={{
                                                position:"absolute",
                                                bottom:-15,
                                                right:-5}}
                                            rounded
                                            size={30}
                                            source={{
                                                uri:data.photoURL
                                            }}
                                        />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                            ):(
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5}}
                                        rounded
                                        size={30}
                                        source={{
                                            uri:data.photoURL
                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                        
                </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Signal Message"
                            value={input}
                            onSubmitEditing={sendMessage}
                            onChangeText={(val)=>setInput(val)}
                        />
                        <TouchableOpacity
                            onPress={sendMessage}
                            activeOpacity={0.5}
                        >
                           <Ionicons
                                name="send" size={24} color="#2B6BE6"
                           />
                           
                        </TouchableOpacity>
                    </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    sender:{
        padding:15,
        backgroundColor:'#005187',
        alignSelf:'flex-start',
        borderRadius:20,
        marginRight:15,
        marginBottom:15,
        maxWidth:'80%',
        position:'relative'
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ECECEC',
        borderWidth:1,
        padding:10,
        color:'#808080',
        borderRadius:30,
    },
    
    reciever:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white',
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,
    }, 
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    recieverText:{
        color:'#FFFFFF',
        fontWeight:"500",
        marginLeft:10,
    },
})
