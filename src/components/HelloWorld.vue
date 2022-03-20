<script>
import CoinDetail from "./CoinDetail.vue"
import Modal from "./Modal.vue"

export default {
  components: {
    'coin-detail': CoinDetail,
    'modal': Modal,
  },
  data() {
    return {
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 10,
        price: 9000,
        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miercoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sabado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ]
      },
      showModal: false,
      title: "Titulo del modal"
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    }
  },
}
</script>

<template>
  <div id="helloWorld">
    <coin-detail v-bind:btc="btc"></coin-detail>
    <button v-on:click="toggleModal">Click para abrir modal</button>
    <modal 
      v-bind:showModal="showModal" v-bind:title="title" 
      v-on:closeModalEvent="toggleModal"
    >
      <template v-slot:body>
        <span>Este es el cuerpo del modal</span>
      </template>
    </modal>
  </div>
</template>

<style scoped>
#helloWorld {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

</style>
