var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/components/checkbox-toggle/base/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([89,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,l){e.exports=React},123:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.states=l.CheckboxToggleDisabled=l.CheckboxToggleChecked=l.CheckboxToggle=l.Toggle=l.Checkbox=l.FauxLabel=l.Label=l.LabelWrapper=void 0;var a=Object.assign||function(e){for(var l=1;l<arguments.length;l++){var t=arguments[l];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},n=u(t(0)),c=u(t(1));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(e){return n.default.createElement("div",a({className:"demo-only slds-size_1-of-2"},e),e.children)},r=l.LabelWrapper=function(e){return n.default.createElement("div",{className:(0,c.default)("slds-form-element",e.className)},e.children)},s=l.Label=function(e){return n.default.createElement("label",{className:(0,c.default)("slds-checkbox_toggle slds-grid",e.className),htmlFor:e.id},e.children)},o=l.FauxLabel=function(e){return n.default.createElement("span",{className:"slds-form-element__label slds-m-bottom_none"},e.children)},f=l.Checkbox=function(e){return n.default.createElement("input",{name:"checkbox",type:"checkbox",disabled:e.disabled,defaultChecked:e.checked,"aria-describedby":"toggle-desc"})},m=l.Toggle=function(e){return n.default.createElement("span",{id:"toggle-desc",className:(0,c.default)("slds-checkbox_faux_container",e.className),"aria-live":"assertive"},n.default.createElement("span",{className:"slds-checkbox_faux"}),n.default.createElement("span",{className:(0,c.default)("slds-checkbox_on",e.className)},"Enabled"),n.default.createElement("span",{className:(0,c.default)("slds-checkbox_off",e.className)},"Disabled"))},b=l.CheckboxToggle=function(e){return n.default.createElement(d,null,n.default.createElement(r,null,n.default.createElement(s,null,n.default.createElement(o,null,"Toggle Label"),n.default.createElement(f,null),n.default.createElement(m,null))))},i=l.CheckboxToggleChecked=function(e){return n.default.createElement(d,null,n.default.createElement(r,null,n.default.createElement(s,null,n.default.createElement(o,null,"Toggle Label"),n.default.createElement(f,{checked:!0}),n.default.createElement(m,null))))},g=l.CheckboxToggleDisabled=function(e){return n.default.createElement(d,null,n.default.createElement(r,null,n.default.createElement(s,null,n.default.createElement(o,null,"Toggle Label"),n.default.createElement(f,{disabled:!0}),n.default.createElement(m,null))))};l.default=n.default.createElement(b,null);l.states=[{id:"checkbox-toggle-checked",label:"Checked",element:n.default.createElement(i,null)},{id:"checkbox-toggle-disabled",label:"Disabled",element:n.default.createElement(g,null)}]}},[123]);