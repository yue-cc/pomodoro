(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["list"],{"1a33":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"list"}},[s("b-container",[s("div",{staticClass:"play position-absolute"},[s("div",{staticClass:"circle"})]),s("div",{staticClass:"play position-absolute"},[s("span",{staticClass:"time2"},[t._v(t._s(t.timeText))]),s("span",{staticClass:"current2"},[t._v(t._s(t.currentText))])]),s("div",{staticClass:"play2 position-absolute"},[1!==t.status?s("b-btn",{staticClass:"btn-start2",attrs:{variant:"dark"},on:{click:t.start}},[s("font-awesome-icon",{attrs:{icon:["fas","play"]}})],1):t._e(),1===t.status?s("b-btn",{staticClass:"btn-pause2",attrs:{variant:"primary"},on:{click:t.pause}},[s("font-awesome-icon",{attrs:{icon:["fas","pause"]}})],1):t._e()],1),s("b-row",[s("b-col",{staticClass:"col-12 col-lg-6 mt-5"},[s("b-col",[s("p",{staticClass:"texta"},[t._v("TO-DO LIST")]),s("p",{staticClass:"textb"},[t._v("ANALYTICS")]),s("p",{staticClass:"textb"},[t._v("RINGTONES")])])],1),s("b-col",{staticClass:"col-12 col-lg-6 mt-5"},[s("b-row",{staticClass:"addmission position-relative"},[s("b-form-group",{staticClass:"w-100",attrs:{"invalid-feedback":"請至少輸入兩個字",state:t.state}},[s("b-form-input",{attrs:{state:t.state,trim:"",placeholder:"ADD A NEW MISSION…"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.additem.apply(null,arguments)}},model:{value:t.newitem,callback:function(e){t.newitem=e},expression:"newitem"}}),s("b-btn",{staticClass:"plus",attrs:{variant:"white"},on:{click:t.additem}},[s("span",[t._v("+")])])],1)],1),s("b-row",[s("div",{staticClass:"todo-text"},[s("h2",[t._v("TO-DO")])]),s("b-table",{staticClass:"list-text",attrs:{items:t.list,fields:t.listfields},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[e.item.edit?s("b-form-input",{attrs:{trim:"",state:e.item.state},on:{keydown:[function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.changelist(e.index)},function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"esc",27,s.key,["Esc","Escape"])?null:t.cancellist(e.index)}]},model:{value:e.item.model,callback:function(s){t.$set(e.item,"model",s)},expression:"data.item.model"}}):s("span",[t._v(t._s(e.value))])]}},{key:"cell(action)",fn:function(e){return[e.item.edit?s("span",[s("b-btn",{attrs:{variant:"white"},on:{click:function(s){return t.changelist(e.index)}}},[s("font-awesome-icon",{staticClass:"icon2",attrs:{icon:["fas","check"]}})],1),s("b-btn",{attrs:{variant:"white"},on:{click:function(s){return t.cancellist(e.index)}}},[s("font-awesome-icon",{staticClass:"icon2",attrs:{icon:["fas","undo"]}})],1)],1):s("span",[s("b-btn",{attrs:{variant:"white"},on:{click:function(s){return t.editlist(e.index)}}},[s("font-awesome-icon",{staticClass:"icon2",attrs:{icon:["fas","pen"]}})],1),s("b-btn",{attrs:{variant:"white"},on:{click:function(s){return t.dellist(e.index)}}},[s("font-awesome-icon",{staticClass:"icon2",attrs:{icon:["fas","trash"]}})],1)],1)]}}])})],1),s("b-row",[s("div",{staticClass:"done-text"},[s("h2",[t._v("DONE")])]),s("b-table-simple",{staticClass:"list-text"},[s("tbody",t._l(t.finished,(function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e))]),s("td",[s("b-btn",{attrs:{variant:"white"},on:{click:function(e){return t.delfinish(i)}}},[s("font-awesome-icon",{staticClass:"icon2",attrs:{icon:["fas","trash"]}})],1)],1)])})),0)])],1)],1)],1)],1)],1)},n=[],a=(s("d81d"),s("99af"),{name:"List",data:function(){return{timer:0,newitem:"",listfields:[{key:"name",label:"name"},{key:"action",label:"action"}]}},computed:{state:function(){return 0===this.newitem.length?null:!(this.newitem.length<2)},status:function(){return this.$store.state.status},list:function(){return this.$store.getters.list.map((function(t){return t.model.length<2?t.state=!1:t.state=!0,t}))},finished:function(){return this.$store.state.finished},current:function(){return this.$store.state.current},currentText:function(){var t=this.current;return 0===t.length&&(t=0===this.list.length?"There are no tasks yet":"點擊開始"),t},timeleft:function(){return this.$store.state.timeleft},timeText:function(){var t=Math.floor(this.timeleft/60),e=Math.floor(this.timeleft%60);return"".concat(t," : ").concat(e)}},methods:{additem:function(){this.state?(this.$store.commit("addList",this.newitem),this.newitem=""):this.$swal({icon:"error",title:"錯誤",text:"必須要兩個字以上"})},editlist:function(t){this.$store.commit("editList",t)},changelist:function(t){console.log(t),this.list[t].state&&this.$store.commit("changeList",t)},cancellist:function(t){this.$store.commit("cancelList",t)},dellist:function(t){this.$store.commit("delList",t)},delfinish:function(t){this.$store.commit("delFinish",t)},pause:function(){clearInterval(this.timer),this.$store.commit("changeStatus",2)},start:function(){var t=this;2!==this.status&&this.list.length>0&&this.$store.commit("start"),this.current.length>0&&(this.$store.commit("changeStatus",1),this.timer=setInterval((function(){t.$store.commit("countdown"),t.timeleft<=-1&&t.finish(!1)}),1e3))}}}),o=a,c=(s("2456"),s("2877")),l=Object(c["a"])(o,i,n,!1,null,null,null);e["default"]=l.exports},2456:function(t,e,s){"use strict";s("448b")},"448b":function(t,e,s){}}]);
//# sourceMappingURL=list.05198857.js.map