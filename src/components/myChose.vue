<template>
    <div class="myChose">
        <myheader :title="title"></myheader>
        <div class="search">
            <search @childToParent='parentGetChild'></search>
        </div>
        <div class="myChose_content" v-if="isShow==false">
            <div class="myChose_index">
                <ul class="index_list myChose_padding clearfix">
                    <!-- <li class="" @click="selected='1'"> -->
                    <li class="" @click="shangzhenSelected()">
                        <div class="price" :class="{color_red:shangIndex.rise>0,color_green:shangIndex.rise<0}">{{shangIndex.price}}</div>
                        <div class="under">
                            <span class="name">上证</span>
                            <span class="extent" :class="{color_red:shangIndex.rise>0,color_green:shangIndex.rise<0}">{{shangIndex.rise +'%'}}</span>
                        </div>
                    </li>
                    <!-- <li @click="selected='2'"> -->
                    <li @click="shenzhengSelected()">
                        <div class="price" :class="{color_red:shenIndex.rise>0,color_green:shenIndex.rise<0}">{{shenIndex.price}}</div>
                        <div class="under">
                            <span class="name">深证</span>
                            <span class="extent" :class="{color_red:shenIndex.rise>0,color_green:shenIndex.rise<0}">{{shenIndex.rise  +'%'}}</span>
                        </div>
                    </li>
                    <!-- <li @click="selected='3'"> -->
                    <li @click="chuangyeSelected()">
                        <div class="price" :class="{color_red:chuangyeIndex.rise>0,color_green:chuangyeIndex.rise<0}">{{chuangyeIndex.price}}</div>
                        <div class="under">
                            <span class="name">创业</span>
                            <span class="extent" :class="{color_red:chuangyeIndex.rise>0,color_green:chuangyeIndex.rise<0}">{{chuangyeIndex.rise  +'%'}}</span>
                        </div>
                    </li>
                </ul>
                <span class="index_picture" @click="showIndexPicture()" :class="[this.indexShow ? changeBackground : originalBackground]"></span>
                <!-- <span class="index_picture" @click="showIndexPicture()" :class="{changeBackground : indexShow , originalBackground:!indexShow}"></span> -->
                <div class="index_model" v-if="indexShow==true">
                    <!-- navbar -->
                    <mt-navbar class="page-part" v-model="selected">
                        <mt-tab-item id="1"></mt-tab-item>
                        <mt-tab-item id="2"></mt-tab-item>
                        <mt-tab-item id="3"></mt-tab-item>
                    </mt-navbar>
                    <!-- tabcontainer -->
                    <mt-tab-container v-model="selected" id='echartsBox'>
                        <mt-tab-container-item id="1" swipeable>
                            <div id="Ssci" style="width:100%;height:9.40625rem;"></div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="2">
                            <div id="Szi" style="height:9.40625rem;"></div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="3">
                            <div id="Gi" style="height:9.40625rem;"></div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </div>
            <div class="list_title">
                <div class="edit header_edit">
                    <router-link to="/stockEdit"><span></span>编辑</router-link>
                </div>
                <div class="header_new" @click="goChange">
                    <span class="txt">最新价</span>
                    <span class="priceChange" :class="{price_up:priceGoChange==1,price_down:priceGoChange==2}"></span>
                </div>
                <div class="header_change" @click="riseChange()">
                    <span class="txt">涨幅</span>
                    <span class="priceChange" :class="{price_up:this.riseGoChange==1,price_down:this.riseGoChange==2}"></span>
                </div>
            </div>
            <div class="myChose_stock">
                <ul class="stock_list clearfix" :class="{haveIndexPicture:this.indexShow}">
                    <li class="list_body  clearfix" v-for="(item, index) in selfStock" @click="toDetail(item)">
                        <div class="edit">
                            <div class="stock_name">{{item.name || item.stkName}}</div>
                            <div class="stock_under">
                                <span class="code">{{item.code || item.stkCode}}</span>
                                <!-- <span class="icon">sz</span> -->
                            </div>
                        </div>
                        <div class="new" :class="{color_red:item.risePrice>0,color_green:item.risePrice<0}">{{item.price|| '--'}}</div>
                        <div class="change" :class="{color_red:item.risePrice>0,color_green:item.risePrice<0}">{{item.rise || '--'}}</div>
                    </li>
                    <li>
                        <div class="add" @click="addStock()">
                            <span class="add_icon"></span>添加自选股
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import myheader from './header.vue'
import search from './search.vue'
import axios from 'axios'
import Vue from 'vue';
// 引入eacharts 挂在vue原型链上
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
export default {
    name: 'myChose',
    data() {
        return {
            title: '自选',
            isShow: '', //判断是否显示自选部分
            selected: "1", //自检自带，默认显示tab栏id为1的
            indexShow: false, //判断指数下拉框是否显示
            changeBackground: "changeBackground", //v-bind:class要求指向的类名
            originalBackground: "originalBackground",
            priceGoChange: 0, //判断最新价的变化
            riseGoChange: 0, //判断涨幅的变化
            selfStock: [], //子组件传过来的，搜索页添加的股票列表
            // codeList: [], //和db文件匹配到的结果的数组，页面的自选股展示有此数组渲染
            quotes: [], //存放每次请求回来的数据
            sort: "none", //请求自选股列表的入参，以什么样的排序方式请求数据
            type: "price", //请求自选股列表的入参，以什么指标来请求数据
            stkcode: [], //请求自选股列表的入参，传回后台的股票代码列表
            interval: "", //接收定时器的变量
            shangIndex: {
                price: "--",
                rise: "--"
            }, //存储上证指数的数据
            shenIndex: {
                price: "--",
                rise: "--"
            }, //存储深证指数的数据
            chuangyeIndex: {
                price: "--",
                rise: "--"
            }, //存储创业指数的数据
            // websc: new WebSocket("ws://101.231.93.232:14014/websocket"),
            websc: ' ',
            // 张树杰分时图代码
            totalDate: '', // 日期例如 20171101
            tabCount: [0, 0, 0], //给tab栏点击计数  防止重复渲染
            ssciTime: [], //上证指数时间轴数据
            ssciPrice: [], //上证指数price数据
            ssciPriceMax: [], // 上证指数的最大值数据
            ssciPriceMin: [], // 上证指数的最小值数据
            ssciPriceMaxinum: [], // 上证指数的最小值数据,仅用于存储
            ssciPriceMininum: [], // 上证指数的最小值数据,仅用于存储
            ssciOldTime: '', //上证指数上一次数据推送的时间
            ssciPreClose: [], //上证指数上一交易日的收盘价
            ssciMa: [], //上证指数上的ma
            ssciVol: [], //上证指数的成交量
            ssciRise: [], //上证指数的涨跌幅
            ssciPriceMaxFloat: [], // 深证指数的最大值数据的涨幅
            ssciPriceMinFloat: [], // 深证指数的最小值数据的涨幅
            sziTime: [], //深证指数时间轴数据
            sziPrice: [], //深证指数price数据
            sziPriceMax: [], // 深证指数的最大值数据
            sziPriceMin: [], // 深证指数的最小值数据
            sziPriceMaxinum: [], // 深证指数的最小值数据,仅用于存储
            sziPriceMininum: [], // 深证指数的最小值数据,仅用于存储
            sziOldTime: '', //深证指数上一次数据推送的时间
            sziPreClose: [], //深证指数数上一交易日的收盘价
            sziMa: [], //深证指数上的ma
            sziVol: [], //深证指数的成交量
            sziRise: [], //深证指数的涨跌幅
            sziPriceMaxFloat: [], // 深证指数的最大值数据的涨幅
            sziPriceMinFloat: [], // 深证指数的最小值数据的涨幅
            giTime: [], //创业板指数时间轴数据
            giPrice: [], //创业板指数price数据
            giPriceMax: [], // 创业板指数的最大值数据
            giPriceMin: [], // 创业板指数的最小值数据
            giPriceMaxinum: [], // 创业板指数的最小值数据,仅用于存储
            giPriceMininum: [], // 创业板指数的最小值数据,仅用于存储
            oldTime: '', //创业板指上一次数据推送的时间
            giPreClose: [], //创业板指上一交易日的收盘价
            giMa: [], //创业板指上的ma
            giVol: [], //创业扳指的成交量
            giRise: [], //创业扳指的涨跌幅
            giPriceMaxFloat: [], // 创业板指数的最大值数据的涨幅
            giPriceMinFloat: [], // 创业板指数的最小值数据的涨幅
            timeArray: [], //分时图的时间轴
            indexFlag: true, //判断tab栏切换的点击事件是否执行完毕
            ssciEcharts: null, //上证echarts图的实例
            ssciOption: null, //深证echarts图的实例
            sziEcharts: null, //创业板指echarts图的实例
            sziOption: null, //上证echarts图的option
            giEcharts: null, //深证echarts图的option
            giOption: null, //创业板指echarts图的option
        }
    },
    created: function () {
        // console.log('我是created生命周期函数')
    },
    mounted: function() {},
    destroyed: function() {
        clearInterval(this.interval);
        this.websc.send('{"oper":"delSub"}');
        this.websc.close();
        this.websc.onclose = function(event) {
            // console.log('关闭websocket', event)
        }
    },
    computed: {},
    watch: {
        //点击取消后，content的内容显示时，指数分时图下拉框默认不显示this.indexShow = false;
        isShow: function(val, oldVal) {
            if (val == true && oldVal == false) {
                this.indexShow = false;
                this.tabCount = [0, 0, 0];
                oldVal = val;
            }
        },
        indexShow: function(val, oldVal) { //指数分时图下拉框显示的时候，时间轴赋值
            if (val == true) {
                var hoursList = [{
                    "hour": "09",
                    "startMinutes": "30",
                    "endMinutes": "59"
                }, {
                    "hour": "10",
                    "startMinutes": "0",
                    "endMinutes": "59"
                }, {
                    "hour": "11",
                    "startMinutes": "0",
                    "endMinutes": "30"
                }, {
                    "hour": "13",
                    "startMinutes": "0",
                    "endMinutes": "59"
                }, {
                    "hour": "14",
                    "startMinutes": "0",
                    "endMinutes": "59"
                }, {
                    "hour": "15",
                    "startMinutes": "0",
                    "endMinutes": "0"
                }];
                var minutesList = [];
                for (var i = 0; i < hoursList.length; i++) {
                    this.forTime(hoursList[i].hour, hoursList[i].startMinutes, hoursList[i].endMinutes)
                        // console.log("循环", i)
                }
                // console.log("时间时间时间", this.timeArray);
            } else if (val == false) {
                this.timeArray = [];
                var that = this;
                this.websc.send('{"oper":"delSub"}');
                this.websc.send('{"oper":"addSub","info":{"S002":{"stkcode":"","isSub":"1","type":"","tit":"pre","stklist":["sh000001","sz399001","sz399006"]}}}');
                this.websc.onmessage = function(evt) {
                    // console.log("推送的指数", evt);
                    // console.log("列表evt", evt)
                    // console.log("只请求指数列表")
                    try {
                        var changedata = eval('(' + evt.data + ')');
                        // console.log
                        ("推送的指数changedata", changedata);
                        that.indexWebscoket(changedata);
                    } catch (e) {}
                }
            }
        }
    },
    components: {
        myheader,
        search
    },
    methods: {
        // 获取当前的时间日期
        getDate: function() {
            var day = new Date();
            var year = day.getFullYear(); //得到年份
            var month = day.getMonth() + 1; //得到月份
            var date = day.getDate(); //得到日期
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            this.totalDate = "" + year + month + date;
        },
        parentGetChild: function(val) { //将子组件search.vue传回来的值赋值给isShow,来判断content即自选股列表是否显示,子组件传回的值为false时显示
            //在点击取消按钮的时候调用requeatData函数
            if (val == false) {
                // this.showIndexPicture();
                // console.log('val', val)
                this.indexData();
                this.selfStock = JSON.parse(localStorage.getItem("selfStock"));
                // console.log("自选列表", this.selfStock);
                //获取请求自选股列表时  传回后台的股票代码列表
                this.stkcode = [];
                for (var i = 0; i < this.selfStock.length; i++) {
                    (this.stkcode).push(this.selfStock[i].stkcode);
                }
                // console.log("传回后台的代码列表", this.stkcode);
                // console.log(JSON.stringify(this.stkcode));
                var that = this;
                var startTimeAm = new Date();
                startTimeAm.setHours(9);
                startTimeAm.setMinutes(15);
                startTimeAm.setSeconds(0);
                // console.log("startTimeAm", startTimeAm);
                var endTimeAm = new Date();
                endTimeAm.setHours(11);
                endTimeAm.setMinutes(30);
                endTimeAm.setSeconds(0);
                // console.log("endTimeAm", endTimeAm);
                var startTimePm = new Date();
                startTimePm.setHours(13);
                startTimePm.setMinutes(0);
                startTimePm.setSeconds(0);
                // console.log("startTimePm", startTimePm);
                var endTimePm = new Date();
                endTimePm.setHours(15);
                endTimePm.setMinutes(0);
                endTimePm.setSeconds(0);
                // console.log("endTimePm", endTimePm);
                // console.log("newDate", new Date());
                if (this.selfStock.length > 0) { //若用户没有添加自选股，则不请求数据
                    this.forDate();
                    //在开盘时间段内才调用定时器，刷新最新价和涨幅数据 
                    if ((startTimeAm < new Date() && new Date() < endTimeAm) || (startTimePm < new Date() && new Date() < endTimePm)) {
                        that.interval = setInterval(that.forDate, 5000);
                    }
                }
            }
            this.isShow = val; //子组件传回来的值付值给isShow以判断自选股展示部分是否显示
            // console.log(this.isShow);
        },
        showIndexPicture: function() { //点击箭头判断 指数的下拉框是否显示
            this.indexShow = !this.indexShow;
            this.tabCount = [0, 0, 0];
            this.selected = "1";
            if (this.indexShow && this.selected == '1' && this.tabCount[0] < 1) {
                this.tabCount[0]++;
                this.getSscidata(this.drawEchartSsci);
            } else if (this.indexShow && this.selected == '2' && this.tabCount[1] < 1) {
                this.tabCount[1]++;
                this.getSzidata(this.drawEchartSzi);
            } else if (this.indexShow && this.selected == '3' && this.tabCount[2] < 1) {
                this.tabCount[2]++;
                this.getGidata(this.drawEchartGi);
            }
        },
        addStock: function() { //点击添加股票，判断content即自选股列表是否显示
            this.isShow = true;
        },
        goChange: function() { //最新价的升序降序还原
            // this.priceGoChange=1;
            this.riseGoChange = 0;
            this.type = "price";
            this.priceGoChange++;
            //点击最新价的图标时，改变排序方式的入参
            switch (this.priceGoChange) {
                case 3:
                    this.sort = "none";
                    this.forDate();
                    // console.log("排序还原", this.priceGoChange);
                    break;
                case 1:
                    this.sort = "asc";
                    this.forDate();
                    // console.log("升序", this.priceGoChange);
                    break;
                case 2:
                    this.sort = "desc";
                    this.forDate();
                    // console.log("降序", this.priceGoChange);
                    break;
            }
            // console.log("判断升降序2-------", this.priceGoChange);
            if (this.priceGoChange == 3) {
                this.priceGoChange = 0;
            }
        },
        riseChange: function() { //涨幅的升序降序还原
            this.priceGoChange = 0;
            this.type = "rise";
            this.riseGoChange++;
            //点击涨幅的图标时，改变排序方式的入参
            switch (this.riseGoChange) {
                case 3:
                    this.sort = "none";
                    this.forDate();
                    break;
                case 1:
                    this.sort = "asc";
                    this.forDate();
                    break;
                case 2:
                    this.sort = "desc";
                    this.forDate();
                    break;
            }
            if (this.riseGoChange == 3) {
                this.riseGoChange = 0;
            }
        },
        toDetail: function(item) { //点击自选股展示的每一条跳转至个股详情页
            this.$router.push({
                path: '/stockDetails/stkCode=' + item.stkCode + '&stkName=' + encodeURI(item.stkName)
            });
            // console.log(item);
        },
        forDate: function() {
            //请求自选股列表的数据，获取最新价 涨幅
            var that = this;
            // var startTime = new Date().getTime();
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getIndexData',
                    method: 'POST',
                    data: {
                        "stklist": that.stkcode,
                        "xdxrType": "pre",
                        "sort": that.sort,
                        "type": that.type,
                        "startNum": 0,
                        "endNum": that.stkcode.length
                    }
                })
                .then(function(res) {
                    // console.log("请求回来未处理的结果", res);
                    that.quotes = res.data.result; //取返回的结果
                    // console.log("请求回来的结果", that.quotes);
                    if ((that.quotes).length != 0) { //判断请求回来是有数据的
                        for (var i = 0; i < that.quotes.length; i++) {
                            if (that.quotes[i].strVal == "O") { //匹配开盘交易的
                                if (that.quotes[i].rise < 0) { //匹配涨幅小于0的
                                    that.quotes[i].code = that.quotes[i].stkCode.slice(2);
                                    that.quotes[i].price = that.quotes[i].price.toFixed(2);
                                    that.quotes[i].rise = that.quotes[i].rise.toFixed(2) + "%"
                                } else if (that.quotes[i].rise > 0) { //匹配涨幅大于0的
                                    that.quotes[i].code = that.quotes[i].stkCode.slice(2);
                                    that.quotes[i].price = that.quotes[i].price.toFixed(2);
                                    that.quotes[i].rise = "+" + that.quotes[i].rise.toFixed(2) + "%"
                                } else if (that.quotes[i].rise == 0) { //匹配涨幅等于0的
                                    that.quotes[i].code = that.quotes[i].stkCode.slice(2);
                                    that.quotes[i].price = that.quotes[i].price.toFixed(2);
                                    that.quotes[i].rise = that.quotes[i].rise.toFixed(2) + "%"
                                }
                            } else if (that.quotes[i].strVal == "P") { //匹配停牌的
                                that.quotes[i].code = that.quotes[i].stkCode.slice(2);
                                that.quotes[i].rise = "停牌"
                            } else if (that.quotes[i].strVal == "N") { //匹配退市的
                                that.quotes[i].code = that.quotes[i].stkCode.slice(2);
                            }
                        }
                        that.selfStock = that.quotes;
                    }
                    // console.log("请求赋值后直接使用的结果", that.selfStock);
                })
                // var endTime = new Date().getTime();
                // console.log("时间差", (endTime - startTime));
        },
        //获取指数的信息
        indexData: function() {
            var that = this;
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getIndexData',
                    method: 'POST',
                    data: {
                        "stklist": ["sh000001", "sz399001", "sz399006"],
                    }
                })
                .then(function(res) {
                    // console.log('指数的行情数据', res.data.result);
                    that.shangIndex = res.data.result[0];
                    that.shangIndex.price = that.shangIndex.price.toFixed(2);
                    that.shangIndex.rise = that.shangIndex.rise.toFixed(2);
                    that.shenIndex = res.data.result[1];
                    that.shenIndex.price = that.shenIndex.price.toFixed(2);
                    that.shenIndex.rise = that.shenIndex.rise.toFixed(2);
                    that.chuangyeIndex = res.data.result[2];
                    that.chuangyeIndex.price = that.chuangyeIndex.price.toFixed(2);
                    that.chuangyeIndex.rise = that.chuangyeIndex.rise.toFixed(2);
                    // console.log('that.websc', that.websc)
                    that.websc = new WebSocket("ws://101.231.93.232:14014/websocket");
                    that.websc.onopen = function() {
                        // console.log('2that.websc', that.websc)
                        that.websc.send('{"oper":"addSub","info":{"S002":{"stkcode":"","isSub":"1","type":"","tit":"pre","stklist":["sh000001","sz399001","sz399006"]}}}');
                    }
                    that.websc.onmessage = function(evt) {
                        // console.log("推送的指数", evt);
                        // console.log("列表evt", evt)
                        try {
                            // console.log("-------------------------------")
                            // var changedata = eval('(' + evt.data + ')').result;
                            var changedata = eval('(' + evt.data + ')');
                            // console.log("推送的指数", changedata);
                            that.indexWebscoket(changedata);
                        } catch (e) {}
                    }
                })
        },
        // 上证指数数据
        getSscidata: function(callback) {
            this.indexFlag = false;
            var ssci = this;
            ssci.getDate();
            ssci.ssciTime = [];
            ssci.ssciPrice = [];
            ssci.ssciVol = [];
            ssci.ssciRise = [];
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getDFiveTimeShareData',
                    method: 'POST',
                    data: {
                        "stkcode": "sh000001",
                        "xdxrType": "pre",
                        "type": "1day",
                        "time": ssci.totalDate,
                        "num": 49
                    }
                })
                .then(function(res) {
                    // console.log("进入上证指数");
                    if (res.data.result.length != 0) {
                        var resdata = res.data.result;
                        // console.log("上证指数", resdata)
                        for (var i = 0; i < 240; i++) { //取昨日收盘价
                            ssci.ssciPreClose[i] = resdata[0].preClose;
                        };
                        ssci.ssciPriceMaxinum = resdata[resdata.length - 1].maxHigh;
                        ssci.ssciPriceMininum = resdata[resdata.length - 1].minLow;
                        for (var i = 0; i < resdata.length; i++) {
                            ssci.ssciTime.push(resdata[i].time);
                            ssci.ssciPrice.push(resdata[i].price);
                            ssci.ssciMa.push(resdata[i].ma);
                            ssci.ssciVol.push(resdata[i].vol);
                            ssci.ssciRise.push(resdata[i].rise);
                        }
                        //计算分时图四个角的最大值，最小值，最大浮动，最小浮动
                        var maxCut = Math.abs(ssci.ssciPriceMaxinum - resdata[0].preClose);
                        var minCut = Math.abs(ssci.ssciPriceMininum - resdata[0].preClose)
                        if (maxCut > minCut) {
                            ssci.ssciPriceMax = (resdata[0].preClose + maxCut).toFixed(2);
                            ssci.ssciPriceMin = (resdata[0].preClose - maxCut).toFixed(2);
                            ssci.ssciPriceMaxFloat = (maxCut / resdata[0].preClose * 100).toFixed(2);
                            ssci.ssciPriceMinFloat = ((-1) * ssci.ssciPriceMaxFloat).toFixed(2);
                        } else {
                            ssci.ssciPriceMax = (resdata[0].preClose + minCut).toFixed(2);
                            ssci.ssciPriceMin = (resdata[0].preClose - minCut).toFixed(2);
                            ssci.ssciPriceMaxFloat = (minCut / resdata[0].preClose * 100).toFixed(2);
                            ssci.ssciPriceMinFloat = ((-1) * ssci.ssciPriceMaxFloat).toFixed(2);
                        }
                        ssci.ssciWebsocket()
                        if (callback && typeof callback == "function") {
                            callback(ssci.ssciTime, ssci.ssciPrice, ssci.ssciPriceMax, ssci.ssciPriceMin, ssci.ssciPreClose, ssci.ssciMa, ssci.ssciVol, ssci.ssciRise, ssci.ssciPriceMaxFloat, ssci.ssciPriceMinFloat);
                        }
                    }
                })
            this.indexFlag = true;
        },
        // 上证指数图的制作
        drawEchartSsci: function(time, price, max, min, preClose, ma, vol, rise, maxFloat, minFloat) {
            // console.log("绘制上证指数图",this.tabCount[0]);
            var echartsBox = document.getElementById('echartsBox');
            var Ssci = document.getElementById('Ssci');
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
            var resizeSsci = function() {
                Ssci.style.width = echartsBox.clientWidth + 'px';
                Ssci.style.height = echartsBox.clientHeight + 'px';
            };
            //设置容器高宽
            resizeSsci();
            // var myChartSsci = echarts.init(document.getElementById("Ssci"));
            var myChartSsci = echarts.init(document.getElementById("Ssci"));
            window.onresize = myChartSsci.resize;
            this.ssciEcharts = myChartSsci;
            preClose = this.ssciPreClose; //赋值，不重新赋值的情况下图形上的数据会消失
            vol = this.ssciVol; //赋值，不重新赋值的情况下图形上的数据会消失
            rise = this.ssciRise; //赋值，不重新赋值的情况下图形上的数据会消失
            time = this.timeArray;
            this.ssciOption = {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function(pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '56%'
                        };
                        // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    },
                    formatter: function(params) {
                        if (params.length == 3) {
                            if (params[0].seriesName == '现价') {
                                params[2].value = params[2].value / 100
                                if (params[2].value > 100000000) {
                                  params[2].value = (params[2].value / 100000000).toFixed(2) + '亿'
                                } else if (params[2].value > 10000) {
                                  params[2].value = (params[2].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[2].value = Math.ceil(params[2].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[0].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[2].value;
                                res += '</div>';
                                return res;
                            } else if (params[0].seriesName == '成交量') {
                                params[0].value = params[0].value / 100
                                if (params[0].value > 100000000) {
                                  params[0].value = (params[0].value / 100000000).toFixed(2) + '亿'
                                } else if (params[0].value > 10000) {
                                  params[0].value = (params[0].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[0].value = Math.ceil(params[0].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[2].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[0].value;
                                res += '</div>';
                                return res;
                            }
                        } else {
                            return
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid'
                        },
                    }
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: 0,
                    height: '55%',
                }, {
                    left: '1%',
                    right: '1%',
                    top: '56.5%',
                    height: '35%'
                }],
                xAxis: [{
                    splitLine: {　　　　
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            width: 0.5
                        }　　　
                    },
                    type: 'category',
                    data: time,

                    axisTick: {
                        show: false,
                    },
                    margin: 15,
                    // 'axisLabel': {
                    //     'interval': 60,
                    // },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc",
                            width: 0.5,
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    },
                    axisLabel: {
                        show: false,
                        interval: 60,
                    }
                }, {
                    type: 'category',
                    gridIndex: 1,
                    data: time,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitNumber: 20,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisLabel: {
                        show: false,
                        formatter: '{value}\n',
                        inside: true,
                        length: 20,
                        interval: 1
                    },
                    position: 'left',
                    max: max,
                    min: min,
                    silent: true,
                    scale: true,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                graphic: [{
                    type: 'text',
                    right: 'right',
                    top: 'top',
                    style: {
                        text: maxFloat + '%',
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: 'right',
                    bottom: '45%',
                    style: {
                        text: minFloat + '%',
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    top: 'top',
                    style: {
                        text: max,
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '45%',
                    style: {
                        text: min,
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '69%',
                    style: {
                        text: preClose[0].toFixed(2),
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: '1%',
                    bottom: '37%',
                    style: {
                        text: '9:30',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'center',
                    bottom: '37%',
                    style: {
                        text: '11:30/13:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: '1%',
                    bottom: '37%',
                    style: {
                        text: '15:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }],
                series: [{
                    name: '现价',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: price,
                    lineStyle: {
                        normal: {
                            color: 'rgba(36,137,232,0.5)',
                            width: 1
                        }
                    },
                }, {
                    name: '昨收',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: preClose,
                    itemStyle: {
                        normal: {
                            // color: '#ccc'
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                            color: '#ccc',
                            width: 1
                        }
                    },
                }, {
                    name: '成交量',
                    type: 'bar',
                    animation: false,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function(vol) {
                                var ssciColorList = [];
                                for (var i = 0; i < rise.length; i++) {
                                    if (rise[i] > 0) {
                                        ssciColorList.push('#ec0000')
                                    } else {
                                        ssciColorList.push('#00da3c')
                                    }
                                }
                                return ssciColorList[vol.dataIndex]
                            }
                        }
                    }
                }]
            };
            myChartSsci.setOption(this.ssciOption);
            window.onresize = function() {
                resizeSsci();
                myChartSsci.resize();
            }
        },
        // 深证指数数据
        getSzidata: function(callback) {
            this.indexFlag = false;
            var szi = this;
            szi.getDate();
            szi.sziTime = [];
            szi.sziPrice = [];
            szi.sziVol = [];
            szi.sziRise = [];
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getDFiveTimeShareData',
                    method: 'POST',
                    data: {
                        "stkcode": "sz399001",
                        "xdxrType": "pre",
                        "type": "1day",
                        "time": szi.totalDate,
                        "num": 49
                    }
                })
                .then(function(res) {
                    // console.log("进入深证指数");
                    if (res.data.result.length != 0) {
                        var resdata = res.data.result;
                        // console.log("深证指数", resdata)
                        for (var i = 0; i < 240; i++) { //取昨日收盘价
                            szi.sziPreClose[i] = resdata[0].preClose;
                        };
                        szi.sziPriceMaxinum = resdata[resdata.length - 1].maxHigh;
                        szi.sziPriceMininum = resdata[resdata.length - 1].minLow;
                        for (var i = 0; i < resdata.length; i++) {
                            szi.sziTime.push(resdata[i].time);
                            szi.sziPrice.push(resdata[i].price);
                            szi.sziMa.push(resdata[i].ma);
                            szi.sziVol.push(resdata[i].vol);
                            szi.sziRise.push(resdata[i].rise);
                        }
                        // console.log("分时图的时间轴", szi.sziTime);
                        // console.log("分时图的现价price", szi.sziPrice);
                        var maxCut = Math.abs(szi.sziPriceMaxinum - resdata[0].preClose);
                        var minCut = Math.abs(szi.sziPriceMininum - resdata[0].preClose)
                        if (maxCut > minCut) {
                            szi.sziPriceMax = (resdata[0].preClose + maxCut).toFixed(2);
                            szi.sziPriceMin = (resdata[0].preClose - maxCut).toFixed(2);
                            szi.sziPriceMaxFloat = (maxCut / resdata[0].preClose * 100).toFixed(2);
                            szi.sziPriceMinFloat = ((-1) * szi.sziPriceMaxFloat).toFixed(2);
                        } else {
                            szi.sziPriceMax = (resdata[0].preClose + minCut).toFixed(2);
                            szi.sziPriceMin = (resdata[0].preClose - minCut).toFixed(2);
                            szi.sziPriceMaxFloat = (minCut / resdata[0].preClose * 100).toFixed(2);
                            szi.sziPriceMinFloat = ((-1) * szi.sziPriceMaxFloat).toFixed(2);
                        }
                        szi.sziWebsocket();
                        if (callback && typeof callback == "function") {
                            callback(szi.sziTime, szi.sziPrice, szi.sziPriceMax, szi.sziPriceMin, szi.sziPreClose, szi.sziMa, szi.sziVol, szi.sziRisegi, szi.sziPriceMaxFloat, szi.sziPriceMinFloat);
                        }
                    }
                })
            this.indexFlag = true;
        },
        // 深证指数图的制作
        drawEchartSzi: function(time, price, max, min, preClose, ma, vol, rise, maxFloat, minFloat) {
            // console.log("绘制深证指数图",this.tabCount[1]);
            var Szi = document.getElementById('Szi');
            var echartsBox = document.getElementById('echartsBox');
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
            var resizeSsci = function() {
                Szi.style.width = echartsBox.clientWidth + 'px';
                Szi.style.height = echartsBox.clientHeight + 'px';
            };
            //设置容器高宽
            resizeSsci();
            var myChartSzi = echarts.init(document.getElementById("Szi"));
            window.onresize = myChartSzi.resize;
            this.sziEcharts = myChartSzi;
            preClose = this.sziPreClose; //赋值，不重新赋值的情况下图形上的数据会消失
            vol = this.sziVol; //赋值，不重新赋值的情况下图形上的数据会消失
            rise = this.sziRise; //赋值，不重新赋值的情况下图形上的数据会消失
            time = this.timeArray;
            this.sziOption = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function(pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '56%'
                        };
                        return obj;
                    },
                    formatter: function(params) {
                        // console.log("params",params)
                        if (params.length == 3) {
                            if (params[0].seriesName == '现价') {
                                params[2].value = params[2].value / 100
                                if (params[2].value > 100000000) {
                                  params[2].value = (params[2].value / 100000000).toFixed(2) + '亿'
                                } else if (params[2].value > 10000) {
                                  params[2].value = (params[2].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[2].value = Math.ceil(params[2].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[0].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[2].value;
                                res += '</div>';
                                return res;
                            } else if (params[0].seriesName == '成交量') {
                                params[0].value = params[0].value / 100
                                if (params[0].value > 100000000) {
                                  params[0].value = (params[0].value / 100000000).toFixed(2) + '亿'
                                } else if (params[0].value > 10000) {
                                  params[0].value = (params[0].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[0].value = Math.ceil(params[0].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[2].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[0].value;
                                res += '</div>';
                                return res;
                            }
                        } else {
                            return
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid'
                        },
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }]
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: 0,
                    height: '55%',
                }, {
                    left: '1%',
                    right: '1%',
                    top: '56.5%',
                    height: '35%'
                }],
                xAxis: [{
                    splitLine: {　　　　
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            width: 0.5
                        }　　　
                    },
                    type: 'category',
                    data: time,

                    axisTick: {
                        show: false,
                    },
                    margin: 15,
                    // 'axisLabel': {
                    //     'interval': 60,
                    // },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc",
                            width: 0.5,
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    },
                    axisLabel: {
                        show: false,
                        interval: 60,
                    }
                }, {
                    type: 'category',
                    gridIndex: 1,
                    data: time,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitNumber: 20,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisLabel: {
                        show: false,
                        formatter: '{value}\n',
                        inside: true,
                        length: 20,
                        interval: 1
                    },
                    position: 'left',
                    max: max,
                    min: min,
                    silent: true,
                    scale: true,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                graphic: [{
                    type: 'text',
                    right: 'right',
                    top: 'top',
                    style: {
                        text: maxFloat + '%',
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: 'right',
                    bottom: '45%',
                    style: {
                        text: minFloat + '%',
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    top: 'top',
                    style: {
                        text: max,
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '45%',
                    style: {
                        text: min,
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '69%',
                    style: {
                        text: preClose[0].toFixed(2),
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: '1%',
                    bottom: '37%',
                    style: {
                        text: '9:30',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'center',
                    bottom: '37%',
                    style: {
                        text: '11:30/13:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: '1%',
                    bottom: '37%',
                    style: {
                        text: '15:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }],
                series: [{
                    name: '现价',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: price,
                    lineStyle: {
                        normal: {
                            color: 'rgba(36,137,232,0.5)',
                            width: 1
                        }
                    },
                }, {
                    name: '昨收',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: preClose,
                    itemStyle: {
                        normal: {
                            // color: '#ccc'
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                            color: '#ccc',
                            width: 1
                        }
                    },
                }, {
                    name: '成交量',
                    type: 'bar',
                    animation: false,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function(vol) {
                                var sziColorList = [];
                                for (var i = 0; i < rise.length; i++) {
                                    if (rise[i] > 0) {
                                        sziColorList.push('#ec0000')
                                    } else {
                                        sziColorList.push('#00da3c')
                                    }
                                }
                                return sziColorList[vol.dataIndex]
                            }
                        }
                    }
                }]
            };
            myChartSzi.setOption(this.sziOption);
            window.onresize = function() {
                resizeSsci();
                myChartSzi.resize();
            }
        },
        // 创业板指数数据
        getGidata: function(callback) {
            this.indexFlag = false;
            var gi = this;
            gi.getDate();
            gi.giTime = [];
            gi.giPrice = [];
            gi.giVol = [];
            gi.giRise = [];
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getDFiveTimeShareData',
                    method: 'POST',
                    data: {
                        "stkcode": "sz399006",
                        "xdxrType": "pre",
                        "type": "1day",
                        "time": gi.totalDate,
                        "num": 49
                    }
                })
                .then(function(res) {
                    if (res.data.result.length != 0) {
                        var resdata = res.data.result;
                        // console.log('resdata创业板指数', resdata);
                        //判断没有数据的情况
                        for (var i = 0; i < 240; i++) { //取昨日收盘价,需要以虚线绘制昨日收盘价的折线
                            gi.giPreClose[i] = resdata[0].preClose;
                        };
                        // console.log('昨收', gi.giPreClose);
                        gi.giPriceMaxinum = resdata[resdata.length - 1].maxHigh;
                        gi.giPriceMininum = resdata[resdata.length - 1].minLow;
                        for (var i = 0; i < resdata.length; i++) {
                            gi.giTime.push(resdata[i].time);
                            gi.giPrice.push(resdata[i].price);
                            gi.giMa.push(resdata[i].ma);
                            gi.giVol.push(resdata[i].vol);
                            gi.giRise.push(resdata[i].rise);
                            // 取出整个数组的最大值  最小值
                        }
                        // console.log("分时数据的成交量1", gi.giVol)
                        // console.log("分时图的时间轴", gi.giTime);
                        // console.log("分时图的现价price", gi.giPrice);
                        var maxCut = Math.abs(gi.giPriceMaxinum - resdata[0].preClose);
                        var minCut = Math.abs(gi.giPriceMininum - resdata[0].preClose)
                        if (maxCut > minCut) {
                            gi.giPriceMax = (resdata[0].preClose + maxCut).toFixed(2);
                            gi.giPriceMin = (resdata[0].preClose - maxCut).toFixed(2);
                            gi.giPriceMaxFloat = (maxCut / resdata[0].preClose * 100).toFixed(2);
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        } else {
                            gi.giPriceMax = (resdata[0].preClose + minCut).toFixed(2);
                            gi.giPriceMin = (resdata[0].preClose - minCut).toFixed(2);
                            gi.giPriceMaxFloat = (minCut / resdata[0].preClose * 100).toFixed(2);
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        }
                        gi.giWebsocket();
                        // console.log("时间轴的数据", gi.giTime)
                        if (callback && typeof callback == "function") {
                            callback(gi.giTime, gi.giPrice, gi.giPriceMax, gi.giPriceMin, gi.giPreClose, gi.giMa, gi.giVol, gi.giRise, gi.giPriceMaxFloat, gi.giPriceMinFloat);
                        }
                    }
                })
            gi.indexFlag = true;
        },
        // 创业板指数图的制作
        drawEchartGi: function(time, price, max, min, preClose, ma, vol, rise, maxFloat, minFloat) {
            // console.log("绘制创业板指数图",this.tabCount[2]);
            var Gi = document.getElementById('Gi');
            var echartsBox = document.getElementById('echartsBox');
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
            var resizeSsci = function() {
                Gi.style.width = echartsBox.clientWidth + 'px';
                Gi.style.height = echartsBox.clientHeight + 'px';
                // console.log('echarts图前面尺寸的赋值')
            };
            //设置容器高宽
            resizeSsci();
            var myChartGi = echarts.init(document.getElementById("Gi"));
            window.onresize = myChartGi.resize;
            this.giEcharts = myChartGi;
            preClose = this.giPreClose; //赋值，不重新赋值的情况下图形上的数据会消失
            vol = this.giVol; //赋值，不重新赋值的情况下图形上的数据会消失
            rise = this.giRise; //赋值，不重新赋值的情况下图形上的数据会消失
            time = this.timeArray;
            this.giOption = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function(pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '56%'
                        };
                        // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    },
                    // formatter: '时间: {b0}, 昨收: {c0}<br />{b1}: {c1}',
                    formatter: function(params) {
                        // console.log("params&&&&&&&&&&&&&&&&&&&&&&&&&&&",params)
                        if (params.length == 3) {
                            if (params[0].seriesName == '现价') {
                                params[2].value = params[2].value / 100
                                if (params[2].value > 100000000) {
                                  params[2].value = (params[2].value / 100000000).toFixed(2) + '亿'
                                } else if (params[2].value > 10000) {
                                  params[2].value = (params[2].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[2].value = Math.ceil(params[2].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[0].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[2].value;
                                res += '</div>';
                                return res;
                            } else if (params[0].seriesName == '成交量') {
                                params[0].value = params[0].value / 100
                                if (params[0].value > 100000000) {
                                  params[0].value = (params[0].value / 100000000).toFixed(2) + '亿'
                                } else if (params[0].value > 10000) {
                                  params[0].value = (params[0].value / 10000).toFixed(2) + '万'
                                } else {
                                  params[0].value = Math.ceil(params[0].value)
                                }
                                var res = '<div style = ' + 'width:100%;font-Size:0.6rem;' + '>时间：' + params[0].axisValue;
                                res += '&nbsp;&nbsp;&nbsp;现价：';
                                res += params[1].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;昨收：';
                                res += params[2].value.toFixed(2);
                                res += '&nbsp;&nbsp;&nbsp;成交量：';
                                res += params[0].value;
                                res += '</div>';
                                return res;
                            }
                        } else {
                            return
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid'
                        },
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }]
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: 0,
                    height: '55%',
                }, {
                    left: '1%',
                    right: '1%',
                    top: '56.5%',
                    height: '35%'
                }],
                xAxis: [{
                    splitLine: {　　　　
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            width: 0.5
                        }　　　
                    },
                    type: 'category',
                    data: time,

                    axisTick: {
                        show: false,
                    },
                    margin: 15,
                    // 'axisLabel': {
                    //     'interval': 60,
                    // },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc",
                            width: 0.5,
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    },
                    axisLabel: {
                        show: false,
                        interval: 60,
                    }
                }, {
                    type: 'category',
                    gridIndex: 1,
                    data: time,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitNumber: 20,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisLabel: {
                        show: false,
                        formatter: '{value}\n',
                        inside: true,
                        length: 20,
                        interval: 1
                    },
                    position: 'left',
                    max: max,
                    min: min,
                    silent: true,
                    scale: true,
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                graphic: [{
                    type: 'text',
                    right: 'right',
                    top: 'top',
                    style: {
                        text: maxFloat + '%',
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: 'right',
                    bottom: '45%',
                    style: {
                        text: minFloat + '%',
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    top: 'top',
                    style: {
                        text: max,
                        fill: '#ec0000',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '45%',
                    style: {
                        text: min,
                        fill: '#00da3c',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '69%',
                    style: {
                        text: preClose[0].toFixed(2),
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: '1%',
                    bottom: '37%',
                    style: {
                        text: '9:30',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    left: 'center',
                    bottom: '37%',
                    style: {
                        text: '11:30/13:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }, {
                    type: 'text',
                    right: '1%',
                    bottom: '37%',
                    style: {
                        text: '15:00',
                        fill: '#ccc',
                        font: ' 0.8em "Open Sans",PingFangSC-Regular'
                    }
                }],
                series: [{
                    name: '现价',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: price,
                    lineStyle: {
                        normal: {
                            color: 'rgba(36,137,232,0.5)',
                            width: 1
                        }
                    },
                }, {
                    name: '昨收',
                    type: 'line',
                    animation: false,
                    symbol: "none",
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: preClose,
                    itemStyle: {
                        normal: {
                            // color: '#ccc'
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                            color: '#ccc',
                            width: 1
                        }
                    },
                }, {
                    name: '成交量',
                    type: 'bar',
                    animation: false,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function(vol) {
                                var giColorList = [];
                                for (var i = 0; i < rise.length; i++) {
                                    if (rise[i] > 0) {
                                        giColorList.push('#ec0000')
                                    } else {
                                        giColorList.push('#00da3c')
                                    }
                                }
                                // return console.log("=============",giColorList);
                                return giColorList[vol.dataIndex]
                            }
                        }
                    }
                }]
            };
            myChartGi.setOption(this.giOption);
            // window.onresize = myChartGi.resize;
            window.onresize = function() {
                // console.log('echarts图前面尺寸的赋值')
                resizeSsci();
                myChartGi.resize();
            }
        },
        shangzhenSelected: function() { //点击上证指数时，显示分时图
            if (this.indexFlag) {
                this.indexShow = true;
                this.selected = '1';
                // console.log(this.selected);
                if (this.tabCount[0] < 1) {
                    this.tabCount[0]++;
                    this.getSscidata(this.drawEchartSsci);
                } else {
                    // console.log("点击第二次")
                    this.ssciWebsocket()
                }
            }
        },
        shenzhengSelected: function() { //点击深证指数时，显示分时图
            if (this.indexFlag) {
                this.indexShow = true;
                this.selected = '2';
                // console.log(this.selected);
                if (this.tabCount[1] < 1) {
                    this.tabCount[1]++;
                    this.getSzidata(this.drawEchartSzi);
                } else {
                    // console.log("深证多次点击")
                    this.sziWebsocket();
                }
            }
        },
        chuangyeSelected: function() { //点击创业指数时，显示分时图
            if (this.indexFlag) {
                this.indexShow = true;
                this.selected = '3';
                // console.log(this.selected);
                if (this.tabCount[2] < 1) {
                    this.tabCount[2]++;
                    this.getGidata(this.drawEchartGi);
                } else {
                    this.giWebsocket();
                }
            }
        },
        forTime: function(hour, startMinutes, endMinutes) { //获取分时图x轴上的时间
            // this.timeArray = [];
            for (var i = startMinutes; i <= endMinutes; i++) {
                var timeStr = hour + ":" + (i < 10 ? ("0" + i) : i)
                this.timeArray.push(timeStr)
            }
            // return this.timeArray
        },
        indexWebscoket: function(event) { //处理websocket推送指数时的数据
            // console.log("进入************");
            var that = this;
            var changedata = event.result;
            // console.log("推送的指数%%%%%", changedata);
            // console.log("推送的指数####", changedata.stkCode);
            if (changedata.stkCode == 'sh000001') {
                // console.log("推送的指数####2", that.shangIndex.price);
                that.shangIndex = changedata;
                that.shangIndex.price = that.shangIndex.price.toFixed(2);
                that.shangIndex.rise = that.shangIndex.rise.toFixed(2);
                // console.log("上证价", that.shangIndex.price)
            }
            if (changedata.stkCode == 'sz399001') {
                // console.log("推送的指数####2", that.shenIndex.price);
                that.shenIndex = changedata;
                that.shenIndex.price = that.shenIndex.price.toFixed(2);
                that.shenIndex.rise = that.shenIndex.rise.toFixed(2);
                // console.log("深证价", that.shenIndex.price)
            }
            if (changedata.stkCode == 'sz399006') {
                // console.log("推送的指数####2", that.chuangyeIndex.price);
                that.chuangyeIndex = changedata;
                that.chuangyeIndex.price = that.chuangyeIndex.price.toFixed(2);
                that.chuangyeIndex.rise = that.chuangyeIndex.rise.toFixed(2);
            }
        },
        ssciWebsocket: function(evt) { //处理websocke推送时的上证指数数据
            var ssci = this;
            ssci.websc.send('{"oper":"delSub"}');
            // ssci.websc.send('{"oper":"addSub","info":{"S007":{"stkcode":"sh000001","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            ssci.websc.send('{"oper":"updSub","info":{"S002":{"stkcode":"","isSub":"1","type":"","tit":"pre","stklist":["sh000001","sz399001","sz399006"]},"S007":{"stkcode":"sh000001","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            ssci.websc.onerror = function() {
                return
            };
            ssci.websc.onmessage = function(evt) {
                try {
                    //webscoket 数据
                    var resultData = eval('(' + evt.data + ')');
                    // console.log('resultData@@@@', resultData)
                    if (resultData.fid == "S002") {
                        // console.log("****s002", resultData.fid)
                        ssci.indexWebscoket(resultData);
                    } else if (resultData.fid == "S007") {
                        // console.log("****S007", resultData.fid)
                        var changedata = resultData.result;
                        // var changedata = eval('(' + evt.data + ')').result;
                        // console.log("变化的上证指数分时数据", changedata);
                        var newTime = parseInt(changedata.time);
                        newTime = new Date(newTime);
                        var m = newTime.getMinutes();
                        var h = newTime.getHours();
                        newTime = h * 60 + m;
                        // console.log("newTime", newTime);
                        // console.log("oldTime", ssci.ssciOldTime);
                        if (newTime == ssci.ssciOldTime) {
                            ssci.ssciPrice[ssci.ssciPrice.length - 1] = changedata.price;
                            ssci.ssciTime[ssci.ssciTime.length - 1] = changedata.time;
                            ssci.ssciMa[ssci.ssciMa.length - 1] = changedata.ma;
                            ssci.ssciVol[ssci.ssciVol.length - 1] = changedata.vol;
                            ssci.ssciRise[ssci.ssciRise.length - 1] = changedata.rise;
                            ssci.ssciOldTime = newTime;
                            // console.log('时间一致', gi.giPreClose);
                            // console.log("newTime", newTime);
                            // console.log("oldTime", ssci.ssciOldTime);
                            // console.log("newTime-oldTime", (newTime - ssci.ssciOldTime));
                            // console.log("oldTime====oldTime");
                        } else if (newTime != ssci.ssciOldTime) {
                            if (ssci.ssciOldTime != "" && ssci.ssciOldTime != undefined && ssci.ssciOldTime != null && (newTime - ssci.ssciOldTime) > 1) {
                                // console.log('(newTime - ssci.ssciOldTime) > 1', newTime - ssci.ssciOldTime)
                                // console.log("前", ssci.ssciPrice.length)
                                for (var i = 0; i < (newTime - ssci.ssciOldTime - 1); i++) {
                                    ssci.ssciPrice.push(null);
                                    ssci.ssciTime.push(null);
                                    ssci.ssciMa.push(null);
                                    ssci.ssciVol.push(null);
                                    ssci.ssciRise.push(null);
                                }
                                // ssci.ssciPrice[ssci.ssciPrice.length] = " ";
                                // ssci.ssciTime[ssci.ssciTime.length] = changedata.time;
                                // ssci.ssciMa[ssci.ssciMa.length] = " ";
                                // ssci.ssciVol[ssci.ssciVol.length] = " ";
                                // ssci.ssciRise[ssci.ssciRise.length] = " ";
                                // console.log("后", ssci.ssciPrice)
                                // console.log("后", ssci.ssciPrice.length)
                                ssci.ssciPrice.push(changedata.price);
                                ssci.ssciTime.push(changedata.time);
                                ssci.ssciMa.push(changedata.ma);
                                ssci.ssciVol.push(changedata.vol);
                                ssci.ssciRise.push(changedata.rise);
                                ssci.ssciOldTime = newTime;
                            } else {
                                ssci.ssciPrice.push(changedata.price);
                                ssci.ssciTime.push(changedata.time);
                                ssci.ssciMa.push(changedata.ma);
                                ssci.ssciVol.push(changedata.vol);
                                ssci.ssciRise.push(changedata.rise);
                                // console.log("oldTime", ssci.ssciOldTime);
                                ssci.ssciOldTime = newTime;
                                // console.log('时间不一致', gi.giPreClose);
                                // console.log("newTime", newTime);
                                // console.log("oldTime!=!=!=oldTime");
                                // console.log(gi.giPreClose);
                            }
                        }
                        if (ssci.ssciPriceMaxinum < changedata.maxHigh) {
                            ssci.ssciPriceMaxinum = (changedata.maxHigh).toFixed(2);
                        }
                        if (ssci.ssciPriceMininum > changedata.minLow) {
                            ssci.ssciPriceMininum = (changedata.minLow).toFixed(2);
                        }
                        // console.log("ssci.ssciPriceMaxinum",ssci.ssciPriceMaxinum)
                        // console.log("ssci.ssciPriceMininum",ssci.ssciPriceMininum)
                        // gi.giPriceMax = changedata.maxHigh;
                        // gi.giPriceMin = changedata.minLow;
                        var maxCut = Math.abs(ssci.ssciPriceMaxinum - changedata.preClose);
                        var minCut = Math.abs(ssci.ssciPriceMininum - changedata.preClose)
                        if (maxCut > minCut) {
                            ssci.ssciPriceMax = (changedata.preClose + maxCut).toFixed(2);
                            ssci.ssciPriceMin = (changedata.preClose - maxCut).toFixed(2);
                            ssci.ssciPriceMaxFloat = (maxCut / changedata.preClose * 100).toFixed(2);
                            ssci.ssciPriceMinFloat = ((-1) * ssci.ssciPriceMaxFloat).toFixed(2);
                            // console.log("ssci.ssciPriceMax",ssci.ssciPriceMax)
                            // console.log("ssci.ssciPriceMin",ssci.ssciPriceMin)
                            // console.log("ssci.ssciPriceMaxFloat",ssci.ssciPriceMaxFloat)
                            // console.log("ssci.ssciPriceMinFloat",ssci.ssciPriceMinFloat)
                            // console.log("maxCut > minCut")
                        } else {
                            ssci.ssciPriceMax = (changedata.preClose + minCut).toFixed(2);
                            ssci.ssciPriceMin = (changedata.preClose - minCut).toFixed(2);
                            ssci.ssciPriceMaxFloat = (minCut / changedata.preClose * 100).toFixed(2);
                            ssci.ssciPriceMinFloat = ((-1) * ssci.ssciPriceMaxFloat).toFixed(2);
                            // console.log("ssci.ssciPriceMax",ssci.ssciPriceMax)
                            // console.log("ssci.ssciPriceMin",ssci.ssciPriceMin)
                            // console.log("ssci.ssciPriceMaxFloat",ssci.ssciPriceMaxFloat)
                            // console.log("ssci.ssciPriceMinFloat",ssci.ssciPriceMinFloat)
                            // console.log("maxCut < minCut")
                        }
                        // console.log("ssci.ssciPriceMax推送后的......", ssci.ssciPriceMax);
                        // console.log(" ssci.ssciPriceMin推送后的......", ssci.ssciPriceMin);
                    }
                    ssci.ssciEcharts.setOption(ssci.ssciOption);
                } catch (e) {}
            }
        },
        sziWebsocket: function(evt) { //处理websocke推送时的深证指数数据
            var szi = this;
            // console.log("一")
            szi.websc.send('{"oper":"delSub"}');
            // console.log("二")
            // szi.websc.send('{"oper":"addSub","info":{"S007":{"stkcode":"sz399001","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            szi.websc.send('{"oper":"updSub","info":{"S002":{"stkcode":"","isSub":"1","type":"","tit":"pre","stklist":["sh000001","sz399001","sz399006"]},"S007":{"stkcode":"sz399001","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            szi.websc.onerror = function() {
                return
            };
            // console.log("三")
            szi.websc.onmessage = function(evt) {
                try {
                    //webscoket 数据
                    var resultData = eval('(' + evt.data + ')');
                    if (resultData.fid == "S002") {
                        // console.log("****s002", resultData.fid)
                        szi.indexWebscoket(resultData);

                    } else if (resultData.fid == "S007") {
                        // console.log("****S007", resultData.fid)
                        var changedata = resultData.result;
                        // var changedata = eval('(' + evt.data + ')').result;
                        // console.log("变化的深证指数分时数据", changedata);
                        var newTime = parseInt(changedata.time);
                        newTime = new Date(newTime);
                        var m = newTime.getMinutes();
                        var h = newTime.getHours();
                        newTime = h * 60 + m;
                        if (newTime == szi.sziOldTime) {
                            szi.sziPrice[szi.sziPrice.length - 1] = changedata.price;
                            szi.sziTime[szi.sziTime.length - 1] = changedata.time;
                            szi.sziMa[szi.sziMa.length - 1] = changedata.ma;
                            szi.sziVol[szi.sziVol.length - 1] = changedata.vol;
                            szi.sziRise[szi.sziRise.length - 1] = changedata.rise;
                            szi.sziOldTime = newTime;
                            // console.log('时间一致', gi.giPreClose);
                            // console.log("newTime", newTime);
                            // console.log("oldTime", szi.sziOldTime);
                            // console.log("newTime-oldTime", (newTime - szi.sziOldTime));
                            // console.log("oldTime====oldTime");
                        } else if (newTime != szi.sziOldTime) {
                            if (szi.sziOldTime != "" && szi.sziOldTime != undefined && szi.sziOldTime != null && (newTime - szi.sziOldTime) > 1) {
                                for (var i = 0; i < (newTime - szi.sziOldTime - 1); i++) {
                                    szi.sziPrice.push(null);
                                    szi.sziTime.push(null);
                                    szi.sziMa.push(null);
                                    szi.sziVol.push(null);
                                    szi.sziRise.push(null);
                                }
                                szi.sziPrice.push(changedata.price);
                                szi.sziTime.push(changedata.time);
                                szi.sziMa.push(changedata.ma);
                                szi.sziVol.push(changedata.vol);
                                szi.sziRise.push(changedata.rise);
                                szi.sziOldTime = newTime;
                            } else {
                                szi.sziPrice.push(changedata.price);
                                szi.sziTime.push(changedata.time);
                                szi.sziMa.push(changedata.ma);
                                szi.sziVol.push(changedata.vol);
                                szi.sziRise.push(changedata.rise);
                                szi.sziOldTime = newTime;
                                // console.log('时间不一致', gi.giPreClose);
                                // console.log("newTime", newTime);
                                // console.log("oldTime", szi.sziOldTime);
                                // console.log("oldTime!=!=!=oldTime");
                                // console.log(gi.giPreClose);
                            }
                        }
                        if (szi.sziPriceMaxinum < changedata.maxHigh) {
                            szi.sziPriceMaxinum = (changedata.maxHigh).toFixed(2);
                        }
                        if (szi.sziPriceMininum > changedata.minLow) {
                            szi.sziPriceMininum = (changedata.minLow).toFixed(2);
                        }
                        var maxCut = Math.abs(szi.sziPriceMaxinum - changedata.preClose);
                        var minCut = Math.abs(szi.sziPriceMininum - changedata.preClose)
                        if (maxCut > minCut) {
                            szi.sziPriceMax = (changedata.preClose + maxCut).toFixed(2);
                            szi.sziPriceMin = (changedata.preClose - maxCut).toFixed(2);
                            szi.sziPriceMaxFloat = (maxCut / changedata.preClose * 100).toFixed(2);
                            szi.sziPriceMinFloat = ((-1) * szi.sziPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        } else {
                            szi.sziPriceMax = (changedata.preClose + minCut).toFixed(2);
                            szi.sziPriceMin = (changedata.preClose - minCut).toFixed(2);
                            szi.sziPriceMaxFloat = (minCut / changedata.preClose * 100).toFixed(2);
                            szi.sziPriceMinFloat = ((-1) * szi.sziPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        }
                    }
                    szi.sziEcharts.setOption(szi.sziOption);
                } catch (e) {}
            }
        },
        giWebsocket: function(evt) { //处理websocke推送时的创业扳指数据
            var gi = this;
            gi.websc.send('{"oper":"delSub"}');
            // gi.websc.send('{"oper":"addSub","info":{"S007":{"stkcode":"sz399006","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            gi.websc.send('{"oper":"updSub","info":{"S002":{"stkcode":"","isSub":"1","type":"","tit":"pre","stklist":["sh000001","sz399001","sz399006"]},"S007":{"stkcode":"sz399006","isSub":"1","type":"1day","tit":"pre","stklist":[]}}}');
            gi.websc.onerror = function() {
                return
            };
            gi.websc.onmessage = function(evt) {
                // console.log("创业evt", evt)
                try {
                    var resultData = eval('(' + evt.data + ')');
                    if (resultData.fid == "S002") {
                        // console.log("****s002", resultData.fid)
                        gi.indexWebscoket(resultData);

                    } else if (resultData.fid == "S007") {
                        // console.log("****S007", resultData.fid)
                        //webscoket 数据
                        // var changedata = eval('(' + evt.data + ')').result;
                        var changedata = resultData.result;
                        // console.log("推送的分时数据创业板指数", changedata);
                        var newTime = parseInt(changedata.time);
                        newTime = new Date(newTime);
                        var m = newTime.getMinutes();
                        var h = newTime.getHours();
                        // newTime = h + ":" + m;
                        newTime = h * 60 + m;
                        if (newTime == gi.oldTime) {
                            gi.giPrice[gi.giPrice.length - 1] = changedata.price;
                            gi.giTime[gi.giTime.length - 1] = changedata.time;
                            gi.giMa[gi.giMa.length - 1] = changedata.ma;
                            gi.giVol[gi.giVol.length - 1] = changedata.vol;
                            gi.giRise[gi.giRise.length - 1] = changedata.rise;
                            gi.oldTime = newTime;
                            // console.log('时间一致', gi.giPreClose);
                            // console.log("newTime", newTime);
                            // console.log("oldTime", gi.oldTime);
                            // console.log("newTime-oldTime", (newTime - gi.oldTime));
                            // console.log("oldTime====oldTime");
                        } else if (newTime != gi.oldTime) {
                            if (gi.oldTime != "" && gi.oldTime != undefined && gi.oldTime != null && (newTime - gi.oldTime) > 1) {
                                for (var i = 0; i < (newTime - gi.oldTime - 1); i++) {
                                    gi.giPrice.push(null);
                                    gi.giTime.push(null);
                                    gi.giMa.push(null);
                                    gi.giVol.push(null);
                                    gi.giRise.push(null);
                                }
                                gi.giPrice.push(changedata.price);
                                gi.giTime.push(changedata.time);
                                gi.giMa.push(changedata.ma);
                                gi.giVol.push(changedata.vol);
                                gi.giRise.push(changedata.rise);
                                gi.oldTime = newTime;
                            } else {
                                gi.giPrice.push(changedata.price);
                                gi.giTime.push(changedata.time);
                                gi.giMa.push(changedata.ma);
                                gi.giVol.push(changedata.vol);
                                gi.giRise.push(changedata.rise);
                                gi.oldTime = newTime;
                                // console.log('时间不一致', gi.giPreClose);
                                // console.log("newTime", newTime);
                                // console.log("oldTime", gi.oldTime);
                                // console.log("oldTime!=!=!=oldTime");
                                // console.log(gi.giPreClose);
                            }
                        }
                        // console.log("变化的分时数据的时间", newTime);
                        // console.log("变化的分时数据的时间", gi.giTime);
                        // console.log("变化的分时数据的成交量", gi.giVol);
                        // console.log("变化的分时数据的涨跌幅", gi.giRise);
                        if (gi.giPriceMaxinum < changedata.maxHigh) {
                            gi.giPriceMaxinum = (changedata.maxHigh).toFixed(2);
                        }
                        if (gi.giPriceMininum > changedata.minLow) {
                            gi.giPriceMininum = (changedata.minLow).toFixed(2);
                        }
                        // gi.giPriceMax = changedata.maxHigh;
                        // gi.giPriceMin = changedata.minLow;
                        var maxCut = Math.abs(gi.giPriceMaxinum - changedata.preClose);
                        var minCut = Math.abs(gi.giPriceMininum - changedata.preClose)
                        if (maxCut > minCut) {
                            gi.giPriceMax = (changedata.preClose + maxCut).toFixed(2);
                            gi.giPriceMin = (changedata.preClose - maxCut).toFixed(2);
                            gi.giPriceMaxFloat = (maxCut / changedata.preClose * 100).toFixed(2);
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        } else {
                            gi.giPriceMax = (changedata.preClose + minCut).toFixed(2);
                            gi.giPriceMin = (changedata.preClose - minCut).toFixed(2);
                            gi.giPriceMaxFloat = (minCut / changedata.preClose * 100).toFixed(2);
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2);
                            // console.log("gi.giPriceMaxFloat",gi.giPriceMaxFloat)
                            // console.log("gi.giPriceMinFloat",gi.giPriceMinFloat)
                        }
                        // console.log("gi.giPriceMax推送后的", gi.giPriceMax);
                        // console.log(" gi.giPriceMin推送后的", gi.giPriceMin);
                        // console.log(" gi.giVol推送后的", gi.giVol);
                        gi.giEcharts.setOption(gi.giOption);
                    }
                } catch (e) {}
            }
        }
    },
    mounted() {}
};
</script>
<style>
.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}

.clearfix {
    zoom: 1;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.myChose {
    position: relative;
    background-color: #fff;
}

.myChose .search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 20;
}

.myChose .myChose_padding {
    padding: 0 0.9375rem;
}

.myChose .mint-search {
    margin-top: 2.5rem;
    /*height: 2.6rem;*/
}

.mint-searchbar {
    padding: 0.5rem 0.9375rem;
}

.myChose .myChose_content {
    background-color: #fff;
    padding-bottom: 5rem;
    min-height: 100vh;
    z-index: 20;
    position: fixed;
    width: 100%;
    top: 5.5rem;
}

.myChose .myChose_content .myChose_index {
    border-bottom: 1px solid #f0f0f0;
    position: fixed;
    width: 100%;
    background-color: #fff;
    position: relative;
}

.myChose .myChose_content .index_list {
    width: 100%;
    padding-top: 0.5rem;
}

.myChose .myChose_content .index_list li {
    float: left;
    width: 33%;
    height: 3.4375rem;
    text-align: center;
    padding-bottom: 0.5rem;
}

.myChose .myChose_content .index_list li .price {
    font-size: 1.125rem;
    /*color: #FF363F;*/
    line-height: 1.125rem;
    margin-top: 0.53125rem;
}

.myChose .myChose_content .index_list li .under {
    margin-top: 0.5rem;
}

.myChose .myChose_content .index_list li .name {
    font-size: 0.75rem;
    color: #505050;
    line-height: 0.75rem;
    margin-right: 0.453rem;
}

.myChose .myChose_content .index_list li .extent {
    font-size: 0.75rem;
    line-height: 0.75rem;
    margin-left: 0.453rem;
}

.myChose .myChose_content .myChose_index .index_picture {
    display: inline-block;
    width: 1rem;
    height: 0.5625rem;
    background-color: yellow;
    position: absolute;
    right: 0.4rem;
    top: 1.875rem;
    background-repeat: no-repeat;
    background-size: 50%;
}

.myChose .myChose_content .myChose_index .originalBackground {
    background: url("../assets/icon_down.svg");
    background-repeat: no-repeat;
    background-size: 50%;
}

.myChose .myChose_content .myChose_index .changeBackground {
    background: url("../assets/icon_up.svg");
    background-repeat: no-repeat;
    background-size: 50%;
}

.myChose .myChose_content .myChose_index .index_model {
    width: 100%;
    height: 9.40625rem;
}

.myChose .myChose_content .myChose_index .mint-navbar {
    margin-top: 0;
}

.myChose .myChose_content .myChose_index .mint-navbar {
    height: 4px;
    background-color: #fff;
}

.myChose .myChose_content .myChose_index .mint-navbar .mint-tab-item.is-selected {
    border-top: 3px solid #26a2ff;
    border-bottom: none;
}

.myChose .myChose_content .myChose_index .mint-tab-container-item {
    border-top: 1px solid #f0f0f0;
}

.myChose .myChose_content .stock_list {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding: 0;
    margin: 0;
    margin-bottom: 12rem;
    padding-bottom: 12rem;
}

.myChose .myChose_content .haveIndexPicture {
    margin-bottom: 17rem;
    padding-bottom: 17rem;
}

.myChose .myChose_content .stock_list li {
    border-bottom: 1px solid #f0f0f0;
}

.myChose .myChose_content .stock_list li:last-child {
    border: none;
}

.myChose .myChose_content .stock_list li div {
    float: left;
    width: 32%;
}

.myChose .edit {
    text-align: left;
    padding-left: 0.9375rem;
}

.myChose .myChose_content .header_edit,
.myChose .myChose_content .header_new,
.myChose .myChose_content .header_change {
    font-size: 0.9375rem;
    color: #2489E8;
    line-height: 2.5rem;
}

.myChose .myChose_content .header_edit {
    text-align: left;
    position: relative;
}

.myChose .myChose_content .header_edit a {
    color: #2489E8;
}

.myChose .myChose_content .header_edit span {
    display: inline-block;
    width: 0.6875rem;
    height: 0.6875rem;
    background: url("../assets/icon_edit1.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 0.5rem;
}

.myChose .myChose_content .header_new {
    text-align: right;
    position: relative;
}

.myChose .myChose_content .txt {
    margin-right: 0.4rem;
}

.myChose .myChose_content .stock_list li div .up {
    display: inline-block;
    width: 0.3125rem;
    height: 0.28125rem;
    background: url("../assets/icon_up.1.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0.9rem;
    right: 0;
}

.myChose .myChose_content .stock_list li div .up_change {
    background: url("../assets/icon_up.2.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0.9rem;
    right: 0;
}

.myChose .myChose_content .stock_list li div .down {
    display: inline-block;
    width: 0.3125rem;
    height: 0.28125rem;
    background: url("../assets/icon_down.1.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 0.9rem;
    right: 0;
}

.myChose .myChose_content .stock_list li div .down_change {
    background: url("../assets/icon_down.2.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 0.9rem;
    right: 0;
}

.myChose .myChose_content .header_change {
    padding-right: 0.9375rem;
    text-align: right;
    position: relative;
}

.myChose .myChose_content .stock_list li div.new {
    text-align: right;
    font-size: 1rem;
    /*color: #FF363F;*/
    line-height: 3.25rem;
}

.myChose .myChose_content .stock_list li div.change {
    padding-right: 0.9375rem;
    text-align: right;
    font-size: 1rem;
    line-height: 3.25rem;
}

.myChose .myChose_content .stock_list .stock_name {
    width: 100%;
    margin-top: 0.5625rem;
    font-size: 1rem;
    color: #303030;
    line-height: 1rem;
}

.myChose .myChose_content .stock_list .stock_under {
    padding: 0;
    margin-bottom: 0.5625rem;
    margin-top: 0.372rem;
    width: 100%;
    height: 0.8125rem;
}

.myChose .myChose_content .stock_list .stock_under .code {
    font-size: 0.8125rem;
    color: #B9B9B9;
    line-height: 0.8125rem;
}

.myChose .myChose_content .stock_list .stock_under span.icon {
    background: #FD9819;
    border-radius: 1px;
    margin-left: 0.375rem;
    display: inline-block;
    font-size: 0.625rem;
    color: #FFFFFF;
    line-height: 0.625rem;
    text-align: center;
    padding: 0.075rem;
}

.myChose .add {
    text-align: center;
    margin-top: 1.5625rem;
    font-size: 0.9375rem;
    color: #2489E8;
    line-height: 0.9375rem;
    width: 100%!important;
    position: absolute;
    width: 100%;
}

.myChose .myChose_content .add .add_icon {
    display: inline-block;
    width: 0.90625rem;
    height: 0.90625rem;
    background: url(../assets/icon_addto.svg);
    background-repeat: no-repeat;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 0.375rem;
}


/*以下样式为最新价，涨幅的排序部分*/

.myChose .priceChange {
    display: inline-block;
    width: 0.4375rem;
    height: 0.25rem;
    background: url("../assets/icon_normal.svg");
    background-repeat: no-repeat;
    background-size: 100%;
}

.myChose .price_up {
    display: inline-block;
    width: 0.4375rem;
    height: 0.625rem;
    background: url("../assets/icon_upup.svg");
    background-repeat: no-repeat;
    background-size: 100%;
}

.myChose .price_down {
    display: inline-block;
    width: 0.4375rem;
    height: 0.625rem;
    background: url("../assets/icon_downdown.svg");
    background-repeat: no-repeat;
    background-size: 100%;
}


/*以下为自选股展示的标题部分样式 即 包含编辑最新涨幅的大div样式*/

.myChose .myChose_stock {
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-bottom: 10rem;
    border-top: 1px solid #f0f0f0;
}

.myChose .list_title {
    background-color: #f7f7f7;
}

.myChose .list_title>div {
    display: inline-block;
    width: 32%;
}

.myChose .color_red {
    color: #FF363F;
}

.myChose .color_green {
    color: #1CCE18;
}

.myChose .mint-header.is-fixed {
    z-index: 30;
}

.myChose #Gi div:nth-child(2) {
    width: 100%;
}

.myChose #Gi div:nth-child(2) div {
    border-bottom: 0.5px solid #ccc;
}

.myChose #Szi div:nth-child(2) {
    width: 100%;
}

.myChose #Szi div:nth-child(2) div {
    border-bottom: 0.5px solid #ccc;
}

.myChose #Ssci div:nth-child(2) {
    width: 100%;
}

.myChose #Ssci div:nth-child(2) div {
    border-bottom: 0.5px solid #ccc;
}


/*echarts的样式S*/

.myChose #echartsBox {
    height: 9.3125rem!important;
    width: 100%;
}

.myChose #echartsBox div {
    width: 100%;
}

/*echarts的样式E*/
</style>
