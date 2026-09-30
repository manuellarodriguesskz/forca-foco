javascript
const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;

    const mensagem = document.getElementById("mensagem");

    if (nome === "" || cpf === "" || email === "") {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/alunos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                email: email
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.erro || "Erro ao cadastrar aluno.";
            return;
        }

        mensagem.textContent = "Aluno cadastrado com sucesso!";

        formulario.reset();

        console.log("Aluno cadastrado:", dados);

    } catch (erro) {

        console.error(erro);

        mensagem.textContent = "Não foi possível conectar ao servidor.";
    }

});
