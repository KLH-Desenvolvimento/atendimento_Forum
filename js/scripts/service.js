import { fetchAPI } from './config.js';

class ChamadaService {
  constructor() {
    this.channel = new BroadcastChannel('chamada_channel');
    this.horaChamada = sessionStorage.getItem("horaChamada") || "";
  }

  // Define a hora e notifica a Tela08 (quando necessário)
  setHora(hora) {
    this.horaChamada = hora;
    sessionStorage.setItem("horaChamada", hora);
  }

  // Busca dados da API (usado pela Tela07 e Tela08)
  async carregarChamadas(hora = this.horaChamada) {
    if (!hora) throw new Error('Nenhum horário selecionado');
    return await fetchAPI('chamada', 'POST', { horaSessao: hora });
  }

  // Envia a hora para a Tela08 (disparado pelo botão "Chamar")
  notificarTela08() {
    this.channel.postMessage({
      type: 'ATUALIZAR_HORA',
      hora: this.horaChamada
    });
  }
}

export const chamadaService = new ChamadaService();