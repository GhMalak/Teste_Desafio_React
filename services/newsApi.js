import axios from 'axios';

// 1. SUBSTITUA PELA SUA NOVA CHAVE DA GNEWS
const API_KEY = '41f3c1eedf2065d98ab3b0bd65713e8a'; 
const API_URL = 'https://gnews.io/api/v4';

/**
 * @param {number} page - O número da página de resultados a ser buscada.
 */
export const getTopHeadlines = async (category = 'general', page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/top-headlines`, {
      params: {
        category: category,
        lang: 'pt',
        page: page,
        max: 10,
        token: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Erro em getTopHeadlines (GNews):", error.response ? error.response.data : error.message);
    return [];
  }
};

/**
 * Busca notícias com base em uma palavra-chave.
 * @param {string} query - A palavra-chave para a busca.
 * @param {number} page - O número da página de resultados a ser buscada.
 */
export const searchNews = async (query, page = 1) => {
  if (!query) return []; 

  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        q: query,
        lang: 'pt',
        page: page,
        max: 10,
        token: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Erro em searchNews (GNews):", error.response ? error.response.data : error.message);
    return [];
  }
};
