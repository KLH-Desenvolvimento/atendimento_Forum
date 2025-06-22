const db = require('../database');

module.exports = {
  criarRegistro: (req, res) => {
    const { nome, cpf, tipo_operacao, opcao_selecionada, texto_adicional, convocacoes } = req.body;
    
    if (!nome || !cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
    }

    db.run(
      `INSERT INTO registros 
      (nome, cpf, tipo_operacao, opcao_selecionada, texto_adicional, convocacoes) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, cpf, tipo_operacao, opcao_selecionada, texto_adicional, convocacoes],
      function(err) {
        if (err) {
          console.error('Erro no banco de dados:', err);
          return res.status(500).json({ error: 'Erro ao salvar registro' });
        }
        res.status(201).json({ 
          id: this.lastID,
          message: 'Registro salvo com sucesso'
        });
      }
    );
  },
};