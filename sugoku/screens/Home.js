import React from 'react'
import { StyleSheet, Text, SafeAreaView, View,TextInput,Button } from 'react-native'

export default function Home(props) {
    function playGame(){
        props.navigation.push("Game")
    }

    return (
        <View style={styles.container}>
            <Text>Ini halaman Home</Text>
            <TextInput />
            <Button title="Play" onPress={playGame}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });