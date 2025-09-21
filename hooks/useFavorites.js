import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@news_app_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (e) {
        console.error('Falha ao carregar favoritos.', e);
      }
    };
    loadFavorites();
  }, []);

  
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Falha ao salvar favoritos.', e);
    }
  };

  const toggleFavorite = (article) => {
    const isFavorited = favorites.some(fav => fav.url === article.url);
    let newFavorites;

    if (isFavorited) {
      newFavorites = favorites.filter(fav => fav.url !== article.url);
    } else {
      newFavorites = [...favorites, article];
    }
    saveFavorites(newFavorites);
  };

  // Função para verificar se um artigo é favorito
  const isArticleFavorite = useCallback((articleUrl) => {
    return favorites.some(fav => fav.url === articleUrl);
  }, [favorites]);

  return { favorites, toggleFavorite, isArticleFavorite };
};
