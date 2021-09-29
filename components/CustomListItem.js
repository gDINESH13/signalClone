import React, { useEffect, useState } from 'react'
import { StyleSheet,Text,View } from 'react-native'
import {ListItem,Avatar} from 'react-native-elements'
import { db } from '../Firebase'

const CustomListItem = ({id,chatName,enterChat}) => {
    const [chatMessages,setChatMessages]=useState([])
    useEffect(()=>{
        const unsubscribe=db.collection('chats').doc(id)
            .collection('messages').orderBy('timeStamp','desc')
            .onSnapshot(snap=>(
                setChatMessages( snap.docs.map(doc=>doc.data()))
            ))
        return unsubscribe;    
    })
    return (
        <ListItem key={id} bottomDivider
            onPress={()=>enterChat(id,chatName)}>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                    'https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-11.jpg'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                numberOfLines={1}
                ellipsizeMode="tail">
                    
                    {chatMessages?.[0]?.displayName}:
                    {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles=StyleSheet.create({
    listTitle:{
        fontWeight:'800'
    }

})
