import * as Vue from './vue.js';

Vue.createApp({
    // data ist das Daten Objekt, das entsprechend Daten speichert
    data() {
        return {
            images: [],
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
        emphasize: function (e) {
            e.target.style.textDecoration = "underline";
            // this.count = this.count ? this.count + 1 : 1;
        },
        deemphasize: function (e) {
            e.target.style.textDecoration = "";
            // this.logCount();
        },
    },
}).mount("#main");