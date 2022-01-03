import * as Vue from './vue.js';

Vue.createApp({
    // data ist das Daten Objekt, das entsprechend Daten speichert
    data() {
        return {
            heading: "My Vue App",
            headingClassName: "heading",
            randomNum: function () {
                return Math.floor(Math.random() * 10);
            },
            firstName: "Luise",
            lastName: "Irgendwas",
            navbarItems: {
                about: "About",
                home: "Home",
                contact: "Contact",
            },
            people: [
                {
                    name: "luise",
                    age: 36,
                    homepage: "http//www.blah.com",
                },
                {
                    name: "Michi",
                    age: 33,
                    homepage: "http//www.michi.com",
                },
                {
                    name: "Sophie",
                    age: 34,
                    homepage: "http//www.sophie.com",
                },
            ],
            greeting: "",
        };
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
        logCount: function () {
            // console.log(this.count);
        },
    },
}).mount("#main");