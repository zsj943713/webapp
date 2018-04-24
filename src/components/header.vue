<template>
  <mt-header fixed :title="title">
  </mt-header>
</template>
<script>
export default {
  name: 'header',
  props: {
    title: String,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {}
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header {
  background-color: #2489eb;
  font-size: 1rem;
  height: 2.5rem;
}
</style>
