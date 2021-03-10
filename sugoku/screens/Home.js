import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View,TextInput,Button } from 'react-native'
import {Picker} from '@react-native-picker/picker'

export default function Home(props) {
    function playGame(){
        if(userName == ''){
            alert('Please fill the username')
        }else {
            props.navigation.push("Game", {userName, difficulty})
        }
    }

    const [userName, setUserName] = useState('')
    const [difficulty, setDifficulty] = useState('easy')

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 33,color: "white", marginBottom:50}} >Welcome to Sudoku app</Text>
            <Text style={{fontSize: 17,color: "white", marginBottom:15}}>Please type a username</Text>
            <TextInput textAlign={'center'} onChangeText={text=>setUserName(text)} style={styles.input}/>
            <Text style={{fontSize: 20,color: "white", marginTop:10}}>Please choose game difficulty</Text>
            <View style={styles.picker} >
              <Picker
                selectedValue={difficulty}
                onValueChange={(value) =>
                  setDifficulty(value)
                }>
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
              </Picker>
            </View>
              <Button style={{marginTop:15, borderRadius:20}} title="Play" onPress={playGame}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'powderblue' ,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      width: 150,
      height: 40,
      fontSize: 20,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'gray',
      marginTop: 10,
      marginBottom:20, 
      borderRadius: 10,
    },
    picker: {
      borderWidth: 1,
      width: 150,
      height: 40,
      fontSize: 13,
      color: 'white',
      borderColor: 'gray',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop:5,
      marginBottom: 30 
    }
  });