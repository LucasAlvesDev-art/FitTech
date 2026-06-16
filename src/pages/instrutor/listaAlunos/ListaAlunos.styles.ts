import { StyleSheet } from 'react-native'
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  title: {
    color: themas.colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: themas.colors.primary,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  name: {
    color: themas.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
  backgroundColor: '#1E1E1E',
  borderWidth: 1,
  borderColor: '#333',
  borderRadius: 12,
  paddingHorizontal: 15,
  height: 50,
  color: '#FFF',
  marginBottom: 15,
},
})