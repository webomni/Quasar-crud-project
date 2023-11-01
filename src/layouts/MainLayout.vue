<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Contatos Sygma </q-toolbar-title>

        <div>
          <q-avatar size="28px">
            <img
              :src="`https://cdn.quasar.dev/img/avatar${1}.jpg`"
              @click="goToAvatar('profile')"
            />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <div class="container-items">
        <q-list>
          <q-item-label header> Menu </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <!-- <q-item clickable tag="a" href="#">
          <q-item-section>
            <q-item-label>
              <div class="q-pa-sm">
                <div class="q-mt-lg">
                  <q-icon
                    class="q-mr-md"
                    name="fas fa-arrow-right-from-bracket"
                    size="18px"
                    color="dark-items"
                  />
                  <span class="q-pl-md">Logout</span>
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item> -->
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- Componente BottomBar -->
    <div class="container-bottom full-width q-pb-lg">
      <q-separator class="full-width q-mb-sm" />
      <BottomBar />
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import BottomBar from "src/components/BottomBar/Index.vue";

const linksList = [
  {
    title: "Contatos",
    icon: "fa fa-address-book",
    link: "contact",
  },
  {
    title: "Cadastrar",
    icon: "fa-regular fa-pen-to-square",
    link: "register",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    BottomBar,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    goToAvatar(route) {
      this.$router.push({ path: route });
    },
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
.q-avatar {
  cursor: pointer;
}
</style>
