<template>
    <mt-header fixed :title="title">
        <mt-button @click="prevent" icon="back" slot="left"></mt-button>
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
    methods: {
        prevent() {
            // this.$router.go(-1);
            history.back();
        }
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
}

.mint-header[data-v-35e193e4] {
    height: 2.5rem;
}
</style>
