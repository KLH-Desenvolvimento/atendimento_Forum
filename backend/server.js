const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Temporariamente permita todas origens para teste
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.post('/api/registros', async (req, res) => {
  try {
    console.log('Corpo da requisição recebido:', req.body); // Adicione este log
    const resultado = await models.criarRegistro(req.body);
    console.log('Registro criado com sucesso:', resultado); // Adicione este log
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao criar registro:', error); // Adicione este log
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/update', async (req, res) => {
  try {
    const resultado = await models.updateRegistro(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao criar registro:', error); // Adicione este log
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/chamada', async (req, res) => {
  try {
    console.log('Query parameters:', req.body);
    const { horaSessao } = req.body;
    console.log(horaSessao);
    if (!horaSessao) {
      return res.status(400).json({ error: "Parâmetro horaSessao é obrigatório" });
    }

    const registros = await models.pegarSessao(horaSessao);
    res.json(registros);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Inicia servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Encerramento seguro
process.on('SIGINT', async () => {
  try {
    await models.crud.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao encerrar:', error);
    process.exit(1);
  }
});