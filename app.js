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




    async function buscarFilmes(termo) {
        if (!termo) return; // Não busca se o campo estiver vazio

        // limpa a lista anterior e mostra um indicador de carregamento
        listaFilmesContainer.innerHTML = '<p style="text-align: center; color: gray;">Carregando...</p>';

        try {
            // Busca na OMDB (O parâmetro 's' é para busca por termo)
            const response = await fetch(`https://www.omdbapi.com/?s=${termo}&apikey=${OMDB_API_KEY}`);
            const data = await response.json();

            // Limpa o container novamente
            listaFilmesContainer.innerHTML = '';

            if (data.Response === 'True' && data.Search) {
                data.Search.forEach(async (filmeBase) => {
                    // A OMDB retorna apenas dados básicos na busca (s=).
                    // Precisamos de uma segunda busca (i=) para pegar o Rating.
                    const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
                    if (filmeDetalhado) {
                        listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
                    }
                });
            } else {
                listaFilmesContainer.innerHTML = `<p style="text-align: center;">Nenhum filme encontrado para "${termo}".</p>`;
            }
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
            listaFilmesContainer.innerHTML = '<p style="text-align: center; color: red;">Erro na conexão com a API.</p>';
        }
    }

    // --- C. Função para Buscar Detalhes e Trailer (Chamada Adicional) ---
    // É NECESSÁRIA pois a OMDB não retorna o Rating na busca por 's'
    async function buscarDetalhes(imdbID) {
        try {
            // Busca na OMDB (O parâmetro 'i' é para busca por ID)
            const response = await fetch(`https://www.omdbapi.com/?s=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`);
            const data = await response.json();
            return data.Response === 'True' ? data : null;
        } catch (error) {
            console.error("Erro ao buscar detalhes:", error);
            return null;
        }
    }