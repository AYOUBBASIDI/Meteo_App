import { View, Text, TouchableOpacity, StyleSheet , Image } from 'react-native';


const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <View style={styles.navBarItem}>
                <View>
                    <Image source={require('../assets/notif.svg')} style={{width: 30, height: 35}} />
                </View>
                <View>
                    <Image source={require('../assets/home.svg')} style={{width: 30, height: 30}} />
                </View>
                <View>
                    <Image source={require('../assets/profil.svg')} style={{width: 30, height: 30}} />
                </View>  
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        navBar: {
            background: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: "100%",
            zIndex: 1,
            elevation: 1,
            shadowColor: '#fff',
        },
        navBarText: {
            color: '#000',
        },
        navBarItem: {
            width: "80%",
            height: 50,
            borderRadius: 50,
            background: '#fff',
            flexDirection: 'row',
            alignitems : 'start',
            justifyContent: 'space-between',
            margin: 10,
        },
    });

export default NavBar;