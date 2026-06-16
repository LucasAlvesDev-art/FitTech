import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },

  warning: {
    fontSize: 14,
    marginBottom: 10,
    color: '#E53935',
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  daysContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 20,
},

dayButton: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#4CAF50',
},

dayButtonActive: {
  backgroundColor: '#4CAF50',
},

dayText: {
  color: '#4CAF50',
  fontWeight: '600',
},

dayTextActive: {
  color: '#fff',
},
});