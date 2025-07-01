const path = require('path');
const CRUD = require('./crud');

// Configurações do banco de dados
const dbPath = path.join(__dirname, './registros.db');

// Schemas das tabelas
const tableSchemas = {
  registros: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    nome: 'TEXT NOT NULL',
    cpf: 'TEXT NOT NULL',
    servico: 'TEXT NOT NULL',
    intimacao: 'TEXT NOT NULL',
    horaSessao: 'TEXT NOT NULL',
    data: 'TEXT NOT NULL',
    status: 'TEXT DEFAULT "pendente"'
  }
};

class DatabaseModel {
  constructor() {
    this.crud = new CRUD(
                    dbPath,
                    'registros',
                    'chamada',
                    tableSchemas);
  }

  // Métodos específicos do modelo Registro
  async criarRegistro(registroData) {
    return await this.crud.registroEntrada(registroData);
  }

  async pegarSessao(horaSessao) {
    return await this.crud.buscarPorCampo('registros',
                                          'horaSessao',
                                          horaSessao);
  }

  async updateRegistro(horaSessao){
    return await this.crud.updateReg(horaSessao);
  }

  // Métodos específicos do modelo Chamada
  async criarChamada(chamadaData) {
    return await this.crud.registroChamada(chamadaData);
  }
}

module.exports = new DatabaseModel();