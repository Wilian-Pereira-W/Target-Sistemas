import { formatarMoeda } from '../utils/formatacao.js';

const vendas = [
  { vendedor: 'João Silva', valor: 1200.5 },
  { vendedor: 'João Silva', valor: 950.75 },
  { vendedor: 'João Silva', valor: 1800.0 },
  { vendedor: 'João Silva', valor: 1400.3 },
  { vendedor: 'João Silva', valor: 1100.9 },
  { vendedor: 'João Silva', valor: 1550.0 },
  { vendedor: 'João Silva', valor: 1700.8 },
  { vendedor: 'João Silva', valor: 250.3 },
  { vendedor: 'João Silva', valor: 480.75 },
  { vendedor: 'João Silva', valor: 320.4 },
  { vendedor: 'Maria Souza', valor: 2100.4 },
  { vendedor: 'Maria Souza', valor: 1350.6 },
  { vendedor: 'Maria Souza', valor: 950.2 },
  { vendedor: 'Maria Souza', valor: 1600.75 },
  { vendedor: 'Maria Souza', valor: 1750.0 },
  { vendedor: 'Maria Souza', valor: 1450.9 },
  { vendedor: 'Maria Souza', valor: 400.5 },
  { vendedor: 'Maria Souza', valor: 180.2 },
  { vendedor: 'Maria Souza', valor: 90.75 },
  { vendedor: 'Carlos Oliveira', valor: 800.5 },
  { vendedor: 'Carlos Oliveira', valor: 1200.0 },
  { vendedor: 'Carlos Oliveira', valor: 1950.3 },
  { vendedor: 'Carlos Oliveira', valor: 1750.8 },
  { vendedor: 'Carlos Oliveira', valor: 1300.6 },
  { vendedor: 'Carlos Oliveira', valor: 300.4 },
  { vendedor: 'Carlos Oliveira', valor: 500.0 },
  { vendedor: 'Carlos Oliveira', valor: 125.75 },
  { vendedor: 'Ana Lima', valor: 1000.0 },
  { vendedor: 'Ana Lima', valor: 1100.5 },
  { vendedor: 'Ana Lima', valor: 1250.75 },
  { vendedor: 'Ana Lima', valor: 1400.2 },
  { vendedor: 'Ana Lima', valor: 1550.9 },
  { vendedor: 'Ana Lima', valor: 1650.0 },
  { vendedor: 'Ana Lima', valor: 75.3 },
  { vendedor: 'Ana Lima', valor: 420.9 },
  { vendedor: 'Ana Lima', valor: 315.4 },
];

const calcularTaxaComissao = (valor) => {
  if (valor < 100) return 0;
  if (valor < 500) return 0.01;
  return 0.05;
};

const escaparHtml = (texto) => {
  return texto.replace(
    /[&<>"]/g,
    (caractere) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      })[caractere],
  );
};

const calcularComissao = () => {
  const nome = document.getElementById('vendedor').value.trim();
  const valorInformado = document.getElementById('valorVenda').value;
  const valor = Number(valorInformado);
  const resultado = document.getElementById('resultadoComissao');

  if (!nome || valorInformado === '' || !Number.isFinite(valor) || valor < 0) {
    resultado.innerHTML =
      '<div class="result error">Informe o nome do vendedor e um valor de venda válido (zero ou maior).</div>';
    return;
  }

  const taxa = calcularTaxaComissao(valor);
  const comissao = valor * taxa;

  resultado.innerHTML = `
    <div class="result">
      <strong>${escaparHtml(nome)}</strong><br>
      Valor da venda: <span class="stat">${formatarMoeda(valor)}</span><br>
      Taxa aplicada: ${(taxa * 100).toLocaleString('pt-BR')}%<br>
      Comissão: <span class="stat">${formatarMoeda(comissao)}</span>
    </div>`;
};

const mostrarVendas = () => {
  const totaisPorVendedor = new Map();

  vendas.forEach(({ vendedor, valor }) => {
    const atual = totaisPorVendedor.get(vendedor) || {
      total: 0,
      quantidade: 0,
    };
    atual.total += valor * calcularTaxaComissao(valor);
    atual.quantidade += 1;
    totaisPorVendedor.set(vendedor, atual);
  });

  const linhas = [...totaisPorVendedor.entries()]
    .map(
      ([vendedor, dados]) => `
      <tr>
        <td>${escaparHtml(vendedor)}</td>
        <td>${dados.quantidade}</td>
        <td>${formatarMoeda(dados.total)}</td>
      </tr>`,
    )
    .join('');

  document.getElementById('tabelaVendas').innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Vendedor</th><th>Vendas</th><th>Comissão total</th></tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>`;
};

export const inicializarComissoes = () => {
  document
    .getElementById('calcularComissao')
    .addEventListener('click', calcularComissao);
  document
    .getElementById('mostrarVendas')
    .addEventListener('click', mostrarVendas);
};
