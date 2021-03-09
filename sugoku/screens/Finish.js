import React from 'react'
import { StyleSheet, Text, SafeAreaView, View,TextInput,Button } from 'react-native'


export default function Finish() {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 25,color: "white"}}>You've just completed the game! </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'powderblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
});