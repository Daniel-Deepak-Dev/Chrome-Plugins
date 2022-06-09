var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/components/progress-indicator/base/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([42,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,t){e.exports=React},142:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.examples=t.states=t.Step=t.Progress=void 0;var a=u(l(0)),s=u(l(1)),r=(u(l(2)),u(l(3))),d=l(21),n=l(143),c=l(16);function u(e){return e&&e.__esModule?e:{default:e}}var m=t.Progress=function(e){return a.default.createElement("div",{className:(0,s.default)("slds-progress",e.className)},a.default.createElement("ol",{className:"slds-progress__list"},e.children),a.default.createElement(n.ProgressBar,{className:"slds-progress-bar_x-small",value:e.value}))},o=t.Step=function(e){return a.default.createElement("li",{className:(0,s.default)("slds-progress__item",e.className,e.active?"slds-is-active":null,e.done?"slds-is-completed":null,e.error?"slds-has-error":null)},e.done&&!e.error?a.default.createElement(r.default,{className:"slds-button_icon slds-progress__marker slds-progress__marker_icon",symbol:"success","aria-describedby":e["aria-describedby"],assistiveText:e.done?e.children+" - Completed":null,title:e.done?e.children+" - Completed":null}):e.error?a.default.createElement(r.default,{className:"slds-button_icon slds-progress__marker slds-progress__marker_icon",symbol:"warning","aria-describedby":e["aria-describedby"],assistiveText:e.error?e.children+" - Error":null,title:e.error?e.children+" - Error":null}):a.default.createElement("button",{className:"slds-button slds-progress__marker","aria-describedby":e["aria-describedby"]},a.default.createElement("span",{className:"slds-assistive-text"},e.children," ",e.active?"- Active":null)))};t.default=a.default.createElement("div",{className:"demo-only",style:{padding:"1rem"}},a.default.createElement(m,{value:"0"},a.default.createElement(o,{active:!0},"Step 1"),a.default.createElement(o,null,"Step 2"),a.default.createElement(o,null,"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")));t.states=[{id:"next-step",label:"Next Step",element:a.default.createElement("div",{className:"demo-only",style:{padding:"1rem"}},a.default.createElement(m,{value:"25"},a.default.createElement(o,{done:!0},"Step 1"),a.default.createElement(o,{active:!0},"Step 2"),a.default.createElement(o,null,"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")))},{id:"has-error",label:"Step - Error",element:a.default.createElement("div",{className:"demo-only",style:{padding:"1rem"}},a.default.createElement(m,{value:"25"},a.default.createElement(o,{done:!0},"Step 1"),a.default.createElement(o,{error:!0},"Step 2"),a.default.createElement(o,null,"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")))},{id:"tooltip",label:"Tooltip",element:a.default.createElement("div",{className:"demo-only",style:{padding:"3rem 1rem 0"}},a.default.createElement(m,{value:"50"},a.default.createElement(o,{done:!0},"Step 1"),a.default.createElement(o,{done:!0},"Step 2"),a.default.createElement(o,{active:!0,"aria-describedby":"step-3-tooltip"},"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")),a.default.createElement(d.Tooltip,{className:"slds-nubbin_bottom",id:"step-3-tooltip",style:{position:"absolute",top:"0px",left:"calc(50% + 7px)",transform:"translateX(-50%)"}},"Verify Email"))}],t.examples=[{id:"modal",label:"In a modal",element:a.default.createElement("div",{className:"demo-only",style:{height:"640px"}},a.default.createElement(c.Modal,{className:"slds-modal_large","aria-labelledby":"header43"},a.default.createElement(c.ModalHeader,null,a.default.createElement("h2",{id:"header43",className:"slds-text-heading_medium"},"Modal Header")),a.default.createElement(c.ModalContent,{className:"slds-grow slds-p-around_medium"}),a.default.createElement(c.ModalFooter,{className:"slds-grid slds-grid_align-spread"},a.default.createElement("button",{className:"slds-button slds-button_neutral"},"Cancel"),a.default.createElement(m,{className:"slds-progress_shade",value:"25"},a.default.createElement(o,{done:!0},"Step 1"),a.default.createElement(o,{active:!0},"Step 2"),a.default.createElement(o,null,"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")),a.default.createElement("button",{className:"slds-button slds-button_brand"},"Save"))),a.default.createElement("div",{className:"slds-backdrop slds-backdrop_open"}))},{id:"shade",label:"On a gray background",element:a.default.createElement("div",{className:"demo-only",style:{background:"#F3F2F2",padding:"1rem"}},a.default.createElement(m,{className:"slds-progress_shade",value:"25"},a.default.createElement(o,{done:!0},"Step 1"),a.default.createElement(o,{active:!0},"Step 2"),a.default.createElement(o,null,"Step 3"),a.default.createElement(o,null,"Step 4"),a.default.createElement(o,null,"Step 5")))}]}},[142]);