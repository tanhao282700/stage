webpackJsonp([18],{"5O+y":function(t,e){},TybW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("ALGc"),i=a("rHil"),n=(s.a,i.a,{name:"secondStep",components:{XTextarea:s.a,Group:i.a},data:function(){return{value:"",value2:"",baseInfo:{}}},created:function(){this.getBaseData()},methods:{sele:function(t,e){this.baseInfo.requirements[t].checkedStatus=e},getBaseData:function(){var t=this;this.$http.fetchGet("/merchant/room/get/introduceInfo",{roomId:this.$route.query.params.id}).then(function(e){t.baseInfo=e.data.data})},getBack:function(){this.$router.replace({name:"houseAdd",query:{params:this.$route.query.params}})},getNextStep:function(){var t=this;this.baseInfo.title?this.baseInfo.text?(this.$vux.loading.show({text:"加载中..."}),this.$http.fetchPost("/merchant/room/add/introduceInfo",this.baseInfo).then(function(e){t.$vux.loading.hide(),t.$router.replace({name:"thirdStep",query:{params:t.$route.query.params}})})):this.$vux.toast.show({text:"请输入房源特点",position:"middle",type:"warn"}):this.$vux.toast.show({text:"请输入房源标题",position:"middle",type:"warn"})}}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"secondStep"},[a("div",{staticClass:"iosHeader vux-1px-b"},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left left",attrs:{type:"ios-arrow-left",size:"60",xmlns:"http://www.w3.org/2000/svg",width:"60",height:"60",viewBox:"0 0 512 512"},on:{click:t.getBack}},[a("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})]),t._v(" "),a("span",[t._v("第二步：房源介绍")]),t._v(" "),a("span",{staticClass:"right headericon icon iconfont",on:{click:t.getBack}},[t._v("")])]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"con"},[a("div",{staticClass:"defaultTitle"},[t._v("房源介绍")]),t._v(" "),a("div",{staticClass:"areaTitle"},[t._v("房源标题")]),t._v(" "),a("div",{staticClass:"textarea1"},[a("div",{staticClass:"textarea1_con vux-1px-b"},[a("group",[a("x-textarea",{attrs:{placeholder:"一个好的标题应该尽可能简洁的介绍房源特点，能帮您带来更多的客人",max:50,"show-counter":!0},model:{value:t.baseInfo.title,callback:function(e){t.$set(t.baseInfo,"title",e)},expression:"baseInfo.title"}})],1)],1)]),t._v(" "),a("div",{staticClass:"areaTitle"},[t._v("房源特点")]),t._v(" "),a("div",{staticClass:"textarea1",staticStyle:{"padding-bottom":"0.2rem"}},[a("div",{staticClass:"textarea1_con vux-1px-b"},[a("group",[a("x-textarea",{attrs:{placeholder:"您的房源有什么特点，如位置（离地铁站近、景点近？）、设施（有大投影？能做饭？）以及其它特点",autosize:"",max:1e3,"show-counter":!0},model:{value:t.baseInfo.text,callback:function(e){t.$set(t.baseInfo,"text",e)},expression:"baseInfo.text"}})],1)],1)]),t._v(" "),a("div",{staticClass:"defaultTitle"},[t._v("您对客人有什么要求")]),t._v(" "),t._l(t.baseInfo.requirements,function(e,s){return a("div",{staticClass:"requestLine"},[a("span",{domProps:{textContent:t._s(e.text)}}),t._v(" "),a("div",{staticClass:"radios"},[a("span",{staticClass:"headericon icon iconfont",class:{green:1==e.checkedStatus},on:{click:function(e){return t.sele(s,1)}}},[t._v("")]),t._v(" "),a("span",{staticClass:"headericon icon iconfont",class:{red:2==e.checkedStatus},on:{click:function(e){return t.sele(s,2)}}},[t._v("")])])])}),t._v(" "),a("div",{staticClass:"defaultTitle"},[t._v("其它注意事项")]),t._v(" "),a("div",{staticClass:"textarea1"},[a("div",{staticClass:"textarea1_con vux-1px-b"},[a("group",[a("x-textarea",{attrs:{autosize:"",placeholder:"其它需要客人遵守的规则",max:1e3,"show-counter":!0},model:{value:t.baseInfo.otherRequirement,callback:function(e){t.$set(t.baseInfo,"otherRequirement",e)},expression:"baseInfo.otherRequirement"}})],1)],1)]),t._v(" "),a("div",{staticClass:"bottom",on:{click:t.getNextStep}},[t._v("下一步")])],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"steps"},[e("span")])}]};var r=a("VU/8")(n,o,!1,function(t){a("iwv1"),a("5O+y")},"data-v-5cfb58f9",null);e.default=r.exports},iwv1:function(t,e){}});
//# sourceMappingURL=18.bb1ea302a19ea03ca494.js.map