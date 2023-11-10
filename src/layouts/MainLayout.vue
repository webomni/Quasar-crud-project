<template>
  <q-layout class="q-layout">
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
      </div>
    </q-drawer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated backInLeft"
        leave-active-class="animated backOutLeft"
      >
        <router-view />
      </transition>
    </q-page-container>
    <!-- Componente BottomBar -->
    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/main/contact" icon="eva-calendar-outline" />
        <q-route-tab to="/main/register" icon="eva-plus-circle-outline" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const tab = ref("images");

const linksList = [
  {
    title: "Contatos",
    icon: "fa fa-address-book",
    link: "/main/contact",
  },
  {
    title: "Cadastrar",
    icon: "fa-regular fa-pen-to-square",
    link: "/main/register",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
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
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
  },
});
</script>

<style lang="scss" scoped>
.container-items {
  height: calc(100vh - 230px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.q-avatar {
  cursor: pointer;
}
.q-layout {
  height: 100vh;
}
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 77px;
  }
}
.q-footer .q-tab__icon {
  font-size: 32px;
}
.q-toolbar__title {
  font-size: 30px;
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
</style>
