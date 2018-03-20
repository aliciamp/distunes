const $ = require("jquery");

//export es para poder llamar a la clase desde otro archivo
export class SongsService {
    //Lo primero es siempre el constructor
    constructor(url) {
        this.url = url;
    }

    list (successCallback, errorCallback) {

        $.ajax({
            //No necesito poner el localhost porque ya esta puesto en el pck.json
            url: this.url, 
            //Vas a la url a por datos. Cuando ha conseguido los datos, se ejecuta el succes (porque lo ha conseguido) en el que dibujo los datos
            success: successCallback,
            error: errorCallback
        });
    }
    

    save(song, successCallback, errorCallback) {
        //Va a llamar a update o a create, porque son los métodos que crean canciones
        //Cuando tiene id es porque la canción ya está creada, la estás actualizando. Sino, es porque es nueva
        if (song.id) {
            this.update(song, successCallback, errorCallback);
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }

    create(song, successCallback, errorCallback) {
        $.ajax({
            url: this.url, 
            method: "post", //Método de subir
            data: song, //Le pasamos la canción actualizada
            success: successCallback,
            error: errorCallback
        });
    }

    getDetail(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`, //La barra de enmedio ya está puesta en la url base
            success: successCallback,
            error: errorCallback
        });
    }

    update(song, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${song.id}`, 
            method: "put", //Método de actualizar
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    delete(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            method: "delete", //Método para eliminar
            success: successCallback,
            error: errorCallback
        });

    }
}