const displayImgModal = {
    data() {
        return {
            image: [],
        };
    },
    props: ["id"],
    mounted() {
        console.log("first componend mounted");
        console.log("this.passingAProp", this.passingAProp);
        fetch(`/get-img-by-id-data/${this.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data", data);
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
    template: `<div>
        <img :src="image.url" :alt="image.description" class="img-card">
        <p class="img-title">{{image.title}}</p>
        <p>{{image.description}}</p>
        <button @click="closeModal">Close</button>
    </div>`,
};

export default displayImgModal;