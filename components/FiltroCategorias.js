import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CATEGORIAS = ['Geral', 'Negócios', 'Tecnologia', 'Esportes', 'Saúde', 'Ciência'];
const CATEGORIAS_MAP = {
  'Geral': 'general',
  'Negócios': 'business',
  'Tecnologia': 'technology',
  'Esportes': 'sports',
  'Saúde': 'health',
  'Ciência': 'science',
};


const FiltroCategorias = ({ categoriaSelecionada, aoSelecionarCategoria }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIAS.map((categoria) => {
          const isSelected = categoriaSelecionada === CATEGORIAS_MAP[categoria];
          return (
            <TouchableOpacity
              key={categoria}
              style={[styles.chip, isSelected && styles.chipSelecionado]}
              onPress={() => aoSelecionarCategoria(CATEGORIAS_MAP[categoria])}
            >
              <Text style={[styles.chipTexto, isSelected && styles.chipTextoSelecionado]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  chipSelecionado: {
    backgroundColor: '#007BFF',
  },
  chipTexto: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  chipTextoSelecionado: {
    color: '#fff',
  },
});

export default FiltroCategorias;
