document.getElementById("submitButton").addEventListener("click", async function () {
    let pergunta = document.getElementById("pergunta").value;

    let respostasMarcadas = document.querySelector('input[type="radio"]:checked');

    // let respostas = respostasMarcadas.map(id => document.getElementById(id).value);

    let opcao1 = document.getElementById("resp1").value;
    let opcao2 = document.getElementById("resp2").value;
    let opcao3 = document.getElementById("resp3").value;
    let opcao4 = document.getElementById("resp4").value;

    let dificuldade = document.getElementById("dificuldade").value;

    // if (!pergunta || !opcao1 || !opcao2 || !opcao3 || !opcao4 || respostas.length === 0) {
    //     alert("Por favor, preencha todos os campos.");
    //     return;
    // }

    let dados = {
        questao: pergunta,
        opcao1: opcao1,
        opcao2: opcao2,
        opcao3: opcao3,
        opcao4: opcao4,
        correta: respostasMarcadas.id, 
        dificuldade: dificuldade
    };



    
    try {
        let response = await fetch("http://192.168.1.26:8080/quiz/pergunta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (response.status == 200) {
            let result = await response.json();
            alert("Pergunta salva com sucesso!" + result.id);
            
            // Limpar campos após sucesso
            document.getElementById("pergunta").value = "";
            document.querySelectorAll('input[name="respostas"]').forEach(cb => cb.checked = false);
            document.getElementById("opcao1").value = "";
            document.getElementById("opcao2").value = "";
            document.getElementById("opcao3").value = "";
            document.getElementById("opcao4").value = "";

            // Mostrar a dificuldade aleatória no frontend
            let niveis = ['fácil', 'médio', 'difícil'];
            let dificuldadeAleatoria = niveis[Math.floor(Math.random() * niveis.length)];
            document.getElementById("dificuldadeDisplay").innerText = "Dificuldade aleatória: " + dificuldadeAleatoria;

        } else {
            alert("Erro ao enviar a pergunta.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Falha ao conectar com o servidor.");
    }
});


async function carregarPerguntas() {
    try {
        let response = await fetch("http://192.168.1.26:8080/quiz/pergunta", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            let perguntas = await response.json();
            let lista = document.getElementById("listaPerguntas");
            lista.innerHTML = "";

            perguntas.forEach(p => {
                let li = document.createElement("li");
                li.innerHTML = `
                    <strong>Pergunta:</strong> ${p.questao}<br>
                    <strong>Opções:</strong> ${p.opcao1}, ${p.opcao2}, ${p.opcao3}, ${p.opcao4}<br>
                    <strong>Correta(s):</strong> ${p.correta.join(", ")}<br>
                    <strong>Dificuldade:</strong> ${p.dificuldade}<hr>
                `;
                lista.appendChild(li);
            });
        } else {
            alert("Erro ao carregar perguntas.");
        }
    } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        alert("Não foi possível carregar as perguntas.");
    }
}