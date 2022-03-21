<template>
  <div class="flex-col">
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ assetsFiltered.priceUsd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ assetsFiltered.min }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ assetsFiltered.max }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ assetsFiltered.avg }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ assetsFiltered.changePercent24Hr }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverted"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
          {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"> {{convertResult}} {{ fromUsd ? `${asset.symbol}` : `USD` }}</span>
        </div>
      </div>

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in marketFiltered" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)"
            >
              <slot>Obtener Link</slot>
            </px-button>

            <a v-else class="hover:underline text-green-600" target="_blanck">{{ m.url }}</a>
          </td>
        </tr>
      </table>

    </template>
  </div>
</template>

<script>
import api from '@/api'
import numeral from 'numeral'
import PxButton from './../components/PxButton.vue'
let loader

export default {
  name: 'CoinDetail',
  components: {PxButton},

  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
      markets: [],
      fromUsd: true,
      convertValue: null
    }
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0
      }
      const result = this.fromUsd ? this.convertValue / numeral(this.asset.priceUsd)._value :
      this.convertValue * numeral(this.asset.priceUsd)._value

      return result.toFixed(4)
    },
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },
     assetsFiltered() {
        this.asset.priceUsd = numeral(this.asset.priceUsd).format('($ 0.00 a)')
        this.asset.min = numeral(this.min).format('($ 0.00 a)')
        this.asset.max = numeral(this.max).format('($ 0.00 a)')
        this.asset.avg = numeral(this.avg).format('($ 0.00 a)')
        this.asset.changePercent24Hr = `${Number(this.asset.changePercent24Hr).toFixed(2)}%`
      return this.asset
    },
    marketFiltered() {
       this.markets.forEach(el => {
        el.priceUsd = numeral(el.priceUsd).format('($ 0.00 a)')
      });
      return this.markets
    }
  },

  watch: {
    $route() {
      this.getCoin()
    }
  },

  created() {
    this.getCoin()
  },

  methods: {
    toggleConverted (){
      this.fromUsd = !this.fromUsd
    },
    getWebSite(exchange) {
      return api.getExchange(exchange.exchangeId).then(res => {
          exchange.url = res.exchangeUrl
        })
    },
    getCoin() {
      const id = this.$route.params.id
      this.isLoading = true
      this.simulate();

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
      .finally(()=> {
        this.isLoading = false
        this.simulate();
      })
    },
    simulate() {
      if (this.isLoading) {
        loader= this.$loading.show({
          canCancel: true,
          color: "#68d391",
          loader: "bars",
          opacity: 0.5,
        });
      }
      else { 
        loader.hide()
      }
    },
  }
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

