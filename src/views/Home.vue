<template>
  <div>
    <px-assets-table v-if="!isLoading" :assets="assets"/>
  </div>
</template>

<script>
import PxAssetsTable from './../components/PxAssetsTable.vue'
import api from '@/api'
let loader 
export default {
  name: 'Home',
  components: { PxAssetsTable },
  data() {
    return {
      isLoading: false,
      assets: []
    }
  },
  methods: {
    simulate() {
      if (this.isLoading) {
        loader= this.$loading.show({
          canCancel: true,
          color: "#68d391",
          loader: "spinner",
          opacity: 0.5,
        });
      }
      else { 
        loader.hide()
      }
    },
  },
  created() {
    this.isLoading = true
    this.simulate();
    api.getAssets()
      .then(assets => (this.assets = assets))
      .finally(()=> {
        this.isLoading = false
        this.simulate()  
        })
  }
}
</script>
