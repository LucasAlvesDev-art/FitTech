import { StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

  title: {
    color: themas.colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  
  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: themas.colors.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  treinoNome: {
    color: themas.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },

  subText: {
    color: themas.colors.textSecondary,
  },

  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  primary: {
    backgroundColor: themas.colors.primary,
  },

  warning: {
    backgroundColor: themas.colors.warning,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  exercicioContainer: {
    marginTop: 12,
  },

  exercicioCard: {
    backgroundColor: themas.colors.cardBackground,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  exercicioNome: {
    color: themas.colors.text,
    fontWeight: 'bold',
  },

  exercicioInfo: {
    color: themas.colors.textSecondary,
    fontSize: 12,
  },

  deleteBtn: {
    padding: 6,
  },

  deleteText: {
    color: themas.colors.danger,
    fontSize: 18,
  },

  empty: {
    color: themas.colors.warning,
  },
});