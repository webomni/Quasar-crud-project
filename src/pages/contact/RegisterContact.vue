<template>
  <q-page>
    <q-scroll-area class="form-style">
      <div class="text-h6 text-center q-mt-lg">
        <div>Registrar Contatos</div>
      </div>

      <div class="q-pa-md q-gutter-md">
        <div class="text-center q-m-xs">Registrar contato!</div>

        <q-input
          v-model="nome"
          label="Nome"
          :error-message="errors.nome.errorMsg"
          :error="errors.nome.errorType"
        />
        <q-input
          v-model="endereco"
          label="Endereço"
          :error-message="errors.endereco.errorMsg"
          :error="errors.endereco.errorType"
        />
        <q-input
          v-model="telefone"
          label="Telefone"
          mask="(##)#####-####"
          :error-message="errors.telefone.errorMsg"
          :error="errors.telefone.errorType"
        />
      </div>

      <div class="q-px-md q-pb-lg">
        <div class="row justify-end q-pt-md">
          <q-btn
            size="md"
            color="primary"
            label="Salvar"
            @click.prevent="register"
            class="salvar-button full-width q-mt-lg"
          />
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useContactStore } from "src/stores/contact-store";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const nome = ref("");
const endereco = ref("");
const telefone = ref("");
const $q = useQuasar();
const router = useRouter();
const contactStore = useContactStore();

const errors = reactive({
  nome: { errorMsg: null, errorType: null },
  endereco: { errorMsg: null, errorType: null },
  telefone: { errorMsg: null, errorType: null },
});

const validation = () => {
  let isError = false;

  // Nome
  if (nome.value.length < 1) {
    errors.nome.errorMsg = "Favor inserir nome do contato!";
    errors.nome.errorType = true;
    isError = true;
  } else {
    errors.nome.errorMsg = null;
    errors.nome.errorType = null;
  }

  // endereco
  if (endereco.value.length < 4) {
    errors.endereco.errorMsg =
      "Favor inserir endereço com mais de 3 caracteres!";
    errors.endereco.errorType = true;
    isError = true;
  } else {
    errors.endereco.errorMsg = null;
    errors.endereco.errorType = null;
  }

  // Nome
  if (telefone.value.length < 1) {
    errors.telefone.errorMsg = "Favor inserir o telefone do contato!";
    errors.telefone.errorType = true;
    isError = true;
  } else {
    errors.telefone.errorMsg = null;
    errors.telefone.errorType = null;
  }

  return isError;
};

const register = async () => {
  const isError = validation();

  if (isError === true) return false;

  /* if (!navigator.onLine) {
    $q.dialog({
      title: "Offline",
      message:
        "Seu registro não foi bem-sucedido. Por favor, certifique-se de estar conectado à Internet.",
      persistent: true,
    });
    return "";
  } */

  $q.loading.show({
    message: "Aguarde salvando registro...",
  });

  try {
    // Get the tokens/cookies
    //await contactStore.getSanctumCookie();

    // Register User
    const resp = await contactStore.register(
      nome.value,
      endereco.value,
      telefone.value
    );

    if (resp.status == true) {
      // Get user details
      /*  const res = await userStore.fetchContact();

      // Set user details in localhost (PINIA)
      userStore.setUser(res.data);
      // Redirect*/
      router.push("contact");
      $q.loading.hide();

      $q.notify({
        type: "positive",
        position: "top",
        icon: "check_circle",
        message: "Registro salvo com sucesso!",
      });
      $q.notify({
        type: "positive",
        position: "top",
        icon: "check_circle",
        message: "Registro salvo com sucesso!",
      });
    } else {
      console.log("erro na promisse registro!");

      if (resp.msg.includes("Unauthenticated")) {
        resp.msg = "Não autenticado!";
        $q.loading.hide();
      }
      $q.notify({
        type: "negative",
        position: "top",
        message: resp.msg,
      });
    }
  } catch (error) {
    if (!navigator.onLine && backgroundSyncSupported) {
      // redirect to home page
      $q.notify({
        type: "warning",
        position: "top",
        message: "Cadastro criado offline!",
      });
      await contactStore.showAllContact(1);
      router.push("contact");
    } else {
      console.log("erro na promisse final!");
      $q.dialog({
        title: "Ops!",
        message: "Falha no salvamento. Verifique!",
        persistent: true,
      });
    }
    $q.loading.hide();
  }
};

const backgroundSyncSupported = async () => {
  if ("serviceWorker" in navigator && "syncManager" in window) {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="scss" scoped>
.salvar-button {
  height: 44px;
  border-radius: 5px;
  background-color: $instaBlue;
  text-transform: none;
  font-size: 16px;
}
</style>
