// const $ = require("jquery");

import { UIManager } from "./UIManager";

//extends es para heredar todo lo de UIManager. Tiene todo lo de UIManager y además más cosas que añades
export class SongFormManager extends UIManager {
    constructor(elementSelector, songsService, pubsub) {
        //Llamo a la clase del padre (heredará, por tanto, los dos this que hay en UIManager), y además, le sumamos otra variable
        super(elementSelector);
        this.songsService = songsService;
        this.pubsub = pubsub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        //element es una variable que está en uimanager. Como esta clase hereda todo lo suyo, tendrá el element 
        //elemento submit --> cuando alguien le da a un botón
        this.element.on("submit", () => {
            // Validar datos
            this.validateAndSendData();
            //Para que si una persona le da muchas veces al botón, no se cree 20 veces. Porque mientras se
            // validan los datos, el programa sigue leyendo líneas de código. 
            return false;
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            //Si es verdadero, enviaremos datos
            this.send();
        } 
    }

    isValid() {
        //Buscamos los inputs del html del formulario
        const inputs = this.element.find("input");
        for(let input of inputs) {
            if (input.checkValidity() == false) { //checkValidity es palabra del programa
                const errorMessage = input.validationMessage;
                //Si le digo que lo ha hecho mal, le tengo que iluminar el cuadrado que ha hecho mal
                input.focus();
                //El mensaje de error se verá en el html
                this.setErrorHtml(errorMessage);
                //Cambiará al estado error
                this.setError();
                //Así no sigue adelante el programa
                return false; 
            }
        }

        this.setIdeal();
        return true;
    }

    enableFormControls() {
        //Siempre que le das a un botón, el attr del botón no se desactiva.
        this.element.find("input, button").attr("disabled", false);
    }

    disableFormControls() {
        //Desactivamos el formulario.
        this.element.find("input, button").attr("disabled", true);
    }

    //Sobreescribimos un método. Hace lo mismo que el padre (super), pero además hace más cosas
    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    send() {
        //Cuando le das al botón se pone a cargar hasta que lleguen los datos al servidor
        this.setLoading();

        const song = {
            //this.element es el selector del form
            //val es una palabra de js que valida
            artist: this.element.find("#artist").val(),
            title: this.element.find("#title").val(),
            cover_url: this.element.find("#cover_url").val()
        };

        //(datos que voy a salvar, éxito, fracaso)
        this.songsService.save(song, success => {
            //publish es un patrón del pubsub (nombre de la publicación, lo que publicas)
            this.pubsub.publish("new-song", song); 
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor");
            this.setError();
        });
        
    }

    resetForm() {
        //Resetea el formulario borrando el elemento 0
        //Función reset es del programa
        this.element[0].reset();
    }
}
