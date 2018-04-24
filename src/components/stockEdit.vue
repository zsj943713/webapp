<template>
    <div class="stockEdit">
        <headerBack :title="title"></headerBack>
        <div class="description">
            <span class="del">删除</span>
            <span class="top">置顶</span>
            <span class="moving">排序</span>
        </div>
        <div class="edit_content">
            <ul class="edit_list" v-sortable="{onEnd: reorder, handle: '.handle' }">
                <li class="clearfix" v-for="(item, index) in stockEditList">
                    <div class="info clearfix">
                        <div class="fl info_left">
                            <span @click="deleteStock(index)"></span>
                        </div>
                        <div class="fl info_right">
                            <div class="name">{{item.name}}</div>
                            <div class="code">{{item.code}}</div>
                        </div>
                    </div>
                    <div class="toTop"><span @click="toTop(index)"></span></div>
                    <div class="move handle"><span></span></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headerBack from './headerBack';
import Vue from 'vue';
import Sortable from 'sortablejs';
Vue.directive('sortable', {
    inserted: function(el, binding) {
        var sortable = new Sortable(el, binding.value || {});
    }
});
export default {
    mounted: function() {
        //从本地获取自选股列表，赋值给data中的this.stockEditList
        var selfStock = localStorage.getItem('selfStock');
        selfStock = JSON.parse(selfStock);
        if (selfStock) {
            this.stockEditList = selfStock;
        } else {
            this.stockEditList = [];
        }
        // console.log("编辑页的股票列表", this.stockEditList)
    },
    data() {
        return {
            title: '编辑自选',
            stockEditList: [], //编辑时的自选股列表，与自选股列表一致
            options: {
                handle: '.handle',
                filter: '.disabled'
            }
        };
    },
    methods: {
        deleteStock: function(index) { //编辑——删除功能
            this.stockEditList.splice(index, 1);
            localStorage.setItem('selfStock', JSON.stringify(this.stockEditList));
        },
        toTop: function(index) { //编辑——置顶功能
            var list = localStorage.getItem('selfStock');
            this.stockEditList = JSON.parse(list);
            this.stockEditList.unshift(this.stockEditList[index]);
            this.stockEditList.splice(index + 1, 1);
            localStorage.setItem('selfStock', JSON.stringify(this.stockEditList));
        },
        reorder: function({
            oldIndex,
            newIndex
        }) { //编辑——移动排序功能
            // console.log(this.stockEditList);
            var vm = this;
            var selfStock = JSON.parse(localStorage.getItem('selfStock'));
            var movedItem = selfStock.splice(oldIndex, 1)[0];
            selfStock.splice(newIndex, 0, movedItem); //在移动后新的位置插入被拖拽移动移动的数据
            vm.stockEditList = [];
            localStorage.setItem('selfStock', JSON.stringify(selfStock));
            Vue.nextTick(function() { //异步，vue的方法
                Array.from(selfStock).forEach(function(item, index) { //伪数组转换伪数组并且遍历，
                    Vue.set(vm.stockEditList, index, item); //vue的方法，数组的数据更新触发
                });
            })
        }
    },
    components: {
        headerBack
    }
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

.stockEdit * {
    /*touch-action: none;*/
}

.stockEdit {
    background-color: #fff;
}

.stockEdit .edit_content {
    padding-top: 4.7rem;
}

.stockEdit .edit_list {
    width: 100%;
}

.stockEdit .edit_list li {
    padding: 0.625rem 0.9375rem 1rem;
    border-bottom: 1px solid #f0f0f0;
}

.stockEdit .edit_list li >div {
    display: inline-block;
    /*width: 29%;*/
    width: 25%;
    line-height: 2.1875rem;
    float: left;
}

.stockEdit .edit_list li>div:first-child {
    /*width: 36%;*/
    width: 50%;
    position: relative;
}

.stockEdit .edit_list li .info .info_left {
    line-height: 2.1875rem;
    height: 100%;
}

.stockEdit .edit_list li .info .info_left span {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    vertical-align: middle;
    background: url(../assets/icon_del.svg);
    background-size: 100%;
    vertical-align: middle;
    margin-right: 0.375rem;
}

.stockEdit .edit_list li .info_right {
    margin-left: 0.9375rem;
    height: 100%;
    position: absolute;
    left: 0.9375rem;
    width: 100%;
}

.stockEdit .edit_list li .info_right .name {
    font-size: 1rem;
    color: #303030;
    line-height: 1.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.stockEdit .edit_list li .info_right .code {
    font-size: 0.8125rem;
    color: #B9B9B9;
    line-height: 0.8125rem;
    margin-top: 0.375rem;
}

.stockEdit .edit_list li .toTop,
.stockEdit .edit_list li .move {
    /*line-height: 2.1875rem;*/
}

.stockEdit .edit_list li .toTop {
    text-align: center;
}

.stockEdit .edit_list li .toTop span {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    background: url(../assets/icon_top.svg);
    background-size: 100%;
    vertical-align: middle;
    margin-right: 0.375rem;
}

.stockEdit .edit_list li .move {
    text-align: right;
    width: 21%;
}

.stockEdit .edit_list li .move span {
    display: inline-block;
    width: 1.125rem;
    height: 0.75rem;
    background: url(../assets/icon_drag.svg);
    background-size: 100%;
    vertical-align: middle;
}

.stockEdit .description {
    width: 100%;
    margin-top: 2.5rem;
    position: fixed;
    padding: 0 1.5rem 0 1rem;
    background-color: #F3F3F3;
    border-bottom: 1px solid #f0f0f0;
    z-index: 1;
}

.stockEdit .description span {
    display: inline-block;
    line-height: 2rem;
    font-size: 0.8125rem;
    color: #505050;
}

.stockEdit .description span.del {
    /*width: 45%;*/
    width: 50%;
}

.stockEdit .description span.top {
    width: 25%;
    text-align: center;
}

.stockEdit .description span.moving {
    width: 21%;
    text-align: right;
}
</style>
