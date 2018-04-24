<template>
    <div class="mint-search" v-bind:class="{searchHeight:visible}">
        <div class="mint-searchbar">
            <div class="mint-searchbar-inner">
                <i class="mintui mintui-search"></i>
                <input ref="input" @click="changeVisible()" type="search" v-model="currentValue" placeholder="输入股票代码或名称或首拼" class="mint-searchbar-core">
            </div>
            <a class="mint-searchbar-cancel" @click="forVisible()" v-show="visible" v-text="cancelText">
            </a>
        </div>
        <!-- <div class="mint-search-list" v-show="show || currentValue"> -->
        <div class="mint-search-list" v-show="show || currentValue">
            <div class="mint-search-list-warp">
                <slot>
                    <div class="answer">查询结果</div>
                    <div v-for="(item, index) in result" class="answer_list" @click="toDetail(item)">
                        <span class="belong">{{item.market}}</span>
                        <span class="stockName">{{item.name}}</span>
                        <span class="stockCode">{{item.code}}</span>
                        <span class="stockIcon" @click.stop="addStock(index)" :class="{noAdd:item.type}"></span>
                    </div>
                    <div v-if="result.length==0" class="no_answer">没有找到相关的股票</div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import XCell from 'mint-ui/packages/cell/index.js';
import stockDetails from './stockDetails.vue';
import axios from 'axios';
import Vue from 'vue';
export default {
    name: 'mt-search',
    created: function() {
        var selfStock = localStorage.getItem("selfStock"); //加载自选股数据
        selfStock = JSON.parse(selfStock);
        //判断是否有已添加的自选股，有的话在此基础上操作，没有的话赋值为空
        if (selfStock == null) {
            this.selfStock = []
            localStorage.setItem('selfStock', JSON.stringify(this.selfStock)); //若是localStorage里面没有selfStock，则将selfStock存入本地，避免其他页面报错 
        } else {
            this.selfStock = selfStock;
        }
        var refreshTime = JSON.parse(localStorage.getItem('refreshTime'))
            // console.log(refreshTime);
        if (!refreshTime) { //初始化第一次
            this.getStockInfo(); //加载所有baseinfo
            localStorage.setItem('refreshTime', JSON.stringify(new Date()))
        } else {
            //我们规定每天9:25:00分后可以刷新baseinfo
            var specTime = new Date();
            specTime.setHours(9);
            specTime.setMinutes(25);
            specTime.setSeconds(0);
            // console.log("specTime", specTime);
            refreshTime = parseInt(refreshTime)
            refreshTime = new Date(refreshTime)
            if (new Date() > specTime && refreshTime < specTime) {
                this.getStockInfo();
                localStorage.setItem('refreshTime', JSON.stringify(new Date()))
            }
        }
    },
    data() {
        return {
            visible: false,
            selfStock: [], //自选股
            currentValue: this.value,
            result: [], //匹配到的搜索结果
            allStocks: JSON.parse(localStorage.getItem('stocks')),
            flag: false, //判断getStockInfo()函数是否执行完的标识
        }
    },
    components: {
        XCell
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val);
            //处理检索逻辑
            if (this.currentValue != "") {
                // console.log("this.currentValue",this.currentValue)
                var stocks = localStorage.stocks;
                //先判断 localStorage.stocks是否有异常情况，若异常，为 localStorage.stocks重新请求数据。正常情况直接调用filterResult方法，对输入内容直接搜索匹配
                if (stocks == null || stocks == "" || stocks == "[]" || stocks == undefined) {
                    this.flag = false;
                    this.getStockInfo();
                    if (this.flag == true) {
                        this.filterResult();
                    }
                } else {
                    this.filterResult();
                }
            }
        },
        value(val) {
            this.currentValue = val;
        }
    },
    props: {
        value: String,
        autofocus: Boolean,
        show: Boolean,

        cancelText: {
            default: '取消'
        },
        placeholder: {
            default: '搜索'
        },
        // result: Array
    },
    mounted() {
        this.autofocus && this.$refs.input.focus();
        this.$emit('childToParent', this.visible); //将是否显示的判断值 visible传值给父组件myChose.vue
    },
    methods: {
        changeVisible: function() { //点击input框时出发的事件
            this.visible = true;
            this.$emit('childToParent', this.visible) //将是否显示的判断值 visible传值给父组件myChose.vue 点击Input框时visible值得变化
        },
        forVisible: function() { //点击取消按钮时出发的事件
            this.visible = false;
            this.currentValue = '';
            this.$emit('childToParent', this.visible) //将是否显示的判断值 visible传值给父组件myChose.vue  点击取消按钮时visible值得变化
        },
        //检索股票
        filterResult: function() {
            this.result = []; //清空历史搜索
            this.allStocks = JSON.parse(localStorage.getItem('stocks'));
            var searchType = 0;
            if (this.currentValue.match(/^[0-9]*$/)) {
                searchType = 0 //股票代码搜索
            } else if (this.currentValue.match(/^[a-zA-Z]*$/)) {
                searchType = 1 //首拼搜索
            } else {
                searchType = 2 //中文
            }
            for (var i = 0; i < this.allStocks.length; i++) {
                if (this.result.length > 50) {
                    // console.log('超过限定数');
                    break;
                }
                // console.log("this.allStocks.length;" + this.allStocks.length);
                var name = this.allStocks[i].name; //股票名称
                var code = this.allStocks[i].code; //股票代码
                var abbr = this.allStocks[i].abbr; //股票首拼
                var preNameList = this.allStocks[i].preNameList; //股票名称，包括曾用名 
                switch (searchType) {
                    case 0:
                        // console.log("0")
                        if (!code) { //abbr不存在
                            continue;
                        }
                        if (code.match(this.currentValue)) {
                            this.result.push(this.allStocks[i]);
                        }
                        break;
                    case 1:
                        // console.log("1")
                        // 提示：港股有可能没有中文名字，这里得做匹配名字逻辑
                        if (!abbr) { //abbr不存在
                            //匹配name
                            if (!name) { //name不存在
                                continue;
                            }
                            if (name.match(this.currentValue.toUpperCase())) {
                                this.result.push(this.allStocks[i]);
                            }
                            break;
                        }
                        //匹配abbr
                        //后台返回的数据abbr字段有大写的，也有小写的
                        if ((abbr.toLowerCase()).match(this.currentValue.toLowerCase())) {
                            this.result.push(this.allStocks[i]);
                            break;
                        }
                    default:
                        // console.log("2")
                        if (!name) { //abbr不存在
                            continue;
                        }
                        // if (name.match(this.currentValue)) {
                        //除去空格做匹配
                        if ((preNameList.replace(/\s+/g, "")).match((this.currentValue).replace(/\s+/g, ""))) {
                            // console.log((this.currentValue).replace(/\s+/g,""))
                            this.result.push(this.allStocks[i]);
                        } else if ((preNameList.replace(/\s+/g, "").toLowerCase()).match((this.currentValue).replace(/\s+/g, ""))) {
                            //将后台拿到的股票名称去除空格并转换成小写做匹配
                            this.result.push(this.allStocks[i]);
                        }
                }
            }
            this.isselfStock() //检索结果预处理是否是自选股
        },
        toDetail: function(item) { //点击搜索结果的每一条跳转至个股详情页
            // location.hash = "stockDetails";
            // console.log("搜索结果列表", item)
            this.$router.push({
                path: '/stockDetails/stkCode=' + item.stkcode + '&stkName=' + item.name
            });
        },
        //获取股票基本信息baseinfo
        getStockInfo: function() {
            var that = this;
            axios({
                    url: 'http://101.231.93.232:14014/find/allstk',
                    method: 'get',
                })
                .then(function(res) {
                    // console.log("刷新baseinfo", res);
                    localStorage.setItem('stocks', JSON.stringify(res.data));
                    that.flag = !that.flag;
                    // console.log( that.flag)
                })
                .catch(function(err) {
                    // console.log(err.response)
                })
        },
        addStock: function(index) {
            if (this.result[index].type) { //删除自选股的操作
                for (var i = 0; i < this.selfStock.length; i++) {
                    //循环，在已添加的列表中做删除，再将删除后的列表存储到本地
                    if (this.result[index].stkcode == this.selfStock[i].stkcode) {
                        this.selfStock.splice(i, 1);
                        this.result[index].type = false;
                    }
                    localStorage.setItem('selfStock', JSON.stringify(this.selfStock));
                }
            } else { //添加自选股的操作
                // this.selfStock.push(this.result[index])
                this.selfStock.unshift(this.result[index])
                this.result[index].type = true;
                localStorage.setItem('selfStock', JSON.stringify(this.selfStock));
            }
        },
        // 判断搜索结果是否是自选股股票，页面控制添加或者删除的按钮图标
        isselfStock: function() {
            for (let index = 0; index < this.result.length; index++) {
                Vue.set(this.result[index], 'type', false)
                for (let _slef = 0; _slef < this.selfStock.length; _slef++) {
                    if (this.result[index].stkcode == this.selfStock[_slef].stkcode) { //匹配到的已添加的自选股的type值变为true
                        Vue.set(this.result[index], 'type', true)
                        continue;
                    }
                }
            }
        }
    },
    computed: {}
};
</script>
<style>
.mint-search {
    margin-top: 5.5rem;
    height: 100%;
}

