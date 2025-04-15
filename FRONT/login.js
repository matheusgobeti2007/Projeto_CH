let botao = document.querySelector('#botaoEntrar');

botao.addEventListener('click', async (event) => {
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;

    if (email !== '' && senha !== '') {
        try {
            //Login com o usuário
            let resposta = await fetch('http://192.168.1.30:8080/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });
            console.log(resposta)
            
            if (resposta.status===200) {
                const data = await resposta.json();
                if(data.funcao==='admin'){
                    window.location.href = "./perguntas.html";
                }
                else
                    window.location.href = "./quiz.html";
            } else {
                alert('Usuário ou senha incorretos!');
            }
        }catch(error){
            alert('Erro de conexão. Tente novamente mais tarde.');
        }
    } else {
        alert('Preencha todos os campos!');
    }
});

// Evento de cadastro
document.querySelector('#botaoCadastrar').addEventListener('click', async function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const msgError = document.querySelector('#msgErro');
    const senha = document.querySelector('#cadastroSenha').value;
    const conf_senha = document.querySelector('#conf_senha').value;
    const email = document.querySelector('#cadastroEmail').value;
    const nome = document.querySelector('#cadastroNome').value;

    // Validações de senha
    if (senha !== conf_senha) {
        msgError.alert = "As senhas devem ser iguais!";
        return;
    }

    if (senha.length < 8) {
        msgError.textContent = "A senha deve ter pelo menos 8 caracteres!";
        return;
    }

    // Limpa a mensagem de erro
    msgError.textContent = "";

    try {
        // Requisição para cadastrar o usuário
        const res = await fetch('http://192.168.1.30:8080/aluno/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha, nome })
        });

        if (res.status===200) {
            alert('✅ Cadastrado com sucesso!');
            
            // Fecha o modal Bootstrap, se estiver aberto
            const modalElement = document.getElementById('exampleModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide(); // ou modal.close() dependendo da versão do Bootstrap
        } else {
            // Tratamento de erros baseado no status HTTP
            switch (res.status) {
                case 400:
                    alert('⚠️ A senha deve ter pelo menos 8 caracteres!');
                    break;
                case 409:
                    alert('⚠️ E-mail já cadastrado!');
                    break;
                case 500:
                    alert('❌ Erro interno ao cadastrar. Tente novamente.');
                    break;
                default:
                    alert('❗ Erro desconhecido ao cadastrar.');
            }
        }
    } catch (error) {
        console.error('Erro ao tentar cadastrar:', error);
        alert('❌ Erro de conexão. Verifique sua internet ou tente mais tarde.');
    }
});

// ===================
// Toggle Dark Mode
// ===================

const toggleButton = document.getElementById('Trocar');

toggleButton.addEventListener('click', (event) => {
    event.preventDefault();
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('dark-theme')) {
    toggleButton.textContent = '☀️';
  } else {
    toggleButton.textContent = '🌙';
  }
});

