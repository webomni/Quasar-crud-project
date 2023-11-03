<template>
  <q-page :style-fn="myTweak" class="justify-between">
    <div class="text-center q-pt-lg">
      <div class="text-h6">Lista de Contatos</div>
    </div>
    <q-scroll-area class="list form-style">
      <q-list v-for="contact in allContact" :key="contact.id">
        <q-card flat class="my-card full-width">
          <q-card-section>
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="green" text-color="white">
                  <img
                    class="avatar"
                    :src="`https://cdn.quasar.dev/img/avatar${4}.jpg`"
                  />
                </q-avatar>
              </q-item-section>
              <!-- class="full-width column items-center justify-center" -->

              <q-item-section>
                <q-item-label>{{ contact.nome }}</q-item-label>
                <q-item-label caption>
                  <div class="q-px-sm">{{ contact.email }}</div>
                  <div class="q-px-sm">{{ contact.telefone }}</div>
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
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-list>
    </q-scroll-area>
    <div class="q-pa-lg flex flex-center full-width">
      <q-pagination
        v-model="current"
        :max="contactStore.getLastPage"
        direction-links
      />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useContactStore } from "src/stores/contact-store";
import { onMounted, ref, watch } from "vue";

// DATA
const nome = ref("");
const endereco = ref("");
const telefone = ref("");

const allContact = ref([]);
const $q = useQuasar();
const contactStore = useContactStore();
const current = ref(0);

onMounted(() => {
  console.log(contactStore.getAllContact);
  if (contactStore.getAllContact) allContact.value = contactStore.getAllContact;
});

watch(
  () => contactStore.getAllContact,
  async () => {
    allContact.value = contactStore.getAllContact;
  }
);
watch(
  () => current.value,
  async () => {
    contactStore.showAllContact(current.value);
  }
);

function myTweak(offset) {
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
}
</script>

<style lang="scss" scoped>
.salvar-button {
  height: 44px;
  border-radius: 5px;
  background-color: $instaBlue;
  text-transform: none;
  font-size: 16px;
}
.paginator {
  z-index: 6003;
  position: fixed;
  bottom: 56px;
  background-color: #fafafa;
}
</style>
