import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'


export default function Finish(props) {
    function playAgain(){
            props.navigation.push("Home")
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 25,color: "white", marginBottom:25}}>You've just finished the game! </Text>
            <Button title='Play Again' onPress={playAgain}></Button>
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