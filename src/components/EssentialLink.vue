<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar :to="link">
      <q-icon class="q-mr-md" :name="icon" size="18px" color="dark-items" />
      <!-- <q-icon :name="icon" /> -->
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    goTo(route) {
      this.$router.push({ path: route });
    },
  },
});
</script>
