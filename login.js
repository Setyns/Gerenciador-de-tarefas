const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;
  
  // Verificar o login do usuário
  localforage.getItem('user').then(function(usuarioCadastrado) {
    if (username === usuarioCadastrado.username && password === usuarioCadastrado.password) {
      window.location.href = "tasks.html";
      alert('Login realizado com sucesso!');
    } else {
      alert('Nome de usuário ou senha inválidos.');
    }
  }).catch(function(error) {
    console.log('Erro ao obter os dados do usuário: ', error);
  });
});
