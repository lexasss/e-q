(function(t){function e(e){for(var i,r,u=e[0],c=e[1],l=e[2],d=e[3]||[],p=0,h=[];p<u.length;p++)r=u[p],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&h.push(s[r][0]),s[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);f&&f(e),a.push.apply(a,d);while(h.length)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,r=1;r<n.length;r++){var l=n[r];0!==s[l]&&(i=!1)}i&&(o.splice(e--,1),t=c(c.s=n[0]))}return 0===o.length&&(a.forEach((function(t){if(void 0===s[t]){s[t]=null;var e=document.createElement("link");c.nc&&e.setAttribute("nonce",c.nc),e.rel="prefetch",e.as="script",e.href=u(t),document.head.appendChild(e)}})),a.length=0),t}var i={},r={app:0},s={app:0},o=[],a=[];function u(t){return c.p+"js/"+({components:"components"}[t]||t)+"."+{components:"cb4eb507"}[t]+".js"}function c(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={components:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var i="css/"+({components:"components"}[t]||t)+"."+{components:"45c5f124"}[t]+".css",s=c.p+i,o=document.getElementsByTagName("link"),a=0;a<o.length;a++){var u=o[a],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===i||l===s))return e()}var d=document.getElementsByTagName("style");for(a=0;a<d.length;a++){u=d[a],l=u.getAttribute("data-href");if(l===i||l===s)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var i=e&&e.target&&e.target.src||s,o=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=i,delete r[t],p.parentNode.removeChild(p),n(o)},p.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){r[t]=0})));var i=s[t];if(0!==i)if(i)e.push(i[2]);else{var o=new Promise((function(e,n){i=s[t]=[e,n]}));e.push(i[2]=o);var a,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=u(t);var d=new Error;a=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=s[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",d.name="ChunkLoadError",d.type=i,d.request=r,n[1](d)}s[t]=void 0}};var p=setTimeout((function(){a({type:"timeout",target:l})}),12e4);l.onerror=l.onload=a,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=i,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)c.d(n,i,function(e){return t[e]}.bind(null,i));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/e-q/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=e,l=l.slice();for(var p=0;p<l.length;p++)e(l[p]);var f=d,h=function(){return o.push([0,"chunk-vendors"]),n()}();e([[],{},0,["components"]])})({0:function(t,e,n){t.exports=n("cd49")},1559:function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return u})),n.d(e,"c",(function(){return c}));var i,r=n("9ab4");(function(t){t[t["None"]=0]="None",t[t["Text"]=1]="Text",t[t["Number"]=2]="Number",t[t["ChoiceOne"]=3]="ChoiceOne",t[t["ChoiceMultiple"]=4]="ChoiceMultiple",t[t["Scale"]=5]="Scale"})(i||(i={}));var s=function(){function t(t){var e,n,r,s,o;this.id=1e8+Math.round(99999999*Math.random()),this.name="",this.isRequired=!0,this.type=i.None,this.value=null,this.id=null!==(e=t.id)&&void 0!==e?e:this.id,this.name=null!==(n=t.name)&&void 0!==n?n:this.name,this.isRequired=null!==(r=t.isRequired)&&void 0!==r?r:this.isRequired,this.type=null!==(s=t.type)&&void 0!==s?s:this.type,this.type===i.ChoiceMultiple&&(this.value=[]),this.value=null!==(o=t.value)&&void 0!==o?o:this.value}return t.from=function(t){var e,n=null!==(e=t.type)&&void 0!==e?e:i.None;if(n===i.Text)return new o(t);if(n===i.Number)return new a(t);if(n===i.ChoiceOne)return new u(t);if(n===i.ChoiceMultiple)return new u(t);if(n===i.Scale)return new c(t);throw new Error("Question: unknown type")},Object.defineProperty(t.prototype,"isAnswered",{get:function(){return null!==this.value&&""!==this.value&&this.value!==Number.MIN_SAFE_INTEGER},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isValid",{get:function(){return this.name.length>0&&this.type!==i.None},enumerable:!1,configurable:!0}),t}();e["f"]=s;var o=function(t){function e(e){var n,i=t.call(this,e)||this;return i.maxLength=100,i.maxLength=null!==(n=e.maxLength)&&void 0!==n?n:i.maxLength,i}return Object(r["c"])(e,t),e}(s),a=function(t){function e(e){var n,i,r=t.call(this,e)||this;return r.min=Number.MIN_SAFE_INTEGER,r.max=Number.MAX_SAFE_INTEGER,r.min=null!==(n=e.min)&&void 0!==n?n:r.min,r.max=null!==(i=e.max)&&void 0!==i?i:r.max,r}return Object(r["c"])(e,t),e}(s),u=function(t){function e(e){var n,i,r,s=t.call(this,e)||this;return s.isMultiple=!1,s.asDropdownList=!1,s.items=[],s.isMultiple=null!==(n=e.isMultiple)&&void 0!==n?n:s.isMultiple,s.asDropdownList=null!==(i=e.asDropdownList)&&void 0!==i?i:s.asDropdownList,s.items=null!==(r=e.items)&&void 0!==r?r:s.items,s}return Object(r["c"])(e,t),e}(s),c=function(t){function e(e){var n,i,r,s,o,a,u=t.call(this,e)||this;return u.min=1,u.max=5,u.labelLeft="",u.labelCenter="",u.labelRight="",u.hasSlider=!1,u.min=null!==(n=e.min)&&void 0!==n?n:u.min,u.max=null!==(i=e.max)&&void 0!==i?i:u.max,u.labelLeft=null!==(r=e.labelLeft)&&void 0!==r?r:u.labelLeft,u.labelCenter=null!==(s=e.labelCenter)&&void 0!==s?s:u.labelCenter,u.labelRight=null!==(o=e.labelRight)&&void 0!==o?o:u.labelRight,u.hasSlider=null!==(a=e.hasSlider)&&void 0!==a?a:u.hasSlider,u}return Object(r["c"])(e,t),e}(s)},"2bd0":function(t,e,n){"use strict";var i=function(){function t(){}return t.download=function(t,e){var n=new Blob([t],{type:"text/plain"}),i=document.createElement("a"),r=URL.createObjectURL(n);i.href=r,i.download=e,document.body.appendChild(i),i.click(),setTimeout((function(){document.body.removeChild(i),window.URL.revokeObjectURL(r)}),0)},t.read=function(t){return new Promise((function(e,n){var i=new FileReader;i.onloadend=function(t){if(i.result)try{e(JSON.parse(i.result))}catch(r){n()}else n()},i.readAsText(t)}))},t}();e["a"]=i},"406a":function(t,e,n){},"5c68":function(t,e,n){"use strict";var i=n("1559"),r=function(){function t(t){this.id=2e8+Math.round(99999999*Math.random()),this.description="",this.items=[],this.study=0,this.name=t}return t.from=function(e,n){var r,s,o,a;void 0===n&&(n=!1);var u=new t(null!==(r=e.name)&&void 0!==r?r:"");return n||(u.id=null!==(s=e.id)&&void 0!==s?s:u.id),u.description=null!==(o=e.description)&&void 0!==o?o:u.description,u.items=e.items?e.items.map((function(t){return i["f"].from(t)})):u.items,u.study=null!==(a=e.study)&&void 0!==a?a:u.study,u},Object.defineProperty(t.prototype,"isValid",{get:function(){return this.items.length>0&&this.name.length>2},enumerable:!1,configurable:!0}),t.prototype.copyFrom=function(t,e){var n,i=this;void 0===e&&(e=!0),e&&(this.id=null!==(n=t.id)&&void 0!==n?n:this.id),this.name=t.name,this.description=t.description,t.items.forEach((function(t){return i.items.push(t)})),e&&(this.study=t.study)},t}();e["a"]=r},7768:function(t,e,n){"use strict";n("406a")},cd49:function(t,e,n){"use strict";n.r(e);var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"app"}},[i("v-app-bar",{directives:[{name:"show",rawName:"v-show",value:!t.isRunningStudy,expression:"!isRunningStudy"}],attrs:{app:"",color:"primary",dark:""}},[i("div",{staticClass:"d-flex align-center"},[i("v-img",{staticClass:"shrink mr-3",attrs:{alt:"E-Q Logo",contain:"",src:n("cf05"),transition:"scale-transition",width:"40"}})],1),i("v-subheader",[t._v("Electronic offline questionnaire")]),i("v-spacer"),t.user?[i("v-subheader",[t._v(t._s(t.user.name))])]:i("v-btn",{attrs:{icon:""},on:{click:function(e){return t.signIn()}}},[i("v-icon",[t._v("mdi-login")])],1),i("v-menu",{attrs:{left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[i("v-btn",t._g(t._b({attrs:{dark:"",icon:""}},"v-btn",r,!1),n),[i("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[i("v-list",[i("v-list-item",{on:{click:function(e){return t.exportData()}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-export")])],1),i("v-list-item-title",[t._v("Export data")])],1),i("v-list-item",{on:{click:function(e){return t.importData()}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-import")])],1),i("v-list-item-title",[t._v("Import data")]),i("input",{ref:"fileUpload",attrs:{type:"file",accept:".json",hidden:""},on:{change:t.importFile}})],1)],1)],1)],2),i("v-main",{class:{"pa-0":t.isRunningStudy}},[i("v-container",{attrs:{fluid:""}},[t.selectedStudy?i("study-viewer",{attrs:{study:t.selectedStudy},on:{edit:t.editStudy,clone:t.cloneStudy,closed:function(e){return t.hideStudyViewer()}}}):[i("studies",{ref:"studies",on:{update:t.update,study:t.selectStudy}}),i("v-divider",{staticClass:"mt-12"}),i("questionnaires",{ref:"questionnaires"})]],2)],1),i("v-footer",{directives:[{name:"show",rawName:"v-show",value:!t.isRunningStudy,expression:"!isRunningStudy"}],staticClass:"flex-column",attrs:{color:"teal darken-1",padless:"",dark:""}},[t.isAppWarningVisible?i("v-alert",{staticClass:"full-width ma-0",attrs:{dismissible:"",type:"warning",dense:""}},[t._v("All data is stored locally in the browser (localStorage), therefore this app should not be loaded in 'private' mode. Also, do not clear the site data.")]):t._e(),i("div",{staticClass:"py-2 blue-lighten-4--text",attrs:{dark:""}},[i("div",{staticClass:"text-center"},[t._v(t._s((new Date).getFullYear())+" — Oleg Špakov, Tampere University, v"+t._s(t.VERSION))]),t.isAppWarningVisible?t._e():i("div",{staticClass:"tip"},[t._v("All data is stored locally in the browser (localStorage), therefore this app should not be loaded in 'private' mode. Also, do not clear the site data.")])])],1),i("v-dialog",{attrs:{width:"500"},model:{value:t.isAlertVisible,callback:function(e){t.isAlertVisible=e},expression:"isAlertVisible"}},[i("v-alert",{staticClass:"ma-0",attrs:{type:"error",transition:"scale-transition"}},[t._v(t._s(t.alertMessage))])],1)],1)},s=[],o=n("9ab4"),a=n("60a3"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"studies"},[n("div",{staticClass:"text-h4 my-4"},[t._v("Studies")]),t.$store.state.studies.length?n("v-list",{attrs:{dense:""}},t._l(t.$store.state.studies,(function(e){return n("v-list-item",{key:e.id},[n("v-list-item-content",{staticClass:"py-0"},[n("v-btn",{domProps:{textContent:t._s(e.name)},on:{click:function(n){return t.show(e)}}})],1)],1)})),1):n("v-subheader",{staticClass:"justify-center"},[n("div",{staticClass:"red--text"},[t._v("No studies created yet, click the button below to create a new one.")])]),n("v-btn",{staticClass:"mt-4",attrs:{dark:"",color:"green"},on:{click:function(e){return t.createNew()}}},[t._v("Create new")]),t.editedStudy?n("v-dialog",{attrs:{value:!0,persistent:"","max-width":"640px"}},[n("study-editor",{staticClass:"pa-4",attrs:{study:t.editedStudy},on:{save:t.save,cancel:t.hideEditor}})],1):t._e()],1)},c=[],l=function(){function t(t){this.name=t.name,void 0===t.value?this.answer="":Array.isArray(t.value)?this.answer=t.value.join(","):this.answer=""+t.value}return t}(),d=function(){function t(t){this.name=t.name,this.questions=t.answers.map((function(t){return new l(t)}))}return t}(),p=function(){function t(t){this.name=t.name,this.questionnaires=t.questionnaires.map((function(t){return new d(t)}))}return t}(),f=function(){function t(t){this.name=t.name,this.participants=t.participants.map((function(t){return new p(t)}))}return t.prototype.asCSV=function(t){if(0===this.participants.length)return"";var e=Object(o["e"])([""],this.participants[0].questionnaires.map((function(e){return Object(o["e"])([e.name],new Array(e.questions.length-1).map((function(t){return""}))).join(t)}))).join(t),n=Object(o["e"])(["name"],this.participants[0].questionnaires.map((function(e){return e.questions.map((function(t){return t.name})).join(t)}))).join(t);return Object(o["e"])([e,n],this.participants.map((function(e){return Object(o["e"])([e.name],e.questionnaires.map((function(e){return e.questions.map((function(t){return t.answer})).join(t)}))).join(t)}))).join("\r\n")},t}(),h=f,m=n("db5a"),A=n("1559"),v=function(){function t(){this.id=3e8+Math.round(99999999*Math.random()),this.name="",this.description="",this.questionnaires=[],this.participants=[]}return t.from=function(e,n){var i,r,s;void 0===n&&(n=!1);var o=new t;return n||(o.id=null!==(i=e.id)&&void 0!==i?i:o.id),o.name=null!==(r=e.name)&&void 0!==r?r:o.name,o.description=null!==(s=e.description)&&void 0!==s?s:o.description,o.questionnaires=e.questionnaires?e.questionnaires.map((function(t){return t})):o.questionnaires,n||(o.participants=e.participants?e.participants.map((function(t){return m["a"].from(t)})):o.participants),o},Object.defineProperty(t.prototype,"isValid",{get:function(){return this.questionnaires.length>0&&this.name.length>0},enumerable:!1,configurable:!0}),t.prototype.asCSV=function(t){return void 0===t&&(t="\t"),new h(this).asCSV(t)},t.prototype.defaultValue=function(t){return t===A["e"].ChoiceMultiple?[]:t===A["e"].Number||t===A["e"].Scale?Number.MIN_SAFE_INTEGER:""},t}(),g=v,y=function(){return n.e("components").then(n.bind(null,"82e0"))},b=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isNew=!1,e.editedStudy=null,e}return Object(o["c"])(e,t),e.prototype.edit=function(t){this.isNew=!1,this.editedStudy=g.from(t)},e.prototype.clone=function(t){this.isNew=!0,this.editedStudy=g.from(t,!0)},e.prototype.createNew=function(){this.isNew=!0,this.editedStudy=new g},e.prototype.save=function(t){this.isNew?this.$store.commit("addStudy",t):this.$store.commit("replaceStudy",t),this.$store.dispatch("save"),this.hideEditor()},e.prototype.hideEditor=function(){this.editedStudy=null,this.$emit("update")},e.prototype.show=function(t){this.$emit("study",t)},e=Object(o["b"])([Object(a["a"])({components:{studyEditor:y}})],e),e}(a["c"]),w=b,C=w,E=n("2877"),S=n("6544"),Q=n.n(S),I=n("8336"),_=n("169a"),O=n("8860"),q=n("da13"),N=n("5d23"),j=n("e0c7"),x=Object(E["a"])(C,u,c,!1,null,null,null),R=x.exports;Q()(x,{VBtn:I["a"],VDialog:_["a"],VList:O["a"],VListItem:q["a"],VListItemContent:N["a"],VSubheader:j["a"]});var B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"questionnaires"},[n("div",{staticClass:"text-h4 my-4"},[t._v("Questionnaires")]),t.$store.state.questionnaires.length?n("v-list",{attrs:{dense:""}},t._l(t.$store.state.questionnaires,(function(e){return n("v-list-item",{key:e.id},[n("v-list-item-content",[n("div",{staticClass:"d-flex justify-center"},[n("v-badge",{attrs:{"offset-y":"14",color:t.cannotUse(e)?"red":"primary",value:!!e.study,content:t.studies(e)}},[n("v-chip",{class:{red:t.isNotUsed(e)},staticStyle:{"min-width":"420px"},attrs:{color:"primary",__unused__close:t.isNotUsed(e),outlined:""},on:{"__unused__click:close":function(n){return t.remove(e)}}},[t._v(t._s(e.name)),n("v-spacer",{staticClass:"ml-4"}),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var r=i.on;return[n("v-btn",t._g({attrs:{icon:"",disabled:t.hasParticipants(e),color:"primary"},on:{click:function(n){return t.edit(e)}}},Object.assign({},r)),[n("v-icon",[t._v("mdi-pencil")])],1)]}}],null,!0)},[n("span",[t._v("Edit")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var r=i.on;return[n("v-btn",t._g({attrs:{icon:"",color:"primary"},on:{click:function(n){return t.clone(e)}}},Object.assign({},r)),[n("v-icon",[t._v("mdi-book-multiple")])],1)]}}],null,!0)},[n("span",[t._v("Clone")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var r=i.on;return[n("v-btn",t._g({attrs:{icon:"",disabled:!t.isNotUsed(e),color:"primary"},on:{click:function(n){return t.remove(e)}}},Object.assign({},r)),[n("v-icon",[t._v("mdi-close-circle")])],1)]}}],null,!0)},[n("span",[t._v("Delete")])])],1)],1)],1)])],1)})),1):n("v-subheader",{staticClass:"justify-center"},[n("div",{staticClass:"red--text"},[t._v("No questionnaires created yet.")])]),n("v-btn",{staticClass:"mt-4",attrs:{dark:"",color:"green"},on:{click:function(e){return t.createNew()}}},[t._v("Create new")]),t.isEditingQuestionnaire?n("v-dialog",{attrs:{value:!0,persistent:"","max-width":"640px"}},[n("questionnaire-editor",{staticClass:"pa-4",attrs:{"study-id":0,reference:t.reference,"is-new":t.isNewQuestionnare},on:{save:t.hideEditor,cancel:t.hideEditor}})],1):t._e()],1)},k=[],V=function(){return n.e("components").then(n.bind(null,"db0c"))},M=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isEditingQuestionnaire=!1,e.isNewQuestionnare=!1,e.reference=null,e}return Object(o["c"])(e,t),e.prototype.studies=function(t){if(0===t.study)return"";var e=this.$store.state.studies.find((function(e){return e.id===t.study}));return e?e.name:"not used"},e.prototype.isNotUsed=function(t){return 0===t.study?!this.$store.state.studies.some((function(e){return e.questionnaires.some((function(e){return e===t.id}))})):!this.$store.state.studies.find((function(e){return e.id===t.study}))},e.prototype.hasParticipants=function(t){return this.$store.state.studies.some((function(e){return e.questionnaires.some((function(e){return e===t.id}))&&e.participants.length>0}))},e.prototype.cannotUse=function(t){return 0!==t.study&&!this.$store.state.studies.find((function(e){return e.id===t.study}))},e.prototype.edit=function(t){this.isNewQuestionnare=!1,this.reference=t,this.isEditingQuestionnaire=!0},e.prototype.clone=function(t){this.isNewQuestionnare=!0,this.reference=t,this.isEditingQuestionnaire=!0},e.prototype.remove=function(t){var e=!0;0===t.study&&(e=window.confirm("Are you sure to delete this questionnaire?")),e&&(this.$store.commit("deleteQuestionnaire",t),this.$store.dispatch("save"))},e.prototype.createNew=function(){this.isNewQuestionnare=!1,this.reference=null,this.isEditingQuestionnaire=!0},e.prototype.hideEditor=function(){this.isEditingQuestionnaire=!1},e=Object(o["b"])([Object(a["a"])({components:{questionnaireEditor:V}})],e),e}(a["c"]),L=M,D=L,U=n("4ca6"),T=n("cc20"),F=n("132d"),J=n("2fa4"),P=n("3a2f"),$=Object(E["a"])(D,B,k,!1,null,null,null),G=$.exports;Q()($,{VBadge:U["a"],VBtn:I["a"],VChip:T["a"],VDialog:_["a"],VIcon:F["a"],VList:O["a"],VListItem:q["a"],VListItemContent:N["a"],VSpacer:J["a"],VSubheader:j["a"],VTooltip:P["a"]});var W=n("2bd0"),Y=function(){function t(){}return t.signIn=function(){var e=t.createForm("https://accounts.google.com/o/oauth2/v2/auth",{client_id:t.CLIENT_ID,redirect_uri:t.URL,response_type:t.RESPONSE_TYPE,scope:"openid profile",include_granted_scopes:"true",state:"no-pass-through-value-is-used",nonce:Array(16).fill(0).map((function(){return Math.floor(10*Math.random())})).join(""),hd:"Electronic questionnaire"});e.submit()},t.load=function(){console.log(t.URL);var e=t.getResponse();if(e){var n=t.parseResponse(e);if(n.error)throw n.error;if(n.access_token)return t.requestProfile(n.access_token);console.log("Unknown response"),console.log(n)}},t.getResponse=function(){var e="";return"code"===t.RESPONSE_TYPE?(e=location.search.substring(1),e&&(location.search="")):(e=location.hash.substring(1),e&&(location.hash="")),e},t.parseResponse=function(t){var e={},n=/([^&=]+)=([^&]*)/g,i=n.exec(t);while(i)e[decodeURIComponent(i[1])]=decodeURIComponent(i[2]),i=n.exec(t);return e},t.createForm=function(t,e){var n=document.createElement("form");for(var i in n.setAttribute("method","GET"),n.setAttribute("action",t),e){var r=document.createElement("input");r.setAttribute("type","hidden"),r.setAttribute("name",i),r.setAttribute("value",e[i]),n.appendChild(r)}return document.body.appendChild(n),n},t.requestProfile=function(e){return t.sendRequest("https://www.googleapis.com/userinfo/v2/me",{Authorization:"Bearer "+e})},t.sendRequest=function(t,e){return Object(o["a"])(this,void 0,void 0,(function(){var n;return Object(o["d"])(this,(function(i){switch(i.label){case 0:return[4,fetch(t,{method:"GET",headers:e})];case 1:return n=i.sent(),[2,n.json()]}}))}))},t.CLIENT_ID="66322499435-p14i1kgmotasts5jim6s524bgbq91oas.apps.googleusercontent.com",t.RESPONSE_TYPE="id_token token",t.URL=function(){var t=location.origin+location.pathname;return t.slice(0,-1)}(),t}(),K=Y,X=function(){return n.e("components").then(n.bind(null,"700a"))},H=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.VERSION="1.0.5",e.selectedStudy=null,e.isAppWarningVisible=!0,e.isAlertVisible=!1,e.alertMessage="",e}return Object(o["c"])(e,t),Object.defineProperty(e.prototype,"isRunningStudy",{get:function(){return this.$store.state.isRunningStudy},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"user",{get:function(){return this.$store.state.user},enumerable:!1,configurable:!0}),e.prototype.selectStudy=function(t){this.selectedStudy=t},e.prototype.editStudy=function(t){var e=this;this.selectedStudy=null,this.$nextTick().then((function(){e.$refs.studies.edit(t)}))},e.prototype.cloneStudy=function(t){var e=this;this.selectedStudy=null,this.$nextTick().then((function(){e.$refs.studies.clone(t)}))},e.prototype.hideStudyViewer=function(){this.selectedStudy=null},e.prototype.update=function(){var t=this;this.$nextTick().then((function(){t.$refs.questionnaires.$forceUpdate()}))},e.prototype.exportData=function(){var t=this.$store.state,e=t.studies,n=t.questionnaires;e.length>0||n.length>0?W["a"].download(JSON.stringify({studies:e,questionnaires:n}),"e-q.json"):(this.alertMessage="No data to save",this.isAlertVisible=!0)},e.prototype.importData=function(){var t=this.$refs.fileUpload;t.click()},e.prototype.importFile=function(t){var e,n=this,i=null===(e=t.target.files)||void 0===e?void 0:e.item(0);i&&W["a"].read(i).then((function(t){if(void 0===t.studies||void 0===t.questionnaires)throw new Error;n.$store.commit("setStudies",t.studies),n.$store.commit("setQuestionnaires",t.questionnaires),n.$store.dispatch("save")})).catch((function(){n.alertMessage="Cannot load the file",n.isAlertVisible=!0}))},e.prototype.signIn=function(){K.signIn()},e.prototype.created=function(){return Object(o["a"])(this,void 0,void 0,(function(){var t,e,n=this;return Object(o["d"])(this,(function(i){switch(i.label){case 0:this.$store.dispatch("connect","local").then((function(){(n.$store.state.studies.length||n.$store.state.questionnaires.length)&&(n.isAppWarningVisible=!1)})),navigator.storage.persisted().then((function(t){if(!t)return navigator.storage.persisted();n.isAppWarningVisible=!1})).then((function(t){t&&(n.isAppWarningVisible=!1)})),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,K.load()];case 2:return t=i.sent(),t&&(this.$store.commit("setUser",t),this.$store.dispatch("save")),[3,4];case 3:return e=i.sent(),console.log(e),[3,4];case 4:return[2]}}))}))},e=Object(o["b"])([Object(a["a"])({components:{Studies:R,Questionnaires:G,studyViewer:X}})],e),e}(a["c"]),Z=H,z=Z,tt=(n("7768"),n("0798")),et=n("7496"),nt=n("40dc"),it=n("a523"),rt=n("ce7e"),st=n("553a"),ot=n("adda"),at=n("34c3"),ut=n("f6c4"),ct=n("e449"),lt=Object(E["a"])(z,r,s,!1,null,null,null),dt=lt.exports;Q()(lt,{VAlert:tt["a"],VApp:et["a"],VAppBar:nt["a"],VBtn:I["a"],VContainer:it["a"],VDialog:_["a"],VDivider:rt["a"],VFooter:st["a"],VIcon:F["a"],VImg:ot["a"],VList:O["a"],VListItem:q["a"],VListItemIcon:at["a"],VListItemTitle:N["b"],VMain:ut["a"],VMenu:ct["a"],VSpacer:J["a"],VSubheader:j["a"]});var pt,ft=n("2f62"),ht=n("5c68");i["a"].use(ft["a"]);var mt=new ft["a"].Store({state:{isConnected:!1,user:void 0,isRunningStudy:!1,studies:[],questionnaires:[]},mutations:{setUser:function(t,e){t.user=e},setStudies:function(t,e){t.studies=[],e.forEach((function(e){return t.studies.push(g.from(e))}))},addStudy:function(t,e){t.studies.push(e)},deleteStudy:function(t,e){var n=t.studies.indexOf(e);t.studies.splice(n,1)},replaceStudy:function(t,e){var n=t.studies.findIndex((function(t){return t.id===e.id}));n>=0&&(t.studies[n]=e)},setQuestionnaires:function(t,e){t.questionnaires=[],e.forEach((function(e){return t.questionnaires.push(ht["a"].from(e))}))},addQuestionnaire:function(t,e){t.questionnaires.push(e)},deleteQuestionnaire:function(t,e){var n=t.questionnaires.indexOf(e);t.questionnaires.splice(n,1)},replaceQuestionnaire:function(t,e){var n=t.questionnaires.findIndex((function(t){return t.id===e.id}));n>=0&&(t.questionnaires[n]=e)},addParticipant:function(t,e){e.study.participants.push(e.participant)},setStudyStatus:function(t,e){t.isRunningStudy=e}},actions:{connect:function(t,e){var n=t.commit,i=t.state;if(!i.isConnected){if(pt=e,"local"!==pt)throw new Error("Storage: this URL is not supported");var r=localStorage.getItem("e-q");if(r){var s=JSON.parse(r);n("setStudies",s.studies),n("setQuestionnaires",s.questionnaires)}i.isConnected=!0}},save:function(t){t.commit;var e=t.state;"local"===pt&&localStorage.setItem("e-q",JSON.stringify({studies:e.studies,questionnaires:e.questionnaires}))}}}),At=mt,vt=n("f309");i["a"].use(vt["a"]);var gt=new vt["a"]({}),yt=n("9483");Object(yt["a"])("/e-q/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),i["a"].config.productionTip=!1,new i["a"]({store:At,vuetify:gt,render:function(t){return t(dt)}}).$mount("#app")},cf05:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAFMUlEQVR42mL8//8/Ayng7aR8BhIBGxAHQrEWEOviUXsfiE8B8Q4gXgPEX4i1RDhvIgM5ACCAWBhoB9SBOA2IY4FYlEg9ilAcDsSTgXgZENcD8QtaORIggJhoYCbIA9uB+AYQF5HgeXTAAw3A20CcQ6sAAAggagcAKLYvAbEHFc3kgaaG+dDsRFUAEEDUDABQbC+COpgWIAGasqgaCAABxERFz/cy0B44QVMC1QBAAFEjAOyBuIuBfiAKiDOpZRhAADFRIX8uBWJmMvVfA+LXZOhrAWJpagQAQABRGgDVJDjkLxAvAGJPIOYFYkYg1gZiMSgbJD4Xqo4QEALidmoEAEAAURIAEtC8TwzYB8R6QJwIbeRga+CAxFOA2ASIbxKZFeQoDQCAAKIkANKILJFBjRk3aHInBlwAYgciAgGU7UopDQCAACI3AJih1RIxMR9HZLJGBqCWXxAQ/yKi3cFJSQAABBC5AWAJbfHhA1+gSfovmXaAUkwrATX8QOxHSQAABBC5AeBKhJqJ0M4NJWAKEH8noMabEgsAAoiSFECoxJ9FhUL6HbQMIdQOIRsABBC5AWBMREH2iEptlfUE5OWgNRJZACCAyAkAISjGB05RseV3nAoRghMABBA5AaBIhJoLVAwAUDZ4SkCNCrmGAwQQuSmAEHjEQF1wn4hsQBYACCAWGgXARzxyIUSagQw4aRUAAAFETgAQ0/HBN5ZXx4B/XJDcZjlZACCAaDEkNhCAn1yNAAE0XAKA7FEigAAaLgFAdn8AIICGSwCQDQACaMQHAEAAsQyAndeI6OaSCsieOAEIIHIC4DsRavANjUcMphQAEEDkZAFi5utEh0oWAAggcgLgI5X6C4MCAAQQOQFATDvfZqgEAEAAkRMAL6A9NHzAiYH8uQK6AoAAIrcaJNTdFYJ2egY9AAggcgNgNxFqWhhoMJtLbQAQQOQGwFYi1IAGKSZTyZ2gWmU7LVIVQACRGwCXGYgb9UmDBgIl5QGoQD3DAFlzsILagQAQQJQ0hacTqQ60uuMAA+njdqAxg41AfJgBMeDBTO1AAAggSgJgMQPhsTr0WNzFAJnaVsfj6WpogIFWmmCb9IAFQjg1AgAggCjpC4CaxGUMkOlxYoErA+qkyndo30CLxC4tM5K9KykJAIAAorQ3CJq02ERhP96YzP48LBAoSgkAAUSN7jBoyvvOANViIHspmoMACCBqBACoVeg2AIEAmj53YKBw/hEggKg1IAJyhBUDdWeEiPE8xQsoAQKImiNCoLU+tgyQlZ3faej5F9TyPAgABBC1h8RAIz1NQGzIQHhSkxwAmnWOZqDi0lmAAGKiYRIFrfAwB+KDVDS3gwGy6oRqACCAaD0meAqaXF2JaL2BGlWg0aYuHE3nC9DsRVUAEED0GhTdTWQPcgKefkMNA/nLbXACgAAaTMPiEtDOE65aZistLAUIoMEUADl4WoTraWUpQAANpgAIJFCW0AQABNBgCQAhaIcIX91PEwAQQIMlAAgtcaHZ0BpAAA2WACA0v69FK4sBAmiwBAChyRbQVjWa7EQBCKDBEgCE9gwoQvv+QtS2GCCAWAZJADyCdqvxeRA0PPaQATICdAracnwBxU/JtRgggAZLCgC18HYQoQ6UDZKBeCYQb2GAjDNStKUOIIAGUztg5UBYChBAgykANlG550gUAAigwbZEJpqB+qtM8QKAABpsAQAqzGyp3efHBwACaDAukgKlAGdoarhAa8sAAoiFYfCCZVCsDu0omTFApsjUqdkoAggwADxptMI56RJRAAAAAElFTkSuQmCC"},db5a:function(t,e,n){"use strict";var i=n("1559"),r=function(){function t(t,e,n){var r;this.answers=[],this.id=t,this.name=null!==e&&void 0!==e?e:"",this.answers=null!==(r=null===n||void 0===n?void 0:n.map((function(t){return i["f"].from(t)})))&&void 0!==r?r:this.answers}return t.from=function(e){var n=new t(e.id,e.name);return n.answers=e.answers?e.answers.map((function(t){return i["f"].from(t)})):n.answers,n},t}(),s=function(){function t(t,e){this.id=4e8+Math.round(99999999*Math.random()),this.questionnaires=[],this.name=t,e&&(this.questionnaires=e.map((function(t){return new r(t.id,t.name,t.items)})))}return t.from=function(e){var n,i=new t(null!==(n=e.name)&&void 0!==n?n:"--undefined--");return i.questionnaires=e.questionnaires?e.questionnaires.map((function(t){return r.from(t)})):i.questionnaires,i},t}();e["a"]=s}});