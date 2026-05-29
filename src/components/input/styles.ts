import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    BoxInput:{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor: themas.colors.lightGray,
            borderColor: themas.colors.lightGray,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 5,
        },
        input:{
            height: '100%',
            width: '90%',
            // backgroundColor: 'red',
            borderRadius: 40,
            paddingLeft: 5,
        },
        titleInput:{
        marginLeft: 5,
        color: themas.colors.gray,
        marginTop: 20,
        },
})