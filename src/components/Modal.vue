<script>

export default {
    props: ["showModal", "title"],
    methods: {
        closeModal() {
            this.$emit("closeModalEvent");
        }
    },
}

</script>

<template>
    <div v-if="showModal" class="modal">
        <div class="container-modal">
            <h1 class="title-modal">{{title}}</h1>
            <slot name="body"></slot>
            <button class="button-close-modal" v-on:click="closeModal">Cerrar</button>
        </div>
    </div>
</template>

<style>

.modal {
    background: rgba(32,35,41,.8);
    position: fixed;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    
}

.container-modal {
    background-color: #ececec;
    color: rgb(10, 10, 10);
    font-size: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    height: 50%;
    width: 90%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title-modal {
    margin: 1rem;
}

.button-close-modal {
    margin: 1rem;
    padding: 0.5rem 3rem;
    background-color: aquamarine;
    border-radius: 3rem;
}

</style>