.search .searchHeight {
    height: 100vh;
}

.search .mint-searchbar-core {
    padding-left: 0.4rem;
    font-size: 0.8rem;
}

.search .mint-search-list-warp {
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
    margin-top: 2.75rem;
    padding-bottom: 6rem;
    /*background-color: #fff;*/
}

.search .mint-cell {
    border-bottom: 1px solid #f0f0f0;
}

.search .answer {
    height: 2.1875rem;
    font-size: 0.75rem;
    color: #505050;
    line-height: 2.1875rem;
}

.search .answer .mint-cell-text {
    font-size: 0.75rem;
    color: #505050;
    line-height: 0.75rem;
}


/*以下部分为调整搜索结果列表样式*/

.search .answer_list {
    border-top: 1px solid #f0f0f0;
    font-size: 1rem;
    color: #303030;
    line-height: 3.25rem;
    position: relative;
}

.search .belong {
    width: 2.5rem;
    height: 1.1875rem;
    border: 1px solid #2489E8;
    border-radius: 1px;
    font-size: 0.8125rem;
    color: #2489E8;
    line-height: 0.8125rem;
    padding: 2px 4px;
}

.search .stockName {
    margin-left: 0.9375rem;
}

.search .stockCode {
    position: absolute;
    left: 13rem;
    text-align: right;
}

.search .stockIcon {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    background: url("../assets/icon_add1.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0;
    top: 1rem;
}

.search .noAdd {
    background: url("../assets/icon_add2.svg");
    background-repeat: no-repeat;
    background-size: 100%;
}

.search .no_answer {
    border-top: 1px solid #f0f0f0;
    text-align: center;
    font-size: 0.9375rem;
    color: #909090;
    line-height: 0.9375rem;
    padding-top: 1rem;
}

.search .mint-searchbar-cancel {
    font-size: 0.8rem;
}

.search .mint-searchbar-inner .mintui-search {
    font-size: 0.875rem;
}
</style>
