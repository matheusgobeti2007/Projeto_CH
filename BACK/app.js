import express from "express";
import cors from "cors";
import sql from './database.js'

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login/', async (req, res) => {
    try {
        const { usuario, senha } = req.body

        const consulta = await sql`select * from aluno where
    email = ${usuario} and senha = ${senha}`;
    return res.status(200).json('Entrada confirmada')
    }
    catch (error) {
        if (consulta != null && consulta != '')
            return res.status(200).json(consulta[0].id);
        else
            return res.status(401).json('Usuario ou senha incorretos')
    }
});

app.post('/usuario/novo', async (req, res) => {
    try {
        const { email, senha, nome } = req.body;
        if (senha.length != 8) {
            return res.status(400).json('Senha deve ter 8 caracteres')
        }
        const insert = await sql`insert into aluno
        (email, senha, nome, funcao)
        values (${email},${senha},${nome},'Aluno')`
        return res.status(200).json('ok')
    }
    catch (error) {
        if (error.code == 23505) {
            return res.status(409).json('Email ja cadastrado!')
        }
        return res.status(500).json('Erro ao cadastrar usuario!')
    }
});

app.listen(3000, () => {
    console.log('Running!!')
});