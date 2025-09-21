import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // 1. Importar useIsFocused

import CardNoticia from '../components/CardNoticia';
import { useFavorites } from '../hooks/useFavorites.js';

const TelaFavoritos = () => {
  const navigation = useNavigation();
  const { favorites, toggleFavorite, isArticleFavorite } = useFavorites();
  const isFocused = useIsFocused(); // 2. Usar o hook

  const handleCardPress = useCallback((artigo) => {
    navigation.navigate('TelaDeDetalhes', { artigo: artigo });
  }, [navigation]);

  const handleToggleFavorite = useCallback((artigo) => {
    toggleFavorite(artigo);
  }, [toggleFavorite]);

  const renderItem = ({ item }) => (
    <CardNoticia 
      artigo={item} 
      onPress={() => handleCardPress(item)}
      isFavorite={isArticleFavorite(item.url)}
      onToggleFavorite={() => handleToggleFavorite(item)}
    />
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>Você ainda não salvou nenhuma notícia.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          // 3. A FlatList aqui também observa o status de foco
          extraData={{ favorites, isFocused }}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    padding: 16,
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    color: '#666',
  },
});

export default TelaFavoritos;
