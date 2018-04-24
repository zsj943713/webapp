<template>
    <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="strategy">
                <img slot="icon" src="../assets/strategy.svg" v-if="selected !='strategy'">
                <img slot="icon" src="../assets/strategy-Selected.svg" v-if="selected=='strategy'"> 策略
            </mt-tab-item>
            <mt-tab-item id="myChose">
                <img slot="icon" src="../assets/Optional.svg" v-if="selected !='myChose'">
                <img slot="icon" src="../assets/Optional-Selected.svg" v-if="selected=='myChose'"> 自选
            </mt-tab-item>
            <mt-tab-item id="info">
                <img slot="icon" src="../assets/Quotation.svg" v-if="selected !='info'">
                <img slot="icon" src="../assets/Quotation-Selected.svg" v-if="selected=='info'">行情
            </mt-tab-item>
            <mt-tab-item id="chose">
                <img slot="icon" src="../assets/Choice.svg" v-if="selected !='chose'">
                <img slot="icon" src="../assets/Choice-Selected.svg" v-if="selected=='chose'">选股
            </mt-tab-item>
        </mt-tabbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="strategy">
                <strategy></strategy>
            </mt-tab-container-item>
            <!-- <mt-tab-container-item id="myChose"> -->
            <mt-tab-container-item id="myChose">
                <myChose></myChose>
            </mt-tab-container-item>
            <mt-tab-container-item id="info">
                <stock></stock>
            </mt-tab-container-item>
            <mt-tab-container-item id="chose">
                <choseStock></choseStock>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import stock from './stock.vue'
import strategy from './strategy.vue'
import myChose from './myChose.vue'
import choseStock from './choseStock.vue'

export default {
    name: 'index',
    created: function() { //通过获取hash值来确定当前选中的id即selected的值
        var forSelected = location.hash.substring(1);
        if (forSelected) {
            this.selected = forSelected;
        } else {
            this.selected = "strategy"; //默认selected的值为strategy
        };
        
    },
    data() {
        return {
            selected: ''
        }
    },
    methods: {},
    components: {
        strategy,
        myChose,
        stock,
        choseStock
    },
    watch: {
        selected: function(val, oldVal) {
            // 这里就可以通过 val 的值变更来确定去向
            switch (val) {
                case 'strategy':
                    location.hash = "strategy";
                    // console.log(this.selected)
                    break;
                case 'myChose':
                    location.hash = "myChose";
                    // console.log(this.selected)
                    break;
                case 'info':
                    location.hash = "info";
                    // console.log(this.selected)
                    break;
                case 'chose':
                    location.hash = "chose";
                    // console.log(this.selected)
                    break;
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*.mint-tab-item-label {
    color: inherit;
    font-size: 1.125rem;
    line-height: 1;
    }
.mint-tab-item-icon{
     width: 1.375rem;
    height: 1.375rem;
    }*/
</style>
