const estoqueInicial = [
  { codigo: 101, nome: 'Caneta Azul', qtd: 150 },
  { codigo: 102, nome: 'Caderno Universitário', qtd: 75 },
  { codigo: 103, nome: 'Borracha Branca', qtd: 200 },
  { codigo: 104, nome: 'Lápis Preto HB', qtd: 320 },
  { codigo: 105, nome: 'Marcador de Texto Amarelo', qtd: 90 },
];

let movimentos = [];
let proximoId = 1;

const copiarEstoqueInicial = () => {
  return estoqueInicial.map((produto) => ({ ...produto }));
};

let estoque = copiarEstoqueInicial();

const renderizarEstoque = () => {
  const linhasEstoque = estoque
    .map(
      (produto) => `
      <tr>
        <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
        <td>${produto.qtd}</td>
      </tr>`,
    )
    .join('');

  document.getElementById('tabelaEstoque').innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Código</th><th>Produto</th><th>Quantidade atual</th></tr></thead>
        <tbody>${linhasEstoque}</tbody>
      </table>
    </div>`;

  const linhasMovimentos = movimentos
    .slice()
    .reverse()
    .map(
      (movimento) => `
      <tr>
        <td>${movimento.id}</td>
        <td>${movimento.nome}</td>
        <td>${movimento.tipo}</td>
        <td>${movimento.qtd}</td>
        <td>${movimento.desc}</td>
        <td>${movimento.final}</td>
      </tr>`,
    )
    .join('');

  document.getElementById('historicoMovimentos').innerHTML = movimentos.length
    ? `<div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Produto</th><th>Tipo</th><th>Qtd.</th><th>Descrição</th><th>Estoque final</th></tr></thead>
          <tbody>${linhasMovimentos}</tbody>
        </table>
      </div>`
    : '<p class="muted">Nenhuma movimentação registrada.</p>';
};

const registrarMovimento = () => {
  const codigo = Number(document.getElementById('produto').value);
  const tipo = document.getElementById('tipoMovimento').value;
  const quantidade = Number(document.getElementById('quantidade').value);
  const descricao = document.getElementById('descricaoMovimento').value.trim();
  const produto = estoque.find((item) => item.codigo === codigo);
  const resultado = document.getElementById('resultadoEstoque');

  if (!Number.isInteger(quantidade) || quantidade <= 0 || !descricao) {
    resultado.innerHTML =
      '<div class="result error">Informe uma quantidade inteira maior que zero e uma descrição.</div>';
    return;
  }

  if (tipo === 'saida' && quantidade > produto.qtd) {
    resultado.innerHTML = `<div class="result error">Estoque insuficiente. Quantidade disponível: ${produto.qtd}.</div>`;
    return;
  }

  produto.qtd += tipo === 'entrada' ? quantidade : -quantidade;
  movimentos.push({
    id: proximoId++,
    codigo,
    nome: produto.nome,
    tipo: tipo === 'entrada' ? 'Entrada' : 'Saída',
    qtd: quantidade,
    desc: descricao,
    final: produto.qtd,
  });

  const movimento = movimentos[movimentos.length - 1];
  resultado.innerHTML = `
    <div class="result">
      Movimentação <strong>#${movimento.id}</strong> registrada.<br>
      Produto: ${produto.nome}<br>
      Estoque final: <span class="stat">${produto.qtd} unidades</span>
    </div>`;

  document.getElementById('quantidade').value = '';
  document.getElementById('descricaoMovimento').value = '';
  renderizarEstoque();
};

const reiniciarEstoque = () => {
  estoque = copiarEstoqueInicial();
  movimentos = [];
  proximoId = 1;
  document.getElementById('resultadoEstoque').innerHTML =
    '<div class="result">Estoque inicial restaurado.</div>';
  renderizarEstoque();
};

export const inicializarEstoque = () => {
  document
    .getElementById('registrarMovimento')
    .addEventListener('click', registrarMovimento);
  document
    .getElementById('reiniciarEstoque')
    .addEventListener('click', reiniciarEstoque);
  renderizarEstoque();
};
