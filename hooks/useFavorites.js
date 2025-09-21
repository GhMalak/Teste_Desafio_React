import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@news_app_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Carrega os favoritos do AsyncStorage quando o app inicia
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

  // Salva os favoritos no AsyncStorage sempre que a lista 'favorites' muda
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Falha ao salvar favoritos.', e);
    }
  };

  // Adiciona ou remove um artigo dos favoritos
  const toggleFavorite = (article) => {
    const isFavorited = favorites.some(fav => fav.url === article.url);
    let newFavorites;

    if (isFavorited) {
      // Remove o artigo
      newFavorites = favorites.filter(fav => fav.url !== article.url);
    } else {
      // Adiciona o artigo
      newFavorites = [...favorites, article];
    }
    saveFavorites(newFavorites);
  };

  // Função para verificar se um artigo é favorito (usaremos para o ícone)
  const isArticleFavorite = useCallback((articleUrl) => {
    return favorites.some(fav => fav.url === articleUrl);
  }, [favorites]);

  return { favorites, toggleFavorite, isArticleFavorite };
};
