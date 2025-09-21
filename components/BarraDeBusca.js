import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usaremos um ícone, fica mais bonito!

const BarraDeBusca = ({ valor, aoMudarTexto, aoBuscar }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por palavra-chave..."
        value={valor}
        onChangeText={aoMudarTexto}
        onSubmitEditing={aoBuscar} // Permite buscar ao pressionar "enter" no teclado
      />
      <TouchableOpacity style={styles.iconContainer} onPress={aoBuscar}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  iconContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
  },
});

export default BarraDeBusca;
