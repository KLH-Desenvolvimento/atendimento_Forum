const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    initializeDatabase(db);
  }
});

function initializeDatabase(db) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf TEXT,
        tipo_operacao TEXT,
        opcao_selecionada TEXT,
        texto_adicional TEXT,
        convocacoes TEXT,
        data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela registros:', err);
      else console.log('Tabela registros verificada/criada');
    });
  });
}

module.exports = db;