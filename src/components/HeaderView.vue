<template>
  <q-header>
    <q-toolbar class="bg-primary text-white q-pa-sm q-gutter-sm">
      <router-link to="/">
        <q-btn flat color="white" label="Main" />
      </router-link>
      <router-link to="/blog/all">
        <q-btn flat color="white" label="MyBlog" />
      </router-link>
      <router-link to="/guest">
        <q-btn flat color="white" label="Guest" />
      </router-link>
      <router-link to="/info">
        <q-btn flat color="white" label="Info" />
      </router-link>
      <q-space />
      <q-btn flat round dense icon="apps" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
