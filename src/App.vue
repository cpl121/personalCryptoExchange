<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
    <div class="wrapper">
      <HelloWorld />

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>

  <!-- <RouterView /> -->
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-weight: normal;
}

</style>
