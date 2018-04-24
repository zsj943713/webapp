<template>
    <div class="stocksDetails">
        <headerBack :title="title"></headerBack>
        <!-- 基本信息展示 -->
        <div class="message">
            <ul class="clearfix">
                <li><span :class="baseData[0] > baseData[11]? 'risered':'downgreen'">{{baseData[0]}}</span>
                    <span :class="baseData[1] > 0? 'risered':'downgreen'">{{baseData[1]}}</span>
                    <span :class="baseData[2] > 0? 'risered':'downgreen'">[{{baseData[2]}}%]</span></li>
                <li><span>开</span><span :class="baseData[3] > baseData[11]? 'risered':'downgreen'">{{baseData[3]}}</span></li>
                <li><span>高</span><span :class="baseData[4] > baseData[11]? 'risered':'downgreen'">{{baseData[4]}}</span></li>
                <li v-if="typeIndex == true"><span>换手</span><span>{{baseData[5]}}%</span></li>
                <li v-if="typeIndex == false"><span>换手</span><span>--</span></li>
                <li><span>额</span><span>{{baseData[6]}}</span></li>
                <li><span>低</span><span :class="baseData[7] > baseData[11]? 'risered':'downgreen'">{{baseData[7]}}</span></li>
                <li><span>量比</span><span>{{baseData[8]}}</span></li>
            </ul>
        </div>
        <!-- 更多信息展示 -->
        <div class="message-more" v-if="isshow == true">
            <ul class="clearfix">
                <li>
                    <div>成交量</div>
                    <div>{{baseData[12]}}</div>
                </li>
                <li>
                    <div>振幅</div>
                    <div>{{baseData[10]}}%</div>
                </li>
                <li>
                    <div>涨停</div>
                    <div>{{baseData[18]}}</div>
                </li>
                <li>
                    <div>跌停</div>
                    <div>{{baseData[19]}}</div>
                </li>
                <li>
                    <div>总手</div>
                    <div>{{baseData[13]}}</div>
                </li>
                <li>
                    <div>现手</div>
                    <div>--</div>
                </li>
                <li>
                    <div>均价</div>
                    <div>{{baseData[9]}}</div>
                </li>
                <li>
                    <div>昨收</div>
                    <div>{{baseData[11]}}</div>
                </li>
                <li>
                    <div>市净</div>
                    <div>{{baseData[14]}}</div>
                </li>
                <li>
                    <div>市盈</div>
                    <div>{{baseData[15]}}</div>
                </li>
                <li>
                    <div>市值</div>
                    <div>{{baseData[16]}}</div>
                </li>
                <li>
                    <div>流通</div>
                    <div>{{baseData[17]}}</div>
                </li>
                <li>
                    <div>内盘</div>
                    <div>--</div>
                </li>
                <li>
                    <div>外盘</div>
                    <div>--</div>
                </li>
                <li v-if="typeIndex == false">
                    <div>加权均价</div>
                    <div>--</div>
                </li>
            </ul>
            <div class="click-show" v-show="isshow == true">
                <div @click="showMore()" class="normaldis"></div>
            </div>
        </div>
        <div class="click-more" v-show="isshow == false">
            <div @click="hideMore()" class="normalshow"></div>
        </div>
        <!-- 分时/周k/月k/日k/分钟图 -->
        <div class="echarts">
            <div class="echarts-header">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">分时</mt-tab-item>
                    <mt-tab-item id="2">日k</mt-tab-item>
                    <mt-tab-item id="3">周k</mt-tab-item>
                    <mt-tab-item id="4">月k</mt-tab-item>
                    <mt-tab-item id="5"><span class="minutep" @click="showSelect()">分钟</span></mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <!-- <div id="main" style="width: 100%;height:17.8rem;float: left;" class="tab_nav" v-if="typeIndex == false"></div> -->
                        <!-- <div style="height:1rem;"></div> -->
                        <div id="main" style="height:20rem;float: left;" class="tab_nav"></div>
                        <div class="fiveFiel" style="height:20rem;float: right;overflow: hidden;">
                            <div v-bind:class="{'translate-up':translateTrue}">
                                <div class="ff-sell">
                                    <ul class="clearfix">
                                        <li v-show="translateTrue == false">
                                            <span>卖5</span>
                                            <span :class="{color_red:FiveRangeData.sellPrice5>FiveRangeData.preClose,color_green:FiveRangeData.sellPrice5<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.sellPrice5  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress5" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.sellNum5  || '--'}}</span>
                                        </li>
                                        <li v-show="translateTrue == false">
                                            <span>卖4</span>
                                            <span :class="{color_red:FiveRangeData.sellPrice4>FiveRangeData.preClose,color_green:FiveRangeData.sellPrice4<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.sellPrice4  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress4" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.sellNum4  || '--'}}</span>
                                        </li>
                                        <li v-show="translateTrue == false">
                                            <span>卖3</span>
                                            <span :class="{color_red:FiveRangeData.sellPrice3>FiveRangeData.preClose,color_green:FiveRangeData.sellPrice3<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.sellPrice3  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress3" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.sellNum3  || '--'}}</span>
                                        </li>
                                        <li>
                                            <span>卖2</span>
                                            <span :class="{color_red:FiveRangeData.sellPrice2>FiveRangeData.preClose,color_green:FiveRangeData.sellPrice2<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.sellPrice2  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress2" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.sellNum2  || '--'}}</span>
                                        </li>
                                        <li>
                                            <span>卖1</span>
                                            <span :class="{color_red:FiveRangeData.sellPrice1>FiveRangeData.preClose,color_green:FiveRangeData.sellPrice1<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.sellPrice1 || '--'}}</span>
                                            <span class="transNum">{{FiveRangeData.sellNum1 || '--'}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="ff-buy">
                                    <ul class="clearfix">
                                        <li>
                                            <span>买1</span>
                                            <span :class="{color_red:FiveRangeData.buyPrice1>FiveRangeData.preClose,color_green:FiveRangeData.buyPrice1<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.buyPrice1 || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress6" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.buyNum1 || '--'}}</span>
                                        </li>
                                        <li>
                                            <span>买2</span>
                                            <span :class="{color_red:FiveRangeData.buyPrice2>FiveRangeData.preClose,color_green:FiveRangeData.buyPrice2<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.buyPrice2 || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress7" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.buyNum2 || '--'}}</span>
                                        </li>
                                        <li v-show="translateTrue == false">
                                            <span>买3</span>
                                            <span :class="{color_red:FiveRangeData.buyPrice3>FiveRangeData.preClose,color_green:FiveRangeData.buyPrice3<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.buyPrice3  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress8" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.buyNum3  || '--'}}</span>
                                        </li>
                                        <li v-show="translateTrue == false">
                                            <span>买4</span>
                                            <span :class="{color_red:FiveRangeData.buyPrice4>FiveRangeData.preClose,color_green:FiveRangeData.buyPrice4<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.buyPrice4  || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress9" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.buyNum4  || '--'}}</span>
                                        </li>
                                        <li v-show="translateTrue == false">
                                            <span>买5</span>
                                            <span :class="{color_red:FiveRangeData.buyPrice5>FiveRangeData.preClose,color_green:FiveRangeData.buyPrice5<FiveRangeData.preClose&&FiveRangeData.buyPrice5!=0}">{{FiveRangeData.buyPrice5 || '--'}}</span>
                                            <!-- <span><yd-progressbar type="line" :progress="progress10" trailWidth="12" trailColor="#E0EEFC"  strokeColor = "#fff"></yd-progressbar></span> -->
                                            <span class="transNum">{{FiveRangeData.buyNum5 || '--'}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="etail">
                                    <div class="dealTime" v-on:click="translateup"><span>分时成交</span><span v-bind:class="{'dealTime-down':translateTrue,'dealTime-up':!translateTrue}"></span></div>
                                    <ul class="clearfix">
                                        <li v-for="(item, index) in ParticularsData">
                                            <span>{{item.time}}</span>
                                            <span :class="{color_red:item.price>item.preClose,color_green:item.price<item.preClose}">{{item.price}}</span>
                                            <span :class="{color_red:item.bs=='B',color_green:item.bs=='S'}" class="transNum mingxiTransNum">{{item.transNum}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="ff-more" v-show="translateTrue == true" @click="toDetail(urlCode,urlName)">更多成交</div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <!-- <div class="authority" @click="showauthority()">不复权</div> -->
                        <div id="dayk" style="height:20rem;padding-bottom: 0.4rem;" class="tab_nav"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <!-- <div class="authority" @click="showauthority()">不复权</div> -->
                        <div id="weekk" style="height:20rem;padding-bottom: 0.4rem;" class="tab_nav"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <!-- <div class="authority" @click="showauthority()">不复权</div> -->
                        <div id="mouthsk" style="height:20rem;padding-bottom: 0.4rem;" class="tab_nav"></div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="5">
                        <!-- <div class="authority" @click="showauthority()">不复权</div> -->
                        <div id="minutesk" style="height:20rem;padding-bottom: 0.4rem;" class="tab_nav"></div>
                    </mt-tab-container-item>
                    <div v-show="currentVal != 1" class="authority" @click="showauthority()">前复权</div>
                    <mt-actionsheet :actions="actions" v-model="sheetVisible">
                    </mt-actionsheet>
                    <mt-actionsheet :actions="action" v-model="sheetVisible1">
                    </mt-actionsheet>
                </mt-tab-container>
            </div>
            <!-- <div id="echatrsZhu" style="width: 100%;height: 4.7rem;border-top: 1px solid #ececec;"></div> -->
        </div>
        <div class="zixuangu" @click="addStock()" v-if="isShow==false">
            <span class="add_icon"></span>添加自选股
        </div>
        <div class="zixuangu" @click="deleteStock()" v-if="isShow==true">
            <span class="del_icon"></span>删除自选股
        </div>
        <!-- 遮罩 -->
        <div class="stockMack" v-show="isshow == true">
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
// 引入选择时间的操作表 从下方拉出
import {
    Actionsheet,
    Navbar,
    TabItem
} from 'mint-ui'
// 引入折叠面板
import {
    Accordion,
    AccordionItem
} from 'vue-ydui/dist/lib.rem/accordion'
// 引入头部组件
import headerBack from './headerBack.vue'
// import headerBack from '../components/GoBack.vue'
// 引入tab栏切换
import {
    Tab,
    TabPanel
} from 'vue-ydui/dist/lib.rem/tab'
// 引入进度表
import {
    ProgressBar
} from 'vue-ydui/dist/lib.rem/progressbar'
import 'vue-ydui/dist/ydui.base.css'
// 折叠面板 进度表 tab栏切换
// 引入eacharts 挂在vue原型链上
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.component(ProgressBar.name, ProgressBar)
Vue.component(Accordion.name, Accordion)
Vue.component(AccordionItem.name, AccordionItem)
Vue.component(Tab.name, Tab)
Vue.component(TabPanel.name, TabPanel)

Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
// 引入http请求
export default {
    name: 'stocksDetails',
    data () {
        var that = this
        return {
            ws: '',
            tabNum: false,
            urlCode: '', // url代码
            urlName: '', // url名字
            title: '', // 顶部的标题
            baseData: [],
            isshow: false, // 隐藏显示的控制
            dateTime6: '',
            selected: '1', // tab默认选择第一个
            // 选择分钟的配置项  回调函数
            actions: [{
                name: '1分钟',
                method: function (e) {
                    // console.log(that.tit);
                    that.currentMinute = 1
                    that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m1","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    // console.log("e", e.name);
                    that.getMinutesdata('m1', that.tit, that.drawEchartsminutesk)
                    that.tabNum = true
                    // console.log("that.selected", that.selected);
                    that.selected = '5'
                    // console.log("that.selected", that.selected);
                    var minutep = document.getElementsByClassName('minutep')[0]
                    minutep.innerHTML = '1分钟'
                    // that.$nextTick(() => {
                    //         that.drawEchartsminutesk()
                    // })
                    // setTimeout(function () {
                    //         that.drawEchartsminutesk()
                    //         // that.mychartMinute.setOption(that.minuteOption)
                    //     }, 200)
                        // console.log(this);
                        // console.log(that);
                        // that.getMinutesdata(that, that.drawEchartsminutesk, "m1");
                }
            }, {
                name: '5分钟',
                method: function (e) {
                    that.currentMinute = 5
                    // console.log(that.tit);
                    that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m5","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    that.getMinutesdata('m5', that.tit, that.drawEchartsminutesk)
                    that.tabNum = true
                    // console.log("that.selected", that.selected);
                    that.selected = '5'
                    // console.log("that.selected", that.selected);
                    // console.log("e", e);
                    // console.log("this", this);
                    var minutep = document.getElementsByClassName('minutep')[0]
                    minutep.innerHTML = '5分钟'
                    // that.$nextTick(() => {
                    //         that.drawEchartsminutesk()
                    // })
                    // setTimeout(function () {
                    //         that.drawEchartsminutesk()
                    //         // that.mychartMinute.setOption(that.minuteOption)
                    //     }, 200)
                        // that.getMinutesdata(that, that.drawEchartsminutesk, "m5");
                }
            }, {
                name: '15分钟',
                method: function (e) {
                    that.currentMinute = 15
                    // console.log(that.tit);
                    that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m15","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    that.getMinutesdata('m15', that.tit, that.drawEchartsminutesk)
                    that.tabNum = true
                    that.selected = '5'
                    // console.log("e", e);
                    // console.log("this", this);
                    var minutep = document.getElementsByClassName('minutep')[0]
                    minutep.innerHTML = '15分钟'
                    // that.$nextTick(() => {
                    //         that.drawEchartsminutesk()
                    // })
                    // setTimeout(function () {
                    //         that.drawEchartsminutesk()
                    //         // that.mychartMinute.setOption(that.minuteOption)
                    //     }, 200)
                        // that.getMinutesdata(that, that.drawEchartsminutesk, "m15");
                }
            }, {
                name: '30分钟',
                method: function (e) {
                    that.currentMinute = 30
                    // console.log(that.tit);
                    that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m30","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    that.getMinutesdata('m30', that.tit, that.drawEchartsminutesk)
                    that.tabNum = true
                    that.selected = '5'
                    // console.log("e", e);
                    // console.log("this", this);
                    var minutep = document.getElementsByClassName('minutep')[0]
                    minutep.innerHTML = '30分钟'
                    // that.$nextTick(() => {
                    //         that.drawEchartsminutesk()
                    // })
                    // setTimeout(function () {
                    //         that.drawEchartsminutesk()
                    //         // that.mychartMinute.setOption(that.minuteOption)
                    //     }, 200)
                        // that.getMinutesdata(that, that.drawEchartsminutesk, "m30");
                }
            }],
            // 前后复权的配置项
            action: [{
                name: '前复权',
                method: function (e) {
                    // console.log("前复权");
                    // console.log(that.currentVal);
                    // console.log(that.currentMinute);
                    document.getElementsByClassName('authority')[0].innerHTML = '前复权'
                    that.tit = 'pre'
                    // that.getShare(that.drawEchartShare,that.tit);
                    that.getdaykData(that.tit)
                    that.getWeekkdata(that.tit)
                    that.getmonthkData(that.tit)
                    // 以下逻辑为了判断当前的tab栏时 复权类型发生改变的时候 当前的tab栏即时的改变echart的数据
                    if (that.currentVal === 1) {
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"pre","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"pre","stklist":[]},"S001":{"tit":"pre","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"pre","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 2) {
                        setTimeout(function () {
                            that.drawEchartsdayk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"pre","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"pre","stklist":[]},"S001":{"tit":"pre","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"pre","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 3) {
                        setTimeout(function () {
                            that.drawEchartsweekk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"pre","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"pre","stklist":[]},"S001":{"tit":"pre","type":"week","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"pre","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 4) {
                        setTimeout(function () {
                            that.drawEchartsmonthk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"pre","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"pre","stklist":[]},"S001":{"tit":"pre","type":"month","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"pre","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 5 && that.currentMinute === 1) {
                        // console.log("一分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m1","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m1', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 5) {
                        // console.log("五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m5","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m5', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 15) {
                        // console.log("十五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m15","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m15', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 30) {
                        // console.log("三十分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m30","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m30', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                }
            }, {
                name: '不复权',
                method: function (e) {
                    // console.log(that.currentVal);
                    // console.log(that.currentMinute);
                    // console.log("不复权");
                    // console.log(that.currentVal);
                    document.getElementsByClassName('authority')[0].innerHTML = '不复权'
                    that.tit = 'none'
                    // that.getShare(that.drawEchartShare,that.tit);
                    that.getdaykData(that.tit)
                    that.getWeekkdata(that.tit)
                    that.getmonthkData(that.tit)
                    // 以下逻辑为了判断当前的tab栏时 复权类型发生改变的时候 当前的tab栏即时的改变echart的数据
                    if (that.currentVal === 1) {
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"none","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"none","stklist":[]},"S001":{"tit":"none","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"none","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 2) {
                        setTimeout(function () {
                            that.drawEchartsdayk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"none","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"none","stklist":[]},"S001":{"tit":"none","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"none","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 3) {
                        setTimeout(function () {
                            that.drawEchartsweekk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"none","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"none","stklist":[]},"S001":{"tit":"none","type":"week","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"none","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 4) {
                        setTimeout(function () {
                            that.drawEchartsmonthk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"none","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"none","stklist":[]},"S001":{"tit":"none","type":"month","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"none","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 5 && that.currentMinute === 1) {
                        // console.log("一分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m1","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m1', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 5) {
                        // console.log("五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m5","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m5', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 15) {
                        // console.log("十五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m15","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m15', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 30) {
                        // console.log("三十分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m30","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m30', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                }
            }, {
                name: '后复权',
                method: function (e) {
                    // console.log(that.currentVal);
                    // console.log(that.currentMinute);
                    // console.log("不复权");
                    // console.log(that.currentVal);
                    document.getElementsByClassName('authority')[0].innerHTML = '后复权'
                    that.tit = 'post'
                    // that.getShare(that.drawEchartShare,that.tit);
                    that.getdaykData(that.tit)
                    that.getWeekkdata(that.tit)
                    that.getmonthkData(that.tit)
                    // 以下逻辑为了判断当前的tab栏时 复权类型发生改变的时候 当前的tab栏即时的改变echart的数据
                    if (that.currentVal === 1) {
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"post","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"post","stklist":[]},"S001":{"tit":"post","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"post","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 2) {
                        setTimeout(function () {
                            that.drawEchartsdayk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"post","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"post","stklist":[]},"S001":{"tit":"post","type":"day","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"post","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 3) {
                        setTimeout(function () {
                            that.drawEchartsweekk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"post","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"post","stklist":[]},"S001":{"tit":"post","type":"week","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"post","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 4) {
                        setTimeout(function () {
                            that.drawEchartsmonthk()
                        }, 500)
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":"post","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"post","stklist":[]},"S001":{"tit":"post","type":"month","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"post","type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                    }
                    if (that.currentVal === 5 && that.currentMinute === 1) {
                        // console.log("一分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m1","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m1', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 5) {
                        // console.log("五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m5","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m5', that.tit, that.drawEchartsminutesk)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                    }
                    if (that.currentVal === 5 && that.currentMinute === 15) {
                        // console.log("十五分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m15","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m15', that.tit, that.drawEchartsminutesk)
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk() 
                        // })
                    }
                    if (that.currentVal === 5 && that.currentMinute === 30) {
                        // console.log("三十分钟切换复权类型");
                        that.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + that.tit + "'" + ',"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + that.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + that.tit + "'" + ',"type":"m30","stkcode": ' + "'" + that.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + that.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + that.urlCode + "'" + ',"isSub":"1"}}}')
                        that.getMinutesdata('m30', that.tit, that.drawEchartsminutesk)
                        // setTimeout(function () {
                        //     that.drawEchartsminutesk()
                        // }, 200)
                        // that.$nextTick(() => {
                        //     that.drawEchartsminutesk()
                        // })
                    }
                }
            }
            ],
            totalDate: '', // 作为时间的入参
            giTime: [], // 分时时间轴数据
            giPrice: [], // 分时price数据
            giPriceMax: [], // 分时的最大值数据
            giPriceMin: [], // 分时的最小值数据
            oldTime: '', // 分时上一次数据推送的时间
            giPreClose: [], // 分时上一交易日的收盘价
            giMa: [], // 分时上的ma
            giVol: [], // 分时的成交量
            giRise: [], // 分时的涨跌幅
            giPriceMaxFloat: [], // 分时的最大值数据的涨幅
            giPriceMinFloat: [], // 分时的最小值数据的涨幅
            giRisePrice: [], // 联动时需要的涨跌数据
            timeArray: [],
            weekkdata: [], // 周ky轴的数据
            weekkTime: [], // 周k x时间轴数据
            weekkMa5: [], // 周k 5日均线数据
            weekkMa10: [], // 周k 10日均线数据
            weekkMa20: [], // 周k 20日均线数据
            weekkMa30: [], // 周k 30日均线数据
            weekkVol: [], // 周k 成交量数据
            weekkRise: [], // 周k 振幅数据
            weekmax: '', // 周k的最大值
            weekmin: '', // 周k的最小值
            weekava: [],
            weekavam: [],
            weekkRiseprice: [], // 周k涨跌数据 
            weekkturnover: [], // 周k换手
            weekkamt: [], // 周k 成交额
            weekkvolRatio: [], // 周k量比
            daykData: [], // 日k y轴的数据
            daykTime: [], // 日k x轴的数据
            daykMa5: [], // 日k 5日均线
            daykMa10: [], // 日k 10日均线
            daykMa20: [], // 日k 20日均线
            daykMa30: [], // 日k 30日均线
            daykVol: [], // 日k 成交量数据
            daykMax: [], // 日k 最大值
            daykMin: [], // 日k 最小值
            daymax: '', // 日k最大值
            daymin: '', // 日k最小值
            daykRise: [], // 日k 振幅数据
            daykRiseprice: [], // 日k涨跌数据 
            daykturnover: [], // 日k换手
            daykamt: [], // 日k 成交额
            daykvolRatio: [], // 日k量比
            dayava: [],
            dayavam: [],
            monthkData: [], // 月k y轴的数据
            monthkTime: [], // 月k x轴的数据
            monthkMa5: [], // 月k  5日均线数据
            monthkMa10: [], // 月k  10日均线数据
            monthkMa20: [], // 月k  20日均线数据
            monthkMa30: [], // 月k  30日均线数据
            monthkVol: [], // 月k 成交量数据
            monthkRise: [], // 月k 振幅数据
            monthmax: 0, // 月k的最大值
            monthmin: 0, // 月k的最小值
            monthkRiseprice: [], // 月k涨跌数据 
            monthkturnover: [], // 月k换手
            monthkamt: [], // 月k 成交额
            monthkvolRatio: [], // 月k量比
            monthava: [],
            monthavam: [],
            minuteskData: [], // 分钟图  y轴的数据
            minuteskTime: [], // 分钟图 x轴的数据
            minuteskMa5: [], // 分钟图 5日均线
            minuteskMa10: [], // 分钟图 10日均线
            minuteskMa20: [], // 分钟图 20日均线
            minuteskMa30: [], // 分钟图 30日均线
            minuteskVol: [], // 分钟k 成交量数据
            minuteskRise: [], // 分钟k 振幅数据
            minuteskRiseprice: [], // 分钟k涨跌数据 
            minuteskturnover: [], // 分钟k换手
            minuteskamt: [], // 分钟k 成交额
            minuteskvolRatio: [], // 分钟k量比
            minutemax: '', // 分钟k最大值
            minutemin: '', // 分钟k最小值
            minuteava: [],
            minuteavam: [],
            sheetVisible: false, // 控制 让下方的时间选择出来
            sheetVisible1: false, // 控制前后复权的显示
            tabCount: [0, 0, 0, 0, 0],
            // cancelText: "取消"
            isShow: false, // 判断是显示添加股票还是删除股票
            selfStock: JSON.parse(localStorage.getItem('selfStock')), // 取自选股列表的数据，为判断显示“添加自选股”or“删除自选股”
            FiveRangeData: [], // 五档 数据
            ParticularsData: [], // 明细
            dealData1: [], // 分时图成交量数据 1
            dealData2: [], // 分时图成交量数据 2
            dealTime: [], // 分时图成交量时间轴
            typeIndex: true, // 判断是否为指数的依据 true说明是股票
            translateTrue: false, // 判断是否全部明细的展示
            flag: false,
            // 基本信息的中介保存数据容器 记录数据的功能避免反复请求基本信息接口
            touchPrice: '', // 触摸结束后还原价格
            touchOpen: '', // 触摸结束后还原开盘价
            touchHigh: '', // 触摸结束后还原最高价
            touchLow: '', // 触摸结束后还原最低价  
            touchRise: '', // 触摸结束后还原涨幅   
            touchrisePrice: '', // 触摸结束后还原涨跌  
            touchAmt: '', // 触摸结束后还原成交额
            touchTurnover: '', // 触摸结束后还原换手
            touchVolRatio: '', // 触摸结束还原量比
            myChartGi: '', // 分时图的实例化对象
            giOption: '', // 分时图option
            mychartDay: '', // 日k图的实例化对象
            dayOption: '', // 日k图option
            mychartWeek: '', // 周k图的实例化对象
            weekOption: '', // 周k图option
            mychartMonth: '', // 月k图的实例化对象
            monthOption: '', // 月k图option
            mychartMinute: '', // 分钟k图的实例化对象
            minuteOption: '', // 分钟k图option
            width: '', // 屏幕的宽度   
            dayreslength: '', // 记录日k历史数据的长度 
            monthreslength: '', // 记录月k历史数据的长度
            weekreslength: '', // 记录周k历史数据的长度
            minutereslength: '', // 记录分钟k数据的长度
            currentVal: 1, // 记录val当前的数据  控制复权点击框的显示与否
            currentMinute: 1, // 记录当前的分钟选择后的分钟类型 点击了几分钟的k线
            tit: 'pre' // 默认选择不复权   控制复权的类型
        }
    },
    mounted: function () {
        // 获取基本数据
        this.getbaseData()
        // 日k的数据获取
        this.getdaykData(this.tit)
        // 周k的数据的获取
        this.getWeekkdata(this.tit)
        // 月k数据的获取
        this.getmonthkData(this.tit)
        // 获取url参数
        this.getUrldata()
        // 确定页面显示“添加自选股”还是“删除自选股”
        this.cutDown()
        // 五档
        this.fiveFiels()
        // 明细
        this.getParticularsData()
        // this.drawEchartsminutesk()
    },
    created: function () {
        // if(this.minuteskData){
        //     this.$nextTick(function(){
        //         this.drawEchartsminutesk()
        //     })
        // }
    },
    destroyed: function () {
        this.ws.send('{"oper":"delSub"}')
    },
    updated: function () {
        //      document.addEventListener("touchmove",function(e){
        //         console.log(this.a);
        // })
    },
    computed: {},
    watch: {
        // 监视tab栏切换到分钟的时候 让下方的分钟选择出来  切换到不同的tab栏 调出echart
        selected: function (val, oldVal) {
            // console.log("之前一个点击的tab", oldVal);
            // console.log("现在点击的tab",typeof val);
            if (val === '1' && this.tabCount[0] < 1) {
                this.tabCount[0]++
            }
            if (val === '2' && this.tabCount[1] < 1) {
                this.tabCount[1]++
                // 日k
                // this.getdaykData(this, this.drawEchartsdayk);
                // this.drawEchartsdayk()
            }
            if (val === '3' && this.tabCount[2] < 1) {
                this.tabCount[2]++
                // this.drawEchartsweekk()
                // 周k
                // this.getWeekkdata(this, this.drawEchartsweekk);
            }
            if (val === '4' && this.tabCount[3] < 1) {
                this.tabCount[3]++
                // this.drawEchartsmonthk()
                // console.log("selected", val);
                //  月k
                // this.getmonthkData(this, this.drawEchartsmonthk);
            }
            if (val === '5') {
                this.currentVal = 5
                // console.log(this.tit);
                // console.log(this.currentVal);
                this.tabCount[4]++
                // console.log("selected", val);
                this.sheetVisible = true
                // this.tabNum = this.tabNum;
                if (this.tabNum === false) {
                    this.selected = oldVal
                } else {
                    this.selected = '5'
                    this.tabNum = true
                }
            }
            if (val === '1') {
                this.tabNum = false
                // this.getShare(this.drawEchartShare);
                // console.log("this.tabNum",this.tabNum)
                this.currentVal = 1
                // this.getShare(this.drawEchartShare)
                // console.log(this.tit);
                // console.log(this.currentVal);
                this.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + this.tit + "'" + ',"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + this.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + this.tit + "'" + ',"type":"day","stkcode": ' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + this.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"}}}')
            }
            if (val === '2') {
                this.tabNum = false
                this.currentVal = 2
                this.getdaykData(this.tit, this.drawEchartsdayk)
                // console.log(this.tit);
                // this.drawEchartsdayk()
                 // this.getShare(this.drawEchartShare)
                // this.mychartDay.setOption(this.dayOption);
                // console.log(this.currentVal);
                this.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + this.tit + "'" + ',"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + this.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + this.tit + "'" + ',"type":"day","stkcode": ' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + this.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"}}}')
                // console.log("this.tabNum",this.tabNum)
            }
            if (val === '3') {
                this.tabNum = false
                this.currentVal = 3
                // console.log(this.tit);
                // this.mychartWeek.setOption(this.weekOption);
                // this.drawEchartsweekk()
                this.getWeekkdata(this.tit, this.drawEchartsweekk)
                // console.log(this.currentVal);
                // 请求周k websocket数据
                this.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + this.tit + "'" + ',"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + this.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + this.tit + "'" + ',"type":"week","stkcode": ' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + this.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"}}}')
            }
            if (val === '4') {
                this.tabNum = false
                this.currentVal = 4
                // console.log(this.currentVal);
                // console.log(this.tit);
                // this.mychartMonth.setOption(this.monthOption);
                // this.drawEchartsmonthk()
                this.getmonthkData(this.tit, this.drawEchartsmonthk)
                this.ws.send('{"oper":"addSub","info":{"S004":{"tit":' + "'" + this.tit + "'" + ',"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1","type":"1day","tit":' + "'" + this.tit + "'" + ',"stklist":[]},"S001":{"tit":' + "'" + this.tit + "'" + ',"type":"month","stkcode": ' + "'" + this.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":' + "'" + this.tit + "'" + ',"type":"fiveRange","stkcode":' + "'" + this.urlCode + "'" + ',"isSub":"1"}}}')
                // console.log("this.tabNum",this.tabNum)
            }
        }
    },
    methods: {
        // 判断是否让明细全部展示
        translateup: function () {
            this.translateTrue = !this.translateTrue
            this.getParticularsData()
            // console.log(this.translateTrue);
        },
        forTime: function (hour, startMinutes, endMinutes) {
            // this.timeArray = [];
            for (var i = startMinutes; i <= endMinutes; i++) {
                var timeStr = hour + ':' + (i < 10 ? ('0' + i) : i)
                this.timeArray.push(timeStr)
            }
            // return this.timeArray
        },
        getUrldata: function () {
            // console.log(window.location.href);
            var url = window.location.href.split('=')
            this.urlCode = url[1].split('&')[0]
            this.urlName = decodeURIComponent(url[2])
            this.title = this.urlName + '(' + this.urlCode + ')'
            var day = new Date()
            var year = day.getFullYear() // 得到年份
            var month = day.getMonth() + 1 // 得到月份
            var date = day.getDate() // 得到日期
            if (month < 10) {
                month = '0' + month
            }
            if (date < 10) {
                date = '0' + date
            }
            this.totalDate = '' + year + month + date
        },
        // 点击按钮 下拉的按钮消失
        showMore: function () {
            this.isshow = !this.isshow
        },
        // 点击按钮 上拉的按钮消失
        hideMore: function () {
            this.isshow = !this.isshow
        },
        // 绑定分钟点击按钮 让下方的分钟选择出来
        showSelect: function () {
            this.sheetVisible = true
        },
        // 绑定点击前后复权的按钮 让下方的复权类型选择弹出来
        showauthority: function () {
            this.sheetVisible1 = true
        },
        // 个股详情基本信息的获取
        getbaseData: function (callback) {
            // websocket 链接模拟数据
            var base = this
            base.getUrldata()
            // console.log(base.tit);
            // 分时图时间time的初始化
            var hoursList = [{
                'hour': '09',
                'startMinutes': '30',
                'endMinutes': '59'
            }, {
                'hour': '10',
                'startMinutes': '0',
                'endMinutes': '59'
            }, {
                'hour': '11',
                'startMinutes': '0',
                'endMinutes': '30'
            }, {
                'hour': '13',
                'startMinutes': '0',
                'endMinutes': '59'
            }, {
                'hour': '14',
                'startMinutes': '0',
                'endMinutes': '59'
            }, {
                'hour': '15',
                'startMinutes': '0',
                'endMinutes': '0'
            }]
            // var minutesList = []
            for (var i = 0; i < hoursList.length; i++) {
                base.forTime(hoursList[i].hour, hoursList[i].startMinutes, hoursList[i].endMinutes)
            };
            // http请求
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getQuotationData',
                    method: 'POST',
                    data: {
                        'stkcode': base.urlCode
                    }
                })
                .then(function (res) {
                    var changedata = res.data.result
                    // 处理如果是停牌状态下的基本信息展示
                    // console.log(22222);
                    // console.log(changedata.stockType);
                    // console.log(res);
                    if (changedata.stockType === 'stock') {
                        base.typeIndex = true
                        // console.log(base.typeIndex)
                        // console.log(11111)
                        // console.log(base.typeIndex);
                        // 分时图未实例化之前 对分时的这块进行占位 防止样式紊乱
                        base.width = document.body.clientWidth
                        document.getElementById('main').style.width = 0.7 * base.width + 'px'
                        document.getElementsByClassName('fiveFiel')[0].style.width = 0.3 * base.width + 'px'
                    } else {
                        base.typeIndex = false
                        // console.log(base.typeIndex)
                        // console.log(22222)
                        // console.log(base.typeIndex);
                        document.getElementById('main').style.width = 1 * base.width + 'px'
                        document.getElementsByClassName('fiveFiel')[0].style.width = '0px'
                    }
                    // 分时图
                    base.getShare(base.drawEchartShare)
                    // console.log("基本信息", changedata);
                    if (changedata.tradeStatus !== 'O') {
                        changedata.open = '--'
                        changedata.volRatio = '--'
                        changedata.turnover = '--'
                        changedata.amt = '--'
                        changedata.high = '--'
                        changedata.low = '--'
                        changedata.vol = '--'
                        changedata.mktCap = '--'
                        changedata.cirMktCap = '--'
                        changedata.transNumTotal = '--'
                        changedata.pb = '--'
                        changedata.peTtm = '--'
                        changedata.risePrice = '--'
                        changedata.rise = '--'
                    } else {
                        // 处理正常状态下的基本数据
                        if (changedata.amt > 100000000) {
                            changedata.amt = (changedata.amt / 100000000).toFixed(2) + '亿'
                        } else if (changedata.amt > 10000) {
                            changedata.amt = (changedata.amt / 10000).toFixed(2) + '万'
                        }
                        changedata.price = changedata.price.toFixed(2)
                        changedata.risePrice = changedata.risePrice.toFixed(2)
                        changedata.rise = changedata.rise.toFixed(2)
                        changedata.open = changedata.open.toFixed(2)
                        changedata.high = changedata.high.toFixed(2)
                        changedata.turnover = (changedata.turnover).toFixed(2)
                        changedata.low = changedata.low.toFixed(2)
                        changedata.volRatio = changedata.volRatio.toFixed(2)
                        changedata.ma = changedata.ma.toFixed(2)
                        changedata.amplitude = changedata.amplitude.toFixed(2)
                        changedata.preClose = changedata.preClose.toFixed(2)
                        changedata.pb = changedata.pb.toFixed(2)
                        changedata.peTtm = changedata.peTtm.toFixed(2)
                        changedata.limitUp = changedata.limitUp.toFixed(2)
                        changedata.limitDown = changedata.limitDown.toFixed(2)
                        if (changedata.vol > 10000000000) {
                            changedata.vol = (changedata.vol / 10000000000).toFixed(2) + '亿手'
                        } else if (changedata.vol > 1000000) {
                            changedata.vol = (changedata.vol / 1000000).toFixed(2) + '万手'
                        } else {
                            changedata.vol = (changedata.vol / 100).toFixed(2) + '手'
                        }
                        // 处理总手
                        if (changedata.transNumTotal > 10000000000) {
                            changedata.transNumTotal = (changedata.transNumTotal / 10000000000).toFixed(2) + '亿手'
                        } else if (changedata.transNumTotal > 1000000) {
                            changedata.transNumTotal = (changedata.transNumTotal / 1000000).toFixed(2) + '万手'
                        } else {
                            changedata.transNumTotal = (changedata.transNumTotal / 100).toFixed(2) + '手'
                        }
                        // 处理市值 mktCap
                        if (changedata.mktCap > 100000000) {
                            changedata.mktCap = (changedata.mktCap / 100000000).toFixed(2) + '亿'
                        } else if (changedata.mktCap > 10000) {
                            changedata.mktCap = (changedata.mktCap / 10000).toFixed(2) + '万'
                        }
                        // 处理流通 cirMktCap
                        if (changedata.cirMktCap > 100000000) {
                            changedata.cirMktCap = (changedata.cirMktCap / 100000000).toFixed(2) + '亿'
                        } else if (changedata.cirMktCap > 10000) {
                            changedata.cirMktCap = (changedata.cirMktCap / 10000).toFixed(2) + '万'
                        }
                    }
                    // 记录touch事件之前的最近的数据
                    base.touchPrice = changedata.price // 触摸结束后还原价格
                    base.touchOpen = changedata.open // 触摸结束后还原开盘价
                    base.touchHigh = changedata.high // 触摸结束后还原最高价
                    base.touchLow = changedata.low // 触摸结束后还原最低价 
                    base.touchRise = changedata.rise // 触摸结束后还原涨幅
                    base.touchrisePrice = changedata.risePrice // 触摸结束后还原涨跌  
                    base.touchAmt = changedata.amt // 触摸结束后还原成交额
                    base.touchTurnover = changedata.turnover // 触摸结束后还原换手
                    base.touchVolRatio = changedata.volRatio // 触摸结束还原量比
                    base.baseData = [changedata.price, changedata.risePrice, changedata.rise, changedata.open, changedata.high, changedata.turnover, changedata.amt, changedata.low, changedata.volRatio, changedata.ma, changedata.amplitude, changedata.preClose, changedata.vol, changedata.transNumTotal, changedata.pb, changedata.peTtm, changedata.mktCap, changedata.cirMktCap, changedata.limitUp, changedata.limitDown]
                })
                // Vue.set(base.baseData[3], Math.floor(changedata.open), false);
            if ('WebSocket' in window) {
                base.ws = new WebSocket('ws://101.231.93.232:14014/websocket')
                base.ws.onopen = function () {
                    base.ws.send('{"oper":"addSub","info":{"S004":{"tit":"pre","stkcode":' + "'" + base.urlCode + "'" + ',"isSub":"1"},"S007":{"stkcode":' + "'" + base.urlCode + "'" + ',"isSub":"1","type":"1day","tit":"pre","stklist":[]},"S001":{"tit":"pre","type":"day","stkcode": ' + "'" + base.urlCode + "'" + ',"isSub":"1"},"S005":{"tit":"pre","type":"fiveRange","stkcode":' + "'" + base.urlCode + "'" + ',"isSub":"1"}}}')
                }
                base.ws.onmessage = function (evt) {
                    // console.log("进入基本信息数据");
                    try {
                        // console.log("evt.data", eval('(' + evt.data + ')'));
                        // var webData = eval('(' + evt.data + ')');
                        var webData = JSON.parse(evt.data)
                        // console.log(webData)
                        // console.log(webData.result.type);
                        // console.log(typeof webData.fid)
                        // 分时图webscoket的处理
                        if (webData.fid === 'S007') {
                            // console.log('进入分时图的数据')
                            // console.log(webData.result);
                            var changedataT = webData.result
                            // console.log(base.giPrice)
                            // console.log(base.giTime)
                            // console.log('base',base)
                            // console.log('推送的分时数据', changedataT)
                            var newTime = parseInt(changedataT.time)
                            newTime = new Date(newTime)
                            var m = newTime.getMinutes()
                            var h = newTime.getHours()
                            changedataT.rise = changedataT.rise.toFixed(2)
                            changedataT.risePrice = changedataT.risePrice.toFixed(2)
                            // newTime = h + ":" + m;
                            newTime = h * 60 + m
                            if (newTime === base.oldTime) {
                                base.giPrice[base.giPrice.length - 1] = changedataT.price
                                base.giTime[base.giTime.length - 1] = changedataT.time
                                base.giMa[base.giMa.length - 1] = changedataT.ma
                                base.giVol[base.giVol.length - 1] = changedataT.vol
                                base.giRise[base.giRise.length - 1] = changedataT.rise
                                base.giRisePrice[base.giRisePrice.length - 1] = changedataT.risePrice
                                base.oldTime = newTime
                            } else if (newTime !== base.oldTime) {
                                if (base.oldTime !== '' && base.oldTime !== undefined && base.oldTime !== null && (newTime - base.oldTime) > 1) {
                                    for (var i = 0; i < (newTime - base.oldTime - 1); i++) {
                                        base.giPrice.push(null)
                                        base.giTime.push(null)
                                        base.giMa.push(null)
                                        base.giVol.push(null)
                                        base.giRise.push(null)
                                        base.giarray.push(null)
                                    }
                                    base.giPrice.push(changedataT.price)
                                    base.giTime.push(changedataT.giTime)
                                    base.giMa.push(changedataT.ma)
                                    base.giVol.push(changedataT.vol)
                                    base.giRise.push(changedataT.rise)
                                    base.giRisePrice.push(changedataT.risePrice)
                                    base.oldTime = newTime
                                } else {
                                    base.giPrice.push(changedataT.price)
                                    base.giTime.push(changedataT.giTime)
                                    base.giMa.push(changedataT.ma)
                                    base.giVol.push(changedataT.vol)
                                    base.giRise.push(changedataT.rise)
                                    base.giRisePrice.push(changedataT.risePrice)
                                    base.oldTime = newTime
                                }
                            }
                            if (base.giPriceMaxinum < changedataT.maxHigh) {
                                base.giPriceMaxinum = (changedataT.maxHigh).toFixed(2)
                            }
                            if (base.giPriceMininum > changedataT.minLow) {
                                base.giPriceMininum = (changedataT.minLow).toFixed(2)
                            }
                            var maxCut = Math.abs(base.giPriceMaxinum - changedataT.preClose)
                            var minCut = Math.abs(base.giPriceMininum - changedataT.preClose)
                            if (maxCut > minCut) {
                                base.giPriceMax = (changedataT.preClose + maxCut).toFixed(2)
                                base.giPriceMin = (changedataT.preClose - maxCut).toFixed(2)
                                base.giPriceMaxFloat = (maxCut / changedataT.preClose * 100).toFixed(2)
                                base.giPriceMinFloat = ((-1) * base.giPriceMaxFloat).toFixed(2)
                            } else {
                                base.giPriceMax = (changedataT.preClose + minCut).toFixed(2)
                                base.giPriceMin = (changedataT.preClose - minCut).toFixed(2)
                                base.giPriceMaxFloat = (minCut / changedataT.preClose * 100).toFixed(2)
                                base.giPriceMinFloat = ((-1) * base.giPriceMaxFloat).toFixed(2)
                            }
                            base.myChartGi.setOption(base.giOption)
                        }
                        // k线图webscoket的处理
                        if (webData.fid === 'S001') {
                            // console.log('k线图数据')
                            // console.log(webData.result);
                            // 日k webscoket 数据
                            if (webData.result.type === 'day') {
                                var changedataD = webData.result
                                // console.log(changedataD);
                                // console.log('变化的日k数据', changedataD)
                                // console.log(base.daykTime[base.dayreslength - 1]);
                                // console.log(base.totalDate);
                                changedataD.open = (changedataD.open).toFixed(2)
                                changedataD.price = (changedataD.price).toFixed(2)
                                changedataD.low = (changedataD.low).toFixed(2)
                                changedataD.high = (changedataD.high).toFixed(2)
                                changedataD.rise = (changedataD.rise).toFixed(2)
                                changedataD.risePrice = (changedataD.risePrice).toFixed(2)
                                changedataD.turnover = (changedataD.turnover).toFixed(2)
                                changedataD.volRatio = (changedataD.volRatio).toFixed(2)
                                if (changedataD.amt > 100000000) {
                                    changedataD.amt = (changedataD.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataD.amt > 10000) {
                                    changedataD.amt = (changedataD.amt / 10000).toFixed(2) + '万'
                                }
                                if (base.daykTime[base.dayreslength - 1].split(' ')[0] !== base.totalDate) {
                                    // console.log("变动1");
                                    base.daykData[base.dayreslength] = [changedataD.open, changedataD.price, changedataD.low, changedataD.high]
                                    base.daykTime[base.dayreslength] = changedataD.time
                                    base.daykMa5[base.dayreslength] = [changedataD.ma5, changedataD.rise]
                                    base.daykMa10[base.dayreslength] = changedataD.ma10
                                    base.daykMa20[base.dayreslength] = changedataD.ma20
                                    base.daykMa30[base.dayreslength] = changedataD.ma30
                                    base.daykVol[base.dayreslength] = changedataD.vol
                                    base.daykRise[base.dayreslength] = changedataD.rise
                                    base.daykRiseprice[base.dayreslength] = changedataD.risePrice
                                    base.daykamt[base.dayreslength] = changedataD.amt
                                    base.daykturnover[base.dayreslength] = changedataD.turnover
                                    base.daykvolRatio[base.dayreslength] = changedataD.volRatio
                                } else {
                                    // console.log("变动2");
                                    base.daykData[base.dayreslength - 1] = [changedataD.open, changedataD.price, changedataD.low, changedataD.high]
                                    base.daykTime[base.dayreslength - 1] = changedataD.time
                                    base.daykMa5[base.dayreslength - 1] = changedataD.ma5
                                    base.daykMa10[base.dayreslength - 1] = changedataD.ma10
                                    base.daykMa20[base.dayreslength - 1] = changedataD.ma20
                                    base.daykMa30[base.dayreslength - 1] = changedataD.ma30
                                    base.daykVol[base.dayreslength - 1] = changedataD.vol
                                    base.daykRise[base.dayreslength - 1] = changedataD.rise
                                    base.daykRiseprice[base.dayreslength - 1] = changedataD.risePrice
                                    base.daykamt[base.dayreslength - 1] = changedataD.amt
                                    base.daykturnover[base.dayreslength - 1] = changedataD.turnover
                                    base.daykvolRatio[base.dayreslength - 1] = changedataD.volRatio
                                }
                                base.mychartDay.setOption(base.dayOption)
                            }
                            // 月k webscoket数据
                            if (webData.result.type === 'month') {
                                // 月k webscoket数据
                                var changedataM = webData.result
                                // console.log('变化的月k数据',changedataM)
                                // console.log("变化的月k数据", changedataM);
                                // console.log(base.monthkTime[base.monthreslength - 1].split(" ")[0].slice(4,6));
                                // console.log(base.totalDate.slice(4,6));
                                // console.log(typeof base.monthkTime[base.monthreslength - 1].split(" ")[0]);
                                // console.log(typeof base.totalDate);
                                // 比较月份是否相同 如果相同就把历史数据的最后一个替换掉 如果不相同则直接push进去当前的webscoket数据
                                changedataM.open = (changedataM.open).toFixed(2)
                                changedataM.price = (changedataM.price).toFixed(2)
                                changedataM.low = (changedataM.low).toFixed(2)
                                changedataM.high = (changedataM.high).toFixed(2)
                                changedataM.rise = (changedataM.rise).toFixed(2)
                                changedataM.risePrice = (changedataM.risePrice).toFixed(2)
                                changedataM.turnover = (changedataM.turnover).toFixed(2)
                                changedataM.volRatio = (changedataM.volRatio).toFixed(2)
                                if (changedataM.amt > 100000000) {
                                    changedataM.amt = (changedataM.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataM.amt > 10000) {
                                    changedataM.amt = (changedataM.amt / 10000).toFixed(2) + '万'
                                }
                                // console.log('月k日期',base.monthkTime[base.monthreslength - 1].split(' ')[0].slice(4, 6))
                                // console.log('目前的日期',base.totalDate.slice(4, 6))
                                if (base.monthkTime[base.monthreslength - 1].split(' ')[0].slice(4, 6) !== base.totalDate.slice(4, 6)) {
                                    base.monthkData[base.monthreslength] = [changedataM.open, changedataM.price, changedataM.low, changedataM.high]
                                    base.monthkTime[base.monthreslength] = changedataM.time
                                    base.monthkMa5[base.monthreslength] = changedataM.ma5
                                    base.monthkMa10[base.monthreslength] = changedataM.ma10
                                    base.monthkMa20[base.monthreslength] = changedataM.ma20
                                    base.monthkMa30[base.monthreslength] = changedataM.ma30
                                    base.monthkVol[base.monthreslength] = changedataM.vol
                                    base.monthkRise[base.monthreslength] = changedataM.rise
                                    base.monthkRiseprice[base.monthreslength] = changedataM.risePrice
                                    base.monthkturnover[base.monthreslength] = changedataM.turnover
                                    base.monthkvolRatio[base.monthreslength] = changedataM.volRatio
                                    base.monthkamt[base.monthreslength] = changedataM.amt
                                } else {
                                    base.monthkData[base.monthreslength - 1] = [changedataM.open, changedataM.price, changedataM.low, changedataM.high]
                                    base.monthkTime[base.monthreslength - 1] = changedataM.time
                                    base.monthkMa5[base.monthreslength - 1] = changedataM.ma5
                                    base.monthkMa10[base.monthreslength - 1] = changedataM.ma10
                                    base.monthkMa20[base.monthreslength - 1] = changedataM.ma20
                                    base.monthkMa30[base.monthreslength - 1] = changedataM.ma30
                                    base.monthkVol[base.monthreslength - 1] = changedataM.vol
                                    base.monthkRise[base.monthreslength - 1] = changedataM.rise
                                    base.monthkRiseprice[base.monthreslength - 1] = changedataM.risePrice
                                    base.monthkturnover[base.monthreslength - 1] = changedataM.turnover
                                    base.monthkvolRatio[base.monthreslength - 1] = changedataM.volRatio
                                    base.monthkamt[base.monthreslength - 1] = changedataM.amt
                                }
                                base.mychartMonth.setOption(base.monthOption)
                            }
                            // 周k webscoket数据
                            if (webData.result.type === 'week') {
                                var changedataW = webData.result
                                changedataW.open = (changedataW.open).toFixed(2)
                                changedataW.price = (changedataW.price).toFixed(2)
                                changedataW.low = (changedataW.low).toFixed(2)
                                changedataW.high = (changedataW.high).toFixed(2)
                                changedataW.rise = (changedataW.rise).toFixed(2)
                                changedataW.risePrice = (changedataW.risePrice).toFixed(2)
                                changedataW.turnover = (changedataW.turnover).toFixed(2)
                                changedataW.volRatio = (changedataW.volRatio).toFixed(2)
                                if (changedataW.amt > 100000000) {
                                    changedataW.amt = (changedataW.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataW.amt > 10000) {
                                    changedataW.amt = (changedataW.amt / 10000).toFixed(2) + '万'
                                }
                                // console.log("变化的周k数据", changedata);
                                // console.log(base.weekkTime[base.weekreslength - 1].split(" ")[0].slice(6, 8));
                                // console.log(base.totalDate.slice(6, 8));
                                if (base.weekkTime[base.weekreslength - 1].split(' ')[0] !== base.totalDate) {
                                    base.weekkdata[base.weekreslength] = [changedataW.open, changedataW.price, changedataW.low, changedataW.high]
                                    base.weekkTime[base.weekreslength] = changedataW.time
                                    base.weekkMa5[base.weekreslength] = changedataW.ma5
                                    base.weekkMa10[base.weekreslength] = changedataW.ma10
                                    base.weekkMa20[base.weekreslength] = changedataW.ma20
                                    base.weekkMa30[base.weekreslength] = changedataW.ma30
                                    base.weekkVol[base.weekreslength] = changedataW.vol
                                    base.weekkRise[base.weekreslength] = changedataW.rise
                                    base.weekkRiseprice[base.weekreslength] = changedataW.risePrice
                                    base.weekkamt[base.weekreslength] = changedataW.amt
                                    base.weekkturnover[base.weekreslength] = changedataW.turnover
                                    base.weekkvolRatio[base.weekreslength] = changedataW.volRatio
                                } else {
                                    base.weekkdata[base.weekreslength - 1] = [changedataW.open, changedataW.price, changedataW.low, changedataW.high]
                                    base.weekkTime[base.weekreslength - 1] = changedataW.time
                                    base.weekkMa5[base.weekreslength - 1] = changedataW.ma5
                                    base.weekkMa10[base.weekreslength - 1] = changedataW.ma10
                                    base.weekkVol[base.weekreslength - 1] = changedataW.vol
                                    base.weekkRise[base.weekreslength - 1] = changedataW.rise
                                    base.weekkRiseprice[base.weekreslength - 1] = changedataW.risePrice
                                    base.weekkamt[base.weekreslength - 1] = changedataW.amt
                                    base.weekkturnover[base.weekreslength - 1] = changedataW.turnover
                                    base.weekkvolRatio[base.weekreslength - 1] = changedataW.volRatio
                                }
                                base.mychartWeek.setOption(base.weekOption)
                            }
                            // 一分钟 webscokets数据
                            if (webData.result.type === 'm1') {
                                // console.log(base.minuteskTime[base.minutereslength].split(":")[2]);
                                var changedataM1 = webData.result
                                changedataM1.open = (changedataM1.open).toFixed(2)
                                changedataM1.price = (changedataM1.price).toFixed(2)
                                changedataM1.low = (changedataM1.low).toFixed(2)
                                changedataM1.high = (changedataM1.high).toFixed(2)
                                changedataM1.rise = (changedataM1.rise).toFixed(2)
                                changedataM1.risePrice = (changedataM1.risePrice).toFixed(2)
                                changedataM1.turnover = (changedataM1.turnover).toFixed(2)
                                changedataM1.volRatio = (changedataM1.volRatio).toFixed(2)
                                if (changedataM1.amt > 100000000) {
                                    changedataM1.amt = (changedataM1.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataM1.amt > 10000) {
                                    changedataM1.amt = (changedataM1.amt / 10000).toFixed(2) + '万'
                                }
                                // console.log("变化的1分钟数据", changedataM1);
                                base.minuteskData[base.minutereslength - 1] = [changedataM1.open, changedataM1.price, changedataM1.low, changedataM1.high]
                                base.minuteskTime[base.minutereslength - 1] = changedataM1.time.split(' ')[1]
                                base.minuteskMa5[base.minutereslength - 1] = changedataM1.ma5
                                base.minuteskMa10[base.minutereslength - 1] = changedataM1.ma10
                                base.minuteskMa20[base.minutereslength - 1] = changedataM1.ma20
                                base.minuteskMa30[base.minutereslength - 1] = changedataM1.ma30
                                base.minuteskVol[base.minutereslength - 1] = changedataM1.vol
                                base.minuteskRise[base.minutereslength - 1] = changedataM1.rise
                                base.minuteskRiseprice[base.minutereslength - 1] = changedataM1.risePrice
                                base.minuteskamt[base.minutereslength - 1] = changedataM1.amt
                                base.minuteskturnover[base.minutereslength - 1] = changedataM1.turnover
                                base.minuteskvolRatio[base.minutereslength - 1] = changedataM1.volRatio
                                base.mychartMinute.setOption(base.minuteOption)
                            }
                            // 五分钟 webscokets数据
                            if (webData.result.type === 'm5') {
                                var changedataM5 = webData.result
                                changedataM5.open = (changedataM5.open).toFixed(2)
                                changedataM5.price = (changedataM5.price).toFixed(2)
                                changedataM5.low = (changedataM5.low).toFixed(2)
                                changedataM5.high = (changedataM5.high).toFixed(2)
                                changedataM5.rise = (changedataM5.rise).toFixed(2)
                                changedataM5.risePrice = (changedataM5.risePrice).toFixed(2)
                                changedataM5.turnover = (changedataM5.turnover).toFixed(2)
                                changedataM5.volRatio = (changedataM5.volRatio).toFixed(2)
                                if (changedataM5.amt > 100000000) {
                                    changedataM5.amt = (changedataM5.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataM5.amt > 10000) {
                                    changedataM5.amt = (changedataM5.amt / 10000).toFixed(2) + '万'
                                }
                                // console.log("变化的5分钟数据", changedataM5);
                                // console.log(base.minuteskTime[base.minutereslength - 1].split(":")); //计算历史数据的最后一个时刻
                                // console.log(changedataM5.time.split(" ")[1].split(":")); //计算实时数据的当前时刻
                                if (base.minuteskTime[base.minutereslength - 1].split(':') === changedataM5.time.split(' ')[1].split(' ')) {
                                    // console.log("进入时间相同的逻辑");
                                    base.minuteskData[base.minutereslength] = [changedataM5.open, changedataM5.price, changedataM5.low, changedataM5.high]
                                    base.minuteskTime[base.minutereslength] = changedataM5.time.split(' ')[1]
                                    base.minuteskMa5[base.minutereslength] = changedataM5.ma5
                                    base.minuteskMa10[base.minutereslength] = changedataM5.ma10
                                    base.minuteskMa20[base.minutereslength] = changedataM5.ma20
                                    base.minuteskMa30[base.minutereslength] = changedataM5.ma30
                                    base.minuteskVol[base.minutereslength] = changedataM5.vol
                                    base.minuteskRise[base.minutereslength] = changedataM5.rise
                                    base.mychartMinute.setOption(base.minuteOption)
                                } else {
                                    // console.log("进入时间不相同的逻辑");
                                    base.minuteskData[base.minutereslength - 1] = [changedataM5.open, changedataM5.price, changedataM5.low, changedataM5.high]
                                    base.minuteskTime[base.minutereslength - 1] = changedataM5.time.split(' ')[1]
                                    base.minuteskMa5[base.minutereslength - 1] = changedataM5.ma5
                                    base.minuteskMa10[base.minutereslength - 1] = changedataM5.ma10
                                    base.minuteskMa20[base.minutereslength - 1] = changedataM5.ma20
                                    base.minuteskMa30[base.minutereslength - 1] = changedataM5.ma30
                                    base.minuteskVol[base.minutereslength - 1] = changedataM5.vol
                                    base.minuteskRise[base.minutereslength - 1] = changedataM5.rise
                                    base.minuteskRiseprice[base.minutereslength - 1] = changedataM5.risePrice
                                    base.minuteskamt[base.minutereslength - 1] = changedataM5.amt
                                    base.minuteskturnover[base.minutereslength - 1] = changedataM5.turnover
                                    base.minuteskvolRatio[base.minutereslength - 1] = changedataM5.volRatio
                                    base.mychartMinute.setOption(base.minuteOption)
                                }
                            }
                            // 十五分钟 webscokets数据
                            if (webData.result.type === 'm15') {
                                // console.log("变化的分钟数据", changedataM15);
                                var changedataM15 = webData.result
                                changedataM15.open = (changedataM15.open).toFixed(2)
                                changedataM15.price = (changedataM15.price).toFixed(2)
                                changedataM15.low = (changedataM15.low).toFixed(2)
                                changedataM15.high = (changedataM15.high).toFixed(2)
                                changedataM15.rise = (changedataM15.rise).toFixed(2)
                                changedataM15.risePrice = (changedataM15.risePrice).toFixed(2)
                                changedataM15.turnover = (changedataM15.turnover).toFixed(2)
                                changedataM15.volRatio = (changedataM15.volRatio).toFixed(2)
                                if (changedataM15.amt > 100000000) {
                                    changedataM15.amt = (changedataM15.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataM15.amt > 10000) {
                                    changedataM15.amt = (changedataM15.amt / 10000).toFixed(2) + '万'
                                }
                                base.minuteskData[base.minutereslength - 1] = [changedataM15.open, changedataM15.price, changedataM15.low, changedataM15.high]
                                base.minuteskTime[base.minutereslength - 1] = changedataM15.time.split(' ')[1]
                                base.minuteskMa5[base.minutereslength - 1] = changedataM15.ma5
                                base.minuteskMa10[base.minutereslength - 1] = changedataM15.ma10
                                base.minuteskMa20[base.minutereslength - 1] = changedataM15.ma20
                                base.minuteskMa30[base.minutereslength - 1] = changedataM15.ma30
                                base.minuteskVol[base.minutereslength - 1] = changedataM15.vol
                                base.minuteskRise[base.minutereslength - 1] = changedataM15.rise
                                base.minuteskRiseprice[base.minutereslength - 1] = changedataM15.risePrice
                                base.minuteskamt[base.minutereslength - 1] = changedataM15.amt
                                base.minuteskturnover[base.minutereslength - 1] = changedataM15.turnover
                                base.minuteskvolRatio[base.minutereslength - 1] = changedataM15.volRatio
                                base.mychartMinute.setOption(base.minuteOption)
                            }
                            // 三十分钟 webscokets数据
                            if (webData.result.type === 'm30') {
                                // console.log("变化的分钟数据", changedataM30);
                                var changedataM30 = webData.result
                                changedataM30.open = (changedataM30.open).toFixed(2)
                                changedataM30.price = (changedataM30.price).toFixed(2)
                                changedataM30.low = (changedataM30.low).toFixed(2)
                                changedataM30.high = (changedataM30.high).toFixed(2)
                                changedataM30.rise = (changedataM30.rise).toFixed(2)
                                changedataM30.risePrice = (changedataM30.risePrice).toFixed(2)
                                changedataM30.turnover = (changedataM30.turnover).toFixed(2)
                                changedataM30.volRatio = (changedataM30.volRatio).toFixed(2)
                                if (changedataM30.amt > 100000000) {
                                    changedataM30.amt = (changedataM30.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataM30.amt > 10000) {
                                    changedataM30.amt = (changedataM30.amt / 10000).toFixed(2) + '万'
                                }
                                base.minuteskData[base.minutereslength - 1] = [changedataM30.open, changedataM30.price, changedataM30.low, changedataM30.high]
                                base.minuteskTime[base.minutereslength - 1] = changedataM30.time.split(' ')[1]
                                base.minuteskMa5[base.minutereslength - 1] = changedataM30.ma5
                                base.minuteskMa10[base.minutereslength - 1] = changedataM30.ma10
                                base.minuteskMa20[base.minutereslength - 1] = changedataM30.ma20
                                base.minuteskMa30[base.minutereslength - 1] = changedataM30.ma30
                                base.minuteskVol[base.minutereslength - 1] = changedataM30.vol
                                base.minuteskRise[base.minutereslength - 1] = changedataM30.rise
                                base.minuteskRiseprice[base.minutereslength - 1] = changedataM30.risePrice
                                base.minuteskamt[base.minutereslength - 1] = changedataM30.amt
                                base.minuteskturnover[base.minutereslength - 1] = changedataM30.turnover
                                base.minuteskvolRatio[base.minutereslength - 1] = changedataM30.volRatio
                                base.mychartMinute.setOption(base.minuteOption)
                            }
                        }
                        // 五档明细webscoket的处理
                        if (webData.fid === 'S005') {
                            // console.log('进入五档明细的推送')
                            // console.log(webData.result)
                            var changedataFR = webData.result
                            // console.log(changedata)
                            // console.log('推送的五档行情', changedata)
                                // console.log(1111)
                                base.FiveRangeData = changedataFR
                                // that.FiveRangeData = changedata;
                                // console.log("推送的五档行情",that.FiveRangeData);
                                if (JSON.stringify(changedataFR) !== '{}' && base.FiveRangeData.maxNum !== 0) {
                                    base.FiveRangeData.sellPrice1 = base.FiveRangeData.sellPrice1.toFixed(2)
                                    base.FiveRangeData.sellPrice2 = base.FiveRangeData.sellPrice2.toFixed(2)
                                    base.FiveRangeData.sellPrice3 = base.FiveRangeData.sellPrice3.toFixed(2)
                                    base.FiveRangeData.sellPrice4 = base.FiveRangeData.sellPrice4.toFixed(2)
                                    base.FiveRangeData.sellPrice5 = base.FiveRangeData.sellPrice5.toFixed(2)
                                    base.FiveRangeData.buyPrice1 = base.FiveRangeData.buyPrice1.toFixed(2)
                                    base.FiveRangeData.buyPrice2 = base.FiveRangeData.buyPrice2.toFixed(2)
                                    base.FiveRangeData.buyPrice3 = base.FiveRangeData.buyPrice3.toFixed(2)
                                    base.FiveRangeData.buyPrice4 = base.FiveRangeData.buyPrice4.toFixed(2)
                                    base.FiveRangeData.buyPrice5 = base.FiveRangeData.buyPrice5.toFixed(2)
                                    // 每手100股，所以除以100，并且向下取整数
                                    base.FiveRangeData.sellNum1 = Math.floor(base.FiveRangeData.sellNum1 / 100)
                                    base.FiveRangeData.sellNum2 = Math.floor(base.FiveRangeData.sellNum2 / 100)
                                    base.FiveRangeData.sellNum3 = Math.floor(base.FiveRangeData.sellNum3 / 100)
                                    base.FiveRangeData.sellNum4 = Math.floor(base.FiveRangeData.sellNum4 / 100)
                                    base.FiveRangeData.sellNum5 = Math.floor(base.FiveRangeData.sellNum5 / 100)
                                    base.FiveRangeData.buyNum1 = Math.floor(base.FiveRangeData.buyNum1 / 100)
                                    base.FiveRangeData.buyNum2 = Math.floor(base.FiveRangeData.buyNum2 / 100)
                                    base.FiveRangeData.buyNum3 = Math.floor(base.FiveRangeData.buyNum3 / 100)
                                    base.FiveRangeData.buyNum4 = Math.floor(base.FiveRangeData.buyNum4 / 100)
                                    base.FiveRangeData.buyNum5 = Math.floor(base.FiveRangeData.buyNum5 / 100)
                                }
                                changedataFR.time = changedataFR.time.slice(9, 14)
                                changedataFR.price = changedataFR.price.toFixed(2)
                                changedataFR.transNum = Math.floor(changedataFR.transNum / 100)
                                // console.log("推送的明细", changedata);
                                // console.log("推送的明细的价格", changedata.price);
                                // console.log("推送的明细的成交量", changedata.transNum);
                                // 若成交量等于0的情况下，且价格与上一条数据的价格相等，则该条数据不显示，为无效数据，需过滤掉
                                // console.log(base.ParticularsData.length)
                                // console.log(base.ParticularsData)
                                if (changedataFR.transNum === 0) {
                                    if (changedataFR.price !== base.ParticularsData[9].price) {
                                        if (base.ParticularsData.length < 9) {
                                            base.ParticularsData.push(changedataFR)
                                        } else {
                                            base.ParticularsData.splice(9, 0, changedataFR)
                                            base.ParticularsData.splice(0, 1)
                                        }
                                        // base.ParticularsData.splice(10, 1);
                                    }
                                    // console.log("进入0的判断",base.ParticularsData[0].price);
                                } else {
                                    if (base.translateTrue === false) {
                                        // console.log("没有点击向上");
                                        // console.log(base.ParticularsData.length);
                                        if (base.ParticularsData.length < 5) {
                                            base.ParticularsData.push(changedataFR)
                                        } else {
                                            base.ParticularsData.splice(5, 0, changedataFR)
                                            base.ParticularsData.splice(0, 1)
                                        }
                                    } else {
                                        // console.log("点击了向上");
                                        if (base.ParticularsData.length < 9) {
                                            base.ParticularsData.push(changedataFR)
                                        } else {
                                            base.ParticularsData.splice(9, 0, changedataFR)
                                            base.ParticularsData.splice(0, 1)
                                        }
                                    }
                                }
                        }
                        // base.drawEchartsdayk();
                    } catch (e) {}
                    // 基本信息webscoket推送的处理
                    if (base.flag === false) {
                        try { // 非IE
                            // var changedata = eval('(' + evt.data + ')').result
                            // console.log(JSON.parse(evt.data).result)
                            var changedataB = JSON.parse(evt.data).result
                            // console.log('基本信息的推送',changedataB)
                            // console.log('基本信息的推送',changedata)
                            // console.log("推送的基本信息", changedata);
                            if (changedataB) {
                                // 数据保留两位小数
                                // console.log(33333);
                                changedataB.price = changedataB.price.toFixed(2)
                                changedataB.risePrice = changedataB.risePrice.toFixed(2)
                                changedataB.rise = changedataB.rise.toFixed(2)
                                changedataB.open = changedataB.open.toFixed(2)
                                changedataB.high = changedataB.high.toFixed(2)
                                changedataB.turnover = changedataB.turnover.toFixed(2)
                                changedataB.pb = changedataB.pb.toFixed(2)
                                changedataB.peTtm = changedataB.peTtm.toFixed(2)
                                changedataB.preClose = changedataB.preClose.toFixed(2)
                                changedataB.limitUp = changedataB.limitUp.toFixed(2)
                                changedataB.limitDown = changedataB.limitDown.toFixed(2)
                                // 处理额
                                if (changedataB.amt > 100000000) {
                                    changedataB.amt = (changedataB.amt / 100000000).toFixed(2) + '亿'
                                } else if (changedataB.amt > 10000) {
                                    changedataB.amt = (changedataB.amt / 10000).toFixed(2) + '万'
                                }
                                // 处理成交量
                                if (changedataB.vol > 10000000000) {
                                    changedataB.vol = (changedataB.vol / 10000000000).toFixed(2) + '亿手'
                                } else if (changedataB.vol > 1000000) {
                                    changedataB.vol = (changedataB.vol / 1000000).toFixed(2) + '万手'
                                } else {
                                    changedataB.vol = (changedataB.vol / 100).toFixed(2) + '手'
                                }
                                // 处理总手
                                if (changedataB.transNumTotal > 10000000000) {
                                    changedataB.transNumTotal = (changedataB.transNumTotal / 10000000000).toFixed(2) + '亿手'
                                } else if (changedataB.transNumTotal > 1000000) {
                                    changedataB.transNumTotal = (changedataB.transNumTotal / 1000000).toFixed(2) + '万手'
                                } else {
                                    changedataB.transNumTotal = (changedataB.transNumTotal / 100).toFixed(2) + '手'
                                }
                                // 处理市值 mktCap
                                if (changedataB.mktCap > 100000000) {
                                    changedataB.mktCap = (changedataB.mktCap / 100000000).toFixed(2) + '亿'
                                } else if (changedataB.mktCap > 10000) {
                                    changedataB.mktCap = (changedataB.mktCap / 10000).toFixed(2) + '万'
                                }
                                // 处理流通 cirMktCap
                                if (changedataB.cirMktCap > 100000000) {
                                    changedataB.cirMktCap = (changedataB.cirMktCap / 100000000).toFixed(2) + '亿'
                                } else if (changedataB.cirMktCap > 10000) {
                                    changedataB.cirMktCap = (changedataB.cirMktCap / 10000).toFixed(2) + '万'
                                }
                                changedataB.low = changedataB.low.toFixed(2)
                                changedataB.volRatio = changedataB.volRatio.toFixed(2)
                                changedataB.ma = changedataB.ma.toFixed(2)
                                changedataB.amplitude = changedataB.amplitude.toFixed(2)
                                // 记录touch事件之前的最近的数据
                                base.touchPrice = changedataB.price // 触摸结束后还原价格
                                base.touchOpen = changedataB.open // 触摸结束后还原开盘价
                                base.touchHigh = changedataB.high // 触摸结束后还原最高价
                                base.touchLow = changedataB.low // 触摸结束后还原最低价   
                                base.touchRise = changedataB.rise // 触摸结束后还原涨幅 
                                base.touchrisePrice = changedataB.risePrice // 触摸结束后还原涨跌  
                                Vue.set(base.baseData, 0, changedataB.price)
                                Vue.set(base.baseData, 1, changedataB.risePrice)
                                Vue.set(base.baseData, 2, changedataB.rise)
                                Vue.set(base.baseData, 3, changedataB.open)
                                Vue.set(base.baseData, 4, changedataB.high)
                                Vue.set(base.baseData, 5, changedataB.turnover)
                                Vue.set(base.baseData, 6, changedataB.amt)
                                Vue.set(base.baseData, 7, changedataB.low)
                                Vue.set(base.baseData, 8, changedataB.volRatio)
                                Vue.set(base.baseData, 9, changedataB.ma)
                                Vue.set(base.baseData, 10, changedataB.amplitude)
                                Vue.set(base.baseData, 11, changedataB.preClose)
                                Vue.set(base.baseData, 12, changedataB.vol)
                                Vue.set(base.baseData, 13, changedataB.transNumTotal)
                                Vue.set(base.baseData, 14, changedataB.pb)
                                Vue.set(base.baseData, 15, changedataB.peTtm)
                                Vue.set(base.baseData, 16, changedataB.mktCap)
                                Vue.set(base.baseData, 17, changedataB.cirMktCap)
                                Vue.set(base.baseData, 18, changedataB.limitUp)
                                Vue.set(base.baseData, 19, changedataB.limitDown)
                            }
                        } catch (e) {} // IE
                    };
                }
            }
            // 监听如果屏幕滑动结束 重新调用请求基本信息的接口
            document.addEventListener('touchend', function (e) {
                // base.getbaseData();
                // 如果触摸的目标是canvas对象 那么则重置基本信息数据
                // console.log(e.target.tagName == "CANVAS");
                if (e.target.tagName === 'CANVAS') {
                    // base.getbaseData();
                    // 把最近的记录的数据重新还原到页面中
                    // console.log([base.touchPrice,base.touchOpen,base.touchHigh,base.touchLow]);
                        Vue.set(base.baseData, 0, base.touchPrice)
                        Vue.set(base.baseData, 3, base.touchOpen)
                        Vue.set(base.baseData, 4, base.touchHigh)
                        Vue.set(base.baseData, 7, base.touchLow)
                        Vue.set(base.baseData, 2, base.touchRise)
                        Vue.set(base.baseData, 1, base.touchrisePrice)
                        Vue.set(base.baseData, 5, base.touchTurnover)
                        Vue.set(base.baseData, 6, base.touchAmt)
                        Vue.set(base.baseData, 8, base.touchVolRatio)
                    // 把基本信息webscoket推送开启 如果webscoket没有推送 那么不进行处理
                    base.flag = false
                }
            })
            // 监听如果屏幕滑动过程中  那么让基本信息的推送结束掉
            document.addEventListener('touchmove', function (e) {
                // console.log(e.target.tagName == "CANVAS");
                if (e.target.tagName === 'CANVAS') {
                    base.flag = true
                }
            })
        },
        // 日k图数据
        getdaykData: function (tit,callback) {
            var weekk = this
            // console.log(tit);
            // console.log(typeof tit);
            weekk.getUrldata()
            weekk.daykMa5 = []
            weekk.daykMa10 = []
            weekk.daykMa20 = []
            weekk.daykMa30 = []
            weekk.daykVol = []
            weekk.daykRise = []
            weekk.daykData = []
            weekk.daykTime = []
            weekk.daymax = ''
            weekk.daymin = ''
            weekk.daykRiseprice = []
            weekk.daykamt = []
            weekk.daykturnover = []
            weekk.daykvolRatio = []
            weekk.dayava = []
            weekk.dayavam = []
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getKlineData',
                    method: 'POST',
                    data: {
                        'stkcode': weekk.urlCode,
                        'xdxrType': tit,
                        'period': 'day',
                        'time': weekk.totalDate,
                        'num': 50
                    }
                })
                .then(function (res) {
                    var resdata = res.data.result
                    var reslength = resdata.length
                    weekk.dayreslength = reslength
                    if(reslength === 0){
                        weekk.daymax = 0
                        weekk.daymin = 0
                    }else{
                        weekk.daymax = resdata[0].high
                        weekk.daymin = resdata[0].low
                    }                  
                    // console.log('日k数据', res)
                    for (var i = 0; i < resdata.length; i++) {
                        // 开盘，收盘，最低，最高
                        // http 数据
                        if (resdata[i].ma5 === 0) {
                            resdata[i].ma5 = ''
                        }
                        if (resdata[i].ma10 === 0) {
                            resdata[i].ma10 = ''
                        }
                        if (resdata[i].ma20 === 0) {
                            resdata[i].ma20 = ''
                        }
                        if (resdata[i].ma30 === 0) {
                            resdata[i].ma30 = ''
                        }
                        if (weekk.daymax - resdata[i].high < 0) {
                            weekk.daymax = resdata[i].high
                        }
                        if (weekk.daymin - resdata[i].low > 0) {
                            weekk.daymin = resdata[i].low
                        }
                        if (resdata[i].amt > 100000000) {
                            resdata[i].amt = (resdata[i].amt / 100000000).toFixed(2) + '亿'
                        } else if (resdata[i].amt > 10000) {
                            resdata[i].amt = (resdata[i].amt / 10000).toFixed(2) + '万'
                        }
                        resdata[i].risePrice = (resdata[i].risePrice).toFixed(2)
                        resdata[i].rise = (resdata[i].rise).toFixed(2)
                        resdata[i].turnover = (resdata[i].turnover).toFixed(2)
                        resdata[i].volRatio = (resdata[i].volRatio).toFixed(2)
                        resdata[i].open = (resdata[i].open).toFixed(2)
                        resdata[i].price = (resdata[i].price).toFixed(2)
                        resdata[i].low = (resdata[i].low).toFixed(2)
                        resdata[i].high = (resdata[i].high).toFixed(2)
                        weekk.daykData.push([resdata[i].open, resdata[i].price, resdata[i].low, resdata[i].high])
                        weekk.daykTime.push(resdata[i].time.split(' ')[0])
                        weekk.daykMa5.push(resdata[i].ma5)
                        weekk.daykMa10.push(resdata[i].ma10)
                        weekk.daykMa20.push(resdata[i].ma20)
                        weekk.daykMa30.push(resdata[i].ma30)
                        weekk.daykVol.push(resdata[i].vol)
                        weekk.daykRise.push(resdata[i].rise)
                        weekk.daykRiseprice.push(resdata[i].risePrice)
                        weekk.daykamt.push(resdata[i].amt)
                        weekk.daykturnover.push(resdata[i].turnover)
                        weekk.daykvolRatio.push(resdata[i].volRatio)
                    }
                    weekk.daymax = weekk.daymax.toFixed(2)
                    for (var j = 0; j < 50; j++) {
                        weekk.dayava.push(((Number(weekk.daymin) + Number(weekk.daymax)) / 2).toFixed(2))
                        weekk.dayavam.push(weekk.daymax)
                    }
                    // weekk.daymax = Math.ceil(weekk.daymax);
                    // weekk.daymin = Math.floor(weekk.daymin);
                    // 处理新股条件下少于50条的情况下对x轴进行处理
                    if (weekk.daykTime.length < 50) {
                        // console.log(weekk.daykTime.length);
                        for (var k = weekk.daykTime.length; k < 50; k++) {
                            weekk.daykTime[k] = ''
                        }
                    }
                    // console.log(weekk.daykData)
                    // console.log(callback)
                    if (callback && typeof callback === 'function') {
                            callback()
                        }
                })
        },
        // 周k图数据
        getWeekkdata: function (tit,callback) {
            var weekk = this
            weekk.getUrldata()
            weekk.weekkdata = []
            weekk.weekkTime = []
            weekk.weekkMa5 = []
            weekk.weekkMa10 = []
            weekk.weekkMa20 = []
            weekk.weekkMa30 = []
            weekk.weekkVol = []
            weekk.weekmax = ''
            weekk.weekmin = ''
            weekk.weekkRise = []
            weekk.weekkRiseprice = []
            weekk.weekkturnover = []
            weekk.weekkamt = []
            weekk.weekkvolRatio = []
            weekk.weekava = []
            weekk.weekavam = []
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getKlineData',
                    method: 'POST',
                    data: {
                        'stkcode': weekk.urlCode,
                        'xdxrType': tit,
                        'period': 'week',
                        'time': weekk.totalDate,
                        'num': 50
                    }
                })
                .then(function (res) {
                    // console.log(res.data.result);
                    var resdata = res.data.result
                    var reslength = resdata.length
                    weekk.weekreslength = reslength
                    // console.log(resdata);
                    if(reslength === 0){
                        weekk.weekmax = 0
                        weekk.weekmin = 0
                    }else{
                        weekk.weekmax = resdata[0].high
                        weekk.weekmin = resdata[0].low
                    }                   
                    // console.log("周k数据",resdata);
                    for (var i = 0; i < resdata.length; i++) {
                        // console.log(resdata[i]);
                        // console.log([resdata[i].open,resdata[i].preClose,resdata[i].low,resdata[i].high]);
                        // 开盘，收盘，最低，最高
                        // console.log(week.weekkdata);
                        if (resdata[i].ma5 === 0) {
                            resdata[i].ma5 = ''
                        }
                        if (resdata[i].ma10 === 0) {
                            resdata[i].ma10 = ''
                        }
                        if (resdata[i].ma20 === 0) {
                            resdata[i].ma20 = ''
                        }
                        if (resdata[i].ma30 === 0) {
                            resdata[i].ma30 = ''
                        }
                        if (resdata[i].amt > 100000000) {
                            resdata[i].amt = (resdata[i].amt / 100000000).toFixed(2) + '亿'
                        } else if (resdata[i].amt > 10000) {
                            resdata[i].amt = (resdata[i].amt / 10000).toFixed(2) + '万'
                        }
                        resdata[i].rise = (resdata[i].rise).toFixed(2)
                        resdata[i].risePrice = (resdata[i].risePrice).toFixed(2)
                        resdata[i].turnover = (resdata[i].turnover).toFixed(2)
                        resdata[i].volRatio = (resdata[i].volRatio).toFixed(2)
                        resdata[i].open = (resdata[i].open).toFixed(2)
                        resdata[i].price = (resdata[i].price).toFixed(2)
                        resdata[i].low = (resdata[i].low).toFixed(2)
                        resdata[i].high = (resdata[i].high).toFixed(2)
                        if (weekk.weekmax - resdata[i].high < 0) {
                            weekk.weekmax = resdata[i].high
                        }
                        if (weekk.weekmin - resdata[i].low > 0) {
                            weekk.weekmin = resdata[i].low
                        }
                        weekk.weekkdata.push([resdata[i].open, resdata[i].price, resdata[i].low, resdata[i].high])
                        weekk.weekkTime.push(resdata[i].time.split(' ')[0])
                        weekk.weekkMa5.push(resdata[i].ma5)
                        weekk.weekkMa10.push(resdata[i].ma10)
                        weekk.weekkMa20.push(resdata[i].ma20)
                        weekk.weekkMa30.push(resdata[i].ma30)
                        weekk.weekkVol.push(resdata[i].vol)
                        weekk.weekkRise.push(resdata[i].rise)
                        weekk.weekkRiseprice.push(resdata[i].risePrice)
                        weekk.weekkturnover.push(resdata[i].turnover)
                        weekk.weekkamt.push(resdata[i].amt)
                        weekk.weekkvolRatio.push(resdata[i].volRatio)
                    }
                    // weekk.weekmax = weekk.weekmax.toFixed(2)
                    for (var j = 0; j < 50; j++) {
                        weekk.weekava.push(((Number(weekk.weekmin) + Number(weekk.weekmax)) / 2).toFixed(2))
                        weekk.weekavam.push(weekk.weekmax)
                    }
                    // console.log(weekk.weekava);
                    // weekk.weekmax = Math.ceil(weekk.weekmax);
                    // weekk.weekmin = Math.floor(weekk.weekmin);
                    if (weekk.weekkTime.length < 50) {
                        for (var k = weekk.weekkTime.length; k < 50; k++) {
                            weekk.weekkTime[k] = ''
                        }
                    }
                    // console.log(callback)
                    if (callback && typeof callback === 'function') {
                            callback()
                        }
                })
        },
        // 月k图数据
        getmonthkData: function (tit,callback) {
            var weekk = this
            weekk.getUrldata()
            weekk.monthkData = []
            weekk.monthkTime = []
            weekk.monthkMa5 = []
            weekk.monthkMa10 = []
            weekk.monthkMa20 = []
            weekk.monthkMa30 = []
            weekk.monthkVol = []
            weekk.monthkRise = []
            weekk.monthmax = 0
            weekk.monthmin = 0
            weekk.monthkRiseprice = []
            weekk.monthkturnover = []
            weekk.monthkamt = []
            weekk.monthkvolRatio = []
            weekk.monthava = []
            weekk.monthavam = []
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getKlineData',
                    method: 'POST',
                    data: {
                        'stkcode': weekk.urlCode,
                        'xdxrType': tit,
                        'period': 'month',
                        'time': weekk.totalDate,
                        'num': 50
                    }
                })
                .then(function (res) {
                    var resdata = res.data.result
                    var reslength = resdata.length
                    weekk.monthreslength = reslength
                    // console.log(resdata)
                    // console.log(reslength);
                    // console.log(res);
                    // console.log(weekk.weekkdata)
                    if(reslength === 0){
                        weekk.monthmax = 0
                        weekk.monthmin = 0
                    }else{
                        weekk.monthmax = resdata[0].high
                        weekk.monthmin = resdata[0].low
                    }                    
                    for (var i = 0; i < resdata.length; i++) {
                        // 开盘，收盘，最低，最高
                        if (resdata[i].ma5 === 0) {
                            resdata[i].ma5 = ''
                        }
                        if (resdata[i].ma10 === 0) {
                            resdata[i].ma10 = ''
                        }
                        if (resdata[i].ma20 === 0) {
                            resdata[i].ma20 = ''
                        }
                        if (resdata[i].ma30 === 0) {
                            resdata[i].ma30 = ''
                        }
                        resdata[i].rise = (resdata[i].rise).toFixed(2)
                        resdata[i].risePrice = (resdata[i].risePrice).toFixed(2)
                        resdata[i].turnover = (resdata[i].turnover).toFixed(2)
                        resdata[i].volRatio = (resdata[i].volRatio).toFixed(2)
                        resdata[i].open = (resdata[i].open).toFixed(2)
                        resdata[i].price = (resdata[i].price).toFixed(2)
                        resdata[i].low = (resdata[i].low).toFixed(2)
                        resdata[i].high = (resdata[i].high).toFixed(2)
                        // console.log('低', resdata[i].low)
                        // console.log('搞', resdata[i].high)
                        if (resdata[i].amt > 100000000) {
                            resdata[i].amt = (resdata[i].amt / 100000000).toFixed(2) + '亿'
                        } else if (resdata[i].amt > 10000) {
                            resdata[i].amt = (resdata[i].amt / 10000).toFixed(2) + '万'
                        }
                        if (weekk.monthmax - resdata[i].high < 0) {
                            weekk.monthmax = resdata[i].high
                        }
                        if (weekk.monthmin - resdata[i].low > 0) {
                            weekk.monthmin = resdata[i].low
                        }
                        // console.log(weekk.monthmax)
                        // console.log(weekk.monthmin)
                        weekk.monthkData.push([resdata[i].open, resdata[i].price, resdata[i].low, resdata[i].high])
                        weekk.monthkTime.push(resdata[i].time.split(' ')[0])
                        weekk.monthkMa5.push(resdata[i].ma5)
                        weekk.monthkMa10.push(resdata[i].ma10)
                        weekk.monthkMa20.push(resdata[i].ma20)
                        weekk.monthkMa30.push(resdata[i].ma30)
                        weekk.monthkVol.push(resdata[i].vol)
                        weekk.monthkRise.push(resdata[i].rise)
                        weekk.monthkRiseprice.push(resdata[i].risePrice)
                        weekk.monthkturnover.push(resdata[i].turnover)
                        weekk.monthkvolRatio.push(resdata[i].volRatio)
                        weekk.monthkamt.push(resdata[i].amt)
                    }
                    // console.log(weekk.monthmax)
                    // console.log(weekk.monthmin)
                    // weekk.monthmax = weekk.monthmax.toFixed(2)
                    for (var j = 0; j < 50; j++) {
                        weekk.monthava.push(((Number(weekk.monthmax) + Number(weekk.monthmin)) / 2).toFixed(2))
                        weekk.monthavam.push(weekk.monthmax)
                    }
                    // weekk.monthmax = Math.ceil(weekk.monthmax);
                    // weekk.monthmin = Math.floor(weekk.monthmin);
                    // console.log(weekk.monthkTime);
                    // console.log(weekk.monthkData);
                    if (weekk.monthkTime.length < 50) {
                        for (var k = weekk.monthkTime.length; k < 50; k++) {
                            weekk.monthkTime[k] = ''
                        }
                    }
                    if (callback && typeof callback === 'function') {
                            callback()
                        }

                })
        },
        // 分时图数据
        getShare: function (callback) {
            var gi = this
            gi.getUrldata()
            gi.giTime = []
            gi.giPrice = []
            gi.giVol = []
            gi.giRise = []
            gi.giMa = []
            axios({
                    url: 'http://101.231.93.232:14014/indexData/getDFiveTimeShareData',
                    method: 'POST',
                    data: {
                        'stkcode': gi.urlCode,
                        'xdxrType': 'pre',
                        'type': '1day',
                        'time': gi.totalDate,
                        'num': 50
                    }
                })
                .then(function (res) {
                    if (res.data.result.length !== 0) {
                        var resdata = res.data.result
                        // console.log('resdata', resdata);
                        for (var l = 0; l < 240; l++) { // 取昨日收盘价,需要以虚线绘制昨日收盘价的折线
                            gi.giPreClose[l] = resdata[0].preClose
                        };
                        gi.giPriceMaxinum = resdata[resdata.length - 1].maxHigh
                        gi.giPriceMininum = resdata[resdata.length - 1].minLow
                        // console.log(gi.giPriceMaxinum);
                        // console.log(gi.giPriceMininum);
                        for (var i = 0; i < resdata.length; i++) {
                            resdata[i].rise = resdata[i].rise.toFixed(2)
                            resdata[i].risePrice = resdata[i].risePrice.toFixed(2)
                            resdata[i].price = (resdata[i].price).toFixed(2)
                            // resdata[i].rise = (resdata[i].rise).toFixed(2);
                            // resdata[i].risePrice = (resdata[i].risePrice).toFixed(2);
                            gi.giTime.push(resdata[i].time)
                            gi.giPrice.push(resdata[i].price)
                            gi.giMa.push(resdata[i].ma)
                            gi.giVol.push(resdata[i].vol)
                            gi.giRise.push(resdata[i].rise)
                            gi.giRisePrice.push(resdata[i].risePrice)
                        }
                        var maxCut = Math.abs(gi.giPriceMaxinum - resdata[0].preClose)
                        var minCut = Math.abs(gi.giPriceMininum - resdata[0].preClose)
                            // console.log(maxCut);
                            // console.log(minCut);
                        if (maxCut > minCut) {
                            gi.giPriceMax = (resdata[0].preClose + maxCut).toFixed(2)
                            gi.giPriceMin = (resdata[0].preClose - maxCut).toFixed(2)
                            gi.giPriceMaxFloat = (maxCut / resdata[0].preClose * 100).toFixed(2)
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2)
                            // console.log(1111);
                        } else {
                            gi.giPriceMax = (resdata[0].preClose + minCut).toFixed(2)
                            gi.giPriceMin = (resdata[0].preClose - minCut).toFixed(2)
                            gi.giPriceMaxFloat = (minCut / resdata[0].preClose * 100).toFixed(2)
                            gi.giPriceMinFloat = ((-1) * gi.giPriceMaxFloat).toFixed(2)
                            // console.log(2222);
                        }
                        // console.log(gi.giTime);
                        // console.log(gi.giPrice);
                        // console.log(gi.giPriceMax);
                        // console.log(gi.giPriceMin);
                        // console.log( gi.giPreClose);
                        // console.log(gi.giMa);
                        // console.log(gi.giVol);
                        // console.log(gi.giRise);
                        // console.log(gi.giPriceMaxFloat);
                        // console.log(gi.giPriceMinFloat);
                        // console.log(gi.giRisePrice);
                        if (callback && typeof callback === 'function') {
                           callback(gi.giTime, gi.giPrice, gi.giPriceMax, gi.giPriceMin, gi.giPreClose, gi.giMa, gi.giVol, gi.giRise, gi.giPriceMaxFloat, gi.giPriceMinFloat, gi.giRisePrice)
                        }
                    }
                })
        },
        // 分钟图 数据
        getMinutesdata: function (minute, tit, callback) {
            var weekk = this
            weekk.minuteskData = []
            weekk.minuteskTime = []
            weekk.minuteskMa5 = []
            weekk.minuteskMa10 = []
            weekk.minuteskMa20 = []
            weekk.minuteskMa30 = []
            weekk.minuteskVol = []
            weekk.minuteskRise = []
            weekk.minutemax = ''
            weekk.minutemin = ''
            weekk.minuteskRiseprice = []
            weekk.minuteskturnover = []
            weekk.minuteskamt = []
            weekk.minuteskvolRatio = []
            weekk.minuteava = []
            weekk.minuteavam = []
            weekk.getUrldata()
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getKlineData',
                    method: 'POST',
                    data: {
                        'stkcode': weekk.urlCode,
                        'xdxrType': tit,
                        'period': minute,
                        'time': weekk.totalDate,
                        'num': 50
                    }
                })
                .then(function (res) {
                    // console.log("tit类型",weekk.tit);
                    var resdata = res.data.result
                    var reslength = resdata.length
                    weekk.minutereslength = reslength
                    // console.log("分钟图的数据", res);
                    // console.log(weekk.weekkdata);
                    if(reslength === 0){
                        weekk.minutemax = 0
                        weekk.minutemin = 0
                    }else{
                        weekk.minutemax = resdata[0].high
                        weekk.minutemin = resdata[0].low
                    }                  
                    for (var i = 0; i < resdata.length; i++) {
                        // console.log(resdata[i]);
                        // console.log([resdata[i].open,resdata[i].preClose,resdata[i].low,resdata[i].high]);
                        // 开盘，收盘，最低，最高
                        if (resdata[i].ma5 === 0) {
                            resdata[i].ma5 = ''
                        }
                        if (resdata[i].ma10 === 0) {
                            resdata[i].ma10 = ''
                        }
                        if (resdata[i].ma20 === 0) {
                            resdata[i].ma20 = ''
                        }
                        if (resdata[i].ma30 === 0) {
                            resdata[i].ma30 = ''
                        }
                        resdata[i].rise = (resdata[i].rise).toFixed(2)
                        resdata[i].risePrice = (resdata[i].risePrice).toFixed(2)
                        resdata[i].turnover = (resdata[i].turnover).toFixed(2)
                        resdata[i].open = (resdata[i].open).toFixed(2)
                        resdata[i].price = (resdata[i].price).toFixed(2)
                        resdata[i].low = (resdata[i].low).toFixed(2)
                        resdata[i].high = (resdata[i].high).toFixed(2)
                        if (resdata[i].amt > 100000000) {
                            resdata[i].amt = (resdata[i].amt / 100000000).toFixed(2) + '亿'
                        } else if (resdata[i].amt > 10000) {
                            resdata[i].amt = (resdata[i].amt / 10000).toFixed(2) + '万'
                        }
                        resdata[i].volRatio = (resdata[i].volRatio).toFixed(2)
                        if (weekk.minutemax - resdata[i].high < 0) {
                            weekk.minutemax = resdata[i].high
                        }
                        if (weekk.minutemin - resdata[i].low > 0) {
                            weekk.minutemin = resdata[i].low
                        }
                        weekk.minuteskData.push([resdata[i].open, resdata[i].price, resdata[i].low, resdata[i].high])
                        weekk.minuteskTime.push(resdata[i].time.split(' ')[1].slice(0,5))
                        weekk.minuteskMa5.push(resdata[i].ma5)
                        weekk.minuteskMa10.push(resdata[i].ma10)
                        weekk.minuteskMa20.push(resdata[i].ma20)
                        weekk.minuteskMa30.push(resdata[i].ma30)
                        weekk.minuteskVol.push(resdata[i].vol)
                        weekk.minuteskRise.push(resdata[i].rise)
                        weekk.minuteskRiseprice.push(resdata[i].risePrice)
                        weekk.minuteskturnover.push(resdata[i].turnover)
                        weekk.minuteskamt.push(resdata[i].amt)
                        weekk.minuteskvolRatio.push(resdata[i].volRatio)
                    }
                    // weekk.minutemax = weekk.minutemax.toFixed(2)
                    for (var j = 0; j < 50; j++) {
                        weekk.minuteavam.push(weekk.minutemax)
                        weekk.minuteava.push(((Number(weekk.minutemin) + Number(weekk.minutemax)) / 2).toFixed(2))
                    }
                    // weekk.minutemax = Math.ceil(weekk.minutemax);
                    // weekk.minutemin = Math.floor(weekk.minutemin);
                    if (weekk.minuteskTime.length < 50) {
                        for (var k = weekk.minuteskTime.length; k < 50; k++) {
                            weekk.minuteskTime[k] = ''
                        }
                    }
                    if (callback && typeof callback === 'function') {
                            callback()
                        }
                })
        },
        // 五档的信息
        fiveFiels: function () { // 获取五档信息
            var that = this
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getFiveRangeData',
                    method: 'POST',
                    data: {
                        'stkcode': this.urlCode
                    }
                })
                .then(function (res) {
                    // console.log("五档行情1", res)
                    that.FiveRangeData = res.data.result
                    // console.log(res.data.result.length);
                    // 后台返回数据为空的情况下的判断和最大值为0时的判断
                    if (JSON.stringify(res.data.result) !== '{}' && that.FiveRangeData.maxNum !== 0) {
                        that.progress1 = that.FiveRangeData.sellNum1 / that.FiveRangeData.maxNum
                        that.progress2 = that.FiveRangeData.sellNum2 / that.FiveRangeData.maxNum
                        that.progress3 = that.FiveRangeData.sellNum3 / that.FiveRangeData.maxNum
                        that.progress4 = that.FiveRangeData.sellNum4 / that.FiveRangeData.maxNum
                        that.progress5 = that.FiveRangeData.sellNum5 / that.FiveRangeData.maxNum
                        that.progress6 = that.FiveRangeData.buyNum1 / that.FiveRangeData.maxNum
                        that.progress7 = that.FiveRangeData.buyNum2 / that.FiveRangeData.maxNum
                        that.progress8 = that.FiveRangeData.buyNum3 / that.FiveRangeData.maxNum
                        that.progress9 = that.FiveRangeData.buyNum4 / that.FiveRangeData.maxNum
                        that.progress10 = that.FiveRangeData.buyNum5 / that.FiveRangeData.maxNum
                        that.FiveRangeData.sellPrice1 = that.FiveRangeData.sellPrice1.toFixed(2)
                        that.FiveRangeData.sellPrice2 = that.FiveRangeData.sellPrice2.toFixed(2)
                        that.FiveRangeData.sellPrice3 = that.FiveRangeData.sellPrice3.toFixed(2)
                        that.FiveRangeData.sellPrice4 = that.FiveRangeData.sellPrice4.toFixed(2)
                        that.FiveRangeData.sellPrice5 = that.FiveRangeData.sellPrice5.toFixed(2)
                        that.FiveRangeData.buyPrice1 = that.FiveRangeData.buyPrice1.toFixed(2)
                        that.FiveRangeData.buyPrice2 = that.FiveRangeData.buyPrice2.toFixed(2)
                        that.FiveRangeData.buyPrice3 = that.FiveRangeData.buyPrice3.toFixed(2)
                        that.FiveRangeData.buyPrice4 = that.FiveRangeData.buyPrice4.toFixed(2)
                        that.FiveRangeData.buyPrice5 = that.FiveRangeData.buyPrice5.toFixed(2)
                        // 每手100股，所以除以100，并且向下取整数
                        that.FiveRangeData.sellNum1 = Math.floor(that.FiveRangeData.sellNum1 / 100)
                        that.FiveRangeData.sellNum2 = Math.floor(that.FiveRangeData.sellNum2 / 100)
                        that.FiveRangeData.sellNum3 = Math.floor(that.FiveRangeData.sellNum3 / 100)
                        that.FiveRangeData.sellNum4 = Math.floor(that.FiveRangeData.sellNum4 / 100)
                        that.FiveRangeData.sellNum5 = Math.floor(that.FiveRangeData.sellNum5 / 100)
                        that.FiveRangeData.buyNum1 = Math.floor(that.FiveRangeData.buyNum1 / 100)
                        that.FiveRangeData.buyNum2 = Math.floor(that.FiveRangeData.buyNum2 / 100)
                        that.FiveRangeData.buyNum3 = Math.floor(that.FiveRangeData.buyNum3 / 100)
                        that.FiveRangeData.buyNum4 = Math.floor(that.FiveRangeData.buyNum4 / 100)
                        that.FiveRangeData.buyNum5 = Math.floor(that.FiveRangeData.buyNum5 / 100)
                    }
                })
        },
        // 明细的信息
        getParticularsData: function () {
            var that = this
            axios({
                    url: 'http://101.231.93.232:14014/latestData/getParticularsData ',
                    method: 'POST',
                    data: {
                        'stkcode': this.urlCode
                    }
                })
                .then(function (res) {
                    that.ParticularsData = res.data.result
                    // console.log(res.data.result)
                    // console.log("明细1", that.ParticularsData)
                    // console.log(that.ParticularsData.length);
                    // console.log(that.translateTrue);
                    // if( that.ParticularsData.length == 10){
                    if (that.translateTrue === true) {
                        if (that.ParticularsData.length === 10) {
                            that.ParticularsData = that.ParticularsData.slice(1, 10)
                            for (var i = 0; i < that.ParticularsData.length; i++) {
                                that.ParticularsData[i].time = that.ParticularsData[i].time.slice(9, 14)
                                that.ParticularsData[i].price = that.ParticularsData[i].price.toFixed(2)
                                that.ParticularsData[i].transNum = Math.floor(that.ParticularsData[i].transNum / 100)
                            }
                        } else {
                            that.ParticularsData = that.ParticularsData.slice(0, 10)
                            for (var j = 0; j < that.ParticularsData.length; j++) {
                                that.ParticularsData[j].time = that.ParticularsData[j].time.slice(9, 14)
                                that.ParticularsData[j].price = that.ParticularsData[j].price.toFixed(2)
                                that.ParticularsData[j].transNum = Math.floor(that.ParticularsData[j].transNum / 100)
                            }
                        }
                    } else {
                        if (that.ParticularsData.length === 10) {
                            that.ParticularsData = that.ParticularsData.slice(6, 10)
                            for (var k = 0; k < that.ParticularsData.length; k++) {
                                that.ParticularsData[k].time = that.ParticularsData[k].time.slice(9, 14)
                                that.ParticularsData[k].price = that.ParticularsData[k].price.toFixed(2)
                                that.ParticularsData[k].transNum = Math.floor(that.ParticularsData[k].transNum / 100)
                            }
                        } else if (that.ParticularsData.length > 3) {
                            that.ParticularsData = that.ParticularsData.slice(that.ParticularsData.length - 4, that.ParticularsData.length)
                            for (var l = 0; l < that.ParticularsData.length; l++) {
                                that.ParticularsData[l].time = that.ParticularsData[l].time.slice(9, 14)
                                that.ParticularsData[l].price = that.ParticularsData[l].price.toFixed(2)
                                that.ParticularsData[l].transNum = Math.floor(that.ParticularsData[l].transNum / 100)
                            }
                        } else {
                            that.ParticularsData = that.ParticularsData.slice(0, 4)
                            for (var m = 0; m < that.ParticularsData.length; m++) {
                                that.ParticularsData[m].time = that.ParticularsData[m].time.slice(9, 14)
                                that.ParticularsData[m].price = that.ParticularsData[m].price.toFixed(2)
                                that.ParticularsData[m].transNum = Math.floor(that.ParticularsData[m].transNum / 100)
                            }
                        }
                    }
                    // }
                })
                // translateTrue               
        },
        // echart 分时图的制作
        drawEchartShare: function (time, price, max, min, preClose, ma, vol, rise, maxFloat, minFloat, risePrice) {
            // debugger
            // console.log(__DEV__);
            // console.log(this.typeIndex)
            if (this.typeIndex === true) {
                // console.log(1111)
                this.width = document.body.clientWidth
                // console.log(this.width);
                document.getElementById('main').style.width = 0.7 * this.width + 'px'
                document.getElementsByClassName('fiveFiel')[0].style.width = 0.3 * this.width + 'px'
            } else {
                // console.log(2222)
                this.width = document.body.clientWidth
                // console.log(this.width);
                document.getElementById('main').style.width = 1 * this.width + 'px'
                document.getElementsByClassName('fiveFiel')[0].style.width = '0px'
            }
            var myChartGi = echarts.init(document.getElementById('main'))
            // window.onresize = myChartGi.resize;
            // 1106修改start
            // console.log("图已经渲染");
            // console.log(myChartGi);
            preClose = this.giPreClose // 赋值，不重新赋值的情况下图形上的数据会消失
            vol = this.giVol // 赋值，不重新赋值的情况下图形上的数据会消失
            rise = this.giRise // 赋值，不重新赋值的情况下图形上的数据会消失
            time = this.timeArray
            preClose[0] = preClose[0].toFixed(2)
            // console.log(this.baseData);
            var that = this
            // setTimeout(function(){console.log(this.baseData);},1000);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '65%'
                        }
                        // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    },
                    formatter: function (params) {
                        // console.log(that);
                        // console.log("params",params)
                        // console.log(params[0].seriesName);
                        if (params[0].seriesName === '现价') {
                            if (params.length === 6) {
                                // console.log(params[5].value)
                                params[5].value = params[5].value/100
                                if (params[5].value > 100000000) {
                                    params[5].value = (params[5].value/100000000).toFixed(2) + '亿'
                                } else if (params[5].value > 10000) {
                                    params[5].value = (params[5].value/10000).toFixed(2) + '万'
                                } else {
                                    params[5].value = params[5].value.toFixed(0)
                                }
                                // console.log(params[5].value)
                                // console.log(params);
                                // that.baseData[0] = params[0].value;
                                Vue.set(that.baseData, 2, params[3].value)
                                Vue.set(that.baseData, 1, params[4].value)
                                Vue.set(that.baseData, 0, params[0].value)
                                // console.log(params[5].value)
                                var res = '<div style = ' + 'width:100%' + '>时间：' + params[0].axisValue
                                res += '&nbsp;&nbsp;&nbsp;现价：'
                                res += params[0].value
                                // res += '&nbsp;昨收：';
                                // res += params[1].value;
                                // res += '&nbsp;均价：';
                                // res += params[2].value;
                                res += '&nbsp;&nbsp;&nbsp;成交量：'
                                res += params[5].value
                                res += '</div>'
                                return res
                            } else {
                                // return
                            }
                        } else {
                            // console.log("成交量");
                            // console.log("params",params);
                            if (params.length === 6) {
                                params[0].value = params[0].value/100
                                 if (params[0].value > 100000000) {
                                    params[0].value = (params[0].value/100000000).toFixed(2) + '亿'
                                }else if (params[0].value > 10000) {
                                    params[0].value = (params[0].value/10000).toFixed(2) + '万'
                                }
                                // console.log(params);
                                // that.baseData[0] = params[0].value;
                                Vue.set(that.baseData, 2, params[4].value)
                                Vue.set(that.baseData, 1, params[5].value)
                                Vue.set(that.baseData, 0, params[1].value)
                                var result = '<div style = ' + 'width:100%' + '>时间：' + params[0].axisValue
                                result += '&nbsp;&nbsp;&nbsp;现价：'
                                result += params[1].value
                                // res += '&nbsp;昨收：';
                                // res += params[1].value;
                                // res += '&nbsp;均价：';
                                // res += params[2].value;
                                result += '&nbsp;&nbsp;&nbsp;成交量：'
                                result += params[0].value
                                result += '</div>'
                                return result
                            } else {
                                // return
                            }
                        }
                    },

                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid'
                        }
                    }
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    }
                },
                grid: [{
                    left: '1%',
                    right: '0%',
                    top: 0,
                    height: '65%'
                }, {
                    left: '1%',
                    right: '0%',
                    top: '67%',
                    height: '30%'
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
                    axisLabel: {
                        show: false,
                        'interval': 60
                    },
                    axisTick: {
                        show: false
                    },
                    margin: 15,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: '#ccc',
                            width: 0.5
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
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
                            color: '#ccc'
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
                            color: '#ccc'
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
                    transitionDuration: 0,
                    animation: false,
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
                        show: true
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ccc'
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
                        fill: '#ec0000'
                    }
                }, {
                    type: 'text',
                    right: 'right',
                    bottom: '35%',
                    style: {
                        text: minFloat + '%',
                        fill: '#00da3c'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    top: 'top',
                    style: {
                        text: max,
                        fill: '#ec0000'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '35%',
                    style: {
                        text: min,
                        fill: '#00da3c'
                    }
                }, {
                    type: 'text',
                    left: 'left',
                    bottom: '69%',
                    style: {
                        text: preClose[0],
                        fill: '#ccc'
                    }
                }],
                series: [{
                    animation: false,
                    name: '现价',
                    type: 'line',
                    symbol: 'none',
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
                    areaStyle: {
                        smooth: true,
                        type: 'default',
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(36,137,232,0.2)'
                            }, {
                                offset: 1,
                                color: 'rgba(36,137,232,0.05)'
                            }])
                        }
                    }
                }, {
                    animation: false,
                    name: '昨收',
                    type: 'line',
                    symbol: 'none',
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
                    }
                }, {
                    animation: false,
                    name: '均线',
                    type: 'line',
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: ma,
                    lineStyle: {
                        normal: {
                            color: 'rgb(253,152,25)',
                            width: 1
                        }
                    }
                }, {
                    animation: false,
                    name: '振幅数据',
                    type: 'line',
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: rise,
                    itemStyle: {
                        normal: {
                            color: 'white'
                        }
                    }
                }, {
                    animation: false,
                    name: '成交量',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function (vol) {
                                var giColorList = []
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
                }, {
                    animation: false,
                    name: '涨跌数据',
                    type: 'line',
                    stack: '',
                    smooth: true,
                    showSymbol: false,
                    data: risePrice,
                    itemStyle: {
                        normal: {
                            color: 'white'
                        }
                    }
                }]
            }
            this.myChartGi = myChartGi
            this.giOption = option
            myChartGi.setOption(option)
            // console.log(this.typeIndex);
            window.onresize = function () {
                // console.log(that.typeIndex);
                if (that.typeIndex === true) {
                    that.width = document.body.clientWidth
                    // console.log(that.width);
                    document.getElementById('main').style.width = 0.7 * that.width + 'px'
                    document.getElementsByClassName('fiveFiel')[0].style.width = 0.3 * that.width + 'px'
                    myChartGi.resize()
                } else {
                    that.width = document.body.clientWidth
                    // console.log(that.width);
                    document.getElementById('main').style.width = 1 * that.width + 'px'
                    document.getElementsByClassName('fiveFiel')[0].style.width = '0px'
                    myChartGi.resize()
                }
            }
        },
        // echarts 日k图的制作
        drawEchartsdayk: function () {
            // try {
            //     if (__DEV__){
            //     console.warn('')
            // }
            // } catch(e){

            // }
            // console.log(this.daykData)
            // echarts.init(document.getElementById('dayk')).dispose()
            // debugger
            if (this.mychartDay != null && this.mychartDay != "" && this.mychartDay != undefined) {
                    this.mychartDay.dispose()
            }
            this.width = document.body.clientWidth
            document.getElementById('dayk').style.width = this.width + 'px'
            // document.getElementById('dayk').style.height = '20rem'
            // console.log(document.getElementById('dayk').style.width)
            // console.log(document.getElementById('dayk').style.height)
            var myChartweekk1 = echarts.init(document.getElementById('dayk'))
            var that = this
            var vol = that.daykVol
            var option2 = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '0%'
                        }
                        // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    },
                    formatter: function (params) {
                        // console.log(params[0].seriesName);
                        if (params[0].seriesName === '日K') {
                            // console.log(params);
                            // console.log(params[0].value[2]);
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[0].value[2])
                                Vue.set(that.baseData, 3, params[0].value[1])
                                Vue.set(that.baseData, 4, params[0].value[4])
                                Vue.set(that.baseData, 7, params[0].value[3])
                                Vue.set(that.baseData, 2, params[5].value)
                                Vue.set(that.baseData, 1, params[6].value)
                                Vue.set(that.baseData, 6, params[7].value)
                                Vue.set(that.baseData, 5, params[8].value)
                                Vue.set(that.baseData, 8, params[9].value)
                                var res = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;font-size:5px;' + '>'
                                res += '&nbsp;<span>MA5:'
                                res += params[1].value || '--'
                                res += '</span>&nbsp;<span>10:'
                                res += params[2].value || '--'
                                res += '</span>&nbsp;<span>20:'
                                res += params[3].value || '--'
                                res += '</span>&nbsp;<span>30:'
                                res += params[4].value || '--'
                                res += '</span></div>'
                                return res
                            } else {
                                // return
                            }
                        } else {
                            // console.log(params);
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[1].value[2])
                                Vue.set(that.baseData, 3, params[1].value[1])
                                Vue.set(that.baseData, 4, params[1].value[4])
                                Vue.set(that.baseData, 7, params[1].value[3])
                                Vue.set(that.baseData, 2, params[6].value)
                                Vue.set(that.baseData, 1, params[7].value)
                                Vue.set(that.baseData, 6, params[8].value)
                                Vue.set(that.baseData, 5, params[9].value)
                                Vue.set(that.baseData, 8, params[10].value)
                                var result = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;font-size:5px;' + '>'
                                result += '&nbsp;<span>MA5:'
                                result += params[2].value || '--'
                                result += '</span>&nbsp;<span>10:'
                                result += params[3].value || '--'
                                result += '</span>&nbsp;<span>20:'
                                result += params[4].value || '--'
                                result += '</span>&nbsp;<span>30:'
                                result += params[5].value || '--'
                                result += '</span></div>'
                                return result
                            } else {
                                // return
                            }
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid',
                            showSymbol: false
                        }
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: 'all'
                    }]
                },
                legend: {
                    data: [{
                        name: 'ma5',
                        icon: 'line'
                    }, {
                        name: 'ma10',
                        icon: 'line'
                    }, {
                        name: 'ma20',
                        icon: 'line'
                    }, {
                        name: 'ma30',
                        icon: 'line'
                    }],
                    left: '0'
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: '12%',
                    height: '63%'
                }, {
                    left: '1%',
                    right: '1%',
                    top: '80%',
                    height: '20%'
                }],
                xAxis: [{
                    // show: false,
                    type: 'category',
                    data: that.daykTime,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        // rotate: 5, //刻度旋转45度角
                        // right: 5,
                        // show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                }, {
                    // show: true,
                    type: 'category',
                    data: that.daykTime,
                    gridIndex: 1,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    // type: 'category',
                    show: true,
                    scale: true,
                    splitNumber: 4,
                     splitLine: {
                        show: false
                    },
                    // minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        inside: true,
                        formatter: '{value}\n'
                    },
                    // max: maxy,
                    // min:miny,
                    max: that.daymax,
                    min: that.daymin
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        show: false
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
                    left: '2%',
                    top: '13%',
                    style: {
                        text: that.daymax,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '71%',
                    style: {
                        text: that.daymin,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '44%',
                    style: {
                        text: that.dayava[0],
                        fill: '#ccc'
                    }
                }],
                series: [{
                    animation: false,
                    type: 'candlestick',
                    name: '日K',
                    barWidth: 5,
                    data: that.daykData,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma5',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykMa5,
                    itemStyle: {
                        normal: {
                            // color: "white",
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#62b0fa'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma10',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykMa10,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#a1a3a5'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma20',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykMa20,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#f6b769'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma30',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykMa30,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fb756b'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'rise',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykRise,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'daykRiseprice',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykRiseprice,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'daykamt',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykamt,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'daykturnover',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykturnover,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'daykvolRatio',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.daykvolRatio,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'dayava',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.dayava,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'dayavam',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.dayavam,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'Volume',
                    type: 'bar',
                    barWidth: 5,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function (vol) {
                                var giColorList = []
                                for (var i = 0; i < that.daykRise.length; i++) {
                                    if (that.daykRise[i] > 0) {
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
            }
            myChartweekk1.setOption(option2)
            // mychartDay: '', //日k图的实例化对象
            // dayOption: '', //日k图option
            that.mychartDay = myChartweekk1
            that.dayOption = option2
            window.onresize = function () {
                this.width = document.body.clientWidth
                document.getElementById('dayk').style.width = this.width + 'px'
                myChartweekk1.resize()
            }
        },
        // echarts 周k图的制作
        drawEchartsweekk: function () {
            if (this.mychartWeek != null && this.mychartWeek != "" && this.mychartWeek != undefined) {
                    this.mychartWeek.dispose()
            }
            this.width = document.body.clientWidth
            document.getElementById('weekk').style.width = this.width + 'px'
            var myChartweekk = echarts.init(document.getElementById('weekk'))
            var that = this
            var vol = that.weekkVol
            var option2 = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                            top: '0%'
                        }
                        // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    },
                    formatter: function (params) {
                        // console.log("params",params);
                        // console.log(params[0].seriesName == "周K");
                        if (params[0].seriesName === '周K') {
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[0].value[2])
                                Vue.set(that.baseData, 3, params[0].value[1])
                                Vue.set(that.baseData, 4, params[0].value[4])
                                Vue.set(that.baseData, 7, params[0].value[3])
                                Vue.set(that.baseData, 1, params[5].value)
                                Vue.set(that.baseData, 2, params[6].value)
                                Vue.set(that.baseData, 5, params[7].value)
                                Vue.set(that.baseData, 6, params[8].value)
                                Vue.set(that.baseData, 8, params[9].value)
                                var res = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                res += '&nbsp;<span>MA5:'
                                res += params[1].value || '--'
                                res += '</span>&nbsp;<span>10:'
                                res += params[2].value || '--'
                                res += '</span>&nbsp;<span>20:'
                                res += params[3].value || '--'
                                res += '</span>&nbsp;<span>30:'
                                res += params[4].value || '--'
                                res += '</span></div>'
                                return res
                            } else {
                                // return
                            }
                        } else {
                            // console.log(params);
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[1].value[2])
                                Vue.set(that.baseData, 3, params[1].value[1])
                                Vue.set(that.baseData, 4, params[1].value[4])
                                Vue.set(that.baseData, 7, params[1].value[3])
                                Vue.set(that.baseData, 1, params[6].value)
                                Vue.set(that.baseData, 2, params[7].value)
                                Vue.set(that.baseData, 5, params[8].value)
                                Vue.set(that.baseData, 6, params[9].value)
                                Vue.set(that.baseData, 8, params[10].value)
                                var result = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                result += '&nbsp;<span>MA5:'
                                result += params[2].value || '--'
                                result += '</span>&nbsp;<span>10:'
                                result += params[3].value || '--'
                                result += '</span>&nbsp;<span>20:'
                                result += params[4].value || '--'
                                result += '</span>&nbsp;<span>30:'
                                result += params[5].value || '--'
                                result += '</span></div>'
                                return result
                            } else {
                                // return
                            }
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid',
                            showSymbol: false
                        }
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: 'all'
                    }]
                },
                legend: {
                    data: [{
                        name: 'ma5',
                        icon: 'line'
                    }, {
                        name: 'ma10',
                        icon: 'line'
                    }, {
                        name: 'ma20',
                        icon: 'line'
                    }, {
                        name: 'ma30',
                        icon: 'line'
                    }],
                    left: '0'
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: '12%',
                    height: '63%'
                }, {
                    left: '1%',
                    right: '1%',
                    top: '80%',
                    height: '20%'
                }],
                xAxis: [{
                    // show: false,
                    type: 'category',
                    data: that.weekkTime,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        // rotate: 5, //刻度旋转45度角
                        // right: 5,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                }, {
                    // show: true,
                    type: 'category',
                    data: that.weekkTime,
                    gridIndex: 1,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    show: true,
                    scale: true,
                    splitNumber: 2,
                    // minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        inside: true,
                        formatter: '{value}\n'
                    },
                    max: that.weekmax,
                    min: that.weekmin,
                    transitionDuration: 0,
                    animation: false
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        show: false
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
                    left: '2%',
                    top: '13%',
                    style: {
                        text: that.weekmax,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '71%',
                    style: {
                        text: that.weekmin,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '44%',
                    style: {
                        text: that.weekava[0],
                        fill: '#ccc'
                    }
                }],
                series: [{
                    animation: false,
                    type: 'candlestick',
                    name: '周K',
                    barWidth: 5,
                    data: that.weekkdata,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma5',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkMa5,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#62b0fa'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma10',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkMa10,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#a1a3a5'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma20',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkMa20,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#f6b769'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma30',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkMa30,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fb756b'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekkRiseprice',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkRiseprice,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekkRise',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkRise,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekkturnover',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkturnover,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekkamt',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkamt,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekkvolRatio',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekkvolRatio,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekava',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekava,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'weekavam',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.weekavam,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'Volume',
                    type: 'bar',
                    barWidth: 5,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function (vol) {
                                var giColorList = []
                                for (var i = 0; i < that.weekkRise.length; i++) {
                                    if (that.weekkRise[i] > 0) {
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
            }
            myChartweekk.setOption(option2)
                // mychartWeek: '', //周k图的实例化对象
                // weekOption: '', //周k图option
            that.mychartWeek = myChartweekk
            that.weekOption = option2
            window.onresize = function () {
                this.width = document.body.clientWidth
                document.getElementById('weekk').style.width = this.width + 'px'
                myChartweekk.resize()
            }
        },
        // echarts 月k图的制作
        drawEchartsmonthk: function () {
            if (this.mychartMonth != null && this.mychartMonth != "" && this.mychartMonth != undefined) {
                    this.mychartMonth.dispose()
            }
            this.width = document.body.clientWidth
            document.getElementById('mouthsk').style.width = this.width + 'px'
            var myChartweekk = echarts.init(document.getElementById('mouthsk'))
                // console.log(time);
            var that = this
            var vol = that.monthkVol
            var option2 = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                                top: '0%'
                            }
                            // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    },
                    formatter: function (params) {
                        // console.log("params",params)
                        // console.log(params[0].seriesName);
                        if (params[0].seriesName === '月K') {
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[0].value[2])
                                Vue.set(that.baseData, 3, params[0].value[1])
                                Vue.set(that.baseData, 4, params[0].value[4])
                                Vue.set(that.baseData, 7, params[0].value[3])
                                Vue.set(that.baseData, 1, params[5].value)
                                Vue.set(that.baseData, 2, params[6].value)
                                Vue.set(that.baseData, 5, params[7].value)
                                Vue.set(that.baseData, 6, params[8].value)
                                Vue.set(that.baseData, 8, params[9].value)
                                var res = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                res += '&nbsp;<span>MA5:'
                                res += params[1].value || '--'
                                res += '</span>&nbsp;<span>10:'
                                res += params[2].value || '--'
                                res += '</span>&nbsp;<span>20:'
                                res += params[3].value || '--'
                                res += '</span>&nbsp;<span>30:'
                                res += params[4].value || '--'
                                res += '</span></div>'
                                return res
                            } else {
                                // return
                            }
                        } else {
                            // console.log(params);
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[1].value[2])
                                Vue.set(that.baseData, 3, params[1].value[1])
                                Vue.set(that.baseData, 4, params[1].value[4])
                                Vue.set(that.baseData, 7, params[1].value[3])
                                Vue.set(that.baseData, 1, params[6].value)
                                Vue.set(that.baseData, 2, params[7].value)
                                Vue.set(that.baseData, 5, params[8].value)
                                Vue.set(that.baseData, 6, params[9].value)
                                Vue.set(that.baseData, 8, params[10].value)
                                var result = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                result += '&nbsp;<span>MA5：'
                                result += params[2].value || '--'
                                result += '</span>&nbsp;<span>10:'
                                result += params[3].value || '--'
                                result += '</span>&nbsp;<span>20:'
                                result += params[4].value || '--'
                                result += '</span>&nbsp;<span>30:'
                                result += params[5].value || '--'
                                result += '</span></div>'
                                return result
                            } else {
                                // return
                            }
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid',
                            showSymbol: false
                        }
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: 'all'
                    }]
                },
                legend: {
                    data: [{
                        name: 'ma5',
                        icon: 'line'
                    }, {
                        name: 'ma10',
                        icon: 'line'
                    }, {
                        name: 'ma20',
                        icon: 'line'
                    }, {
                        name: 'ma30',
                        icon: 'line'
                    }],
                    left: '0'

                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: '12%',
                    height: '63%'
                }, {
                    left: '1%',
                    right: '1%',
                    top: '80%',
                    height: '20%'
                }],
                xAxis: [{
                    type: 'category',
                    data: that.monthkTime,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                }, {
                    // show: true,
                    type: 'category',
                    data: that.monthkTime,
                    gridIndex: 1,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                graphic: [{
                    type: 'text',
                    left: '2%',
                    top: '13%',
                    style: {
                        text: that.monthmax,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '71%',
                    style: {
                        text: that.monthmin,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '44%',
                    style: {
                        text: that.monthava[0],
                        fill: '#ccc'
                    }
                }],
                yAxis: [{
                    show: true,
                    scale: true,
                    splitNumber: 2,
                    // minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        inside: true,
                        formatter: '{value}\n'
                    },
                    max: that.monthmax,
                    min: that.monthmin,
                    transitionDuration: 0,
                    animation: false
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLine: {
                        lineStyle: {
                            show: false,
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        show: false
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
                series: [{
                    animation: false,
                    type: 'candlestick',
                    name: '月K',
                    barWidth: 5,
                    data: that.monthkData,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma5',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkMa5,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#62b0fa'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma10',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkMa10,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#a1a3a5'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma20',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkMa20,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#f6b769'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma30',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkMa30,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fb756b'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthkRiseprice',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkRiseprice,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthkRise',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkRise,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthkturnover',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkturnover,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthkamt',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkamt,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthkvolRatio',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthkvolRatio,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthava',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthava,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'monthavam',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.monthavam,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'Volume',
                    type: 'bar',
                    barWidth: 5,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function (vol) {
                                var giColorList = []
                                for (var i = 0; i < that.monthkRise.length; i++) {
                                    if (that.monthkRise[i] > 0) {
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
            }
            myChartweekk.setOption(option2)
                // mychartMonth: '', //月k图的实例化对象
                // monthOption: '', //月k图option
            that.mychartMonth = myChartweekk
            that.monthOption = option2
            window.onresize = function () {
                this.width = document.body.clientWidth
                document.getElementById('mouthsk').style.width = this.width + 'px'
                myChartweekk.resize()
            }
        },
        // echarts 分钟图的制作
        drawEchartsminutesk: function () {
            if (this.mychartMinute != null && this.mychartMinute != "" && this.mychartMinute != undefined) {
                    this.mychartMinute.dispose()
            }
            this.width = document.body.clientWidth
            document.getElementById('minutesk').style.width = this.width + 'px'
            var myChartweekk = echarts.init(document.getElementById('minutesk'))
            var that = this
            var vol = that.minuteskVol
            var option2 = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        fontWeight: 'lighter',
                        fontSize: 10,
                        color: '#8c8989'
                    },
                    transitionDuration: 0,
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {
                                top: '0%'
                            }
                            // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    },
                    formatter: function (params) {
                        // console.log("params",params)
                        // console.log(params[0].seriesName);
                        if (params[0].seriesName === '分钟K') {
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[0].value[2])
                                Vue.set(that.baseData, 3, params[0].value[1])
                                Vue.set(that.baseData, 4, params[0].value[4])
                                Vue.set(that.baseData, 7, params[0].value[3])
                                Vue.set(that.baseData, 1, params[5].value)
                                Vue.set(that.baseData, 2, params[6].value)
                                Vue.set(that.baseData, 5, params[7].value)
                                Vue.set(that.baseData, 6, params[8].value)
                                Vue.set(that.baseData, 8, params[9].value)
                                var res = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                res += '&nbsp;<span>MA5:'
                                res += params[1].value || '--'
                                res += '</span>&nbsp;<span>10:'
                                res += params[2].value || '--'
                                res += '</span>&nbsp;<span>20:'
                                res += params[3].value || '--'
                                res += '</span>&nbsp;<span>30:'
                                res += params[4].value || '--'
                                res += '</span></div>'
                                return res
                            } else {
                                // return
                            }
                        } else {
                            // console.log(params);
                            if (params.length === 13) {
                                Vue.set(that.baseData, 0, params[1].value[2])
                                Vue.set(that.baseData, 3, params[1].value[1])
                                Vue.set(that.baseData, 4, params[1].value[4])
                                Vue.set(that.baseData, 7, params[1].value[3])
                                Vue.set(that.baseData, 1, params[6].value)
                                Vue.set(that.baseData, 2, params[7].value)
                                Vue.set(that.baseData, 5, params[8].value)
                                Vue.set(that.baseData, 6, params[9].value)
                                Vue.set(that.baseData, 8, params[10].value)
                                var result = '<div style = ' + 'width:100%;height:1.5rem;line-height:1.5rem;' + '>'
                                result += '&nbsp;<span>MA5:'
                                result += params[2].value || '--'
                                result += '</span>&nbsp;<span>10:'
                                result += params[3].value || '--'
                                result += '</span>&nbsp;<span>20:'
                                result += params[4].value || '--'
                                result += '</span>&nbsp;<span>30:'
                                result += params[5].value || '--'
                                result += '</span></div>'
                                return result
                            } else {
                                // return
                            }
                        }
                    },
                    axisPointer: {
                        type: 'cross',
                        snap: true,
                        crossStyle: {
                            type: 'solid',
                            showSymbol: false
                        }
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: 'all'
                    }]
                },
                legend: {
                    data: [{
                        name: 'ma5',
                        icon: 'line'
                    }, {
                        name: 'ma10',
                        icon: 'line'
                    }, {
                        name: 'ma20',
                        icon: 'line'
                    }, {
                        name: 'ma30',
                        icon: 'line'
                    }],
                    left: '0'
                },
                grid: [{
                    left: '1%',
                    right: '1%',
                    top: '12%',
                    height: '63%'
                }, {
                    left: '1%',
                    right: '1%',
                    top: '80%',
                    height: '20%'
                }],
                xAxis: [{
                    // show: false,
                    type: 'category',
                    data: that.minuteskTime,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        // rotate: 5, // 刻度旋转45度角
                        // right: 5,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                }, {
                    // show: true,
                    type: 'category',
                    data: that.minuteskTime,
                    gridIndex: 1,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisPointer: {
                        label: {
                            show: false
                        }
                    }
                }],
                yAxis: [{
                    show: true,
                    scale: true,
                    splitNumber: 2,
                    // minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        inside: true,
                        formatter: '{value}\n'
                    },
                    max: that.minutemax,
                    min: that.minutemin,
                    transitionDuration: 0,
                    animation: false
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        show: false
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
                    left: '2%',
                    top: '13%',
                    style: {
                        text: that.minutemax,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '71%',
                    style: {
                        text: that.minutemin,
                        fill: '#ccc'
                    }
                }, {
                    type: 'text',
                    left: '2%',
                    top: '44%',
                    style: {
                        text: that.minuteava[0],
                        fill: '#ccc'
                    }
                }],
                series: [{
                    animation: false,
                    type: 'candlestick',
                    name: '分钟K',
                    barWidth: 5,
                    data: that.minuteskData,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma5',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskMa5,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#62b0fa'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma10',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskMa10,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#a1a3a5'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma20',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskMa20,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#f6b769'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'ma30',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskMa30,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fb756b'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteskRiseprice',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskRiseprice,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteskRise',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskRise,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteskturnover',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskturnover,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteskamt',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskamt,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteskvolRatio',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteskvolRatio,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#fff'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteavam',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteavam,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'minuteava',
                    type: 'line',
                    showSymbol: false,
                    symbol: 'none',
                    data: that.minuteava,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1, // 折线宽度
                                color: '#ccc'
                            }
                        }
                    }
                }, {
                    animation: false,
                    name: 'Volume',
                    type: 'bar',
                    barWidth: 5,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: vol,
                    itemStyle: {
                        normal: {
                            color: function (vol) {
                                var giColorList = []
                                for (var i = 0; i < that.minuteskRise.length; i++) {
                                    if (that.minuteskRise[i] > 0) {
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
            }
            myChartweekk.setOption(option2)
                // mychartMinute: '', //分钟k图的实例化对象
                // minuteOption: '', //分钟k图option
            that.mychartMinute = myChartweekk
            that.minuteOption = option2
            window.onresize = function () {
                this.width = document.body.clientWidth
                document.getElementById('minutesk').style.width = this.width + 'px'
                myChartweekk.resize()
            }
        },
        cutDown: function () { // 判断添加自选股还是删除自选股
            // console.log("详情页的股票代码", this.urlCode);
            // console.log(this.selfStock);
            if (this.selfStock) {
                for (var i = 0; i < this.selfStock.length; i++) {
                    if (this.selfStock[i].stkcode === this.urlCode) {
                        this.isShow = true
                        continue
                    }
                }
            }
        },
        addStock: function () { // 添加自选股
            var addStock = {}
            addStock.stkcode = this.urlCode
            addStock.type = true
            addStock.code = this.urlCode.slice(2)
            addStock.name = this.urlName
            this.selfStock.unshift(addStock)
            localStorage.setItem('selfStock', JSON.stringify(this.selfStock))
                // console.log(this.selfStock);
            this.isShow = !this.isShow
            this.$toast({
                message: '添加成功',
                // iconClass: 'icon icon-success',
                duration: 1000
            })
        },
        deleteStock: function () { // 删除自选股
            for (var i = 0; i < this.selfStock.length; i++) {
                if (this.selfStock[i].stkcode === this.urlCode) {
                    this.selfStock.splice(i, 1)
                }
                localStorage.setItem('selfStock', JSON.stringify(this.selfStock))
            }
            // console.log(this.selfStock);
            this.isShow = !this.isShow
            this.$toast({
                message: '删除成功',
                // iconClass: 'icon icon-success',
                duration: 1000
            })
        },
        toDetail: function (urlCode, name) {
            this.$router.push({
                path: '/particularsMore/stkCode=' + urlCode + '&stkName=' + name
            })
            // location.hash = '/views/ParticularsMore/stkCode=' + urlCode + '&stkName=' + name
        }
    },
    components: {
        headerBack
    }
}
</script>
<style>
.stocksDetails .clearfix:after {
    content: "";
    display: block;
    clear: both;
}

.stocksDetails .clearfix {
    zoom: 1;
}

.stocksDetails .stocksDetails {
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
.stocksDetails {
    padding-top: 2.5rem;
}

.stocksDetails .message {
    height: 4.6875rem;
    background-color: #fff;
    padding-left: 0.2rem;
}

.stocksDetails .message ul>li {
    float: left;
}

.stocksDetails .message ul>li:nth-child(1) {
    width: 31%;
    height: 4.6875rem;
}

.stocksDetails .message ul>li:nth-child(1) span:nth-child(1) {
    font-size: 1.5rem;
    font-weight: 500;
    display: block;
    text-align: left;
    height: 3rem;
    line-height: 3rem;
}

.stocksDetails .message ul>li:nth-child(1) span:nth-child(2),
.stocksDetails .message ul>li:nth-child(1) span:nth-child(3) {
    font-size: 0.8125rem;
}

.stocksDetails .message ul>li:nth-child(n+2) {
    height: 2.3rem;
    line-height: 2.3rem;
    width: 21%;
    display: inline-block;
    font-size: 0.8125rem;
    color: #505050;
}

.stocksDetails .message ul>li:nth-child(n+2) span:nth-child(1) {
    margin-right: 0.05rem;
}

.stocksDetails .message ul>li:nth-child(2),
.stocksDetails .message ul>li:nth-child(5) {
    width: 25%;
}

.stocksDetails .message ul>li:nth-child(4),
.stocksDetails .message ul>li:nth-child(7) {
    width: 23%;
}


/*更多基本信息样式*/

.stocksDetails .message-more {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    background: #fff;
    position: absolute;
    z-index: 4;
    width: 100%;
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
    color: #505050;
    letter-spacing: 0.26px;
    padding-left: 0.625rem;
    padding-top: 0.6rem;
    margin-top: 0.2rem;
}

.stocksDetails .message-more li div {
    height: 1.2rem;
    border-right: 1px solid #ececec;
}

.stocksDetails .message-more li:nth-child(4n) div {
    border-right: none;
}

.stocksDetails .click-show {
    height: 1.5rem;
    background-color: #fff;
    margin-top: 0.8rem;
}

.stocksDetails .click-show div {
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%);
}

.stocksDetails .click-more {
    height: 1rem;
    background-color: #fff;
}

.stocksDetails .click-more div {
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
    height: 8.75rem;
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
}

.stocksDetails .WDMX .wd-sell ul li span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 8.3rem;
    width: 2rem;
}

.stocksDetails .WDMX .wd-sell ul li .yd-progressbar {
    position: absolute;
    top: 0;
    left: 4rem;
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
}

.stocksDetails .WDMX .wd-buy ul li span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 8.3rem;
    width: 2rem;
}

.stocksDetails .WDMX .wd-buy ul li .yd-progressbar {
    position: absolute;
    top: 0;
    left: 4rem;
}


/*明细的样式*/

.stocksDetails .WDMX .mingxi ul li {
    width: 50%;
    font-size: 0.75rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-family: PingFangSC-Regular;
    color: #707070;
    letter-spacing: 0.02px;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(1),
.stocksDetails .WDMX .mingxi ul li:nth-child(2),
.stocksDetails .WDMX .mingxi ul li:nth-child(3),
.stocksDetails .WDMX .mingxi ul li:nth-child(4),
.stocksDetails .WDMX .mingxi ul li:nth-child(5) {
    position: absolute;
    left: 0;
    padding-left: 0.8rem;
    border-right: 1px solid #ececec;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(6),
.stocksDetails .WDMX .mingxi ul li:nth-child(7),
.stocksDetails .WDMX .mingxi ul li:nth-child(8),
.stocksDetails .WDMX .mingxi ul li:nth-child(9),
.stocksDetails .WDMX .mingxi ul li:nth-child(10) {
    position: absolute;
    right: 0;
    padding-left: 0.8rem;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(1),
.stocksDetails .WDMX .mingxi ul li:nth-child(6) {
    top: 0.9375rem;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(2),
.stocksDetails .WDMX .mingxi ul li:nth-child(7) {
    top: 2.4375rem;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(3),
.stocksDetails .WDMX .mingxi ul li:nth-child(8) {
    top: 3.9375rem;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(4),
.stocksDetails .WDMX .mingxi ul li:nth-child(9) {
    top: 5.4375rem;
}

.stocksDetails .WDMX .mingxi ul li:nth-child(5),
.stocksDetails .WDMX .mingxi ul li:nth-child(10) {
    top: 6.9375rem;
}

.stocksDetails .WDMX .mingxi ul li span {
    display: inline-block;
}

.stocksDetails .WDMX .mingxi ul li span:nth-child(1) {
    width: 30%;
}

.stocksDetails .WDMX .mingxi ul li span:nth-child(2) {
    width: 45%;
}

.stocksDetails .transNum {
    text-align: right;
}

.stocksDetails .stockMack {
    position: absolute;
    bottom: 0;
    height: 31.5rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    top: 11rem;
}

.stocksDetails .mingxiTransNum {
    width: 2rem;
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
    height: 22.6rem;
    background-color: #fff;
}

.stocksDetails .echarts .minutep {
    width: 3.5rem;
    height: 2rem;
    display: inherit;
    position: absolute;
    /* left: 2rem; */
    right: 5%;
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
    background-size: 12%;
    background-repeat: no-repeat;
    background-position: 85% 50%;
}

.stocksDetails .echarts-header .mint-tab-item-label {
    padding: 0;
    height: 2.1875rem;
    line-height: 2.1875rem;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    letter-spacing: 0.23px;
    display: inline-block;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
    border-bottom: 2px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
    width: 75%;
}

.stocksDetails .echarts-header .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #26a2ff;
}


/*辨别升降颜色的区分样式*/

.stocksDetails .risered {
    color: #FF363F;
}

.stocksDetails .downgreen {
    color: #1CCE18;
}


/*日k图的样式*/

.stocksDetails .mint-header {
    height: 2.5rem;
}

.stocksDetails #dayk div:nth-child(1) {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}

.stocksDetails #dayk div:nth-child(2) {
    width: 85%;
    z-index: 2!important;
}

.stocksDetails #dayk div:nth-child(2) span {
    /*padding-right: 0.7rem;*/
    font-size: 0.6rem;
    display: inline-block;
}

.stocksDetails #weekk div:nth-child(2) {
    width: 85%;
    z-index: 2!important;
}

.stocksDetails #mouthsk div:nth-child(2) {
    width: 85%;
    z-index: 2!important;
}

.stocksDetails #minutesk div:nth-child(2) {
    width: 85%;
    z-index: 2!important;
}

.stocksDetails #dayk div:nth-child(2) div span:nth-child(1) {
    color: #62b0fa;
}

.stocksDetails #dayk div:nth-child(2) div span:nth-child(2) {
    color: #a1a3a5;
}

.stocksDetails #dayk div:nth-child(2) div span:nth-child(3) {
    color: #f6b769;
}

.stocksDetails #dayk div:nth-child(2) div span:nth-child(4) {
    color: #fb756b;
}

