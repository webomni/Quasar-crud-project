<template>
  <q-page>
    <div class="text-center q-pt-lg">
      <div class="text-h6">Lista de Contatos</div>
    </div>
    <q-table color="secondary" :rows="allContact" :columns="columns"></q-table>
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
const current = ref(1);
/* const loading = ref(true); */

const columns = [
  { name: "nome", label: "nome", field: "nome", align: "left" },
  { name: "endereco", label: "endereco", field: "endereco", align: "left" },
  { name: "telefone", label: "telefone", field: "telefone", align: "left" },
  { name: "action", label: "Ação", align: "center" },
];

onMounted(() => {
  console.log(contactStore.getAllContact);
  if (contactStore.getAllContact) allContact.value = contactStore.getAllContact;
  /*  this.loading = false; */
});

watch(
  () => contactStore.getAllContact,
  async () => {
    allContact.value = contactStore.getAllContact;
    /*   this.loading = false; */
  }
);
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
