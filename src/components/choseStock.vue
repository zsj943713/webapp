<template>
  <div>
    <myheader :title="title"></myheader>
  </div>
</template>
<script>
import myheader from './header.vue'
export default {
  name: 'choseStock',
  data() {
    return {
      title: '选股'
    };
  },
  computed: {},
  watch: {},
  components: {
    myheader
  }
};

</script>
<style>


</style>
