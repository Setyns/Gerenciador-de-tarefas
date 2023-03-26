const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = registerForm.elements.username.value;
  const email = registerForm.elements.email.value;
  const password = registerForm.elements.password.value;
  const confirmPassword = registerForm.elements['confirm-password'].value;

  // Verificar se as senhas coincidem:
  if (password !== confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }

  // Salvar os dados do usuário no LocalForage:
  const user = {
    username,
    email,
    password
  };
  try {
    await localforage.setItem('user', user);
    console.log('Novo usuário cadastrado:', user);
    alert('Cadastro realizado com sucesso!');
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar usuário.');
  }
});
