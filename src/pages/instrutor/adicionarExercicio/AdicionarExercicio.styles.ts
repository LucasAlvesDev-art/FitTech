import { StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themas.colors.text,

  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },

    button:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.buttonDark,
        color: themas.colors.primary,
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

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  backText: {
    color: themas.colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  backButton: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginRight: 10,
  backgroundColor: themas.colors.surface,
  borderRadius: 8,
  },
});