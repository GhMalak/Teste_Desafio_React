import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TelaDeDetalhes = ({ route }) => {
  // 1. Pegar o objeto 'artigo' que foi passado como parâmetro na navegação
  const { artigo } = route.params;

  // Função para abrir o link da notícia original no navegador
  const handleOpenLink = () => {
    if (artigo.url) {
      Linking.openURL(artigo.url);
    }
  };

  // Função para formatar a data, para consistência visual
  const formatarData = (dataString) => {
    if (!dataString) return ''; 
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Verifica se a URL da imagem é válida
  const temImagemValida = artigo && artigo.image && artigo.image.startsWith('http' );

  return (
    // 2. Usar ScrollView para garantir que o conteúdo role se for muito grande
    <ScrollView style={styles.container}>
      {/* 3. Adicionar o componente Image para exibir a imagem de destaque */}
      {temImagemValida ? (
        <Image source={{ uri: artigo.image }} style={styles.imagem} />
      ) : (
        // Mostra um placeholder se não houver imagem, mantendo o layout
        <View style={[styles.imagem, styles.imagemPlaceholder]}>
          <Text style={styles.placeholderText}>Sem Imagem</Text>
        </View>
      )}

      {/* Container para o conteúdo de texto, com espaçamento */}
      <View style={styles.contentContainer}>
        {/* Título da notícia */}
        <Text style={styles.titulo}>{artigo.title}</Text>

        {/* Informações da fonte e data */}
        <View style={styles.metaInfoContainer}>
          <Text style={styles.fonte}>{artigo.source?.name || 'Fonte desconhecida'}</Text>
          <Text style={styles.data}>{formatarData(artigo.publishedAt)}</Text>
        </View>

        {/* Resumo/Conteúdo da notícia */}
        <Text style={styles.conteudo}>{artigo.description || artigo.content || 'Conteúdo não disponível.'}</Text>

        {/* Botão para ler a notícia completa */}
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
          <Text style={styles.linkButtonText}>Ler notícia completa</Text>
          <Ionicons name="open-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// 4. Adicionar e ajustar os estilos para acomodar a imagem e melhorar o visual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagem: {
    width: '100%',
    height: 250, // Altura da imagem de destaque
    backgroundColor: '#e0e0e0',
  },
  imagemPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 18,
  },
  contentContainer: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  fonte: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  data: {
    fontSize: 14,
    color: '#666',
  },
  conteudo: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 24,
  },
  linkButton: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaDeDetalhes;
