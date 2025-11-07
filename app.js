// Substitua pela sua chave REAL da OMDB  API
const OMDB_API_KEY = '72dcf75a';
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input');

// --- A. Função para Criar o HTML do Card ---
/**
 * Cria o elemento HTML de um Card de Filme com os dados da OMDB.
 * @param {Object} filme - Objeto de filme retornado pela API.
 */
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');
    // Adiciona o IMDB ID como um data-attribute para buscar detalhes/trailer depois
    card.dataset.imdbId = filme.imdbId;

    // Garante que o rating seja um valor presente
    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;

