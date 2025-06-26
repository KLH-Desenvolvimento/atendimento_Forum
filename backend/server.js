const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inicialização do banco de dados SQLite
const db = new sqlite3.Database('./servico.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    criarTabelaRegistros();
  }
});

// Função para criar a tabela (se não existir)
function criarTabelaRegistros() {
  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL,
      servico TEXT NOT NULL,
      intimacao TEXT NOT NULL,
      horaSessao TEXT,
      data TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela "registros" pronta para uso');
    }
  });
}

// Rota para salvar registros
app.post('/api/registros', (req, res) => {
  const { 
    nome,
    cpf,
    servico,
    intimacao,
    horaSessao,
    data
  } = req.body;


  console.log('Dados recebidos:', req.body);
  db.run(
    `INSERT INTO registros (
      nome,
      cpf,
      servico,
      intimacao,
      horaSessao,
      data
    ) VALUES (?,?,?,?,?,?)`,
    [nome, cpf, servico, intimacao, horaSessao, data],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        message: 'Registro salvo com sucesso!'
      });
    });
});

// Novo endpoint para buscar os últimos 6 registros
app.get('/api/ultimos-registros', (req, res) => {
  db.all(
    `SELECT nome, cpf, intimacao, horaSessao 
     FROM registros 
     ORDER BY id DESC 
     LIMIT 5`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          error: err.message 
        });
      }
      
      res.json({
        success: true,
        data: rows 
      });
    }
  );
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});