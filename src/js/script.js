// refazendo código;



// outra ideia:
// como estou usando o parametro 'search', ao colocar um valor no input e apertar no ícone de pesquisar, aparece todos os filmes que a api possui com esse nome(separado entre quadrados, como na netflix) deixando aparente todas as opções de filmes, e quando a pessoa clicar, ela é direcionada ao filme com suas informações;
// ESSA IDEIA SE ALINHA A IDEIA DE FAZER UM PROJETO DE PLATAFORMA DE STREAM. -> acrescentando um página inicial com alguns filmes e séries conhecidos, ou separando por gêneros, deixando o projeto não só com a opção de pesquisar filmes, mas como uma vitrine que também possuiria a área de pesquisa(pode ter plays de mentira nas fotos para ilustrar uma plataforma real);


// organizar código:
// - limpar de comentários desnecessários;
// - organizar css por áreas(ex: header, movie area, error), criar variáveis de cores;
// - organizar js com comentários, organizar melhorar funções;


// variaveis:
const searchIcon = document.querySelector("#searchIcon");
const api_keyTag = "bb2ebd7c"; 
const titleTag = document.querySelector("#title");
const yearTag = document.querySelector("#textYear");
const genreTag = document.querySelector("#textGenre");
const writerTag = document.querySelector("#writerText");
const actorTag = document.querySelector("#actorText");
const plotTag = document.querySelector("#plotText");
const languageTag = document.querySelector("#languageText");
const nominatedTag = document.querySelector("#textNominated");
const movieArea = document.querySelector(".movieArea");
const msgError = document.querySelector(".msgError");
const input = document.querySelector("#input");
const imgTag = document.querySelector("#img");
const msgInitialTag = document.querySelector(".msgInitial");
const divLoader = document.querySelector(".divLoader");
const loader = document.querySelector(".loader");

// list:
const searchList = document.querySelector(".container-search-list");
// precisa ser variável e não constante

let msgErrorList = document.querySelector(".msgErrorList");

// img para erros
const tagimgErrorPag = document.querySelector(".imgErrorPag");

// eventos:
searchIcon.addEventListener("click", validarInput);

input.addEventListener("keyup", findMovies);


// funções: 
function findMovies() {
    const inputValue = document.querySelector("#input").value

    //verifica se o input está vazio ou não, se tiver um dado mostra a lista de filmes, senao retira a lista de filmes: 
    if (inputValue.length > 0) {
        searchList.classList.remove("hide-search-list");
        // console.log(inputValue);

        // requestSearchList(inputValue)
        requestApiSearch(inputValue)
        .then(requestSearch => {
            console.log(requestSearch);
            if (!requestSearch.Response === "True") {
                
                throw new Error("erro na resposta da request da requestSearchList()");
            }

            const SearchElem = requestSearch.Search;
            searchList.innerHTML = "";
            for(let idx = 0; idx < SearchElem.length; idx++) { 
                const result = SearchElem[idx];

                const movieListItem = document.createElement("div");
                movieListItem.classList.add("search-item");


                movieListItem.dataset.id = result.imdbID;
                console.log(requestSearch);

              
    

   
                // if (result.Poster !== "N/A") {
                //     console.log("tem poster");
                //     moviePosterList = result.Poster;

                //  } else {

                //     console.log("ele não tem poster");
                //     moviePosterList.setAttribute("src", "src/img/errorImage.png");
                //     throw new Error("Imagem não encontrada");
                // } 

                // movieListItem.innerHTML = `
                // <img src= ${moviePosterList} alt="" class="img-search-item">
                // <p class="title-search-item">${result.Title}</p>
                // <p class="year-search-item">${result.Year}</p>`;

                movieListItem.innerHTML = `
                <img src="" alt="" class="img-search-item">
                <p class="title-search-item">${result.Title}</p>
                <p class="year-search-item">${result.Year}</p>`;

                 
                
                    movieListItem.addEventListener("click", (event) => {
                        // loader aparece
                        loader.classList.add("showLoader");
                        // area do filme desaparece
                        movieArea.classList.remove("ShowSection");
                        const imdbID = movieListItem.dataset.id;


                        loadMovieById(imdbID);

                        // appendInfo(targetElementList);
                        // appendImg(targetElementList);

                        // lista de filmes some ao clicar em um filme;
                        searchList.classList.add("hide-search-list");

                        msgInitialTag.classList.add("hide-msg-initial");

                        msgError.textContent = "";

                        tagimgErrorPag.classList.remove("showImgErrorPag");


                        // loader.classList.remove("showLoader");
                        // movieArea.classList.add("ShowSection");

                    });
                    searchList.appendChild(movieListItem);

                    // pegando a tag img, elemento filho da div movieListItem;
                    let imgMovieList = movieListItem.firstElementChild;
                    
                    // setando a imagem do poster fornecido pela API;
                    imgMovieList.setAttribute("src", result.Poster);
                    console.log(imgMovieList);
                    // console.log(imgMovieList);
                    // imgMovieList.setAttribute("src",result.Poster);
                    // console.log(imgMovieList);

                    // se carregar, mostra no console;
                    // o onload e onerror só funciona para tags(ex: img);
                    imgMovieList.onload = () => {
                    console.log("Poster lista Carregado");
                    }
    
                // se não carregar, mostra a mensagem de erro;
                    imgMovieList.onerror = () => {
                    console.log("Poster lista NÂO carregado");
                    imgMovieList.setAttribute("src", "src/img/errorImage.png");
                    }

                }
            
            
        })
        .catch(errS => {
            console.log("errS: " + errS.message);
        }) 

    } else {
        console.log("input vazio");
        searchList.classList.add("hide-search-list");
    }
}


