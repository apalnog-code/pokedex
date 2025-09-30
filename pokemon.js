document.addEventListener("DOMContentLoaded", main);

function main(){

    let tiposDIV = document.querySelector(".tipos");
    let pokemonsTipoDIV = document.querySelector(".pokemonsTipo");
    let infoPokemonDIV = document.querySelector(".infoPokemon");
    let btnVolver = document.querySelector("form button");
    let btNListado = document.querySelector(".listado");

    function cargarTipos(){

        let solicitud = crearSolicitud();
        let urlTipos = 'https://pokeapi.co/api/v2/type/';
        solicitud.open("GET", urlTipos);

        solicitud.addEventListener("load", (e) => {

            if(e.target.status == 200){

                try {
                    
                    let tipos = JSON.parse(solicitud.response);
                    pokemonsTipoDIV.classList.add("nover");
                    infoPokemonDIV.classList.add("nover");
                    tipos.results.forEach(element => {
                        
                    if(element.name != "stellar" && element.name != "unknown"){

                        let numero = element.url.split("/")[(element.url.split("/").length)-2];
                        let main = document.createElement("main");
                        let div = document.createElement("div");

                        div.style.backgroundImage = `url(imagenes/${element.name}.png)`;
                        let h4 = document.createElement("h4");
                        h4.textContent = element.name;
                        main.append(div, h4);

                        btNListado.classList.add("nover");

                            tiposDIV.append(main);

                            main.addEventListener("click", ()=> {
                                mostrarInformacionTipo(numero);
                            });

                    }

                    });

                } catch (error) {
                    alert(error);
                }

            }

        });

        solicitud.send();

    }

    cargarTipos();

    function mostrarInformacionTipo(TIPOSELECCIONADO){

        let solicitud = crearSolicitud();
        let urlTipoSeleccionado = `https://pokeapi.co/api/v2/type/${TIPOSELECCIONADO}/`;
        solicitud.open("GET", urlTipoSeleccionado);

        solicitud.addEventListener("load", (e) => {

            if(e.target.status == 200){

                let tipo = JSON.parse(solicitud.response);
                pokemonsTipoDIV.innerHTML = "";
                pokemonsTipoDIV.classList.remove("nover");
                tiposDIV.classList.add("nover");
                btNListado.classList.add("nover");
                infoPokemonDIV.classList.add("nover");

                tipo.pokemon.forEach(element => {
                    
                    let main = document.createElement("main");
                    let div = document.createElement("div");
                    let h4 = document.createElement("h4");
                    h4.textContent = element.pokemon.name;

                    function cargarFoto(){

                        let solicitud = crearSolicitud();
                        let url = element.pokemon.url;
                        solicitud.open("GET", url);

                        solicitud.addEventListener("load", (e) => {

                            if(e.target.status == 200){

                                let informacion = JSON.parse(solicitud.response);
                                let foto = informacion.sprites.front_default;
                                div.style.backgroundImage = `url(${foto})`;
                                main.append(div, h4);
                                pokemonsTipoDIV.append(main);

                            }

                        });

                        solicitud.send();

                    }

                    cargarFoto();

                    main.addEventListener("click", function(){
                        mostrarInformacionPokemon(element.pokemon.url.split("/")[element.pokemon.url.split("/").length - 2]);
                        infoPokemonDIV.classList.remove("nover");
                    });

                });


            }

        });

        solicitud.send();

    }


    function mostrarInformacionPokemon(IDPOKEMON){

        let solicitud = crearSolicitud();
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${IDPOKEMON}/`;
        solicitud.open("GET", urlPokemon);

        solicitud.addEventListener("load", (e) => {

            if(e.target.status == 200){
                    
                    let pokemon = JSON.parse(solicitud.response);
                    console.log(pokemon);
                    infoPokemonDIV.innerHTML = "";
                    pokemonsTipoDIV.classList.add("nover");

                    let div = document.createElement("div");
                    let h1 = document.createElement("h1");

                    let divHabilidades = document.createElement("div");
                    divHabilidades.classList.add("estadisticas");
                    let h2Habilidades = document.createElement("h2");
                    h2Habilidades.textContent = "Habilidades";
                    divHabilidades.append(h2Habilidades);
                    let habilidades = pokemon.abilities;
                    habilidades.forEach(element => {
                        let p = document.createElement("p");
                        p.textContent = element.ability.name;
                        divHabilidades.append(p);
                    });


                    let imagenesDIV = document.createElement("div");
                    let h2imagenes = document.createElement("h2");
                    h2imagenes.textContent = "Imágenes";
                    imagenesDIV.append(h2imagenes);
                    imagenesDIV.classList.add("estadisticas");

                    let fotoback = document.createElement("img");
                    fotoback.src = pokemon.sprites.back_default || "";
                    let front_shiny = document.createElement("img");
                    front_shiny.src = pokemon.sprites.front_shiny || "";
                    imagenesDIV.append(fotoback, front_shiny);                   

                    btNListado.classList.remove("nover");

                    btNListado.addEventListener("click", function(e){
                        e.preventDefault();
                        pokemonsTipoDIV.classList.remove("nover");
                        btNListado.classList.add("nover");
                        infoPokemonDIV.classList.add("nover");
                    });

                    let imagen = document.createElement("img");

                    h1.textContent = pokemon.name;
                    imagen.classList.add("pokemon-img");
                    imagen.src = pokemon.sprites.front_default;
                    div.append(h1, imagen);
                    infoPokemonDIV.append(div, divHabilidades, imagenesDIV);

            }

        });

        solicitud.send();

    }

    if(btnVolver){
        btnVolver.addEventListener("click", function(){
            window.location.reload();
        });
    }

}

function crearSolicitud(){

    let solicitud = "";

    try {
        solicitud = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MicrosoftXMLHTTP");
    } catch (error) {
        alert(error);
    }

    return solicitud;

}