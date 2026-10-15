# Target-Sistemas

Projeto com três exercícios interativos em JavaScript:

- Cálculo de comissão de vendas;
- Controle de movimentação de estoque;
- Cálculo de multa por atraso.

## Organização do código

- `src/js/main.js`: inicializa os exercícios e a navegação entre abas;
- `src/js/exercicios/`: lógica separada para comissões, estoque e juros;
- `src/js/utils/formatacao.js`: funções reutilizáveis de formatação.

## Baixar o projeto

Clone o repositório pelo terminal:

```bash
git clone git@github.com:Wilian-Pereira-W/Target-Sistemas.git
cd Target-Sistemas
```

Se não tiver uma chave SSH configurada no GitHub, use HTTPS:

```bash
git clone https://github.com/Wilian-Pereira-W/Target-Sistemas.git
cd Target-Sistemas
```

## Executar o projeto

Use o servidor local para carregar corretamente o HTML, o CSS e o JavaScript. Com o [Node.js](https://nodejs.org/) instalado, execute na pasta do repositório:

```bash
node server.js
```

Quando aparecer a mensagem `Servidor disponível em http://localhost:8000`, acesse [http://localhost:8000/src/desafio_interativo.html](http://localhost:8000/src/desafio_interativo.html) no navegador. Mantenha o terminal aberto enquanto usa o projeto; para encerrar o servidor, pressione `Ctrl+C`.

Não abra o HTML diretamente como arquivo (`file://`), pois alguns navegadores ou configurações podem bloquear o carregamento dos arquivos CSS e JavaScript locais.