async function requestApiInfoById(imdbID) {
    try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${api_keyTag}&i=${imdbID}&plot=full`);
        if (!res.ok) {
            throw new Error("Erro na res da API(i)");
        }
        const dataI = await res.json();
        if(dataI.Response === "False") {
            throw new Error("erro no json da API(i)");
        } 
        return dataI;

    }catch(err) {
        console.log("ERRO: " + err);
    }
}

function loadMovieById(imdbID) {
    movieArea.classList.remove("showSection");
    loader.classList.add("showLoader");
    requestApiInfoById(imdbID)
    .then(requestI => {
        console.log(requestI);
        if (!requestI) {
            loader.classList.remove("showLoader");
            throw new Error("não foi possível carregar o filme");
            
        }
    

    titleTag.textContent = requestI.Title;
    yearTag.textContent = requestI.Year;
    genreTag.textContent = requestI.Genre;
    writerTag.textContent = requestI.Writer;
    actorTag.textContent = requestI.Actors;

    const descricaoOriginal = requestI.Plot;
    const descricaoCurta = cortarDescricao(descricaoOriginal);
    plotTag.textContent = descricaoCurta;

    languageTag.textContent = requestI.Language;
    nominatedTag.textContent = requestI.Awards;
    
    // verificando carregamento de poster:
    const poster = requestI.Poster;
    // setando a imagem do poster fornecido pela API;
    imgTag.setAttribute("src", poster);

    // se carregar, mostra no console e
    imgTag.onload = () => {
        console.log("Poster Carregado");
    }
    // se não carregar, mostra a mensagem de erro;
    imgTag.onerror = () => {
        console.log("Poster NÂO carregado");
        imgTag.setAttribute("src", "src/img/img error page 3.png");
    }

    // if (requestI.Poster !== "N/A") {
    //     console.log("poster achado");
    //     // imgTag.setAttribute("src", requestI.Poster);
    // } else {
    //     console.log("poster Não achado");
    //     // imgTag.setAttribute("src", "src/img/errorImage.png");
    // }

    // após a requisição, a seção do filme aparece;
    movieArea.classList.add("showSection");

    // após a requisição, o loader desaparece;
    loader.classList.remove("showLoader");

    })
    .catch(err => {
        console.log("ERRO " + err);
    })
}

function cortarDescricao(plot) {
    if (!plot) {
        return "";
    }

    const primeiro = plot.indexOf(".");
    if (primeiro === -1) {
        return plot;
    }
    const segundo = plot.indexOf(".", primeiro + 1)
    if (segundo === -1){
        return plot.substring(0, primeiro + 1);
    } 
    return plot.substring(0, segundo + 1);
}

// function appendImgErrorPag() {
//     const tagImgErrorPag = document.createElement("img");
//     tagImgErrorPag.classList.add("imgErrorPag");
//     tagImgErrorPag.setAttribute("src","src/img/img error pag.svg");

//      if (document.querySelector(".imgErrorPag") === null) {
//             divLoader.insertBefore(tagImgErrorPag,msgError);
            
//         } else {
//             return;
//         }
// }

function validarInput() {
    // const tagImgErrorPag = document.createElement("img");
    // tagImgErrorPag.classList.add("imgErrorPag");
    // tagImgErrorPag.setAttribute("src","src/img/img error pag.svg");

    loader.classList.add("showLoader");
    // ao clicar, limpe a msg de erro, adicione o carregamento e remova a seção com infos do filme;
    msgError.textContent = "";
    
    
    
    // loader.style.display = "flex";
    movieArea.classList.remove("showSection");
    msgInitialTag.classList.add("hide-msg-initial");
    searchList.classList.add("hide-search-list");


    const inputValue = document.querySelector("#input").value;

    if (inputValue === "") {
        // se vazio, msg de erro e loader sai
        
        msgError.textContent = "Not Found.";
        loader.classList.remove("showLoader");
        tagimgErrorPag.classList.add("showImgErrorPag");
        // appendImgErrorPag();
        // if (document.querySelector(".imgErrorPag") === null) {
        //     divLoader.insertBefore(tagImgErrorPag,msgError);
            
        // } else {
        //     return;
        // }
        
        // loader.style.display = "none";

        throw Error("input vazio");
        
    } else if (!inputValue) {
        
        // loader.style.display = "none";
        msgError.textContent = "Não encontrado!";
        loader.classList.remove("showLoader");

        tagimgErrorPag.classList.add("showImgErrorPag");

        throw new Error("valor inválido!");
        
    } else {
        console.log("Valor válido: " + inputValue);
        

// then e catch da função de request 

        // requestApiSearch(inputValue)
        // .then(resS => {
        //     // const imdbID = Search
        // })

        // loadMovieById(imdbID);

        appendInfo(inputValue);
        appendImg(inputValue);
        searchList.classList.add("hide-search-list");
        // loader.classList.remove("showLoader");
}
}


// requisição img de filmes:
async function requestApiSearch(input) {
    try {
        const response2 = await fetch(`http://www.omdbapi.com/?apikey=bb2ebd7c&s=${input}`);
    
        if (!response2.ok) {
            throw new Error("erro na requisição de Search");
        } 
        
        const data2 = await response2.json();
        // console.log(data2);
        return data2;
        
    } catch(erro2) {
        // if (erro2.Search[0].Poster === "N/A") {
        //     console.log("o filme não tem poster");
        //     // return;
        // }
        console.log("erro2: " + erro2.message);
        
    }
}

