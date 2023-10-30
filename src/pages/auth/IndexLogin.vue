<template>
  <q-page
    id="IndexLogin"
    class="flex flex-center column justify-center q-px-md"
  >
    <div class="full-width column items-center justify-center">
      <q-img class="logo q-mb-lg" src="src/assets/logo.png"></q-img>
      <q-form class="full-width" @submit="login">
        <q-input
          filled
          v-model="credential"
          label="E-mail ou usuário"
          class="full-width q-mb-md"
        />
        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          class="full-width q-mb-md"
        />

        <q-btn
          type="submit"
          color="primary"
          label="Log in"
          :disable="!credential || !password"
          class="Sign-in-button full-width q-mt-lg"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";

const credential = ref("paulo@sygmasistemas.com.br");
const password = ref("123456");
const userStore = useUserStore();

const login = async () => {
  try {
    // Get the token/cookie
    //await userStore.getSanctumCookie();
    // login user
    const { data } = await userStore.login(credential.value, password.value);
    // get the user
    const user = await userStore.fetchUser(data.token, data.id);
    console.log(user);

    // Set user data in localStorage (pinia)
    userStore.setUser(user.data);
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.form-style {
  margin: 0 auto;
  height: calc(100vh - 180px);
  max-width: 500px;
}
.logo {
  width: 180px;
}
.Sign-in-button {
  height: 44px;
  border-radius: 5px;
  background-color: $instaBlue;
  text-transform: none;
  font-size: 16px;
}
</style>
