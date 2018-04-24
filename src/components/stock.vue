<template>
    <div class="stock">
        <myheader :title="title"></myheader>
        <mt-navbar v-model="selected" class="tab" fixed>
            <mt-tab-item id="zs">指数</mt-tab-item>
            <mt-tab-item id="hs">沪深</mt-tab-item>
            <mt-tab-item id="bk">板块</mt-tab-item>
            <mt-tab-item id="qt">其他</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="zs">
                <div class="zs ">
                    <div class="zs_top clearfix">
                        <span>指数</span>
                        <a href="">
                            <span></span>
                        </a>
                    </div>
                    <!-- <div class="line"></div> -->
                    <div class="clearfix">
                        <ul>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                            <li>
                                <div class="name">上证指数</div>
                                <div class="now">3278.78</div>
                                <div class="change">
                                    <span class="price">+10.23</span>
                                    <span class="extent">+99.99%</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="hs">
                <!-- <header>沪深</header> -->
                <div class="hushen">
                    <!-- 指数板块 -->
                    <div class="hushen-exponent clearfix">
                        <div class="clearfix">
                            <a href="javascrit:;">指数
                                <span></span>
                            </a>
                        </div>
                        <ul class="clearfix">
                            <li>
                                <router-link to="/stockDetails/stkCode=sh000001&stkName=上证指数">
                                    <div>上证指数</div>
                                    <div>3278.78</div>
                                    <div><span>+10.23</span><span>+0.29%</span></div>
                                </router-link>
                            </li>
                            <li>
                                <a href="">
                                    <div>深圳成指</div>
                                    <div>10689.77</div>
                                    <div><span>+75.69</span><span>+0.71%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>创业板指</div>
                                    <div>0.78%</div>
                                    <div><span>+88.88</span><span>+0.24%</span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- 领涨板块 -->
                    <div class="hushen-plate clearfix">
                        <div class="clearfix">
                            <a href="javascrit:;">领涨板块
                                 <span></span>
                            </a>
                        </div>
                        <ul class="clearfix">
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>农业服务</div>
                                    <div>0.85%</div>
                                    <div><span>伟康生化</span><span>+0.14%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>新材料</div>
                                    <div>0.78%</div>
                                    <div><span>正海磁材</span><span>+0.24%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>保险及其他</div>
                                    <div>0.72%</div>
                                    <div><span>中国平安</span><span>+0.34%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- 榜单模块 -->
                    <div class="listModule">
                        <yd-accordion accordion>
                            <yd-accordion-item title="涨幅榜" open>
                                <!-- <div style="padding: .24rem;">
                                    涨幅榜
                                </div> -->
                                <ul>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                </ul>
                            </yd-accordion-item>
                            <yd-accordion-item title="跌幅榜">
                                <!-- <div style="padding: .24rem;">
                                    涨幅榜
                                </div> -->
                                <ul>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                </ul>
                            </yd-accordion-item>
                            <yd-accordion-item title="换手率榜">
                                <!-- <div style="padding: .24rem;">
                                    涨幅榜
                                </div> -->
                                <ul>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                </ul>
                            </yd-accordion-item>
                            <yd-accordion-item title="量比榜">
                                <!-- <div style="padding: .24rem;">
                                    涨幅榜
                                </div> -->
                                <ul>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                </ul>
                            </yd-accordion-item>
                            <yd-accordion-item title="成交额榜">
                                <!-- <div style="padding: .24rem;">
                                    涨幅榜
                                </div> -->
                                <ul>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                    <li>
                                        <div><span>N出版</span><span>6000001</span><span>新</span></div>
                                        <div>4.88</div>
                                        <div>+44.99%</div>
                                    </li>
                                </ul>
                            </yd-accordion-item>
                        </yd-accordion>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="bk">
                <!-- <header>板块</header> -->
                <div class="plateModule">
                    <!-- 领涨板块 -->
                    <div class="plateModule-list clearfix">
                        <div class="clearfix">
                            <a href="javascrit:;">领涨板块
                                <span></span>
                            </a>
                        </div>
                        <ul class="clearfix">
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>农业服务</div>
                                    <div>0.85%</div>
                                    <div><span>伟康生化</span><span>+0.14%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>新材料</div>
                                    <div>0.78%</div>
                                    <div><span>正海磁材</span><span>+0.24%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>保险及其他</div>
                                    <div>0.72%</div>
                                    <div><span>中国平安</span><span>+0.34%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- 行业模块 -->
                    <div class="plateModule-list clearfix">
                        <div class="clearfix">
                            <a href="javascrit:;">行业
                                 <span></span>
                            </a>
                        </div>
                        <ul class="clearfix">
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>农业服务</div>
                                    <div>0.85%</div>
                                    <div><span>伟康生化</span><span>+0.14%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>新材料</div>
                                    <div>0.78%</div>
                                    <div><span>正海磁材</span><span>+0.24%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>保险及其他</div>
                                    <div>0.72%</div>
                                    <div><span>中国平安</span><span>+0.34%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98%</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- 概念模块 -->
                    <div class="plateModule-list clearfix">
                        <div class="clearfix">
                            <a href="javascrit:;">概念
                                <span></span>
                             </a>
                        </div>
                        <ul class="clearfix">
                            <li>
                                <a href="">
                                    <div>H股</div>
                                    <div>0.67%</div>
                                    <div><span>鞍钢</span><span>+0.64%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>次新股</div>
                                    <div>0.55%</div>
                                    <div><span>秦刚股份</span><span>+0.35%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>基金重仓</div>
                                    <div>0.48%</div>
                                    <div><span>万科B</span><span>+0.24%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>油气改革</div>
                                    <div>0.35%</div>
                                    <div><span>中国石油</span><span>+0.33%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>某某板块</div>
                                    <div>0.98</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <div>养殖业</div>
                                    <div>0.98</div>
                                    <div><span>牧原股份</span><span>+0.44%</span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="qt">
                <div class="qt">
                    <div class="market">
                        <div class="title">沪深市场</div>
                        <div class="line"></div>
                        <div class="qt_list clearfix">
                            <ul>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                                <li>沪深A股</li>
                            </ul>
                        </div>
                    </div>
                    <div class="wide_line"></div>
                    <div class="market">
                        <div class="title">基金</div>
                        <div class="line qt_line"></div>
                        <div class="qt_list clearfix">
                            <ul>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                                <li>上证基金</li>
                            </ul>
                        </div>
                    </div>
                    <div class="wide_line"></div>
                    <div class="market">
                        <div class="title">债券</div>
                        <div class="line"></div>
                        <div class="qt_list clearfix">
                            <ul>
                                <li>上证债券</li>
                                <li>上证债券</li>
                                <li>上证债券</li>
                            </ul>
                        </div>
                    </div>
                    <div class="wide_line"></div>
                    <div class="market">
                        <div class="title">期货</div>
                        <div class="line"></div>
                        <div class="qt_list clearfix">
                            <ul>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                                <li>国债期货</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import myheader from './header.vue'