// requisição informações de filmes: 
async function requestApiInfo(input){
    try {
    
    const response = await fetch(`http://omdbapi.com/?apikey=bb2ebd7c&t=${input}`);
    if (!response.ok) {
        throw new Error("erro na response");
    }
    const data = await response.json();
    console.log(data);
    
    return data;

    } catch(erro) {
        return "erro:" + erro.message;
    }
}

// função para aplicar elementos no site:
function appendInfo(input){
    requestApiInfo(input)
    .then(request => {

        const objAPI = {
            filmName: request.Title,
            year: request.Year,
            ratings: request.Rated,
            genre: request.Genre,
            writer: request.Writer,
            actors: request.Actors,
            plot: request.Plot,
            language: request.Language,
            nominated: request.Awards,
        }

    //mostrar informações do filme ao receber a requisição:
    movieArea.classList.add("showSection");
    loader.classList.remove("showLoader");
    tagimgErrorPag.classList.remove("showImgErrorPag");
    


    // config nome do filme:
    titleTag.textContent = objAPI.filmName;

    // config year:
    yearTag.textContent = objAPI.year;

    // config genre:
    genreTag.textContent = objAPI.genre;

    // config writer:
    writerTag.textContent = objAPI.writer;

    // config actors:
    actorTag.textContent = objAPI.actors;

    // config plot:
    plotTag.textContent = objAPI.plot;

    // config language:
    languageTag.textContent = objAPI.language;

    // config nominated:
    nominatedTag.textContent = objAPI.nominated;

   }) 
     .catch(errRequest => {
            console.log("erro na request: " + errRequest.message);
        })

}

// função para aplicar imagem no site:
function appendImg(input){
     requestApiSearch(input)
    .then(request2 => {
        console.log(request2);
        if (request2.Response === "False") {
            throw new Error("erro na response da appendImg")
        }



        // verificando carregamento de poster:
    
        const poster = request2.Search[0].Poster;
        console.log(poster);

         // setando a imagem do poster fornecido pela API;
        imgTag.setAttribute("src", poster);

         // se carregar, mostra no console
        imgTag.onload = function () {
            console.log("imagem carregada");
        }

         // se não carregar, mostra a mensagem de erro;
        imgTag.onerror = function () {
            console.log("Imagem não carregada");
            imgTag.setAttribute("src", "src/img/img error page 3.png");
        }

            
        
        // erro no poster:
        // (!poster.GET)
        // if (poster.Code === "404 Not Found") {
        //     // console.log("o filme não tem poster");
        //     console.log("ERRO 404");
        //     // imgTag.setAttribute("src", "src/img/errorImage.png" );
        //     throw new Error("Erro tipo 404, poster não encontrado");
            
        // } else {
        //     console.log("SEm erro");
        //     console.log(poster);
        //     imgTag.setAttribute("src", poster);

        // }
        
        
    })
    .catch(errRequest2 => {
        console.log("erro na request2: " + errRequest2.message);
        imgTag.setAttribute("src", "src/img/img error page 3.png" );
        
        
        
    })  
}

