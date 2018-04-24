<template>
  <div>
    <myheader :title="title"></myheader>
  </div>
</template>
<script>
import myheader from './header.vue'
export default {
  name: 'stategy',
  data() {
    return {
      title: '君弘策略'
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
