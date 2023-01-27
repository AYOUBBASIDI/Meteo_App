import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LoginScreen, { SocialButton } from "react-native-login-screen";
import { ImageBackground , Image , View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mainback from '../assets/mainback.svg';

const Register = ({ navigation }) => {

    let Image_Http_URL ={ uri: 'https://static.wixstatic.com/media/056932_61d5952335cc41e69cdbafbdf4dd3445~mv2.png/v1/fill/w_249,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20weather-01.png'};

    return (
        <ImageBackground source={mainback} resizeMode="cover" style={{flex: 1}}>
            <View className="flex-1 justify-between h-full pb-3 pt-10" style={{flex: 1,paddingTop: 50,}}>
                <LoginScreen
                    logoImageSource={Image_Http_URL}
                    style={styles.form}
                    onLoginPress={() => navigation.navigate('Login')}
                    onSignupPress={() => navigation.navigate('Login')}
                    onEmailChange={(email: string) => {}}
                    onPasswordChange={(password: string) => {}}
                    disableSocialButtons={true}
                    signupTextStyle={{ color: '#353E5E' }}
                    disableDivider={true}
                    loginButtonText="Sign Up"
                    signupText='Already have an account?'
                >
                </LoginScreen>
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: 'rgba(0,0,0,0)',
    }
});

export default Register;
