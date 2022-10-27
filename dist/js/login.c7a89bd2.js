(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"13d5":function(t,e,n){"use strict";var a=n("23e7"),s=n("d58f").left,r=n("a640"),i=n("2d00"),o=n("605d"),c=r("reduce"),l=!o&&i>79&&i<83;a({target:"Array",proto:!0,forced:!c||l},{reduce:function(t){return s(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},2017:function(t,e,n){"use strict";n("dddc")},"38fb":function(t,e,n){"use strict";n("505f")},"505f":function(t,e,n){},"5a73":function(t,e,n){},"95f3":function(t,e,n){"use strict";n("5a73")},"9ed6":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[t._v(" "+t._s(t.$t("login.title"))+" ")]),n("lang-select",{staticClass:"set-language"})],1),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{name:"user"}})],1),n("el-input",{ref:"username",attrs:{placeholder:t.$t("login.username"),name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),n("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{name:"password"}})],1),n("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:t.$t("login.password"),name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}]},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),n("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[n("svg-icon",{attrs:{name:"password"===t.passwordType?"eye-off":"eye-on"}})],1)],1)],1),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v(" "+t._s(t.$t("login.logIn"))+" ")]),n("div",{staticStyle:{position:"relative"}},[n("div",{staticClass:"tips"},[n("span",[t._v(t._s(t.$t("login.username"))+" : admin ")]),n("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any"))+" ")])]),n("div",{staticClass:"tips"},[n("span",[t._v(t._s(t.$t("login.username"))+" : editor ")]),n("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any"))+" ")])]),n("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(e){t.showDialog=!0}}},[t._v(" "+t._s(t.$t("login.thirdparty"))+" ")])],1)],1),n("el-dialog",{attrs:{title:t.$t("login.thirdparty"),visible:t.showDialog},on:{"update:visible":function(e){t.showDialog=e}}},[t._v(" "+t._s(t.$t("login.thirdpartyTips"))+" "),n("br"),n("br"),n("br"),n("social-sign")],1)],1)},s=[],r=n("1da1"),i=n("d4ec"),o=n("bee2"),c=n("262e"),l=n("2caf"),u=(n("13d5"),n("b64b"),n("96cf"),n("9ab4")),p=n("1b40"),d=n("9dba"),f=n("75fb"),g=n("1131"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"social-signup-container"},[n("div",{staticClass:"sign-btn",on:{click:function(e){return t.wechatHandleClick("wechat")}}},[n("span",{staticClass:"wx-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{name:"wechat"}})],1),t._v(" 微信 ")]),n("div",{staticClass:"sign-btn",on:{click:function(e){return t.tencentHandleClick("tencent")}}},[n("span",{staticClass:"qq-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{name:"qq"}})],1),t._v(" QQ ")])])},m=[],v=function(t){Object(c["a"])(n,t);var e=Object(l["a"])(n);function n(){return Object(i["a"])(this,n),e.apply(this,arguments)}return Object(o["a"])(n,[{key:"wechatHandleClick",value:function(t){alert("handle "+t+" here")}},{key:"tencentHandleClick",value:function(t){alert("handle "+t+" here")}}]),n}(p["d"]);v=Object(u["a"])([Object(p["a"])({name:"SocialSignin"})],v);var b=v,w=b,y=(n("95f3"),n("0c7c")),k=Object(y["a"])(w,h,m,!1,null,"01fd1c75",null),C=k.exports,O=function(t){Object(c["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.validateUsername=function(t,e,n){Object(f["d"])(e)?n():n(new Error("Please enter the correct user name"))},t.validatePassword=function(t,e,n){e.length<6?n(new Error("The password can not be less than 6 digits")):n()},t.loginForm={username:"admin",password:"111111"},t.loginRules={username:[{validator:t.validateUsername,trigger:"blur"}],password:[{validator:t.validatePassword,trigger:"blur"}]},t.passwordType="password",t.loading=!1,t.showDialog=!1,t.capsTooltip=!1,t.otherQuery={},t}return Object(o["a"])(n,[{key:"onRouteChange",value:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))}},{key:"mounted",value:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()}},{key:"checkCapslock",value:function(t){var e=t.key;this.capsTooltip=null!==e&&1===e.length&&e>="A"&&e<="Z"}},{key:"showPwd",value:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))}},{key:"handleLogin",value:function(){var t=this;this.$refs.loginForm.validate(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=8;break}return t.loading=!0,e.next=4,d["a"].Login(t.loginForm);case 4:t.$router.push({path:t.redirect||"/",query:t.otherQuery}).catch((function(t){console.warn(t)})),setTimeout((function(){t.loading=!1}),500),e.next=9;break;case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"getOtherQuery",value:function(t){return Object.keys(t).reduce((function(e,n){return"redirect"!==n&&(e[n]=t[n]),e}),{})}}]),n}(p["d"]);Object(u["a"])([Object(p["e"])("$route",{immediate:!0})],O.prototype,"onRouteChange",null),O=Object(u["a"])([Object(p["a"])({name:"Login",components:{LangSelect:g["a"],SocialSign:C}})],O);var _=O,$=_,x=(n("2017"),n("38fb"),Object(y["a"])($,a,s,!1,null,"172960ca",null));e["default"]=x.exports},d58f:function(t,e,n){var a=n("1c0b"),s=n("7b0b"),r=n("44ad"),i=n("50c4"),o=function(t){return function(e,n,o,c){a(n);var l=s(e),u=r(l),p=i(l.length),d=t?p-1:0,f=t?-1:1;if(o<2)while(1){if(d in u){c=u[d],d+=f;break}if(d+=f,t?d<0:p<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:p>d;d+=f)d in u&&(c=n(c,u[d],d,l));return c}};t.exports={left:o(!1),right:o(!0)}},dddc:function(t,e,n){t.exports={menuBg:"#304156",menuText:"#bfcbd9",menuActiveText:"#409eff"}}}]);