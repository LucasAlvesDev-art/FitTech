import { Dimensions, StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {    
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.bgScreen,
    },
    boxTop: {
        height:Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid: {
        height:Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom: {
        height:Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
    },
    logo:{
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    text:{
        color: themas.colors.text,
        fontWeight: 'bold',
        marginTop: 40,
        fontSize: 18,
    },
    button:{
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.primary,
        borderRadius: 40,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textButton:{
        fontSize: 16,
        color: '#FFFF',
        fontWeight: 'bold',
    },
    textBottom:{
        fontSize: 16,
        color: themas.colors.gray,
    },
})  