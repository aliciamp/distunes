//Gestiona UIManager y SongsService
import { UIManager } from "./UIManager";

export class SongsListManager extends UIManager{
    
    constructor(elementSelector, songsService, pubsub) {
        super(elementSelector);
        this.songsService = songsService;
        this.pubsub = pubsub; 
    }
    
    
    init() {
        this.loadSongs();
        //creamos variable para solucionar el problema del this dentro de la function
        let self = this;

        //Si das click dentro de la clase song (todos los artículos, la cajita)
        //Si utilizamos una función tipo arrow, el this hace referencia a la clase entera
        //Si la hacemos de la otra forma, el this hace referencia a los artículos por separado
        this.element.on("click", ".delete", function() {
            //Voy a acceder al id de la canción, para poder borrarlo.
            //this hace referencia a la clase, en este caso, todas las canciones
            //El this primero hace referencia al de dentro del function. El self hace referencia al this de fuera
            //parentNode es para acceder al padre
            let songId = this.parentNode.dataset.id; 
            self.deleteSong(songId);
        });

        //Cuando clickes a la img, te vas a otra pantalla
        this.element.on("click", ".cover", function(){
            location.href = "detail.html";
        });

        //(a qué notificación me suscribo (previamente creada), función de lo que tiene que hacer para recibir datos)
        //Información técnica para el programador (topic)
        this.pubsub.subscribe("new-song", (topic, song) => {
            this.loadSongs();
        });
    }
    
    loadSongs() {
        //llamo a la instancia y a su método list 
        this.songsService.list(songs => {
            
            if(songs.length == 0) {
                //Hemos llamado al método creado en UIManager para cambiar los estados
                this.setEmpty();
            } else {
                this.renderSongs(songs);
                this.setIdeal();
                
            }}, error => {
                this.setError();
            });
            
        }
        
        renderSongs(songs){
            let html = "";
            
            //Recorre toda la lista songs con la variable i (se puede hacer de la forma normal (let i; i<length.songs; i++))
            for (let song of songs){
                //Metemos el código que va a meterse en el estado del songs-list creando una variable
                //Metemos el parámetro llamando a la lista y a sus atributos .dnsnfsdl 
                //RECUERDA: Se pone entre `` porque estás llamando a variables con ${}
                html += this.renderSong(song);
            }
            
            //Accedo a la clase. La clase grande es la primera, el resto son hijos
            //$(".song-list .ui-status.ideal").html(html);
            //Cambiamos la línea anterior por la que se ve a continuación y que hemos editado en la clase UIManager
            this.setIdealHtml(html);
        }
        
        //Se me recargan todas las canciones, una detrás de otra
    renderSong(song) {

        //Añadimos una variable de la cover para poder subir una img por defecto si el cliente no pone foto
        let cover_url = song.cover_url;

        //Si el hueco de la cover está vacía (no hay cover), se colocará el disk predeterminado
        if (cover_url == "") {
            cover_url = "./img/disk.png";
        }

        //Creamos un data del id para poder detectar el id de estos
        return `<article class="song" data-id="${song.id}">
        <img class="cover" src="${cover_url}" alt="${song.artist}">
        <div class="artist">${song.artist}</div>
        <div class="title">${song.title}</div>
        <span class="delete">REMOVE</span>
        </article>`;
        }

        deleteSong(songId){
            //Siempre que hago una petición, ponemos el estado de carga
            this.setLoading();
            this.songsService.delete(songId, success => {
                this.loadSongs();
            }, error => {
                this.setError();
            });
        }
    }