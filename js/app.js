//Variables
const listaTweets = document.getElementById('lista-tweets');
const textarea = document.querySelector('#tweet');
const mensaje = document.querySelector('.mensaje');
const teclaEnter = 13;

//Event Listeners
eventListeners();

function eventListeners(){
    //Evento cuando se envie formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click',borrarTweet);

    //Evento que carga los tweets almacenados en el DOM
    document.addEventListener('DOMContentLoaded', localStorageListo);
    
    //Evento que limpia el campo 
    document.querySelector('#formulario').addEventListener('submit', limpiarCampo);

    textarea.addEventListener('keypress',function(e){
        if(e.keyCode == teclaEnter){
            agregarTweet();
            limpiarCampo();
        }
    })
}

//Funciones
//Añade tweet del formulario
function agregarTweet(e){
    //e.preventDefault();
    
    //lee el valor del textarea
    const tweet = document.getElementById('tweet').value;

    if(tweet === ''){
        mensaje.innerText = 'El campo de tareas esta vacio';
        mensaje.style.color = 'white';
        mensaje.style.backgroundColor = 'red';

        textarea.addEventListener('keypress', validacionMensaje)
        
    } else {

        //se crea el boton de eliminar tweet
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y añadirle el contenido a la vista
        const li = document.createElement('li');
        li.innerText = tweet;

        //Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);

        //Añade el tweet a la lista
        listaTweets.appendChild(li);

        //Añadir a local Storage
        agregarTweetLocalStorage(tweet);
    }
}
//Borrar tweets
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}
//Mostrar datos de localstorage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
         //se crea el boton de eliminar tweet
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y añadirle el contenido a la vista
        const li = document.createElement('li');
        li.innerText = tweet;

        //Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);

        //Añade el tweet a la lista
        listaTweets.appendChild(li);

    });
}

//agrega tweet a local
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añade el nuevo tweet
    tweets.push(tweet);
    //Convierte de string a arreglo para el local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Comprueba que exista elementos en localstorage
function obtenerTweetsLocalStorage (){
    let tweets;

    //Revisamos valores de local Storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
return tweets;
}

//Eliminar del localstorage
function borrarTweetLocalStorage(tweet){
    let tweets,tweetBorrar;

    tweetBorrar = tweet.substring(0, tweet.length - 1);
    //Elimina la X del tweet
    tweets = obtenerTweetsLocalStorage();

    //Borra del arreglo el tweet
    tweets.some(function(tweet,index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);

            return index === index;
        }
    });
    //Inserta los tweets que no fueron eliminados
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function limpiarCampo(){
    textarea.value = '';
}

function validacionMensaje(){
    mensaje.innerText = '';
    mensaje.style.backgroundColor = '';
}