import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View,Button, AsyncStorage } from 'react-native'

export default function Finish(props) {
  const {userName, time} = props.route.params
  let value
  const [leaderBoard, setLeaderBoard] = useState([]);
  
  const initBoard = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  } 

  const finalResult = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      value = await AsyncStorage.multiGet(keys);
      setLeaderBoard(value)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    initBoard(userName, String(time))
  }, [])

  useEffect(() => {
    finalResult()
  }, [])

  leaderBoard.sort((x, y) => +x[1] - +y[1]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, marginBottom: 20, color: 'white' }}>Sudoku Champion Board</Text>
      <View style={{ borderWidth: 1, borderColor: 'white'}}>
        <View style={{ borderBottomWidth: 1, borderColor: 'white'  }}>
          <View
            style={{width: 150, flexDirection: 'row', borderColor: 'white' }}>
            <View
              style={{ width: 150, height: 30, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'white' }}>
              <Text style={{color: "white" }}>User Name</Text>
            </View>
            <View style={{ width: 150, height: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'white' }}>Finish time (seconds)</Text>
            </View>
          </View>
        </View>
        {leaderBoard.map((score, index) => (
          <View key={index} style={{ flexDirection: 'row', width: 300 }}>
            <View
              style={{ width: 150, alignItems: 'center', borderRightWidth: 1, borderColor: 'white'}}>
              <Text style={{ fontSize: 16, color:'white' }}>{score[0]}</Text>
            </View>
            <View style={{ width: 150, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color:'white' }}>{score[1]}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{marginTop: 20 }}>
        <Button title='Play Again' onPress={() => props.navigation.navigate("Home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  }
})