import { StyleSheet } from 'react-native'
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themas.colors.text,
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
  backButton: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginRight: 10,
  backgroundColor: themas.colors.surface,
  borderRadius: 8,
  },

   backText: {
    color: themas.colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
})