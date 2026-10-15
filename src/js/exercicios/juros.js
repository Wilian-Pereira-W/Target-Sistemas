import { formatarMoeda } from '../utils/formatacao.js';

const calcularJuros = () => {
  const valorInformado = document.getElementById('valorConta').value;
  const dataInformada = document.getElementById('vencimento').value;
  const resultado = document.getElementById('resultadoJuros');
  const valor = Number(valorInformado);

  if (
    valorInformado === '' ||
    !Number.isFinite(valor) ||
    valor < 0 ||
    !dataInformada
  ) {
    resultado.innerHTML =
      '<div class="result error">Informe um valor válido e a data de vencimento.</div>';
    return;
  }

  const [ano, mes, dia] = dataInformada.split('-').map(Number);
  const vencimento = new Date(Date.UTC(ano, mes - 1, dia));
  const hoje = new Date();
  const hojeUtc = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const diasAtraso = Math.max(
    0,
    Math.floor((hojeUtc - vencimento.getTime()) / 86400000),
  );
  const multa = valor * 0.025 * diasAtraso;
  const total = valor + multa;
  const mensagem =
    diasAtraso === 0
      ? '<p class="small">A data ainda não passou ou vence hoje; não foi aplicada multa.</p>'
      : '<p class="small">Cálculo simples: valor original × 2,5% × dias de atraso.</p>';

  resultado.innerHTML = `
    <div class="result">
      Dias de atraso: <span class="stat">${diasAtraso}</span><br>
      Multa acumulada (2,5% ao dia): <span class="stat">${formatarMoeda(multa)}</span><br>
      Valor total com multa: <span class="stat">${formatarMoeda(total)}</span>
      ${mensagem}
    </div>`;
};

export const inicializarJuros = () => {
  document
    .getElementById('calcularJuros')
    .addEventListener('click', calcularJuros);
};
