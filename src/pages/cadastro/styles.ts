import { Dimensions, StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTop: {
    height: Dimensions.get('window').height / 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMid: {
    width: '100%',
    paddingHorizontal: 37,
  },
  boxBottom: {
    height: Dimensions.get('window').height / 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 18,
  },
  roleLabel: {
    fontSize: 12,
    color: themas.colors.gray,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: themas.colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonActive: {
    borderColor: themas.colors.primary,
    backgroundColor: themas.colors.primary + '20',
  },
  roleText: {
    fontSize: 14,
    color: themas.colors.gray,
    fontWeight: 'bold',
  },
  roleTextActive: {
    color: themas.colors.primary,
  },
  textBottom: {
    fontSize: 16,
    color: themas.colors.gray,
    marginTop: 16,
  },
});