export default {
    name: 'stock',
    data() {
        return {
            selected: 'zs',
            title: '行情'
        }
    },
    methods: {

    },
    components: {
        myheader
    }
}
</script>
<style>
.stock {
    margin-top: 5.25rem;
    margin-bottom: 3.4273rem;
}


/*沪深样式*/

.hushen {
    background-color: #f0f0f0;
}

.hushen-exponent {
    padding-right: 0.938rem;
    padding-left: 0.938rem;
    margin-bottom: 0.3125rem;
    background-color: #fff;
}

.hushen-exponent div a {
    text-decoration: none;
    color: #505050;
    float: left;
    width: 100%;
    font-size: 0.8125rem;
    text-align: left;
    height: 2.5rem;
    line-height: 2.5rem;
    display: inline-block;
}

.hushen-exponent div a span {
    float: right;
    display: inline-block;
    width: 1.8rem;
    height: 1rem;
    margin-top: 1.2rem;
    background: url("../assets/icon-Quotation-more.svg");
    background-size: 50%;
    background-repeat: no-repeat;
    background-repeat: no-repeat;
}

.hushen-exponent ul {
    padding: 0;
    margin: 0;
    margin-bottom: 0.375rem;
}

.hushen-exponent ul li {
    list-style: none;
    float: left;
    width: 33%;
    height: 4.96875rem;
    border-top: 1px solid #ECECEC;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    text-align: center;
}

.hushen-exponent ul li div:nth-child(1) {
    height: 40%;
    line-height: 1.5625rem;
    font-size: 0.9375rem;
}

.hushen-exponent ul li div:nth-child(2) {
    height: 35%;
    line-height: 1.25rem;
    font-size: 1.25rem;
    color: #FF363F;
}

.hushen-exponent ul li div:nth-child(3) {
    height: 20%;
    line-height: 0.625rem;
    font-size: 0.6873rem;
}

.hushen-exponent ul li div:nth-child(3) span:nth-child(1) {
    color: #FF363F;
    margin-right: 0.3125rem;
}

.hushen-exponent ul li div:nth-child(3) span:nth-child(2) {
    color: #FF363F;
}

.hushen-plate {
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.3125rem;
    background-color: #fff;
}

