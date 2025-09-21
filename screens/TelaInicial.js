import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { getTopHeadlines, searchNews } from '../services/newsApi.js'; 
import CardNoticia from '../components/CardNoticia';
import BarraDeBusca from '../components/BarraDeBusca';
import { useFavorites } from '../hooks/useFavorites.js';
import FiltroCategorias from '../components/FiltroCategorias.js';
import { useNewsCache } from '../hooks/useNewsCache.js'; 

const TelaInicial = () => {
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoria, setCategoria] = useState('general'); 
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const navigation = useNavigation();
  const { toggleFavorite, isArticleFavorite, favorites } = useFavorites();
  const isFocused = useIsFocused();
  const { isConnected, cachedNews, saveNewsToCache } = useNewsCache();

  const carregarNoticias = async (isNewSearch = false, newCategory = null) => {
    if (!isConnected && isNewSearch) {
      setNoticias(cachedNews);
      setLoading(false);
      return;
    }

    if (isNewSearch) {
      setLoading(true);
    } else {
      if (loadingMore) return;
      setLoadingMore(true);
    }

    const currentPage = isNewSearch ? 1 : pagina;
    const busca = termoBusca.trim();
    const categoriaAtiva = newCategory || categoria;
    let articles;

    if (busca !== '') {
      articles = await searchNews(busca, currentPage);
    } else {
      articles = await getTopHeadlines(categoriaAtiva, currentPage);
    }

    if (articles && articles.length > 0) {
      if (isNewSearch) {
        saveNewsToCache(articles);
      }
      setNoticias(prevNoticias => 
        isNewSearch ? articles : [...prevNoticias, ...articles]
      );
      setPagina(currentPage + 1);
    } else if (isNewSearch) {
      setNoticias([]);
    }
    
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    if (isFocused) {
      carregarNoticias(true);
    }
  }, [isFocused, categoria, isConnected]);

  const handleSelectCategory = (novaCategoria) => {
    setCategoria(novaCategoria);
    setTermoBusca('');
    setPagina(1);
  };

  const handleSearch = () => {
    if (!isConnected) return;
    setPagina(1);
    carregarNoticias(true);
  };

  const handleLoadMore = () => {
    if (termoBusca.trim() === '' && isConnected) {
      carregarNoticias(false);
    }
  };

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

  const renderFooter = () => {
    if (!loadingMore || termoBusca.trim() !== '' || !isConnected) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isConnected && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>Modo Offline</Text>
        </View>
      )}
      <BarraDeBusca
        valor={termoBusca}
        aoMudarTexto={setTermoBusca}
        aoBuscar={handleSearch}
      />
      <FiltroCategorias
        categoriaSelecionada={categoria}
        aoSelecionarCategoria={handleSelectCategory}
      />

      {loading ? (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : noticias.length === 0 ? (
        <View style={styles.feedbackContainer}>
          <Text>Nenhum resultado encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={noticias}
          renderItem={renderItem}
          extraData={{ favorites, isFocused }}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          onRefresh={handleSearch}
          refreshing={loading}
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
  offlineBanner: {
    backgroundColor: '#E91E63',
    padding: 8,
    alignItems: 'center',
  },
  offlineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
});

export default TelaInicial;
