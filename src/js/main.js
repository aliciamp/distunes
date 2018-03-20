//Así se hace la línea de abajo ahora. Pero jquery no se ha actualizado así que aun no funciona
// import { jQuery } from "jquery"

//Vamos a utilizar jquery, y hacemos referencia a esta
window.$ = window.jQuery = require("jquery");

//Selecciona la etiqueta header
//.on (lo que tiene que pasar, lo que pasa)
$("header").on("click", function() { 
    console.log ("He clickado el header");
    //Entramos en el css de la clase y cambiamos fondo a rojo
    //Primero es a lo que accedemos, y luego a qué color lo cambiamos
    $(".web-header").css("background","red");
})

//Accedemos a elementos del DOM. A la clase creada por nosotros en este caso
//Hacemos referencia al texto de la clase
$(".web-title").text("hola");

//Añadimos un atributo (lo que queremos meter, el nombre que ponemos)
// $("button").attr("id", "boton");

//Quitamos la clase ideal para cambiarla a loading
//$(".song-list").removeClass("ideal").addClass("loading");

//____________________________________________________________

//Importamos todos nuestros archivos {Nombre de la clase} from "recorrdio para llegar a ella" (./ es quedarse donde estás)
import { SongsService } from "./SongsService"
// import { UIManager } from "./UIManager"
import { SongsListManager } from "./SongsListManager"
import { SongFormManager } from "./SongFormManager"

//Al estar en nodemodules se escribe así, porque ya está descargado. 
//El pubsub lo vamos a utilizar para no necesitar recargar la página para que me aparezcan las canciones que guardo
import PubSub from "pubsub-js";

//Creamos una instancia de la clase
const songsService = new SongsService ("/songs/");
// const songsListUIManager = new UIManager (".song-list");

//Le añadimos otro parámetro, el pubsub, porque va a utilizarla (para recibir mensajes)
const songsListManager = new SongsListManager (".song-list", songsService, PubSub);

songsListManager.init();

//Le añadimos otro parámetro, el pubsub, porque va a utilizarla (para emitir mensajes)
//Añadimos el parámetro con inyección de dependencias 
const songFormManager = new SongFormManager(".song-form", songsService, PubSub);

songFormManager.init(); 


