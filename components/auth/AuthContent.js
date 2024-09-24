import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

//import FlatButton from '../ui/FlatButton';
//import AuthForm from './AuthForm';
//import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
    //const navigation = useNavigation();

    return (
        <View style={styles.authContent}>
            <AuthForm

            />
            <View style={styles.buttons}>
                <FlatButton >

                </FlatButton>
            </View>
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});
