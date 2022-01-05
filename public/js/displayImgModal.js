const displayImgModal = {
    data() {
        return {
            image: [],
        };
    },
    props: ["id"],
    mounted() {
        fetch(`/get-img-by-id-data/${this.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data by id", data[0]);
                this.image = data[0];
            });
    },
    methods: {
        openModal() {
            console.log("the modal is open");
        },
        closeModal() {
            this.$emit("close");
        },
    },
    template: `<div class="modal-container">
            <div class="modal-box">
            <div class="img-container">
            <img :src="image.url" :alt="image.description" class="inner-img-modal">
            <p>posted: {{image.dateAdded}}</p>
            </div>
            <div class="text-container">
            <h3 class="img-title">{{image.title}}</h3>
            <p>{{image.description}}</p>
            </div>
            <button id="modal-btn" @click="closeModal">Close</button>
            </div>
        </div>`,
};

export default displayImgModal;