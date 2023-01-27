import { View, Text, TouchableOpacity, StyleSheet , Image , ScrollView, TouchableHighlight  } from 'react-native';
import React, { useEffect, useState } from 'react';
import Svg ,{SvgUri} from 'react-native-svg';

const DaysMeteo = (props) => {
    const icons = require('../assets/Json/icons');
    console.log(icons.default);
    console.log(props.data)
    const [iconsData, setIconsData] = useState(icons.default);
    

    const [clicked, setClicked] = useState();

    const chooseDay = (index , date) => {
        setClicked(index);
        props.getDay(date);
    }

    useEffect(() => {
        setClicked(0);
        // props.getDay(props.data[0].date);
        (props.data[0] != undefined) ? console.log(props.data) : null;
    }, [props.data])



    return (
        <View className="pl-8">
            <Text className="font-bold text-3xl pt-7" style={styles.head}>Days</Text>
            <ScrollView className="flex flex-row gap-10 pt-3 h-full" horizontal={true} style={styles.cards}>
                { 
                    props.data.map((item, index) => (
                        <TouchableHighlight onPress={() => chooseDay(index , item.day)} style={[styles.card]}>
                        <View className='flex items-center bg-white w-24 py-3' style={[styles.card , (clicked == index) ? styles.dayClicked : ""]}>
                            <Text className="font-bold text-2xl" style={styles.dayDetails}>{item.dayName} {item.icon}</Text>
                            {/* <Image source={iconsData[0].img  }/> */}
                            <SvgUri
                                width="100%"
                                height="100%"
                                source={require('../assets/home.svg')}
                            />
                            <Text>
                            {iconsData.map((icon, index) => {
                                    if(item.icon === icon.id){
                                        console.log(icon.img, item.icon)
                                        icon.img;
                                    }
                                }
                                )}
                            </Text>
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