webpackJsonp([19],{"0Moc":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("GQaK"),o=s("4FCr"),n=(o.a,{name:"goodsManage",components:{LoadMore:o.a},data:function(){return{tabIndex:1,params:{merchantId:"",status:1,page:1,pageSize:10},isMoreData:!0,data:[],baseInfo:{goodsDownNum:0,goodsOnNum:0},pulldownMsg:"下拉刷新",pullupMsg:"加载更多",alertHook:"none"}},methods:{edit:function(t){console.log(this.tabIndex),this.$store.state.tabIndex=this.tabIndex,this.$router.push({name:"goodsAdd",query:{id:t.id}}),event.stopPropagation()},getOff:function(t,a){var s=this;this.$vux.loading.show({text:"加载中..."});var e="";2==a&&(e="下架成功"),1==a&&(e="上架成功"),this.$http.fetchGet("/merchant/good/update/status",{goodId:t.id,operate:a}).then(function(t){s.$vux.loading.hide(),200==t.data.code?(s.$vux.toast.show({text:e,position:"middle"}),s.refreshData()):s.$vux.toast.show({text:t.data.message,position:"middle",type:"warn"})}),event.stopPropagation()},deleteList:function(t){var a=this;this.$vux.confirm.show({title:"此操作将永久删除，是否继续？",onCancel:function(){},onConfirm:function(){a.$vux.loading.show({text:"加载中..."}),a.$http.fetchPost("/merchant/good/delete/goods?goodsId="+t.id).then(function(t){a.$vux.loading.hide(),200==t.data.code?(a.$vux.toast.show({text:"删除成功",position:"middle"}),a.refreshData()):a.$vux.toast.show({text:t.data.message,position:"middle",type:"warn"})})}}),event.stopPropagation()},addGoods:function(){this.$store.state.tabIndex=this.tabIndex,this.$router.push({name:"goodsAdd"})},goDetail:function(t,a,s){this.$store.state.tabIndex=this.tabIndex,this.$router.push({name:"goodsDetail",query:{tabIndex:this.params.status,id:t,dataStatus:a,dataRemark:s}})},getBack:function(){this.$router.go(-1)},getData:function(){var t=this;this.$http.fetchGet("/merchant/good/get/list",this.params).then(function(a){setTimeout(function(){t.$vux.loading.hide()},500),t.baseInfo.goodsDownNum=a.data.data.goodsDownNum,t.baseInfo.goodsOnNum=a.data.data.goodsOnNum,t.data=a.data.data.goodsList,t.data.length===t.params.pageSize?t.isMoreData=!0:(t.isMoreData=!1,t.$nextTick(function(){t.$refs.list_con.offsetHeight>t.$refs.content.offsetHeight&&(t.$refs.content.style.height=t.$refs.list_con.offsetHeight+2+"px")})),t.initScroll()})},refreshData:function(){var t=this;this.$refs.content.style.height="auto",this.pullupMsg="加载中。。。",this.params.page=1,this.$http.fetchGet("/merchant/good/get/list",this.params).then(function(a){setTimeout(function(){t.$vux.loading.hide()},500),t.baseInfo.goodsDownNum=a.data.data.goodsDownNum,t.baseInfo.goodsOnNum=a.data.data.goodsOnNum,t.data=a.data.data.goodsList,t.data.length===t.params.pageSize?t.isMoreData=!0:(t.isMoreData=!1,t.$nextTick(function(){t.$refs.list_con.offsetHeight>t.$refs.content.offsetHeight&&(t.$refs.content.style.height=t.$refs.list_con.offsetHeight+2+"px")})),t.pullupMsg="加载更多",t.scroll.refresh()})},loadMoreData:function(){var t=this;this.data.length<this.params.pageSize||this.data.length<this.params.pageSize*this.params.page?this.isMoreData=!1:(this.$vux.loading.show({text:"加载中..."}),this.params.page++,this.$http.fetchGet("/merchant/good/get/list",this.params).then(function(a){setTimeout(function(){t.$vux.loading.hide()},500),t.baseInfo.goodsDownNum=a.data.data.goodsDownNum,t.baseInfo.goodsOnNum=a.data.data.goodsOnNum,t.data.length===t.params.pageSize?t.isMoreData=!0:t.isMoreData=!1,a.data.data.goodsList.length>0?a.data.data.goodsList.map(function(a){t.data.push(a)}):t.isMoreData=!1,t.pulldownMsg="下拉刷新",t.scroll.refresh()}))},initScroll:function(){var t=this;this.$nextTick(function(){t.scroll=new e.a(t.$refs.wrapper,{probeType:1,click:!0}),t.scroll.on("scroll",function(a){a.y>30&&(t.pulldownMsg="释放立即刷新")}),t.scroll.on("touchEnd",function(a){a.y>30?t.refreshData():a.y<t.scroll.maxScrollY-30&&t.loadMoreData()})})},changeTab:function(t){this.tabIndex=t,this.$vux.loading.show({text:"加载中..."}),this.$refs.content.style.height="auto",this.params.page=1,this.params.status=t,this.refreshData()},refreshalert:function(){var t=this;this.alertHook="block",setTimeout(function(){t.alertHook="none"},1e3)}},created:function(){this.$vux.loading.show({text:"加载中..."}),this.params.merchantId=this.$store.state.merchantId,this.$store.state.tabIndex&&(this.tabIndex=this.$store.state.tabIndex,this.params.status=this.$store.state.tabIndex,this.$store.state.tabIndex=""),this.getData()}}),i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"goodsManage"},[s("div",{staticClass:"iosHeader vux-1px-b"},[s("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left left",attrs:{type:"ios-arrow-left",size:"60",xmlns:"http://www.w3.org/2000/svg",width:"60",height:"60",viewBox:"0 0 512 512"},on:{click:t.getBack}},[s("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})]),t._v(" "),s("span",[t._v("商品管理")]),t._v(" "),s("svg",{staticClass:"vux-x-icon vux-x-icon-ios-plus-empty right",attrs:{type:"ios-plus-empty",size:"60",xmlns:"http://www.w3.org/2000/svg",width:"60",height:"60",viewBox:"0 0 512 512"},on:{click:t.addGoods}},[s("path",{attrs:{d:"M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z"}})])]),t._v(" "),s("div",{staticClass:"tabBar"},[s("div",{staticClass:"bar",class:{active:1===t.params.status},on:{click:function(a){return t.changeTab(1)}}},[s("div",{staticClass:"barInfo"},[t._v("\n        已上架("),s("span",{domProps:{textContent:t._s(t.baseInfo.goodsOnNum)}}),t._v(")\n      ")])]),t._v(" "),s("div",{staticClass:"bar",class:{active:2===t.params.status},on:{click:function(a){return t.changeTab(2)}}},[s("div",{staticClass:"barInfo"},[t._v("\n        未上架("),s("span",{domProps:{textContent:t._s(t.baseInfo.goodsDownNum)}}),t._v(")\n      ")])])]),t._v(" "),s("div",{ref:"list_con",staticClass:"list_con"},[s("div",{ref:"wrapper",staticClass:"wrapper"},[s("div",{staticClass:"bscroll-container"},[s("div",{staticClass:"top-tip"},[s("span",{staticClass:"refresh-hook"},[t._v(t._s(t.pulldownMsg))])]),t._v(" "),s("ul",{ref:"content",staticClass:"content"},[t._l(t.data,function(a){return s("li",{staticClass:"item vux-1px-b",on:{click:function(s){return t.goDetail(a.id,a.dataStatus,a.dataRemark)}}},[s("div",{staticClass:"pics"},[s("img",{attrs:{src:a.imagePath,alt:""}}),t._v(" "),s("span",{staticClass:"grade",domProps:{textContent:t._s(a.commentPoint+"分")}})]),t._v(" "),s("div",{staticClass:"info"},[s("div",[s("span",{domProps:{textContent:t._s(a.title)}}),t._v(" "),s("span",{domProps:{textContent:t._s("销量"+a.sales)}}),t._v(" "),s("span",{domProps:{textContent:t._s("最后编辑于 "+a.updateTime)}})]),t._v(" "),s("span",{staticClass:"price",domProps:{textContent:t._s("￥"+a.memberPrice)}})]),t._v(" "),s("div",{staticClass:"buttons"},[1!=a.dataStatus?s("span",{on:{click:function(s){return t.edit(a)}}},[t._v("编辑")]):t._e(),t._v(" "),1==t.params.status?s("span",{on:{click:function(s){return t.getOff(a,2)}}},[t._v("下架")]):t._e(),t._v(" "),2==t.params.status&&1!=a.dataStatus?s("span",{on:{click:function(s){return t.getOff(a,1)}}},[t._v("上架")]):t._e(),t._v(" "),s("span",{on:{click:function(s){return t.deleteList(a)}}},[t._v("删除")])]),t._v(" "),1==a.dataStatus?s("span",{staticClass:"currentStatus red"},[t._v("待审核")]):t._e(),t._v(" "),2==a.dataStatus?s("span",{staticClass:"currentStatus green"},[t._v("审核通过")]):t._e(),t._v(" "),3==a.dataStatus?s("span",{staticClass:"currentStatus red"},[t._v("审核拒绝")]):t._e()])}),t._v(" "),t.isMoreData?t._e():s("div",{staticClass:"no_data"},[s("span"),t._v(" "),s("span",[t._v("暂无更多数据")]),t._v(" "),s("span")])],2),t._v(" "),t.isMoreData?s("div",{staticClass:"bottom-tip"},[s("span",{staticClass:"loading-hook"},[t._v(t._s(t.pullupMsg))])]):t._e()])]),t._v(" "),s("div",{staticClass:"alert-hook",style:{display:t.alertHook}},[t._v("刷新成功")])])])},staticRenderFns:[]};var r=s("VU/8")(n,i,!1,function(t){s("5nOz"),s("aVOi")},"data-v-5ab5f5c0",null);a.default=r.exports},"5nOz":function(t,a){},aVOi:function(t,a){}});
//# sourceMappingURL=19.b4798ade00afe0d7f6fb.js.map