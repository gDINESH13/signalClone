import React, { useLayoutEffect,useState } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import { Input,Button } from 'react-native-elements'
import Icon from'react-native-vector-icons/FontAwesome'
import { db } from '../Firebase'
const AddChat = ({navigation}) => {

    const [input,setInput]=useState('');
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a New Chat"
        })
    },[navigation])

    const createChat=async()=>{
        await db.collection('chats').add({
            chatName:input
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch(err=>console.log(err))
    }

    return (
        <View style={styles.container}>
            
            <Input 
                placeholder="Enter a chat Name"
                value={input}
                onChangeText={(val)=>setInput(val)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign"
                    size={24} color="Black"/>
                }
            />
            <Button
                disabled={!input}
                title="Create Chat"
                onPress={createChat}
            />
        </View>
    )
}

export default AddChat

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:20,
        height:'100%'
    },

})
