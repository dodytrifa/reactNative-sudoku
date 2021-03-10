import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View,TextInput,Button,ActivityIndicator } from 'react-native'
import CountDown from 'react-native-countdown-component'


export default function Game(props) {
  
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i ===board.length -1 ? '' : '%2C'}`, '')
  
  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
    
  const [originBoard,setOriginBoard] = useState([])
  const [latestBoard,setLatestBoard] = useState([])
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState('')
    
  useEffect(()=> {
    setLoading(true)
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${props.route.params.difficulty}`)
    .then(response => response.json())
    .then(data => {setOriginBoard(data.board)
      setLatestBoard((data.board))}
      )
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false)
    })
  },[])

  function validation () {
    
    console.log(latestBoard, 'isi latestboard');
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: latestBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
      if(data.status === 'solved'){
        props.navigation.push("Finish", {
          userName: props.route.params.userName,
          time
        })
      }else {
        alert(data.status)
      }
    })
    .catch(err => {
      console.log(err,"ERROR VALIDATION");
    })
  }

  function apiSolve () {
    console.log(originBoard,'INI ORIGIN BOARD');
    
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: originBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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

    filledBoard[indexI][indexJ] = +text
    setLatestBoard(filledBoard)
    console.log(latestBoard);
  } 

  if(loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='steelblue' />
        </View>
      )
  }

  let game = 1800

  return ( 
    <View style={styles.container}>
      <View style={{marginBottom:30}}>
      <Text style={{fontSize: 20,color: "white", marginBottom:15}}>Welcome to Sudoku, {props.route.params.userName} </Text>
      <CountDown
        digitStyle={{backgroundColor: 'steelblue'}}
        digitTxtStyle={{color: 'white'}}
        timeLabelStyle={{color: 'gray'}}
        timeToShow={['M','S']}
        until={game}
        onFinish={() => {alert('Times up, We send you to home page'), props.navigation.push("Home")}}
        onPress={() => alert('hello')}
        size={20}
        onChange={(e)=>setTime(game - e)}
      />   
      </View>
        {
          latestBoard.map((number,indexI) => 
          <View key={indexI} style={{flexDirection: 'row'}}>
          {
            number.map((item,indexJ) => 
            <TextInput 
              backgroundColor={originBoard[indexI][indexJ] === 0 ? 'skyblue': 'steelblue'}
              editable={originBoard[indexI][indexJ] === 0 ? true : false} 
              textAlign={'center'} 
              key={indexJ} 
              keyboardType="numeric" 
              style={styles.input} 
              value={item === 0 ? " " : item.toString()} 
              onChangeText={(text)=>fillBoard(text,indexI,indexJ)} />)
            }
          </View>
          )
        }
        <View style={styles.buttonContainer}>
        <View>
          <Button title='Submit Answer' onPress={validation}></Button>
        </View>
        <View style={{marginLeft: 25}}>
          <Button title='Auto Solve' onPress={apiSolve}></Button>
        </View>
        </View>
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
    buttonContainer: {
      flexDirection: 'row',
      marginRight: 15,
      marginTop: 15,
    },
    input: {
      borderWidth: 1,
      color: 'black',
      width: 40,
      height: 40,
      borderColor: '#777',
    }
});
