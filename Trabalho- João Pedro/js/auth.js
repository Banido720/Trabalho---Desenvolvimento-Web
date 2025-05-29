document.addEventListener('DOMContentLoaded', function() {
    // Verifica se estamos na página de login
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Login simulado
            if (username === 'admin' && password === '123') {
                // Armazena no localStorage que o usuário está logado
                localStorage.setItem('isLoggedIn', 'true');
                // Redireciona para a página de filmes
                window.location.href = 'filmes.html';
            } else {
                errorMessage.textContent = 'Usuário ou senha incorretos';
                errorMessage.style.display = 'block';
            }
        });
    }
    
    // Verifica se estamos na página de filmes
    if (document.getElementById('logoutBtn')) {
        const logoutBtn = document.getElementById('logoutBtn');
        
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
        
        // Verifica se o usuário está logado
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html';
        }
    }
});