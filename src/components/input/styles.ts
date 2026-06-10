import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    BoxInput:{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor: themas.colors.surface,
            borderColor: 'black',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 5,
        },
        input:{
            color: themas.colors.text,
            height: '100%',
            width: '90%',
            borderRadius: 40,
            paddingLeft: 5,
        },
        titleInput:{
        marginLeft: 5,
        color: themas.colors.gray,
        marginTop: 20,
        },
        Icon:{
            width: '100%',
        },
        Button:{
            width: "10%",
        }
})