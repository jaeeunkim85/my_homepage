<template>
  <q-layout view="hHh lpR fFf">
    <HeaderView />
    <router-view></router-view>
    <FooterView />
  </q-layout>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FooterView from "./components/FooterView.vue";
import HeaderView from "./components/HeaderView.vue";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
