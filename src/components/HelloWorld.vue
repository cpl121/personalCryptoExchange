<script>
import { Vue } from 'pinia/node_modules/vue-demi';

export default {
  data() {
    return {
      name: 'Bitcoin',
      symbol: 'BTC',
      img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      changePercent: 10,
      price: 9000,
      value: 0,
      pricesWithDays: [
        { day: 'Lunes', value: 8400 },
        { day: 'Martes', value: 7900 },
        { day: 'Miercoles', value: 8200 },
        { day: 'Jueves', value: 9000 },
        { day: 'Viernes', value: 9400 },
        { day: 'Sabado', value: 10000 },
        { day: 'Domingo', value: 10200 },
      ],
      showPrices: false,
    }
  },
  computed: {
    title() {
      return `${this.name} - ${this.symbol}`
    },
    convertedValue () {
      if (!this.value) {
        return 0
      }
      return this.value / this.price
    }
  },
  watch: {
    showPrices(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
    }
  },

}
</script>

<template>
  <div id="helloWorld">
    <div class="container">
      <h1 v-bind:class="changePercent > 0 ? 'green' : 'red'" class="title-bitcoin">
        {{ title }}
        <span v-if="changePercent > 0">👍🏽</span>
        <span v-else-if="changePercent < 0">👎🏽</span>
        <span v-else>🤞🏽</span>
      </h1>

      <img
        v-on:mouseover="toggleShowPrices"
        v-on:mouseout="toggleShowPrices"
        v-bind:src="this.img"
        v-bind:alt="this.name"
      />
    </div>

    <input type="number" v-model="value">
    <span>{{convertedValue}}</span>

    <span v-on:click="toggleShowPrices">{{ !showPrices ? "Ver precios" : "Dejar de ver precios" }}</span>

    <ul v-show="showPrices">
      <li
        v-bind:class="{ orange: p.value === price, red: p.value < price, green: p.value > price }"
        v-for="(p, i) in pricesWithDays"
        v-bind:key="p.day"
      >{{ i }} - {{ p.day }} - {{ p.value }}</li>
    </ul>
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

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 60%;
  margin: 2rem 1rem;
}

.title-bitcoin {
  text-align: center;
  font-size: 3rem;
}

img {
  padding: 2rem;
  width: 150px;
  height: 150px;
}

.orange {
  color: orange;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
