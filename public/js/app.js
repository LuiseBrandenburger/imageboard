import * as Vue from './vue.js';

Vue.createApp({
    /*
    The fields you specify in the object returned by 
    the data method will be copied to your Vue app. 
    Of course, a Vue app is just a Javascript object 
    and you could add properties to it directly in the 
    normal way. However, if you add them via the object 
    returned by the data function of the object you 
    pass to createApp, they will be reactive properties. 
    If their values change during the lifetime of your app, 
    the UI will automatically update to reflect the change. 
    For this reason, all properties you use in your HTML 
    should be in the object returned by the data function. 
    If you don't have a value for the property at the time 
    you are calling createApp, you should use a placeholder 
    value such as an empty string or null.
    */
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
            /*
            
            You can add to your Vue app methods to be called in event handlers (or elsewhere) 
            by FIXME: adding a methods property to the object you pass to the constructor.
            
             */
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