<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Login Sygma</q-toolbar-title>
        <!-- <div>V{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- Componente BottomBar -->
    <div class="container-bottom footer-login full-width q-pb-lg">
      <q-separator class="full-width q-mb-sm" />
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container-items {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer-login {
  height: 60px;
}
</style>
