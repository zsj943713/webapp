<template>
    <div class="stocksDetails">
        <!-- 头部 -->
        <!-- <div class="header">
            <span><a href=""><</a></span>
            <span>国泰君安(601211)</span>
        </div> -->
        <headerBack :title="title"></headerBack>
        <!-- 基本信息展示 -->
        <div class="message">
            <ul class="clearfix">
                <li><span>18.88</span><span>+2.88%</span> <span>+8.88%</span></li>
                <li><span>开</span><span>19.70</span></li>
                <li><span>高</span><span>20.12</span></li>
                <li><span>换手</span><span>0.16%</span></li>
                <li><span>额</span><span>1.55亿</span></li>
                <li><span>低</span><span>17.79</span></li>
                <li><span>量比</span><span>0.62</span></li>
            </ul>
        </div>
        <!-- 更多信息展示 -->
        <div class="message-more" v-if="isshow == true">
            <ul class="clearfix">
                <li class="clearfix">
                    <div>成交额 </div>
                    <div>9.81亿</div>
                </li>
                <li>
                    <div>成交量</div>
                    <div>48.88万</div>
                </li>
                <li>
                    <div>涨停</div>
                    <div>20.00</div>
                </li>
                <li>
                    <div>跌停</div>
                    <div>18.88</div>
                </li>
                <li>
                    <div>总手</div>
                    <div>48.88</div>
                </li>
                <li>
                    <div>现手</div>
                    <div>— —</div>
                </li>
                <li>
                    <div>均价</div>
                    <div>17.77</div>
                </li>
                <li>
                    <div>振幅</div>
                    <div>5.55%</div>
                </li>
                <li>
                    <div>市净</div>
                    <div>1.88</div>
                </li>
                <li>
                    <div>市盈</div>
                    <div>18.88</div>
                </li>
                <li>
                    <div>市值</div>
                    <div>88.88亿</div>
                </li>
                <li>
                    <div>流通</div>
                    <div>999.99亿</div>
                </li>
                <div class="click-show" v-if="isshow == true">
                    <div @click="showmore()" class="normaldis"></div>
                </div>
            </ul>
        </div>
        <div class="click-show" v-if="isshow == false">
            <div @click="showmore()" class="normalshow"></div>
        </div>
        <!-- 分时/周k/月k/日k/分钟图 -->
        <div class="echarts">
            <div class="echarts-header">
                <!-- <yd-tab>
                    <yd-tab-panel label="分时" active>
                        <div id="main" style="width: 100%;height:13.1675rem;"></div>
                    </yd-tab-panel>
                    <yd-tab-panel label="日k">日k图</yd-tab-panel>
                    <yd-tab-panel label="周k">周k图</yd-tab-panel>树
                    <yd-tab-panel label="月k">月k</yd-tab-panel>
                    <yd-tab-panel label="分钟" @open.ydui.tab = "demoClick()">
                        
                    </yd-tab-panel>
                    <span label="分钟" @click = "showMinutePop()" style="display: inline-block; width: 20px">分钟</span>
                    
                    <mt-actionsheet
                        :actions="actions"
                        v-model="sheetVisible">
                    </mt-actionsheet>
                </yd-tab> -->
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">分时</mt-tab-item>
                    <mt-tab-item id="2">日k</mt-tab-item>
                    <mt-tab-item id="3">周k</mt-tab-item>
                    <mt-tab-item id="4">月k</mt-tab-item>
                    <mt-tab-item id="5">分钟<span class="minutep" @click="showselect()"></span></mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1" swipeable>
                        <div id="main" style="width: 100%;height:13.1675rem;"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div id="dayk" style="width: 100%;height:13.1675rem;"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div id="weekk" style="width: 100%;height:13.1675rem;"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <div id="mouthsk" style="width: 100%;height:13.1675rem;"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="5">
                        <div id="minutesk" style="width: 100%;height:13.1675rem;"></div>
                    </mt-tab-container-item>
                    <mt-actionsheet :actions="actions" v-model="sheetVisible">
                    </mt-actionsheet>
                </mt-tab-container>
            </div>
            <div id="echatrsZhu" style="width: 100%;height: 4.125rem;border-top: 1px solid #ececec;"></div>
        </div>
        <div class="WDMX">
            <yd-tab>
                <yd-tab-panel label="五档" active>
                    <div class="wd-sell">
                        <ul class="clearfix">
                            <li>
                                <span>卖1</span>
                                <span>18.88</span>
                                <span><yd-progressbar type="line" :progress="0.2" trailWidth="12" trailColor="#FF363F"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>11</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>卖2</span>
                                <span>28.88</span>
                                <span><yd-progressbar type="line" :progress="0.9" trailWidth="12" trailColor="#FF363F"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>22</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>卖3</span>
                                <span>38.88</span>
                                <span><yd-progressbar type="line" :progress="0.6" trailWidth="12" trailColor="#FF363F"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>33</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>卖4</span>
                                <span>48.88</span>
                                <span><yd-progressbar type="line" :progress="0.4" trailWidth="12" trailColor="#FF363F"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>44</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>卖5</span>
                                <span>58.88</span>
                                <span><yd-progressbar type="line" :progress="0.7" trailWidth="12" trailColor="#FF363F"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>55</span>
                            </li>
                        </ul>
                    </div>
                    <div class="wd-buy">
                        <ul class="clearfix">
                            <li>
                                <span>买1</span>
                                <span>12.34</span>
                                <span><yd-progressbar type="line" :progress="0.5" trailWidth="12" trailColor="#1CCE18"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>13</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>买2</span>
                                <span>24.67</span>
                                <span><yd-progressbar type="line" :progress="0.1" trailWidth="12" trailColor="#1CCE18"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>24</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>买3</span>
                                <span>45.23</span>
                                <span><yd-progressbar type="line" :progress="0.8" trailWidth="12" trailColor="#1CCE18"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>36</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>买4</span>
                                <span>77.56</span>
                                <span><yd-progressbar type="line" :progress="0.3" trailWidth="12" trailColor="#1CCE18"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>48</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <span>买5</span>
                                <span>15.48</span>
                                <span><yd-progressbar type="line" :progress="0.6" trailWidth="12" trailColor="#1CCE18"  strokeColor = "#fff"></yd-progressbar></span>
                                <span>69</span>
                            </li>
                        </ul>
                    </div>
                </yd-tab-panel>
                <yd-tab-panel label="明细">
                    <div class="mingxi">
                        <ul class="clearfix">
                            <li>
                                <span>04:25</span>
                                <span>83.45</span>
                                <span>12</span>
                            </li>
                            <li>
                                <span>05:44</span>
                                <span>22.33</span>
                                <span>23</span>
                            </li>
                            <li>
                                <span>07:48</span>
                                <span>45.15</span>
                                <span>34</span>
                            </li>
                            <li>
                                <span>10:21</span>
                                <span>55.12</span>
                                <span>45</span>
                            </li>
                            <li>
                                <span>13:23</span>
                                <span>66.12</span>
                                <span>56</span>
                            </li>
                            <li>
                                <span>14:45</span>
                                <span>67.41</span>
                                <span>67</span>
                            </li>
                            <li>
                                <span>16:33</span>
                                <span>35.24</span>
                                <span>78</span>
                            </li>
                            <li>
                                <span>17:01</span>
                                <span>34.21</span>
                                <span>89</span>
                            </li>
                            <li>
                                <span>17:06</span>
                                <span>111.11</span>
                                <span>142</span>
                            </li>
                            <li>
                                <span>18:44</span>
                                <span>222.34</span>
                                <span>252</span>
                            </li>
                        </ul>
                    </div>
                </yd-tab-panel>
            </yd-tab>
        </div>
        <div class="zixuangu">
            添加自选股
        </div>
        <!-- 遮罩 -->
        <div class="stockMack" v-if="isshow == true">
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {
    Accordion,
    AccordionItem
} from 'vue-ydui/dist/lib.rem/accordion';
import headerBack from './headerBack.vue'
import {
    Tab,
    TabPanel
} from 'vue-ydui/dist/lib.rem/tab';
import {
    ProgressBar
} from 'vue-ydui/dist/lib.rem/progressbar';
import 'vue-ydui/dist/ydui.base.css';
Vue.component(ProgressBar.name, ProgressBar);
Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
// 引入eacharts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// 操作表 从下方拉出
import {
    Actionsheet
} from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
import {
    Navbar,
    TabItem
} from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
    name: 'stocksDetails',
    data() {
        return {
            title: '国泰君安(601211)',
            isshow: false,
            datetime6: '',
            selected: "1",
            actions: [{
                name: '一分钟',
                method: function(e) {
                    console.log("e", e.name);
                }
            }, {
                name: '五分钟',
                method: function(e) {
                    console.log("e", e);
                    console.log("this", this);
                }
            }, {
                name: '十分钟',
                method: function(e) {
                    console.log("e", e);
                    console.log("this", this);
                }
            }, {
                name: '半小时',
                method: function(e) {
                    console.log("e", e);
                    console.log("this", this);
                }
            }, ],
            test: [{
                name: "123"
            }],
            sheetVisible: false,
            cancelText: "取消"
        };
    },
    mounted: function() {
        var myChart = echarts.init(document.getElementById("main"));
        var option = {
            title: {},
            tooltip: {
                trigger: 'axis',
                showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                // formatter: function(params) {
                //     var res = params[0].name;
                //     res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:4px;width:8px;height:8px;background-color:#994A4D;line-height:12px;"></span>' + params[0].seriesName + ": ";
                //     res += params[0].value + '%';
                //     res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:4px;width:8px;height:8px;background-color:#4F94CD;line-height:12px;"></span>' + params[1].seriesName + ": ";
                //     res += params[1].value + '%';
                //     return res;
                // },
                backgroundColor: 'rgba(241,241,241,0.8)',
                borderColor: '#994a4d',
                borderWidth: 1,
                axisPointer: {
                    lineStyle: {
                        color: '#ccc',
                        width: 1,
                        type: 'solid'
                    }
                },
                textStyle: {
                    color: '#000' //文字颜色
                }
            },
            legend: {
                data: [''],
                right: 'center',
                bottom: 0,
                orient: 'horizontal'
            },
            // dataZoom: {
            //     // y: 230,
            //     show: true,
            //     start: 0,
            //     end: 100
            // }, 最下方收缩的取消
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
            },
            xAxis: [{
                type: 'category',
                splitLine: {　　　　
                    show: true　　　　
                },

                axisTick: {
                    show: false
                }, //坐标轴标记点
                axisLabel: {
                    show: false
                }, //不显示坐标值
                axisLine: {
                    show: false
                }, //不显示坐标轴
                data: [1, 2, 3, 4, 11, 12, 13, 14, 1, 2, 3, 4, 11, 12, 13, 14, 1, 2, 3, 4, 11, 12, 13, 14],

            }],
            yAxis: [{
                splitLine: {　　　　
                    show: true　　　　
                },
                // show: false,
                type: 'value',
                position: 'right',
                axisLabel: {
                    formatter: ''
                }
            }],
            series: [{
                name: '',
                type: 'line',
                // smooth: true,
                itemStyle: {
                    normal: {
                        color: 'rgb(253,152,25)',
                        lineStyle: {
                            width: 1
                        }
                    }
                },
                data: [37, 15, 2, 14, 13, 14, 35, 6, 13, 14, 26, 3, 34, 34, 34, 34, 34, 34, 3, 43, 43, 43, 62, 12, 34, 34, 57, 23, 14, 26, 3, 34, 34, 34, 34, 34, 34, 3, 43, 43, 43, 62, 12, 34, 34, 57, 23],
            }, {
                name: '',
                type: 'line',
                // smooth: true,
                itemStyle: {
                    normal: {
                        color: 'rgb(79, 148, 205)',
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [32, 4, 34, 8, 10, 52, 14, 16, 18, 20, 22, 24, 26, 13, 15, 37, 15, 2, 14, 13, 14, 35, 6, 13, 14, 26, 3, 13, 14, 37, 37, 15, 2, 14, 13, 14, 35, 6, 13, 14, 26, 3, 13, 14, 37],
            }]
        };
        myChart.setOption(option);
        // 底部的echarts
        var myChart1 = echarts.init(document.getElementById("echatrsZhu"));
        var option1 = {
            calculable: true,
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
            },
            xAxis: [{
                splitLine: {　　　　
                    show: false　　　　
                },

                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
            }],
            yAxis: [


                {
                    splitLine: {　　　　
                        show: false　　　　
                    },
                    show: false,
                    type: 'value'
                }
            ],
            series: [{
                name: '',
                type: 'bar',
                data: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10, 55, 32, 14, 69, 3, 42, 31, 21, 28, 51, 22, 23, 24, 25, 26, 65, 64, 63, 62, 11, 23, 27, 41, 12, 25, 52, 34, 13, 24, 53, 22, 23, 24, 25, 26, 65, 64, 63, 62, 11, 23, 27, 41, 12, 25, 52, 34, 13, 24, 53],
                itemStyle: {
                    normal: {
                        color: '#FF363F ',
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
            }, {
                name: '',
                type: 'bar',
                data: [22, 23, 24, 25, 26, 65, 64, 63, 62, 11, 23, 27, 41, 12, 25, 52, 34, 13, 24, 53, 1, 3, 5, 7, 9, 2, 4, 6, 8, 10, 55, 32, 14, 69, 3, 42, 31, 21, 28, 51, 1, 3, 5, 7, 9, 2, 4, 6, 8, 10, 55, 32, 14, 69, 3, 42, 31, 21, 28, 51],
                itemStyle: {
                    normal: {
                        color: '#1CCE18',
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
            }]
        };
        myChart1.setOption(option1);
    },
    computed: {

    },
    watch: {
        selected: function(val, oldVal) {
            if (val === "5") {
                this.sheetVisible = true;
            }
            // console.log(this.selected);
        },
    },
    methods: {
        showmore: function() {
            this.isshow = !this.isshow;
        },
        // showMinutePop: function() {
        //     if(this.selected == "5"){
        //         console.log(this.selected);
        //     }
        // },
        showselect: function() {
            this.sheetVisible = true;
        }
    },
    components: {
        headerBack
    },

};
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

.stocksDetails {
    padding-top: 2.56rem;
    padding-bottom: 3rem;
}

.stocksDetails .header span {
    display: inline-block;
    height: 2.75rem;
    line-height: 2.75rem;
    color: #fff;
    text-align: center;
    font-size: 1.125rem;
}

.stocksDetails .header span:nth-child(1) {
    float: left;
}

.stocksDetails .header span:nth-child(1) a {
    display: inline-block;
    height: 2.75rem;
    line-height: 2.75rem;
    color: #fff;
    text-align: center;
}

.stocksDetails .header span:nth-child(2) {
    display: block;
    text-align: center;
}


/*基本信息展示*/

.stocksDetails .message {
    height: 4.6875rem;
    background-color: #fff;
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
}

.stocksDetails .message ul>li {
    float: left;
}

.stocksDetails .message ul>li:nth-child(1) {
    width: 34%;
    height: 4.6875rem;
}

.stocksDetails .message ul>li:nth-child(1) span:nth-child(1) {
    font-size: 1.5rem;
    color: #FF363F;
    font-weight: 500;
    display: block;
    text-align: left;
    height: 3rem;
    line-height: 3rem;
}

.stocksDetails .message ul>li:nth-child(1) span:nth-child(2),
.stocksDetails .message ul>li:nth-child(1) span:nth-child(3) {
    font-size: 0.8125rem;
    color: #FF363F;
}

.stocksDetails .message ul>li:nth-child(n+2) {
    height: 2.3rem;
    line-height: 2.3rem;
    width: 22%;
    display: inline-block;
    font-size: 0.8125rem;
    color: #505050;
}

.stocksDetails .message ul>li:nth-child(n+2) span:nth-child(1) {
    margin-right: 0.5rem;
}

.stocksDetails .message ul>li:nth-child(2) span:nth-child(2),
.stocksDetails .message ul>li:nth-child(7) span:nth-child(2),
.stocksDetails .message ul>li:nth-child(6) span:nth-child(2) {
    color: #1CCE18;
}

.stocksDetails .message ul>li:nth-child(3) span:nth-child(2) {
    color: #FF363F;
}


/*更多基本信息样式*/

.stocksDetails .message-more {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    background: #fff;
    padding-bottom: 0.5rem;
    position: absolute;
    z-index: 4;
}

.stocksDetails .message-more ul>div {
    padding-top: 10rem;
}

.stocksDetails .message-more li {
    float: left;
    width: 25%;
    height: 3.25rem;
    border-bottom: 1px solid #ececec;
    font-size: 0.8125rem;
    font-family: PingFangSC-Regular;
    color: #505050;
    letter-spacing: 0.26px;
    padding-left: 0.625rem;
    padding-top: 0.4rem;
}

.stocksDetails .message-more li div {
    height: 1.2rem;
    border-right: 1px solid #ececec;
}

.stocksDetails .message-more li:nth-child(4n) div {
    border-right: none;
}

.stocksDetails .message-more li:nth-child(3) div:nth-child(2) {
    color: #FF363F;
}

.stocksDetails .message-more li:nth-child(4) div:nth-child(2) {
    color: #1CCE18;
}

.stocksDetails .message-more li:nth-child(7) div:nth-child(2) {
    color: #FF363F;
}

.stocksDetails .click-show {
    height: 1rem;
    background-color: #fff;
}

.stocksDetails .click-show div {
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%);
}


/*五档明细样式*/

.stocksDetails .WDMX .yd-tab .yd-tab-nav-item {
    height: 2.1875rem;
    line-height: 2.1875rem;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    letter-spacing: 0.02px;
}

.stocksDetails .WDMX .yd-tab .yd-tab-nav-item:nth-child(1) a {
    text-align: right;
    padding-right: 1.25rem;
}

.stocksDetails .WDMX .yd-tab .yd-tab-nav-item:nth-child(2) a {
    text-align: left;
    padding-left: 1.25rem;
}


/*修改去除默认样式*/

.stocksDetails .WDMX .yd-tab-nav-item:not(:last-child):after {
    border-right: none;
}

.stocksDetails .WDMX .yd-tab-nav .yd-tab-active {
    color: #2489E8;
}

.stocksDetails .WDMX .yd-tab-nav .yd-tab-active:before {
    content: "";
    width: 25%;
    height: 2px;
    position: absolute;
    left: 106%;
    bottom: 5px;
    margin-left: -35%;
    z-index: 4;
    background-color: #2489E8;
}

.stocksDetails .WDMX .yd-tab-nav .yd-tab-active:nth-child(2):before {
    content: "";
    width: 25%;
    height: 2px;
    position: absolute;
    left: 40%;
    bottom: 5px;
    margin-left: -35%;
    z-index: 4;
    background-color: #2489E8;
}

.stocksDetails .WDMX .yd-tab-nav {
    border-top: 1px solid #ececec;
}

.stocksDetails .WDMX .yd-tab-panel-item {
    padding: 0.9375rem 0.625rem;
}

.stocksDetails .WDMX .yd-tab-panel {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ececec;
}


/*五档卖出的样式*/

.stocksDetails .WDMX .wd-sell {
    width: 50%;
    border-right: 1px solid #ececec;
    float: left;
}

.stocksDetails .WDMX .wd-sell ul {
    height: 1.5rem;
    font-family: PingFangSC-Regular;
    color: #707070;
    letter-spacing: 0.02px;
}

.stocksDetails .WDMX .wd-sell ul li {
    float: left;
    font-size: 0.75rem;
    position: relative;
}

.stocksDetails .WDMX .wd-sell ul li span {
    display: inline-block;
    padding-right: 0.3rem;
}

.stocksDetails .WDMX .wd-sell ul li span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 9rem;
}

