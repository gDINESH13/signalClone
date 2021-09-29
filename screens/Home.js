import React, { useEffect, useLayoutEffect, useState } from 'react'
import {View,Text,SafeAreaView, ScrollView,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign,SimpleLineIcons} from 'react-native-vector-icons'
import CustomListItem from '../components/CustomListItem'
import { auth,db } from '../Firebase'

const Home = ({navigation}) => {

    const [chats,setChats]=useState([]);

    useEffect(()=>{
        //get value from firebase
        const unSubscribe=db.collection('chats')
        .onSnapshot(snap=>(
            //iterating all docs in chats collection
            
            setChats(snap.docs.map(doc=>({
                // an object is returned 
                id:doc.id,
                data:doc.data()
            })))
        ))
        return unSubscribe;
    },[])

    const signOut=()=>{
        auth.signOut()
        .then(()=>{
            
            navigation.replace('login')
        })
        .catch(err=>{
            console.log(err);
        })
    }

    
    useLayoutEffect(()=>{
        //using setOptions u can define the
        //the header tag inside that component itself
        navigation.setOptions({
            title:'Signal',
            headerStyle:{
                backgroundColor:'#fff'
            },
            headerTitleStyle:{color:'black'},
            headerTintColor:"black",
            marginLeft:30,
            headerLeft:()=>(
                
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                            }}
                        />
                    </TouchableOpacity>
                    
                    {/* <View style={{marginLeft:100}}></View> */}
                </View>
            ),
            headerRight:()=>(
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                        <AntDesign name="camera"
                            size={24} color='#000000'
                            style={{marginRight:10,}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("addChat")}>
                        <SimpleLineIcons name="pencil"
                            size={24} color='#000000'
                            style={{marginRight:10,}}
                        />
                        
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])

    const enterChat=(id,chatName)=>{
        navigation.navigate('chat',{
            id,
            chatName,    
        })
    }

    
    return (
        <SafeAreaView>
            <ScrollView style={{height:'100%'}}>
                {chats.map(({id,data:{chatName}})=>(
                    <CustomListItem
                        key={id}
                        enterChat={enterChat}
                        id={id}
                        chatName={chatName}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