.hushen-plate div a {
    text-decoration: none;
    color: #505050;
    float: left;
    width: 100%;
    font-size: 0.8125rem;
    text-align: left;
    height: 2.5rem;
    line-height: 2.5rem;
    display: inline-block;
}

.hushen-plate div a span {
    float: right;
    background: url("../assets/icon-Quotation-more.svg");
    background-repeat: no-repeat;
    background-size: 50%;
    display: inline-block;
    width: 1.8rem;
    height: 1rem;
    margin-top: 1.2rem;
}

.hushen-plate ul {
    padding: 0;
    margin: 0;
    margin-bottom: 0.375rem;
}

.hushen-plate ul li {
    list-style: none;
    float: left;
    width: 33%;
    height: 4.96875rem;
    border-top: 1px solid #ECECEC;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    text-align: center;
}

.hushen-plate ul li div:nth-child(1) {
    height: 40%;
    line-height: 1.5625rem;
    font-size: 0.9375rem;
}

.hushen-plate ul li div:nth-child(2) {
    height: 40%;
    line-height: 1.25rem;
    font-size: 1.25rem;
    color: #FF363F;
}

.hushen-plate ul li div:nth-child(3) {
    height: 20%;
    line-height: 0.625rem;
    font-size: 0.6875rem;
}

.hushen-plate ul li div:nth-child(3) span:nth-child(1) {
    margin-right: 0.3125rem;
}

.hushen-plate ul li div:nth-child(3) span:nth-child(2) {
    color: #FF363F;
}

.hushen .listModule {
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.3125rem;
    background-color: #fff;
}

.hushen .listModule ul>li {
    height: 3.15625rem;
    border-bottom: 1px solid #ececec;
    text-align: center;
}

.hushen .listModule ul>li>div {
    float: left;
}

.hushen .listModule ul>li>div:nth-child(1) {
    width: 40%;
    padding-top: 0.5rem;
    text-align: left;
}

.hushen .listModule ul>li>div:nth-child(1)>span {
    display: inline-block;
    line-height: 1.2rem;
}

.hushen .listModule ul>li>div:nth-child(1)>span:nth-child(1) {
    display: block;
    font-size: 1rem;
    color: #303030;
}

.hushen .listModule ul>li>div:nth-child(1)>span:nth-child(2) {
    font-size: 0.8125rem;
    color: #b9b9b9;
    margin-right: 0.2rem;
}

.hushen .listModule ul>li>div:nth-child(1)>span:nth-child(3) {
    color: #fff;
    height: 1rem;
    background-color: #FD9819;
    border-radius: 2px;
}

.hushen .listModule ul>li>div:nth-child(2) {
    width: 30%;
    line-height: 3.15625rem;
    font-size: 1rem;
    /*color: #FF363F;*/
}

.hushen .listModule ul>li>div:nth-child(3) {
    width: 30%;
    line-height: 3.15625rem;
    font-size: 1rem;
    color: #FF363F;
}

.yd-accordion-title {
    height: 2.5rem;
}

.yd-accordion>div {
    position: relative;
}

.yd-accordion>div a {
    position: absolute;
    top: 0;
    right: 0;
}

.yd-accordion-title>span {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: .28rem;
    color: #444;
    height: 2.5rem;
    line-height: 2.5rem;
    color: #505050;
    font-size: 0.8125rem;
}

.yd-accordion-title>i {
    margin-left: -1.5rem;
    margin-top: 0.3rem;
    position: absolute;
    top: 0.8rem;
    background: url("../assets/icon-Quotation-more.svg");
    background-repeat: no-repeat;
    background-size: 50%;
    width: 1.5rem;
    height: 1rem;
    right: 0.5rem;
}

.yd-accordion-title>i:after {
    border: none;
}

.yd-accordion {
    position: relative;
}


/*板块样式*/

a {
    text-decoration: none;
    color: #505050;
}

.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}

.clearfix {
    zoom: 1;
}

.plateModule {
    background-color: #f0f0f0;
}

.plateModule-list {
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.3125rem;
    background-color: #fff;
    margin-top: 0.3rem;
}

.plateModule-list:first-child {
    margin-top: 0;
}

.plateModule-list div a {
    text-decoration: none;
    color: #505050;
    float: left;
    width: 100%;
    font-size: 0.8125rem;
    text-align: left;
    height: 2.5rem;
    line-height: 2.5rem;
    display: inline-block;
}

.plateModule-list div a span {
    float: right;
    background: url("../assets/icon-Quotation-more.svg");
    background-repeat: no-repeat;
    background-size: 50%;
    display: inline-block;
    width: 1.8rem;
    height: 1rem;
    margin-top: 1.2rem;
}