.stocksDetails .WDMX .wd-sell ul li .yd-progressbar {
    position: absolute;
    top: 0;
    left: 4rem;
}

.stocksDetails .WDMX .wd-sell ul li span:nth-child(2) {
    color: #FF363F;
}


/*五档买入的样式*/

.stocksDetails .WDMX .wd-buy {
    width: 50%;
    float: left;
    padding-left: 0.8375rem;
}

.stocksDetails .WDMX .wd-buy ul {
    height: 1.5rem;
    font-family: PingFangSC-Regular;
    color: #707070;
    letter-spacing: 0.02px;
}

.stocksDetails .WDMX .wd-buy ul li {
    float: left;
    font-size: 0.75rem;
    position: relative;
}

.stocksDetails .WDMX .wd-buy ul li span {
    display: inline-block;
    padding-right: 0.3rem;
}

.stocksDetails .WDMX .wd-buy ul li span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 9rem;
}

.stocksDetails .WDMX .wd-buy ul li .yd-progressbar {
    position: absolute;
    top: 0;
    left: 4rem;
}

.stocksDetails .WDMX .wd-buy ul li span:nth-child(2) {
    color: #1CCE18;
}


/*明细的样式*/

.stocksDetails .WDMX .mingxi ul li {
    width: 50%;
    float: left;
    font-size: 0.75rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-family: PingFangSC-Regular;
    color: #707070;
    letter-spacing: 0.02px;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(2n+1) {
    border-right: 1px solid #ececec;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(2n) {
    padding-left: 0.8rem;
}

.stocksDetails .WDMX .mingxi ul li span {
    display: inline-block;
}

.stocksDetails .WDMX .mingxi ul li span:nth-child(1) {
    width: 30%;
}

.stocksDetails .WDMX .mingxi ul li span:nth-child(2) {
    width: 50%;
}

.stocksDetails .WDMX .mingxi ul li span:nth-child(2) {
    color: #1CCE18;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(n+4) span:nth-child(2) {
    color: #FF363F;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(2n+1) span:nth-child(3) {
    color: #FF363F;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(2n) span:nth-child(3) {
    color: #1CCE18;
}


/*遮罩的样式*/

.stocksDetails .stockMack {
    position: absolute;
    bottom: 0;
    height: 56%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    top: 18.5rem;
}


/*上拉下拉的样式*/

.stocksDetails .normalshow {
    background: url("../assets/icon_pulldown.svg");
    height: 1rem;
    width: 10%;
    background-repeat: no-repeat;
    background-size: 2rem;
}

.stocksDetails .normaldis {
    background: url("../assets/icon_pullup.svg");
    height: 1rem;
    width: 10%;
    background-repeat: no-repeat;
    background-size: 2rem;
}


/*删除添加自选股样式*/

.stocksDetails .zixuangu {
    height: 3rem;
    background: #fff;
    font-family: PingFangSC-Regular;
    font-size: 0.9375rem;
    color: #2489E8;
    letter-spacing: 0.21px;
    text-align: center;
    line-height: 3rem;
    font-weight: 500;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ececec;
}


/*周k/月k/日k/分钟/分时图样式*/

.stocksDetails .echarts {
    margin-top: 3px;
    height: 20rem;
    background-color: #fff;
}

.stocksDetails .echarts .minutep {
    width: 3.5rem;
    height: 2rem;
    display: inherit;
    position: absolute;
    /* left: 2rem; */
    right: 0.5rem;
}

.stocksDetails .mint-navbar {
    border-bottom: 1px solid #ececec;
    margin-top: 0;
    background-color: #fff;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item {
    padding: 0;
    height: 2.1875rem;
    line-height: 2.1875rem;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    letter-spacing: 0.23px;
    display: inline-block;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item:nth-child(5) {
    background: url("../assets/minute_up.svg");
    background-size: 15%;
    background-repeat: no-repeat;
    background-position: 3.6rem 1rem;
}

.stocksDetails .echarts-header .mint-tab-item-label {
    padding: 0;
    height: 2.1875rem;
    line-height: 2.1875rem;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    letter-spacing: 0.23px;
    display: inline-block;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
    border-bottom: 2px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #26a2ff;
}


/* .stocksDetails .echarts-header .mint-navbar .mint-tab-item:nth-child(5) .mint-tab-item-icon{
            border: 2px solid red;
            height: 5px;
            width: 5px;
            display: inline-block;
 }*/

.stocksDetails .echarts .main>div {
    height: 13.675rem;
}

.stocksDetails .echarts .main canvas {
    height: 13.675rem;
}
</style>
