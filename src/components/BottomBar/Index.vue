<template>
  <div class="full-width row justify-around">
    <q-img
      width="22px"
      height="25px"
      class="q-ml-sm"
      src="src/assets/house.svg"
      @click="goTo('contact')"
    />
    <q-img
      width="25px"
      height="25px"
      class="q-ml-sm"
      src="src/assets/add.svg"
    />
    <q-img
      width="25px"
      height="25px"
      class="q-ml-sm"
      src="src/assets/logof.svg"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "BottomBar",
  data() {
    return {
      user: {},
    };
  },
});
</script>

<style lang="scss" scoped>
.q-img {
  cursor: pointer;
}
</style>
