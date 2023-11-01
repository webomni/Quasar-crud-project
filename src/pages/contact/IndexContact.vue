<template>
  <q-page>
    <div class="text-center q-pt-lg">
      <div class="text-h6">Lista de Contatos</div>
    </div>

    <q-scroll-area class="list form-style">
      <q-list>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="green" text-color="white">
              <img
                class="avatar"
                :src="`https://cdn.quasar.dev/img/avatar${1}.jpg`"
              />
            </q-avatar>
          </q-item-section>
          <!-- class="full-width column items-center justify-center" -->

          <q-item-section>
            <q-item-label>A cool new road!</q-item-label>
            <q-item-label caption>
              <div class="q-px-sm"><b>From</b>: This is the from section</div>
            </q-item-label>
          </q-item-section>

          <q-item-section side bootom>
            <q-btn
              round
              color="red"
              icon="fa-regular fa-trash-can"
              style="color: #f7dede"
              size="sm"
            />
            <font-awesome-icon />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useContactStore } from "src/stores/contact-store";
import { onMounted, ref } from "vue";

// DATA
const nome = ref("");
const endereco = ref("");
const telefone = ref("");

const allContact = ref([]);
const $q = useQuasar();

const contactStore = useContactStore();

onMounted(() => {
  if (contactStore.getAllContact) allContact.value = contactStore.getAllContact;
});
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