.stocksDetails #dayk canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}


/*周k*/

.stocksDetails #weekk div:nth-child(1) {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}

.stocksDetails #weekk div:nth-child(2) span {
    /*padding-right: 0.7rem;*/
    font-size: 0.6rem;
    display: inline-block;
}

.stocksDetails #weekk div:nth-child(2) div span:nth-child(1) {
    color: #62b0fa;
}

.stocksDetails #weekk div:nth-child(2) div span:nth-child(2) {
    color: #a1a3a5;
}

.stocksDetails #weekk div:nth-child(2) div span:nth-child(3) {
    color: #f6b769;
}

.stocksDetails #weekk div:nth-child(2) div span:nth-child(4) {
    color: #fb756b;
}

.stocksDetails #weekk canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}


/*月k*/


/*mouthsk*/

.stocksDetails #mouthsk div:nth-child(1) {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}

.stocksDetails #mouthsk div:nth-child(2) span {
    /*padding-right: 0.7rem;*/
    font-size: 0.6rem;
    display: inline-block;
}

.stocksDetails #mouthsk div:nth-child(2) div span:nth-child(1) {
    color: #62b0fa;
}

.stocksDetails #mouthsk div:nth-child(2) div span:nth-child(2) {
    color: #a1a3a5;
}

.stocksDetails #mouthsk div:nth-child(2) div span:nth-child(3) {
    color: #f6b769;
}

