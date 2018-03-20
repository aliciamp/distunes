const $ = require("jquery");

export class UIManager {

    //El selector es el song-list
    constructor(selector) {
        //Para eliminar el estado en el que está y colocar el que quieres tú
        this.uiStateClasses = "empty loading error partial ideal";
        //La variable element es el song-list. Al ponerlo aquí nos ahorramos escribirlo siempre. Para nosotros se 
        //llama selector. 
        this.element = $(selector);
    }

    //Borra todas las clases (alguna de estas la tendrá). Lo hacemos con los 5 estados
    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass("error");
    }
 
    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass("empty");
    }

    setPartial() {
        this.element.removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass("ideal");
    }

    //Métodos para rellenar el html de todos los ui-status
    //El método find busca en todos los descendientes de la clase element
    setIdealHtml(html) {
        this.element.find(".ui-status.ideal").html(html);
    }

    setEmptyHtml(html) {
        this.element.find(".ui-status.empty").html(html);
    }

    setLoadingHtml(html) {
        this.element.find(".ui-status.loading").html(html);
    }

    setErrorHtml(html) {
        this.element.find(".ui-status.error").html(html);
    }

    setPartialHtml(html) {
        this.element.find(".ui-status.partial").html(html);
    }
}