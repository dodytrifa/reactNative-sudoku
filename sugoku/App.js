import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
// import Board from './components/Board'

export default function App() {
  const [numbers,setNumber] = useState([])

  useEffect(()=> {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    .then(response => response.json())
    .then(data => setNumber(data.board))
  },[])

  function pressHandle() {
    alert('triggered')
  //   const data = {board:[
  //     [0,0,0,0,0,0,8,0,0],
  //     [0,0,4,0,0,8,0,0,9],
  //     [0,7,0,0,0,0,0,0,5],
  //     [0,1,0,0,7,5,0,0,8],
  //     [0,5,6,0,9,1,3,0,0],
  //     [7,8,0,0,0,0,0,0,0],
  //     [0,2,0,0,0,0,0,0,0],
  //     [0,0,0,9,3,0,0,1,0],
  //     [0,0,5,7,0,0,4,0,3]
  //   ]}

  // fetch('https://sugoku.herokuapp.com/solve', {
  //   method: 'POST',
  //   body: encodeParams(data),
  //   headers: { 'Content-Type': 'application/  x-www-form-urlencoded' }
  // })
  // .then(response => response.json())
  // .then(response => console.log(response.solution))
  // .catch(console.warn)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sugoku</Text>
      {/* <Text>{JSON.stringify(number)}</Text> */}
      <StatusBar style="auto" />   
      {
        numbers.map((number,index) => 
        <Text>
          {
          number.map((item,index) => 
          <TextInput style={styles.input} value={item} />)
          }
        </Text>    
        )
      }
      {/* {
        numbers.map((number,index) => {
          <Board number={number}/>
        })
      } */}
      <Button title='Submit Answer' onPress={pressHandle}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: 70,
    borderColor: '#777',
  }
});
