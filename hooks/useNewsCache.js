import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
const NEWS_CACHE_KEY = '@news_app_cache';

export const useNewsCache = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [cachedNews, setCachedNews] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadCache = async () => {
      try {
        const storedNews = await AsyncStorage.getItem(NEWS_CACHE_KEY);
        if (storedNews !== null) {
          setCachedNews(JSON.parse(storedNews));
        }
      } catch (e) {
        console.error('Falha ao carregar notícias do cache.', e);
      }
    };
    loadCache();
  }, []);

  const saveNewsToCache = async (news) => {
    try {
      const newsToCache = news.slice(0, 20);
      await AsyncStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(newsToCache));
      setCachedNews(newsToCache);
    } catch (e) {
      console.error('Falha ao salvar notícias no cache.', e);
    }
  };

  return { isConnected, cachedNews, saveNewsToCache };
};
