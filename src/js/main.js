import { inicializarComissoes } from './exercicios/comissoes.js';
import { inicializarEstoque } from './exercicios/estoque.js';
import { inicializarJuros } from './exercicios/juros.js';

const inicializarNavegacao = () => {
  const abas = document.querySelectorAll('.tab');
  const paineis = document.querySelectorAll('.panel');

  abas.forEach((aba) => {
    aba.addEventListener('click', () => {
      abas.forEach((item) => item.classList.toggle('active', item === aba));
      paineis.forEach((painel) => {
        painel.classList.toggle('active', painel.id === aba.dataset.tab);
      });
    });
  });
};

inicializarNavegacao();
inicializarComissoes();
inicializarEstoque();
inicializarJuros();
