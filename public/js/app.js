import * as Vue from "./vue.js";
import displayImgModal from "./displayImgModal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            spinner: false,
            imgClicked: false,
        };
    },
    mounted() {
        fetch("/get-imageboard-data")
            .then((resp) => resp.json())
            .then((data) => {
                this.images = data;
            });
    },
    components: {
        "display-img-modal": displayImgModal,
    },
    methods: {
        clickHandler() {
            this.spinner = true;
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((result) => {
                    this.images.unshift(result[0]);
                    this.spinner = false;
                })
                .catch(console.log());

            this.title = "";
            this.description = "";
            this.username = "";
            this.file = null;
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
        openImgModal(imageId) {
            this.imgClicked = imageId;
        },
        closeModal() {
            this.imgClicked = false;
        },
        showMoreImg(){
            console.log("show me more images");
            let arrOfIDs = []
            this.images.forEach( image => {
                arrOfIDs.push(image.id);
            });
            let lastID = arrOfIDs.pop();

            fetch(`/get-more-images/${lastID}`)
                .then((resp) => resp.json())
                .then((data) => {
                    this.images = [...this.images, ...data];
                })
                .catch(console.log());
            // this.images;

        },
    },
}).mount("#main");