.stocksDetails #mouthsk div:nth-child(2) div span:nth-child(4) {
    color: #fb756b;
}

.stocksDetails #mouthsk canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}


/*分钟k*/


/*minutesk*/

.stocksDetails #minutesk div:nth-child(1) {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}

.stocksDetails #minutesk div:nth-child(2) span {
    /*padding-right: 0.7rem;*/
    font-size: 0.6rem;
    display: inline-block;
}

.stocksDetails #minutesk div:nth-child(2) div span:nth-child(1) {
    color: #62b0fa;
}

.stocksDetails #minutesk div:nth-child(2) div span:nth-child(2) {
    color: #a1a3a5;
}

.stocksDetails #minutesk div:nth-child(2) div span:nth-child(3) {
    color: #f6b769;
}

.stocksDetails #minutesk div:nth-child(2) div span:nth-child(4) {
    color: #fb756b;
}

.stocksDetails #minutesk canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}

.stocksDetails .add_icon {
    display: inline-block;
    width: 0.90625rem;
    height: 0.90625rem;
    /*background: url("../assets/icon_addto.svg");*/
    background-repeat: no-repeat;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 0.375rem;
}

.stocksDetails .del_icon {
    display: inline-block;
    width: 0.90625rem;
    height: 0.90625rem;
    /*background: url("../assets/icon-addto.svg");*/
    background-repeat: no-repeat;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 0.375rem;
}

