import { View, Text, TouchableOpacity, StyleSheet , Image , ScrollView, TouchableHighlight  } from 'react-native';
import React, { useEffect, useState } from 'react';
import Svg ,{SvgUri} from 'react-native-svg';

const DaysMeteo = (props) => {
    const icons = require('../assets/Json/icons');
    const [iconsData, setIconsData] = useState(icons.default);
    const [clicked, setClicked] = useState();


    const chooseDay = (index , date) => {
        setClicked(index);
        props.getDay(date.split(' ')[0]);
    }

    useEffect(() => {
        setClicked(0);
        if(props.data[0] != undefined){
            const data = props.data[0].day; 
            props.getDay(data.split(' ')[0]);
            console.log(data); 
        }        
    }, [props.data])


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
        <View className="pl-8">
            <Text className="font-bold text-3xl pt-7" style={styles.head}>Days</Text>
            <ScrollView className="flex flex-row gap-4 pt-3 h-full" horizontal={true} style={styles.cards}>
                { 
                    props.data.map((item, index) => (
                        <TouchableHighlight onPress={() => chooseDay(index , item.day)} style={[styles.card]}>
                        <View className='flex items-center bg-white w-28 py-4 justify-between' style={[styles.card , (clicked == index) ? styles.dayClicked : ""]}>
                            <Text className="font-bold text-2xl" style={styles.dayDetails}>{item.dayName}</Text>
                            <View className='h-1/2'>
                                <Image source={
                                    getImg(item.icon)
                                } className="h-full"/>
                            </View>
                            <Text className="font-bold text-2xl" style={styles.dayDetails}>{Math.round(item.temp - 273.15) + '°C'}</Text>
                        </View>
                        </TouchableHighlight>
                    ))
                }
                
            
            </ScrollView>
        </View>
    );
    }

    const styles = StyleSheet.create({
        head: {
            color: '#353E5E',
        },
        card: {
            borderRadius: 50,   
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            height: 160,
        },
        cards: {
            width: 400,
        },
        dayClicked :{
            backgroundColor: '#389BFE',
        },
        dayDetails: {
            color: '#393838',
        },


    });


export default DaysMeteo;