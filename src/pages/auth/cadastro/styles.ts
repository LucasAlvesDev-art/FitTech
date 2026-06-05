import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttom:{
    padding:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  marginBottom: 20,
  gap: 10,
},
roleCard: {
  flex: 1,
  padding: 15,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#333',
  backgroundColor: '#111',
  alignItems: 'center',
},

roleCardActive: {
  borderColor: '#00ff88',
  backgroundColor: '#0a1f14',
},

roleText: {
  color: '#aaa',
  fontWeight: '600',
},

roleTextActive: {
  color: '#00ff88',
},
});