.stocksDetails .color_red {
    color: #FF363F;
}

.stocksDetails .color_green {
    color: #1CCE18;
}

.stocksDetails .yd-progressbar>svg {
    width: 60%;
}


/*五档明细的样式 张树杰*/

.stocksDetails .fiveFiel {
    border-left: 1px solid #ececec;
}

.stocksDetails .fiveFiel ul li {
    width: 100%;
    padding-top: 0.4rem;
    padding-left: 0.3rem;
    height: 1.28rem;
    font-size: 0.6rem;
    color: #505050;
}

.stocksDetails .fiveFiel ul li span {
    width: 30%;
    display: inline-block;
}

.stocksDetails .ff-sell,
.stocksDetails .ff-buy {
    border-bottom: 1px solid #ececec;
    padding-bottom: 0.4rem;
}

.stocksDetails .ff-more {
    text-align: center;
    border-top: 1px solid #ececec;
    font-size: 0.6rem;
    padding-top: 0.1rem;
    color: #2489e8;
}

.stocksDetails .dealTime {
    text-align: center;
    padding-top: 0.2rem;
}

.stocksDetails .dealTime span:nth-child(1) {
    font-size: 0.75rem;
}

.stocksDetails .dealTime-up {
    background: url("../assets/detail_down.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 85% 80%;
    height: 0.6rem;
    width: 0.6rem;
    display: inline-block;
    margin-left: 0.2rem;
}

.dealTime-down {
    background: url("../assets/detail_up.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 85% 80%;
    height: 0.6rem;
    width: 0.6rem;
    display: inline-block;
    margin-left: 0.2rem;
    color: red;
}

.stocksDetails .translate-up {
    transform: translateY(0rem);
}

.stocksDetails .translate-down {
    transform: translateY(0rem);
}

.stocksDetails #main div:nth-child(2) {
    width: 100%;
    z-index: 2!important;
}


/*复权不复权的样式*/

.stocksDetails .authority {
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
    background: #62B0FA;
    color: #fff;
    border-radius: 4px;
    padding: 0.1rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    font-size: 0.5rem;
    height: 1.2rem;
    line-height: 1.2rem;
}
</style>
