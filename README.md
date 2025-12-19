<h1 align="center"> Movie and Serie Search - OMDb API </h1>

<h1 align="center"><a href="https://hellenpaula.github.io/movies-and-series-search/" target="_blank"> 📍 Veja o projeto aqui!</a> </h1>

## 📷 Preview do projeto:
<h1 align="center"><img src="src\img\projeto-movie-search-video.gif" width="600px"> </img></h1>

## 📌 Sobre:
Este é um projeto de busca de **filmes e séries** desenvolvido com **HTML, CSS e JavaScript**, utilizando a **API pública OMDb (Open Movie Database)** para buscar informações completas de filmes e séries em tempo real.

Durante o desenvolvimento, trabalhei conceitos importantes como consumo de APIs externas, requisições assíncronas com fetch, manipulação do DOM, renderização dinâmica de listas, tratamento de erros, uso de loaders, organização da lógica em funções e controle de estados da interface.

O foco principal do projeto foi treinar a **integração entre JavaScript e APIs**.

## 🧩 Funcionalidades:
- Busca de filmes e séries pelo nome.

- Exibição dinâmica de uma lista de sugestões conforme o usuário digita.

- Seleção de um filme da lista para carregar informações completas.

- Exibição do poster do filme (com tratamento de erro para imagem não encontrada).

- Exibição detalhada das informações, como: título, descrição e atores.

- Loader animado durante as requisições.

- Tratamento de erros:
  - Input vazio
  - Filme não encontrado
  - Erro na Api
  - Imagem não carregada

- Layout responsivo em diferentes tipos de tela.

## 💻 Tecnologias utilizadas:
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Estrutura semântica da aplicação.

- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Estilização, responsividade, layout e animações.

- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Lógica da aplicação, eventos, requisições à API e manipulação do DOM.

- [OMDb API](https://www.omdbapi.com/) - Fonte dos dados de filmes e séries.

- [Font Awesome](https://fontawesome.com/) - Ícones utilizados na interface.

- [Google Fonts](https://fonts.google.com/) - Tipografia do projeto.

## ⚙️ Fluxo lógico da aplicação:
A aplicação funciona com base em três fluxos principais: busca, seleção e exibição de dados.

1️⃣ **Captura de eventos**

- O campo de busca escuta o evento keyup para exibir a lista de filmes conforme o usuário digita.

- O ícone de busca (click) valida o input e dispara a busca manual.

- Cada item da lista possui um evento de click para carregar o filme selecionado.

2️⃣ **Validação de entrada**

Antes de realizar qualquer requisição:

- Se o input estiver vazio → exibe mensagem de erro e imagem personalizada.

- Remove informações antigas da tela.

- Oculta listas e seções que não devem aparecer naquele estado.

Isso evita requisições desnecessárias e melhora a experiência do usuário.

3️⃣ **Requisição à API (lista de filmes)**

- Um fetch é feito para a rota de busca (s=) da OMDb API.

- A resposta é convertida para JSON.

- Os resultados são percorridos e renderizados dinamicamente na lista.


4️⃣ **Requisição por ID (detalhes do filme)**

- Ao clicar em um filme da lista, é feita uma nova requisição usando o **imdbID**.

- Os dados completos do filme são retornados.

- A descrição (plot) é tratada para exibição resumida.

- O loader é exibido enquanto os dados são carregados.

5️⃣ **Exibição na interface**

- A interface é atualizada dinamicamente com: Poster do filme, Título, Ano....

- Se o poster não carregar, uma imagem alternativa é exibida.

6️⃣ **Tratamento de erros**

- Exibição de mensagens de erro amigáveis.

- Imagens personalizadas para falhas.

- Loader é removido corretamente em caso de erro.

## 🧠 Aprendizados:

Durante o desenvolvimento deste projeto, pude reforçar e praticar:

- Consumo de APIs REST com **fetch**.

- Uso de **async/await** e **Promises**.

- Manipulação de respostas **JSON**.

- Renderização dinâmica de listas.

- Manipulação avançada do **DOM**.

- Tratamento de erros com **try...catch**.

- Controle de estados da interface (loader, erro, conteúdo).

- Organização do código em funções reutilizáveis.

- Responsividade e experiência do usuário.

## 🚀 Melhorias futuras:
- Paginação dos resultados da busca, com exibição dos filmes em formato de vitrine (cards).

- Filtro por tipo(filme ou série), gênero ou data de lançamento.

- Tema claro / escuro.

- Animações suaves.
