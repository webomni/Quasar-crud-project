<template>
  <q-page
    id="IndexLogin"
    class="flex flex-center column justify-center q-px-md form-style"
  >
    <div class="full-width column items-center justify-center">
      <q-img class="logo q-mb-lg" src="src/assets/logo.png"></q-img>
      <q-form class="full-width" @submit="login">
        <q-input
          v-model="credential"
          label="E-mail ou usuário"
          class="full-width q-mb-md"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          class="full-width q-mb-md"
        />

        <q-btn
          size="md"
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
import { useContactStore } from "src/stores/contact-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const credential = ref("paulo@sygmasistemas.com.br");
const password = ref("123456");
const userStore = useUserStore();
const contactStore = useContactStore();
const $q = useQuasar();
const router = useRouter();

const login = async () => {
  try {
    $q.loading.show({
      message: "Logando...",
    });

    // Get the token/cookie
    //await userStore.getSanctumCookie();

    // login user
    const response = await userStore.login(credential.value, password.value);

    if (response.status == true) {
      const { data } = response;
      // get the user
      const user = await userStore.fetchUser(data.token, data.id);

      // Set user data in localStorage (pinia)
      userStore.setUser(user.data, data.token);

      // redirect to main
      await contactStore.showAllContact();
      router.push("main/contact");
    } else {
      $q.notify({
        type: "negative",
        position: "top",
        message: response.msg,
      });
    }
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      type: "negative",
      position: "top",
      message: "Login falhou. verifique",
    });
  }
};
</script>

<style lang="scss" scoped>
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
