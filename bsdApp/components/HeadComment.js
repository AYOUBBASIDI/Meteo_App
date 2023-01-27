import { View, Text, TouchableOpacity, StyleSheet , Image } from 'react-native';


const HeadComment = ({Comment}) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    var minute = date.getMinutes();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    var hour12 = hour % 12 || 12;
    if (minute < 10) {minute = '0' + minute};
    if (hour12 < 10) {hour12 = '0' + hour12};
    const dateStr = `${dayName[day]} ${hour12}:${minute} ${ampm}`;

    return (
        <View style={styles.HeadComment}>
            <Text style={styles.Comment}>{Comment}</Text>
            <Text style={styles.date}>{dateStr}</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
        HeadComment: {
            width: '100%',
            height: 50,
            alignitems : 'start',
            justifyContent: 'space-between',
            paddingLeft: 28,
        },
        Comment: {
            color: '#353E5E',
            fontSize: 25,
            fontWeight: 'bold',
        },
        date: {
            color: '#8AAACD',
            fontSize: 20,
        },

    });

export default HeadComment;