import * as Vue from "./vue.js";

Vue.createApp({
    // data ist das Daten Objekt, das entsprechend Daten speichert
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            spinner: false
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
        clickHandler: function () {
            this.spinner = true;
            // console.log("this in function", this);

            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            fd.append("file", this.file);
            fetch('/upload', {
                method: 'POST',
                body: fd
            }).then(res => res.json())
                .then((result) => {
                    console.log("result", result);
                })
                .catch(console.log());
            this.title = "";
            this.description = "";
            this.username = "";
            this.file = null;

        },
        fileSelectHandler: function (e) {
            console.log("event Object", e);
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
