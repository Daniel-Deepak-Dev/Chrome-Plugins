var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/components/global-navigation/navigation-bar/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([61,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,t){e.exports=React},74:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.states=t.Context=t.ContextBar=void 0;var l=i(a(0)),s=i(a(2)),n=a(6),c=i(a(3)),r=a(33),d=i(a(1)),m=i(a(4));function i(e){return e&&e.__esModule?e:{default:e}}var u=l.default.createElement(n.Menu,{className:"slds-dropdown_right"},l.default.createElement(n.MenuList,null,l.default.createElement(n.MenuItem,null,l.default.createElement(s.default,{className:"slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small",sprite:"utility",symbol:"add"}),"Main action"),l.default.createElement("li",{className:"slds-dropdown__header slds-has-divider_top-space",role:"separator"},l.default.createElement("span",{className:"slds-text-title_caps"},"Menu header")),l.default.createElement(n.MenuItem,null,"Menu Item One"),l.default.createElement(n.MenuItem,null,"Menu Item Two"),l.default.createElement(n.MenuItem,null,"Menu Item Three"))),o=t.ContextBar=function(e){return l.default.createElement("div",{className:(0,d.default)("slds-context-bar",e.className)},l.default.createElement("div",{className:"slds-context-bar__primary"},l.default.createElement("div",{className:"slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover"},l.default.createElement("div",{className:"slds-context-bar__icon-action"},l.default.createElement(r.WaffleIcon,{className:"slds-context-bar__button"})),l.default.createElement("span",{className:"slds-context-bar__label-action slds-context-bar__app-name"},l.default.createElement("span",{className:"slds-truncate",title:e.appName||"App Name"},e.appName||"App Name")))),l.default.createElement("nav",{className:"slds-context-bar__secondary",role:"navigation"},l.default.createElement("ul",{className:"slds-grid"},l.default.createElement("li",{className:(0,d.default)("slds-context-bar__item",e.itemActive&&"slds-is-active")},l.default.createElement("a",{href:"javascript:void(0);",className:"slds-context-bar__label-action",title:"Home"},e.itemActive&&l.default.createElement("span",{className:"slds-assistive-text"},"Current Page:"),l.default.createElement("span",{className:"slds-truncate",title:"Home"},"Home"))),l.default.createElement("li",{className:"slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover"},l.default.createElement("a",{href:"javascript:void(0);",className:"slds-context-bar__label-action",title:"Menu Item"},l.default.createElement("span",{className:"slds-truncate",title:"Menu Item"},"Menu Item")),l.default.createElement("div",{className:"slds-context-bar__icon-action slds-p-left_none"},l.default.createElement(c.default,{className:"slds-button_icon slds-context-bar__button",symbol:"chevrondown","aria-haspopup":"true",assistiveText:"Open menu item submenu",title:"Open menu item submenu"})),e.hideDropdown?null:u),e.children?e.children:m.default.times(3,function(e){return l.default.createElement("li",{className:"slds-context-bar__item",key:e},l.default.createElement("a",{href:"javascript:void(0);",className:"slds-context-bar__label-action",title:"Menu Item"},l.default.createElement("span",{className:"slds-truncate",title:"Menu Item"},"Menu Item")))}))))};t.Context=function(e){return l.default.createElement("div",{style:{height:"16rem"}},e.children)};t.default=l.default.createElement(o,{itemActive:!0});t.states=[{id:"item-active",label:"Item Active",element:l.default.createElement(o,null,l.default.createElement("li",{className:"slds-context-bar__item slds-is-active"},l.default.createElement("a",{href:"javascript:void(0);",className:"slds-context-bar__label-action",title:"Menu Item"},l.default.createElement("span",{className:"slds-assistive-text"},"Current Page:"),l.default.createElement("span",{className:"slds-truncate",title:"Menu Item"},"Menu Item"))),m.default.times(2,function(e){return l.default.createElement("li",{className:"slds-context-bar__item",key:e},l.default.createElement("a",{href:"javascript:void(0);",className:"slds-context-bar__label-action",title:"Menu Item "+e},l.default.createElement("span",{className:"slds-truncate",title:"Menu Item"},"Menu Item")))}))}]}},[74]);