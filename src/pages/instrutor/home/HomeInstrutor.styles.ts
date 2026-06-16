import { StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: themas.colors.bgScreen,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themas.colors.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: themas.colors.textSecondary,
  },

  logout: {
    color: themas.colors.danger,
    fontWeight: '600',
    fontSize: 16,
  },

  card: {
    backgroundColor: themas.colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 16,
    color: themas.colors.textSecondary,
  },

  cardNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: themas.colors.primary,
    marginTop: 10,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themas.colors.text,
    marginBottom: 15,
  },

  actionCard: {
    backgroundColor: themas.colors.surface,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionText: {
    color: themas.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  recentTitle: {
  marginTop: 25,
  marginBottom: 15,
  fontSize: 20,
  fontWeight: 'bold',
  color: themas.colors.text,
  },

    listContent: {
    paddingBottom: 30,
  },

    treinoCard: {
    backgroundColor: themas.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: themas.colors.primary,
  },

    treinoNome: {
    color: themas.colors.text,
    fontSize: 17,
    fontWeight: 'bold',
  },

    treinoObjetivo: {
    color: themas.colors.primary,
    marginTop: 4,
    fontSize: 14,
  },

    treinoAluno: {
    color: themas.colors.textSecondary,
    marginTop: 8,
    fontSize: 13,
  },

    emptyContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

    emptyText: {
    color: themas.colors.textSecondary,
  },
});


