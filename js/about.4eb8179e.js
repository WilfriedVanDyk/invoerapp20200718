(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0767":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"team"},[t("h1",{staticClass:"subtitle-1 grey--text"},[e._v("Team")]),t("v-container",{staticClass:"my-5"},[t("v-row",e._l(e.team,(function(n){return t("v-col",{key:n.name,attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[t("v-card",{staticClass:"text-center ma-3"},[t("v-avatar",{staticClass:"grey lighten-1",attrs:{size:"100"}},[t("img",{attrs:{src:n.picture,alt:n.name}})]),t("v-card-text",[t("div",{staticClass:"subtitle-1"},[e._v(e._s(n.name))]),t("div",{staticClass:"grey--text"},[e._v(e._s(n.role))])]),t("v-card-actions",[t("v-btn",{attrs:{text:"",color:"grey"}},[t("v-icon",{attrs:{small:"",left:""}},[e._v("message")]),t("span",[e._v("message")])],1)],1)],1)],1)})),1)],1)],1)},s=[],i=t("0d9e"),o=t.n(i),r=t("60f7"),l=t.n(r),c=t("4f88"),d=t.n(c),p=t("0cd6"),u=t.n(p),h={name:"team",components:{},data:function(){return{team:[{name:"Wilfried",role:"Web developer",picture:o.a},{name:"Corneel",role:"project leader",picture:l.a},{name:"Bram",role:"Web developer master",picture:d.a},{name:"Jelke",role:"Sales guru",picture:u.a}]}},methods:{getImgUrl:function(e){return t("9e30")(e)}}},v=h,f=t("2877"),x=t("6544"),m=t.n(x),b=t("8212"),g=t("8336"),C=t("b0af"),j=t("99d9"),y=t("62ad"),_=t("a523"),O=t("132d"),w=t("0fd9"),B=Object(f["a"])(v,a,s,!1,null,null,null);n["default"]=B.exports;m()(B,{VAvatar:b["a"],VBtn:g["a"],VCard:C["a"],VCardActions:j["a"],VCardText:j["b"],VCol:y["a"],VContainer:_["a"],VIcon:O["a"],VRow:w["a"]})},"0cd6":function(e,n,t){e.exports=t.p+"img/Jelke.ad6e91cf.jpg"},"210b":function(e,n,t){},"4f88":function(e,n,t){e.exports=t.p+"img/Bram.7776db71.jpg"},"60f7":function(e,n,t){e.exports=t.p+"img/Corneel.47250a67.jpg"},"9e30":function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id="9e30"},acca:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"projects"},[t("h1",{staticClass:"subtitle-1 grey--text"},[e._v("Mijn evenementen")]),t("v-container",{staticClass:"my-5"},[t("v-expansion-panels",{attrs:{popout:"",multiple:""}},e._l(e.MijnEvenementen,(function(n){return t("v-expansion-panel",{key:n.evenement},[t("v-expansion-panel-header",[e._v(e._s(n.evenement))]),t("v-expansion-panel-content",[t("v-card",{attrs:{flat:""}},[t("v-card-text",{staticClass:"px-4 py-1 grey--text"},[t("div",{staticClass:"font-weight-bold"},[e._v("datum: "+e._s(n.datum))]),t("div",[e._v(e._s(n.beschrijving))])])],1)],1)],1)})),1)],1)],1)},s=[],i=(t("4de4"),t("4160"),t("159b"),t("5530")),o=t("9138"),r={name:"projects",components:{},data:function(){return{evenementen:[]}},computed:{MijnEvenementen:function(){return this.evenementen.filter((function(e){return"Wilfried"===e.organisator}))}},created:function(){var e=this;o["a"].collection("evenementen").onSnapshot((function(n){var t=n.docChanges();t.forEach((function(n){"added"===n.type&&e.evenementen.push(Object(i["a"])(Object(i["a"])({},n.doc.data()),{},{id:n.doc.id}))}))}))}},l=r,c=t("2877"),d=t("6544"),p=t.n(d),u=t("b0af"),h=t("99d9"),v=t("a523"),f=t("4e82"),x=t("3206"),m=t("80d2"),b=t("58df"),g=Object(b["a"])(Object(f["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(x["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data:function(){return{content:null,header:null,nextIsActive:!1}},computed:{classes:function(){return Object(i["a"])({"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled},this.groupClasses)},isDisabled:function(){return this.expansionPanels.disabled||this.disabled},isReadonly:function(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent:function(e){this.content=e},unregisterContent:function(){this.content=null},registerHeader:function(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader:function(){this.header=null},onClick:function(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle:function(){var e=this;this.content&&(this.content.isBooted=!0),this.$nextTick((function(){return e.$emit("change")}))}},render:function(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(m["m"])(this))}}),C=t("0789"),j=t("9d65"),y=t("a9ad"),_=Object(b["a"])(j["a"],y["a"],Object(x["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel")),O=_.extend().extend({name:"v-expansion-panel-content",computed:{isActive:function(){return this.expansionPanel.isActive}},created:function(){this.expansionPanel.registerContent(this)},beforeDestroy:function(){this.expansionPanel.unregisterContent()},render:function(e){var n=this;return e(C["a"],this.showLazyContent((function(){return[e("div",n.setBackgroundColor(n.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:n.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(m["m"])(n))])]})))}}),w=t("9d26"),B=t("5607"),P=Object(b["a"])(y["a"],Object(x["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel")),A=P.extend().extend({name:"v-expansion-panel-header",directives:{ripple:B["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{hasMousedown:!1}},computed:{classes:function(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive:function(){return this.expansionPanel.isActive},isDisabled:function(){return this.expansionPanel.isDisabled},isReadonly:function(){return this.expansionPanel.isReadonly}},created:function(){this.expansionPanel.registerHeader(this)},beforeDestroy:function(){this.expansionPanel.unregisterHeader()},methods:{onClick:function(e){this.$emit("click",e)},genIcon:function(){var e=Object(m["m"])(this,"actions")||[this.$createElement(w["a"],this.expandIcon)];return this.$createElement(C["c"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render:function(e){var n=this;return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button"},directives:[{name:"ripple",value:this.ripple}],on:Object(i["a"])(Object(i["a"])({},this.$listeners),{},{click:this.onClick,mousedown:function(){return n.hasMousedown=!0},mouseup:function(){return n.hasMousedown=!1}})}),[Object(m["m"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}}),k=(t("0481"),t("4069"),t("210b"),t("604c")),V=t("d9bd"),E=k["a"].extend({name:"v-expansion-panels",provide:function(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},k["a"].options.computed.classes.call(this)),{},{"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile})}},created:function(){this.$attrs.hasOwnProperty("expand")&&Object(V["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object(V["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem:function(e,n){var t=this.getValue(e,n),a=this.getValue(e,n+1);e.isActive=this.toggleMethod(t),e.nextIsActive=this.toggleMethod(a)}}}),$=Object(c["a"])(l,a,s,!1,null,null,null);n["default"]=$.exports;p()($,{VCard:u["a"],VCardText:h["b"],VContainer:v["a"],VExpansionPanel:g,VExpansionPanelContent:O,VExpansionPanelHeader:A,VExpansionPanels:E})}}]);
//# sourceMappingURL=about.4eb8179e.js.map