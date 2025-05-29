document.addEventListener('DOMContentLoaded', function() {
    const moviesContainer = document.getElementById('moviesContainer');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    // Função para renderizar os filmes
    function renderMovies(moviesToRender) {
        moviesContainer.innerHTML = '';
        
        moviesToRender.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title} (${movie.year})</h3>
                    <p><strong>Gênero:</strong> ${movie.genre}</p>
                    <p><strong>Diretor:</strong> ${movie.director}</p>
                    <p>${movie.description}</p>
                    <div class="movie-actions">
                        <button class="btn ${movie.available ? 'rent-btn' : ''}" 
                                onclick="rentMovie(${movie.id})" 
                                ${!movie.available ? 'disabled' : ''}>
                            ${movie.available ? 'Alugar' : 'Indisponível'}
                        </button>
                        <button class="btn" onclick="showDetails(${movie.id})">
                            Detalhes
                        </button>
                    </div>
                </div>
            `;
            
            moviesContainer.appendChild(movieCard);
        });
    }
    
    // Função para filtrar os filmes
    function filterMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        
        const filteredMovies = movies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm) || 
                                 movie.director.toLowerCase().includes(searchTerm) ||
                                 movie.description.toLowerCase().includes(searchTerm);
            
            const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
            
            return matchesSearch && matchesGenre;
        });
        
        renderMovies(filteredMovies);
    }
    
    // Event listeners para filtros
    searchInput.addEventListener('input', filterMovies);
    genreFilter.addEventListener('change', filterMovies);
    
    // Renderiza todos os filmes inicialmente
    renderMovies(movies);
});

// Funções globais para os botões
function rentMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie && movie.available) {
        movie.available = false;
        alert(`Você alugou "${movie.title}" com sucesso!`);
        
        // Atualiza a exibição
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
}

function showDetails(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        alert(`Detalhes de "${movie.title}":\n\n` +
              `Ano: ${movie.year}\n` +
              `Gênero: ${movie.genre}\n` +
              `Diretor: ${movie.director}\n\n` +
              `Sinopse: ${movie.description}\n\n` +
              `Status: ${movie.available ? 'Disponível para aluguel' : 'Indisponível no momento'}`);
    }
}