.plateModule-list ul {
    padding: 0;
    margin: 0;
    margin-bottom: 0.375rem;
}

.plateModule-list ul li {
    list-style: none;
    float: left;
    width: 33%;
    height: 4.96875rem;
    border-top: 1px solid #ECECEC;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    text-align: center;
}

.plateModule-list ul li div:nth-child(1) {
    height: 40%;
    line-height: 1.5rem;
    font-size: 0.938rem;
}

.plateModule-list ul li div:nth-child(2) {
    height: 40%;
    line-height: 1.25rem;
    font-size: 1.25rem;
    color: #FF363F;
}

.plateModule-list ul li div:nth-child(3) {
    height: 20%;
    line-height: 0.625rem;
    font-size: 0.688rem;
}

.plateModule-list ul li div:nth-child(3) span:nth-child(1) {
    color: #909090;
    margin-right: 0.3125rem;
}

.plateModule-list ul li div:nth-child(3) span:nth-child(2) {
    color: #FF363F;
}


/*指数和其他公用start*/

.mint-navbar {
    height: 2.5rem;
    line-height: 2.5rem;
    margin-top: 2.75rem;
    padding: 0 8px;
    background-color: #f7f7f7;
}

.mint-navbar .mint-tab-item.is-selected {
    /*tab栏切换时的蓝色底边的距离*/
    margin-bottom: -1px;
}

.mint-header-title {
    /*行情页头部 中间文字的样式*/
    font-size: 1.125rem;
}

.mint-header {
    /*行情页头部的样式*/
    font-size: 1.125rem;
    height: 2.75rem;
}

.mint-tab-item-label {
    /*页面底部导航栏 和 行情页头部导航的样式  字体大小*/
    font-size: 0.875rem;
}

.mint-navbar .mint-tab-item .mint-tab-item-label {
    /*行情页头部导航的样式  字体大小*/
    font-size: 0.875rem;
}

.clearfix:after {
    content: "";
    display: block;
    clear: both;
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


/*指数和其他公用end*/


/*指数start*/

.zs {
    padding: 0 0.9375rem;
    background-color: #fff;
}

.zs_top {
    padding: 0.156rem 0px;
    line-height: 2.5rem;
}

.zs_top span {
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    color: #505050;
    line-height: 2.1875rem;
}

.zs_top a {
    float: right;
    text-decoration: none;
}

.zs_top a img {
    display: inline-block;
    width: 0.9375rem;
    height: 0.9375rem;
    vertical-align: middle;
    background-size: 50%;
}

.zs_top a span {
    float: right;
    display: inline-block;
    width: 1.8rem;
    height: 1rem;
    margin-top: 1rem;
    background: url("../assets/icon-Quotation-more.svg");
    background-size: 50%;
    background-repeat: no-repeat;
    background-repeat: no-repeat;
}

.line {
    height: 1px;
    background-color: #ececec;
}

.zs ul {
    padding: 0;
    margin: 0;
}

.zs ul li {
    list-style: none;
    float: left;
    width: 33%;
    border-top: 1px solid #ECECEC;
    text-align: center;
    /*height: 5.03rem;*/
    padding-top: 0.6875rem;
    padding-bottom: 0.6875rem;
}

.zs ul li .name {
    font-size: 0.94rem;
    color: #505050;
    line-height: 0.94rem;
}

.zs ul li .now {
    font-size: 1.25rem;
    color: #FF363F;
    height: 1.25rem;
    margin-top: 0.375rem;
}

.zs ul li .change span {
    color: #FF363F;
}

.zs ul li .change {
    margin-top: 0.375rem;
    line-height: 0.625rem;
    font-size: 0.6873rem;
}

.zs ul li .change span:nth-child(1) {
    margin-right: 0.3125rem;
}


/*指数end*/


/*其他start*/

.qt {
    background-color: #fff;
    width: 100%;
}

.qt .wide_line {
    width: 100%;
    height: 0.375rem;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.qt .market {
    padding: 0 0.9375rem;
}

.qt .title {
    font-size: 0.8125rem;
    color: #2489E8;
    line-height: 2.5rem;
}

.qt .qt_line {
    height: 0.5px;
}

.qt .qt_list {
    margin-top: 0.625rem;
}

.qt ul {
    padding: 0;
    margin: 0;
}

.qt ul li {
    list-style: none;
    float: left;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    width: 6.5rem;
    width: 32%;
    height: 1.875rem;
    margin-bottom: 0.625rem;
    margin-right: 1%;
    text-align: center;
    line-height: 1.875rem;
    font-size: 0.8125rem;
}


/*其他end*/
</style>
