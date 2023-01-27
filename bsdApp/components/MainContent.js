import { View, Text, TouchableOpacity, StyleSheet , Image, ScrollView , TouchableHighlight, PermissionsAndroid } from 'react-native';
import React , {useState ,useEffect} from 'react';
import * as Location from 'expo-location';


const MainContent = (props) => {
    const [clicked, setClicked] = useState(0);

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState(null);

    console.log('Main' , props.dayName);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude);
            setLon(location.coords.longitude);
            console.log(lat);
            console.log(lon);
            if(lat != null && lon != null){
                const day = props.dayName;
                fetch(`http://192.168.10.34:8080/api/bsd_weather/v1/weather/hours/${day}&${lat}&${lon}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                }
                )
            }
    })()
    },[props.dayName])
    // useEffect(() => {
    //     (async () => {
          
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //       }
    
    //       let location = await Location.getCurrentPositionAsync({});
    //         setLat(location.coords.latitude);
    //         setLon(location.coords.longitude);
    //         console.log(lat);
    //         console.log(lon);
    //         if(lat != null && lon != null){
    //            const token = process.env.REACT_APP_API_KEY;
    //             fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=49cc8c821cd2aff9af04c9f98c36eb74`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setCity(data.city.name)
    //                 const weatherData = data.list.map((item) => {
    //                     return {
    //                         time: item.dt_txt,
    //                         temp: item.main.temp,
    //                         humidity: item.main.humidity,
    //                         wind: item.wind.speed,
    //                         meteo: item.weather[0].main,
    //                         icon: item.weather[0].icon,
    //                     }
    //                 })
    //                 console.log(weatherData);
    //             }  
    //             ); 
    //         }
            
    //     })();
    //   }, []);

    const times = [ 
        '6:00' ,
        '9:00' ,
        '12:00' ,
        '15:00' ,
        '18:00' ,
        '21:00' ,
        '24:00' ,
    ];

    



    return (
        <View className="h-fit pb-64 pt-7">
            <Text className="text-center font-bold text-4xl" style={styles.City}>{city}</Text>
            <View className="w-full justify-center items-center relative">
                
                <View className="w-80 h-44 absolute top-20 border-2 border-white flex items-center" style={styles.mainCard}> 
                    <View className="flex flex-row w-full justify-between px-10 pt-5 items-center">
                        <View>
                            <Text className="text-center text-white text-lg"><Image source={require('../assets/hum.svg')}/> Humidity</Text>
                            <Text className="text-white text-2xl font-bold">69%</Text>
                        </View>
                        <View>
                            <Text className="text-center text-white text-lg"><Image source={require('../assets/wind.svg')}/> Wind</Text> 
                            <Text className="text-white text-2xl font-bold">1.5km</Text>
                        </View>
                    </View> 
                    <Text className="text-white text-center text-4xl font-bold">26 °C</Text>
                    <ScrollView className="flex flex-row text-white pt-5" horizontal={true} style={styles.times} showsHorizontalScrollIndicator={false}>
                        {times.map((item, index) => (
                            <TouchableHighlight underlayColor="rgba(255, 255, 255, 0.2)" onPress={() => setClicked(index)}>
                                <Text className="px-2 py-1 text-base text-white rounded-xl" style={(clicked == index) ? styles.hourClicked : ""}>{item}</Text>
                            </TouchableHighlight>
                        ))} 
                    </ScrollView>
                </View>
                <Image className="w-44 h-44 absolute top-0 z-20" source={require('../assets/meteo.png')}/>
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