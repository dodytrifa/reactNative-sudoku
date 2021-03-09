import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View,TextInput,Button } from 'react-native'


export default function Game() {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
      
    const [originBoard,setOriginBoard] = useState([])
    const  [latestBoard,setLatestBoard] = useState([])
    
  useEffect(()=> {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    .then(response => response.json())
    .then(data => {setOriginBoard(JSON.parse(JSON.stringify(data.board)))
    setLatestBoard(JSON.parse(JSON.stringify(data.board)))}
    )
    .catch(err => {
      console.log(err);
    })
  },[])

  function validation () {
    console.log(latestBoard, 'isi latestboard');
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: latestBoard}),
      headers: { 'Content-Type': 'application/  x-www-form-urlencoded' }
    })
    .then(response => {
      if(!response.ok){
        throw Error (response.statusText)
      }else{
        return response.json()
      }
    })
    .then(data => {
      console.log(data,'DARI THEN DATA');
      alert(data.status)
    })
    .catch(err => {
      console.log(err,"ERROR VALIDATION");
    })
  }

  function apiSolve () {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: originBoard}),
      headers: { 'Content-Type': 'application/  x-www-form-urlencoded' }
    })
    .then(response => {
      console.log(response => response.json());
      if(!response.ok){
        throw Error (response.statusText)
      }
      return response.json()
    })
    .then(data => {
      console.log(data);
      setLatestBoard(data.solution)
    })
    .catch(err => {
      console.log(err);
    })
  }

  function fillBoard(text,indexI,indexJ) {
    let filledBoard = (JSON.parse(JSON.stringify(latestBoard)))
    filledBoard[indexI][indexJ] = (+text)
    setLatestBoard(filledBoard)
    console.log(latestBoard);
    } 

  if(originBoard.length==0) {
      return (
          <Text>Loading...</Text>
      )
  }

  return ( 
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Welcome to Sugoku</Text>   
      </View>
        {
          latestBoard.map((number,indexI) => 
          <View key={indexI} style={{flex: 1, flexDirection: 'row'}}>
          {
            number.map((item,indexJ) => 
            <TextInput key={indexJ} keyboardType="numeric" style={styles.input} defaultValue={item.toString()} onChangeText={text=>fillBoard(text,indexI,indexJ)} />)
            }
          </View>
          )
        }
      <View style={styles.buttonContainer}>
        <Button title='Submit Answer' onPress={validation}></Button>
        <Button title='Auto Solve' onPress={apiSolve}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row'
    },
    input: {
      borderWidth: 1,
      width: 40,
      height: 40,
      borderColor: '#777',
    }
});
