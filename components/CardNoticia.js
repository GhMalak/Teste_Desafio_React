import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// 1. Importar o pacote de ícones que já vem com o Expo
import { Ionicons } from '@expo/vector-icons';

// 2. Adicionar 'isFavorite' e 'onToggleFavorite' às propriedades do componente
const CardNoticia = ({ artigo, onPress, isFavorite, onToggleFavorite }) => {
  
  const formatarData = (dataString) => {
    if (!dataString) return ''; 
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const temImagemValida = artigo && artigo.image && artigo.image.startsWith('http' );

  return (
    // 3. Envolvemos tudo em uma <View> para permitir o posicionamento absoluto do botão
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
        {temImagemValida ? (
          <Image
            source={{ uri: artigo.image }}
            style={styles.imagem}
            onError={(error) => console.log(`Erro ao carregar imagem: ${artigo.image}`, error.nativeEvent.error)}
          />
        ) : (
          <View style={[styles.imagem, styles.imagemPlaceholder]}>
            <Text style={styles.placeholderText}>Sem Imagem</Text>
          </View>
        )}
        
        <View style={styles.textoContainer}>
          <Text style={styles.fonte}>{artigo.source?.name || 'Fonte desconhecida'}</Text>
          <Text style={styles.titulo}>{artigo.title}</Text>
          <Text style={styles.data}>{formatarData(artigo.publishedAt)}</Text>
        </View>
      </TouchableOpacity>

      {/* 4. Botão de Favorito, posicionado sobre o card */}
      <TouchableOpacity style={styles.favoriteButton} onPress={onToggleFavorite}>
        <Ionicons 
          // O nome do ícone muda com base na propriedade 'isFavorite'
          name={isFavorite ? "heart" : "heart-outline"} 
          size={28} 
          // A cor também muda
          color={isFavorite ? "#E91E63" : "#FFFFFF"} 
        />
      </TouchableOpacity>
    </View>
  );
};

// 5. Adicionar os novos estilos ao StyleSheet
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16, // A margem que antes estava no card agora fica no wrapper
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  favoriteButton: {
    position: 'absolute', // Permite que o botão flutue sobre os outros elementos
    top: 12,
    right: 12,
    zIndex: 1, // Garante que o botão fique na frente da imagem
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30, // Deixa o fundo do botão redondo
  },
  imagem: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  imagemPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  textoContainer: {
    padding: 12,
  },
  fonte: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default React.memo(CardNoticia);
