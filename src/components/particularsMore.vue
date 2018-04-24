<template>
    <div class="particularsMore">
        <headerBack :title="title"></headerBack>
        <div class="topTitle clearfix">
            <ul class="clearfix">
                <li>时间</li>
                <li>成交价</li>
                <li>成交量</li>
            </ul>
        </div>
        <div class="particulars-list">
            <ul class="clearfix" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="item in ParticularsData">
                    <span>{{item[0]}}</span>
                    <span :class="item[1] > item[3]? 'risered':'downgreen'">{{item[1]}}</span>
                    <span :class="item[4] == 'B'? 'risered':'downgreen'">{{item[2]}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headerBack from './headerBack.vue'
import axios from 'axios'
import Vue from 'vue'
import {
    Loadmore,
    InfiniteScroll
} from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
export default {
    name: 'ParticularsMore',
    data () {
        return {
            title: '',
            urlCode: '',
            urlName: '',
            ParticularsData: [],
            loading: '',
            lastTime: ''
        }
    },
    mounted: function () {
        this.getUrldata()
        this.getParticularsMore()
    },
    methods: {
        getUrldata: function () {
            // console.log(window.location.href);
            var url = window.location.href.split('=')
            this.urlCode = url[1].split('&')[0]
            this.urlName = decodeURIComponent(url[2])
            this.title = this.urlName + '(' + this.urlCode + ')'
        },
        getParticularsMore: function () {
            var that = this
            axios({
                    url: 'http://101.231.93.232:14014/bsHistory/getHistoryData',
                    method: 'POST',
                    data: {
                        'stkcode': this.urlCode,
                        'num': 15,
                        'time': ''
                    }
                })
                .then(function (res) {
                    // console.log(res)
                    var resdata = res.data.result
                    // console.log(resdata)
                    for (var i = 0; i < resdata.length; i++) {
                    resdata[i].transNum = Math.ceil(resdata[i].transNum / 100)
                        that.ParticularsData.push([resdata[i].time.split(' ')[1], resdata[i].price, resdata[i].transNum, resdata[i].preClose, resdata[i].bs, resdata[i].timestamp])
                    }
                })
        },
        loadMore: function () {
            this.loading = true
            var that = this
            setTimeout(() => {
                this.lastTime = this.ParticularsData[this.ParticularsData.length - 1][5]
                // console.log(this.ParticularsData[this.ParticularsData.length - 1][0]);
                 axios({
                    url: 'http://101.231.93.232:14014/bsHistory/getHistoryData',
                    method: 'POST',
                    data: {
                        'stkcode': this.urlCode,
                        'num': 15,
                        'time': this.lastTime
                    }
                })
                 .then(function (res) {
                        // console.log(res)
                        var resdata = res.data.result
                        var resdataLength = resdata.length
                        for (var i = 0; i < resdataLength; i++) {
                        resdata[i].transNum = Math.ceil(resdata[i].transNum / 100)    
                            that.ParticularsData.push([resdata[i].time.split(' ')[1], resdata[i].price, resdata[i].transNum, resdata[i].preClose, resdata[i].bs, resdata[i].timestamp])
                        }
                 })
                this.loading = false
            }, 1200)
        }
    },
    computed: {},
    watch: {},
    components: {
        headerBack
    }
}
</script>
<style>
.clearfix:after {
    content: "";
    display: block;
    clear: both;
}

.clearfix {
    zoom: 1;
}

.particularsMore {
    padding-top: 2.56rem;
    background: #fff;
}

.topTitle {
    position: fixed;
    width: 100%;
    background: #fff;
    margin-top: -0.1rem;
}
.topTitle ul{
    padding-left: 0;
    margin: 0;
}

.topTitle ul li {
    float: left;
    width: 33.33%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 0.9rem;
    border-bottom: 1px solid #f0f0f0;
    list-style: none;
}

.particulars-list {
    margin-top: 3rem;
}

.particulars-list ul{
    padding-left: 0;
}

.particulars-list ul li {
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.8rem;
    list-style: none;
}

.particulars-list ul li span {
    display: inline-block;
    width: 33.33%;
    float: left;
}

.risered {
    color: #FF363F;
}

.downgreen {
    color: #1CCE18;
}
</style>
