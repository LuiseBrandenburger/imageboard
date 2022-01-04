import * as Vue from './vue.js';

Vue.createApp({
    // data ist das Daten Objekt, das entsprechend Daten speichert
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
        };
    },
    mounted() {
        fetch("/get-imageboard-data")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from fetch", data);
                this.images = data;
            });
    },
    methods: {
        clickHandler: function(e) {
            console.log("this in function", this);
        }
    },
}).mount("#main");