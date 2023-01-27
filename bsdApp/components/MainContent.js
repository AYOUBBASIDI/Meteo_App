import { View, Text, TouchableOpacity, StyleSheet , Image, ScrollView , TouchableHighlight, PermissionsAndroid } from 'react-native';
import React , {useState ,useEffect} from 'react';
import * as Location from 'expo-location';


const MainContent = (props) => {
    const [clicked, setClicked] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [icon , setIcon] = useState(null);
    const [dataHours, setDataHours] = useState([]);
    const [humidity, setHumidity] = useState(null);
    const [wind, setWind] = useState(null);
    const [temp, setTemp] = useState(null);
    const [times, setTimes] = useState([]);
    useEffect(() => {
        setLoading(true);
        setClicked(0);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude);
            setLon(location.coords.longitude);
            if(lat != null && lon != null){
                const day = props.dayName;
                fetch(`http://192.168.10.34:8080/api/bsd_weather/v1/weather/hours/${day}&${lat}&${lon}`)
                .then(response => response.json())
                .then(data => {
                    setTimes([]);
                    data.map((item) => {
                        const hour = item.date.split(' ')[1].split(':')[0]+':00';
                        setTimes(times => [...times, hour]);
                    }
                    )
                    setDataHours(data);
                    setHumidity(data[0].humidity);
                    setWind(data[0].wind);
                    setTemp(data[0].temp);
                    setIcon(data[0].icon);
                    setLoading(false);
                }
                )
            }
    })()
    },[props.dayName])
    

    const chooseHour = (index) => {
        setClicked(index);
        setHumidity(dataHours[index].humidity);
        setWind(dataHours[index].wind);
        setTemp(dataHours[index].temp);
        setIcon(dataHours[index].icon);
    }


    const data = [
        {
            id: "01n",
            img : require("../assets/icons/01n.png"),
        },
        {
            id: "01d",
            img : require('../assets/icons/01d.png' )
        },
        {
            id: "02n",
            img : require('../assets/icons/02n.png' )
        },
        {
            id: "02d",
            img : require('../assets/icons/02d.png' )
        },
        {
            id: "03n",
            img : require("../assets/icons/03n.png"),
        },
        {
            id: "03d",
            img : require("../assets/icons/03n.png"),
        },
        {
            id: "04n",
            img : require("../assets/icons/04d.png"),
        },
        {
            id: "04d",
            img : require("../assets/icons/04d.png"),
        },
        {
            id: "09n",
            img : require("../assets/icons/09d.png"),
        },
        {
            id: "09d",
            img : require("../assets/icons/09d.png"),
        },
        {
            id: "10n",
            img : require("../assets/icons/10n.png"),
        },
        {
            id: "10d",
            img : require("../assets/icons/10d.png"),
        },
        {
            id: "11n",
            img : require("../assets/icons/11d.png"),
        },
        {
            id: "11d",
            img : require("../assets/icons/11d.png"),
        },
        {
            id: "13n",
            img : require("../assets/icons/13d.png"),
        },
        {
            id: "13d",
            img : require("../assets/icons/13d.png"),
        },
        {
            id: "50n",
            img : require("../assets/icons/50d.png"),
        },
        {
            id: "50d",
            img : require("../assets/icons/50d.png"),
        },
    ];

    const getImg = (id) => {
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].id == id){
                return data[i].img;
            }
        }
    }


    return (
        <View className="h-fit pb-64 pt-7">
            <Text className="text-center font-bold text-4xl" style={styles.City}>{props.city}</Text>
            <View className="w-full justify-center items-center relative">
                
                {loading ? 
                <View className="w-80 h-44 absolute top-20 border-2 border-white flex items-center" style={styles.mainCard}>
                    <Image className="w-44 h-44 absolute top-0 z-20" source={{uri : 'https://media.baamboozle.com/uploads/images/87315/1624892323_185592.gif'}} style={{width:100, height:100}}/> 
                    <Text className='text-white text-xl top-20 font-bold text-center'>Loading ...</Text>
                </View>
                : 
                <View className="w-80 h-44 absolute top-20 border-2 border-white flex items-center" style={styles.mainCard}> 
                    <View className="flex flex-row w-full justify-between px-10 pt-5 items-center">
                        <View>
                            <Text className="text-center text-white text-lg"><Image source={require('../assets/hum.svg')}/> Humidity</Text>
                            <Text className="text-white text-2xl font-bold">{humidity} %</Text>
                        </View>
                        <View>
                            <Text className="text-center text-white text-lg"><Image source={require('../assets/wind.svg')}/> Wind</Text> 
                            <Text className="text-white text-2xl font-bold">{wind} km</Text>
                        </View>
                    </View> 
                    <Text className="text-white text-center text-4xl font-bold">{Math.round(temp - 273.15)} °C</Text>
                    <ScrollView className="flex flex-row text-white pt-5" horizontal={true} style={styles.times} showsHorizontalScrollIndicator={false}>
                        {times.map((item, index) => (
                            <TouchableHighlight underlayColor="rgba(255, 255, 255, 0.2)" onPress={() => chooseHour(index)}>
                                <Text className="px-2 py-1 text-base text-white rounded-xl" style={(clicked == index) ? styles.hourClicked : ""}>{item}</Text>
                            </TouchableHighlight>
                        ))} 
                    </ScrollView>
                </View>
                }

                {!loading ? <Image className="w-20 absolute top-0 z-40" source={
                    getImg(icon)
                    }/> : null }
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        City: {
            color: '#353E5E',
        },
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 3,
            },
            shadowOpacity: 1,
            shadowRadius: 4.65,
            elevation: 10,
            zIndex: 1,
        },
        customShadow: {
            width: 300,
            height: 180,
            borderRadius: 20,
            backgroundColor: "#000",
            opacity: 0.5
        },
        mainCard: {
            borderRadius: 50,
            backgroundColor: '#389BFE',
            zIndex: 0,
            borderRadius: 50,   
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
        },
        times: {
            width: "85%",
        },
        hourClicked: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },


    });

export default MainContent;