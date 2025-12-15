// fazer:

// criar layout melhor;

// mostrar imagem de erro;

// funcionalidade de click ao clicar nos elementos
//  da lista direcionar até eles;

// aplicar loader mais moderno;

// organizar código;



// PROJETO BUSCADOR DE FILMES - OMDb API
// api_key = bb2ebd7c;

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
const loader = document.querySelector(".searchLoader");
const msgError = document.querySelector(".msgError");
// const input = document.querySelector("#input").value;
const input = document.querySelector("#input");

// list:
const searchList = document.querySelector(".container-search-list");

searchIcon.addEventListener("click", validarInput);
    // console.log("click");

input.addEventListener("keyup", findMovies);


function findMovies() {
    const inputValue = input.value.trim();
    // console.log(inputValue);

    //verifica se o input está vazio ou não, se tiver um dado mostra a lista de filmes, senao retira a lista de filmes: 
    if (inputValue.length > 0) {
        searchList.classList.remove("hide-search-list");
        console.log(inputValue);
    } else {
        console.log("valor não encontrado");
        searchList.classList.add("hide-search-list");
    }


}



function validarInput() {


    // ao clicar, limpe a msg de erro, adicione o carregamento e remova a seção com infos do filme;
    msgError.textContent = "";
    loader.classList.add("showLoader");
    movieArea.classList.remove("showSection");


    const input = document.querySelector("#input").value;

    if (input === "") {
        // se vazio, msg de erro e loader sai
            msgError.textContent = "Não encontrado!";
            loader.classList.remove("showLoader");

       
       
        throw Error("input vazio");
        
    } else if (!input) {
        loader.classList.remove("showLoader");
        msgError.textContent = "Não encontrado!"
        throw new Error("valor inválido!");
        
    } else {
        console.log("Valor válido: " + input);
           
       
// requisição infos:
fetch(`http://omdbapi.com/?apikey=bb2ebd7c&t=${input}`)

.then(response => {
    console.log(response);
    if (!response.ok) {
        throw new Error("erro na response")
    }
    return response.json();

})
.then(data => {
    if (data.Response === "False") {
        // erro na requisição(mensagem de erro e tirar loader)
        loader.classList.remove("showLoader");
        msgError.textContent = "Não encontrado!";

        throw new Error("erro no json");
        
    } 
    console.log(data);


    // objeto info film:
    const objAPI = {
        filmName: data.Title,
        year: data.Year,
        ratings: data.Rated,
        genre: data.Genre,
        writer: data.Writer,
        actors: data.Actors,
        plot: data.Plot,
        language: data.Language,
        nominated: data.Awards,
    }

    // mostrar informações do filme ao receber a requisição:
    movieArea.classList.add("showSection");
    loader.classList.remove("showLoader");
    // config nome do filme:
    // console.log(objAPI.filmName);
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
.catch( error => {
    console.log("erro: " + error.message);
})

// requisição img:

fetch(`https://api.themoviedb.org/3/search/movie api_key=83e6f8696397a34fe7476a4abded4c9a&query=${input}`)

.then(response2 => {
    return response2.json();
})
.then(data2 => {
    console.log(data2);

    const poster = data2.results[0].poster_path;
    const img = `https://image.tmdb.org/t/p/w500${poster}`;

    // colocar url da imagem na tag do html;
    const imgTag = document.querySelector("#img");
    imgTag.setAttribute("src", img);
    console.log(img);

})
.catch(error => {
    console.log("erro api imagem");
})

}
        
    }

