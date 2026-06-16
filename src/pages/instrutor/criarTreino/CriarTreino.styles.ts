import { StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themas.colors.bgScreen,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: themas.colors.text,
    marginBottom: 10,
  },

  subtitle: {
    color: themas.colors.textSecondary,
    marginBottom: 20,
  },

  warning: {
    color: themas.colors.warning,
    marginBottom: 20,
  },

  input: {
    backgroundColor: themas.colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    color: themas.colors.text,
  },

  label: {
    color: themas.colors.textSecondary,
    marginTop: 10,
    marginBottom: 10,
  },

  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },

  diaButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});