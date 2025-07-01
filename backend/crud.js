const sqlite3 = require('sqlite3').verbose();

class CRUD {
  constructor(dbPath, tableReg_Nome, tableCall_Nome, tableSchemas) {
    this.db = new sqlite3.Database(dbPath);
    this.tableReg_Nome = tableReg_Nome;
    this.tableCall_Nome = tableCall_Nome;
    this.tableSchemas = tableSchemas;

    this.inicializarBanco();
  }

  async inicializarBanco() {
    try {
      await this.criarTabela(this.tableReg_Nome);
      console.log('Banco de dados inicializado');
    } catch (error) {
      console.error('Erro ao inicializar banco:', error);
      throw error;
    }
  }

  async criarTabela(tableName) {
    const schema = this.tableSchemas[tableName];
    const columns = Object.entries(schema)
      .map(([name, type]) => `${name} ${type}`)
      .join(', ');

    return new Promise((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS ${tableName} (
          ${columns}
        )`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async registroEntrada(data) {
    return await this.inserirRegistro(this.tableReg_Nome, data);
  }

  async updateReg(horaSessao){
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE registros
        SET status = "chamado"
        WHERE horaSessao = ${horaSessao}`,
        function(err) {
          if (err) reject(err);
          else resolve({
            id: this.lastID,
            message: `${tableName} criado com sucesso`
          });
        }
      );
    });
  }

  async inserirRegistro(tableName, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
        values,
        function(err) {
          if (err) reject(err);
          else resolve({
            id: this.lastID,
            message: `${tableName} criado com sucesso`
          });
        }
      );
    });
  }

  async buscarPorCampo(tableName, campo, valor, limite = 6) {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${tableName} WHERE ${campo} = ? LIMIT ?`,
        [valor, limite],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }



  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = CRUD;