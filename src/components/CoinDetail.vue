<script>

export default {
    props: ['btc'],
    data() {
        return {
            value: 0,
            showPrices: false,
        }
    },
    computed: {
        title() {
            return `${this.btc.name} - ${this.btc.symbol}`
        },
        convertedValue() {
            if (!this.value) {
                return 0
            }
            return this.value / this.btc.price
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
    <div class="container">
        <h1 v-bind:class="btc.changePercent > 0 ? 'green' : 'red'" class="title-bitcoin">
            {{ title }}
            <span v-if="btc.changePercent > 0">👍🏽</span>
            <span v-else-if="btc.changePercent < 0">👎🏽</span>
            <span v-else>🤞🏽</span>
        </h1>

        <img
            v-on:mouseover="toggleShowPrices"
            v-on:mouseout="toggleShowPrices"
            v-bind:src="this.btc.img"
            v-bind:alt="this.btc.name"
        />
        <input type="number" v-model="value" />
        <span>{{ convertedValue }}</span>
        <span
            v-on:click="toggleShowPrices"
        >{{ !showPrices ? "Ver precios" : "Dejar de ver precios" }}</span>

        <ul v-show="showPrices">
            <li
                v-bind:class="{ orange: p.value === btc.price, red: p.value < btc.price, green: p.value > btc.price }"
                v-for="(p, i) in btc.pricesWithDays"
                v-bind:key="p.day"
            >{{ i }} - {{ p.day }} - {{ p.value }}</li>
        </ul>
    </div>
</template>


<style>
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