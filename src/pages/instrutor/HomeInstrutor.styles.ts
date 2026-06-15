import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: themas.colors.bgScreen,
  },
  title: {
    color: themas.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: themas.colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    color: themas.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
