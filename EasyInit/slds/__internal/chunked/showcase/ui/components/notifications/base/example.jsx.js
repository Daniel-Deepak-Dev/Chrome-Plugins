var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/components/notifications/base/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([53,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,t){e.exports=React},155:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.examples=void 0;var i=d(a(0)),l=d(a(4)),n=d(a(3)),s=a(7),o=(d(a(2)),d(a(1)));function d(e){return e&&e.__esModule?e:{default:e}}var c=function(e){return i.default.createElement("div",{className:"slds-notification-container"},e.children)},r=function(e){l.default.uniqueId("dialog-heading-id-");var t=l.default.uniqueId("dialog-body-id-");return i.default.createElement("section",{className:"slds-notification",role:"dialog","aria-labelledby":e.headingID,"aria-describedby":t},i.default.createElement("div",{className:"slds-notification__body",id:t},i.default.createElement("a",{className:"slds-notification__target slds-media",href:"javascript:void(0);"},i.default.createElement(s.StandardIcon,{containerClassName:"slds-media__figure",className:"slds-icon--small",assistiveText:!1,symbol:e.type,title:e.type}),i.default.createElement("div",{className:"slds-media__body"},i.default.createElement("h2",{className:"slds-text-heading--small slds-m-bottom--xx-small",id:e.headingID},i.default.createElement("span",{className:"slds-assistive-text"},e.type+" notification:"),e.title),i.default.createElement("p",null,e.description))),i.default.createElement(n.default,{className:"slds-button--icon-container slds-notification__close",symbol:"close",assistiveText:"Dismiss "+e.title+" notification",title:"Dismiss "+e.title+" notification"})),e.footer?i.default.createElement("footer",{className:(0,o.default)("slds-notification__footer",e.footerClassName)},e.footer):null)};t.default=i.default.createElement("div",{className:"demo-only slds-is-relative",style:{height:"4.5rem"}},i.default.createElement(c,null,i.default.createElement("div",{"aria-live":"assertive","aria-atomic":"true",className:"slds-assistive-text"},"event notification: Tesla - Renewal meeting"),i.default.createElement(r,{headingID:"noti52",type:"event",title:"Tesla - Renewal meeting",description:"Event at 11:00am on Jan 8"})));t.examples=[{id:"task-notification",label:"Task Notification",element:i.default.createElement("div",{className:"demo-only slds-is-relative",style:{height:"4.5rem"}},i.default.createElement(c,null,i.default.createElement("div",{"aria-live":"assertive","aria-atomic":"true",className:"slds-assistive-text"},"task notification: Call Two: Jane Johnson"),i.default.createElement(r,{headingID:"noti77",type:"task",title:"Call Two: Jane Johnson",description:"Task due on Jan 8"})))},{id:"stacked-2",label:"Stacked Notifications",element:i.default.createElement("div",{className:"demo-only slds-is-relative",style:{height:"15rem"}},i.default.createElement(c,null,i.default.createElement("div",{"aria-live":"assertive","aria-atomic":"true",className:"slds-assistive-text"},"task notification: Call Two: Jane Johnson"),i.default.createElement(r,{headingID:"noti77",type:"task",title:"Call Two: Jane Johnson",description:"Task due on Jan 8"}),i.default.createElement(r,{headingID:"noti52",type:"event",title:"Tesla - Renewal meeting",description:"Event at 11:00am on Jan 8"})))},{id:"stacked-3",label:"Three Stacked Notifications",element:i.default.createElement("div",{className:"demo-only slds-is-relative",style:{height:"15rem"}},i.default.createElement(c,null,i.default.createElement("div",{"aria-live":"assertive","aria-atomic":"true",className:"slds-assistive-text"},"task notification: Call Two: Jane Johnson"),i.default.createElement(r,{headingID:"noti77",type:"task",title:"Call Two: Jane Johnson",description:"Task due on Jan 8"}),i.default.createElement(r,{headingID:"noti52",type:"event",title:"Tesla - Renewal meeting",description:"Event at 11:00am on Jan 8"}),i.default.createElement(r,{headingID:"noti66",type:"task",title:"Call Three: Jim Jameson",description:"Task due on Jan 8"})))},{id:"overflow-six",label:"Six Stacked Notifications",element:i.default.createElement("div",{className:"demo-only slds-is-relative",style:{height:"17rem"}},i.default.createElement(c,null,i.default.createElement("div",{"aria-live":"assertive","aria-atomic":"true",className:"slds-assistive-text"},"task notification: Call Two: Jane Johnson"),i.default.createElement(r,{headingID:"noti77",type:"task",title:"Call Two: Jane Johnson",description:"Task due on Jan 8"}),i.default.createElement(r,{headingID:"noti52",type:"event",title:"Tesla - Renewal meeting",description:"Event at 11:00am on Jan 8"}),i.default.createElement(r,{headingID:"noti66",type:"task",title:"Call Three: Jim Jameson",description:"Task due on Jan 8"}),i.default.createElement(r,{headingID:"noti48",type:"task",title:"Call Two: Jane Johnson",description:"Task due on Jan 8"}),i.default.createElement(r,{headingID:"noti59",type:"event",title:"Tesla - Renewal meeting",description:"Event at 11:00am on Jan 8"}),i.default.createElement(r,{headingID:"noti86",type:"task",title:"Call Three: Jim Jameson",description:"Task due on Jan 8"})))}]}},[155]);