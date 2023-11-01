<template>
  <q-page id="ProfilePage">
    <q-scroll-area class="form-style">
      <div class="full-width column items-center justify-center">
        <q-avatar size="95px" class="avatar-story q-mt-lg">
          <img
            class="avatar"
            :src="`https://cdn.quasar.dev/img/avatar${1}.jpg`"
          />
        </q-avatar>
        <q-btn flat color="primary" label="Atualizar Foto" />
      </div>

      <div class="full-width column q-px-sm">
        <div class="container-input row justify-center items-center">
          <span>Código:</span>
          <q-input v-model="id" disable />
        </div>
        <div class="container-input row justify-center items-center">
          <span> Name:</span>
          <q-input v-model="nome" disable />
        </div>
        <div class="container-input row justify-center items-center">
          <span> E-mail:</span>
          <q-input v-model="email" disable />
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();

const id = ref(userStore.getId);
const nome = ref(userStore.getName);
const email = ref(userStore.getEmail);
</script>

<style lang="scss" scoped>
.container-input {
  font-size: 15px;
  span {
    width: 22%;
  }
  .q-textarea,
  .q-input {
    width: 70%;
  }
}
strong {
  font-size: 16px;
}
.q-btn {
  text-transform: none;
  font-size: 16px;
}
</style>
