import { StatusBar } from 'expo-status-bar';
import { ImageBackground , Image , View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect , useState } from 'react';
import HeadComment from '../components/HeadComment.js';
import MainContent from '../components/MainContent.js';
import DaysMeteo from '../components/DaysMeteo.js';
import mainback from '../assets/mainback.svg';
import * as Location from 'expo-location';

const Dashboard = () => {
  const [daysData, setDaysData] = useState([]);
  const [dayName , setNewDay] = useState();
  const [city , setCity] = useState();

  useEffect(() => {
    (async () => {
          
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

        let location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        if(lat != null && lon != null){
        await fetch(`http://192.168.10.34:8080/api/bsd_weather/v1/weather/days/${lat}&${lon}`)
        .then(response => response.json())
        .then(data => {
          setDaysData(data.days);
          setCity(data.city);
        }).catch(error => {
          console.log(error);
        });
      }
    })();
      
  }, []);

  const newDay = (day) => {
    setNewDay(day);
  }


  return (
      <ImageBackground source={mainback} resizeMode="cover" style={{flex: 1}}>
        <View className="flex-1 justify-between h-full pb-3 pt-10" style={{flex: 1,paddingTop: 50,}}>
          <View className="pb-3" style={styles.Content}>
            <HeadComment Comment="Rainy morning"/>
            <MainContent dayName={dayName} city={city}/>
            <DaysMeteo data={daysData} getDay={newDay}/>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Content: {
    height: '70%',
    width: '100%',
    alignitems : 'start',
    justifyContent: 'space-between',
  },

});

export default Dashboard;