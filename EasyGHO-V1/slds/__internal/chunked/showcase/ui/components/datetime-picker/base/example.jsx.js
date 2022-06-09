var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/components/datetime-picker/base/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([76,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,t){e.exports=React},131:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.states=t.Context=void 0;var a=m(l(0)),i=l(8),n=l(24),d=(l(5),m(l(3))),s=l(12),o=l(10);function m(e){return e&&e.__esModule?e:{default:e}}var c=function(e){return a.default.createElement(i.Listbox,{className:"slds-dropdown slds-dropdown--fluid slds-dropdown--length-5",vertical:!0},a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-01",title:"6:00am"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-02",title:"7:00am"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-03",title:"8:00am",selected:e.optionSelected})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-04",title:"9:00am"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-05",title:"10:00am"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-06",title:"11:00am"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-07",title:"12:00pm"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-08",title:"1:00pm"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-09",title:"2:00pm"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-10",title:"3:00pm"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-11",title:"4:00pm"})),a.default.createElement(i.ListboxItem,null,a.default.createElement(i.Option,{id:"listbox-option-unique-id-12",title:"5:00pm"})))};t.Context=function(e){return a.default.createElement("div",{style:{height:"25rem"}},e.children)};t.default=a.default.createElement("div",{className:"slds-form slds-form--compound"},a.default.createElement("fieldset",{className:"slds-form-element"},a.default.createElement("legend",{className:"slds-form-element__label"},"Date and Time"),a.default.createElement("div",{className:"slds-form-element__group"},a.default.createElement("div",{className:"slds-form-element__row"},a.default.createElement(s.FormElement,{className:"slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open",label:"Date",inputId:"date-input-id",inputIcon:"right",dropdown:a.default.createElement(n.DatePicker,{todayActive:!0})},a.default.createElement(o.Input,{id:"date-input-id",placeholder:" "}),a.default.createElement(d.default,{className:"slds-input__icon slds-input__icon--right",symbol:"event",assistiveText:"Select a date",title:"Select a date"})),a.default.createElement(i.ComboboxContainer,{label:"Time",autocomplete:!0,className:"slds-combobox-picklist slds-timepicker",inputIcon:"right",inputIconRightSymbol:"clock",inputIconRightAssistiveText:"Select a time",placeholder:" ",listbox:a.default.createElement(c,null)})))));t.states=[{id:"date-selection",label:"Date selected",element:a.default.createElement("div",{className:"slds-form slds-form--compound"},a.default.createElement("fieldset",{className:"slds-form-element"},a.default.createElement("legend",{className:"slds-form-element__label"},"Date and Time"),a.default.createElement("div",{className:"slds-form-element__group"},a.default.createElement("div",{className:"slds-form-element__row"},a.default.createElement(s.FormElement,{className:"slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open",label:"Date",inputId:"date-input-id",inputIcon:"right",dropdown:a.default.createElement(n.DatePicker,{todayActive:!0,dateSelected:"single",dateRange:"week-4"})},a.default.createElement(o.Input,{id:"date-input-id",placeholder:" ",defaultValue:"06/24/2014"}),a.default.createElement(d.default,{className:"slds-input__icon slds-input__icon--right",symbol:"event",assistiveText:"Select a date",title:"Select a date"})),a.default.createElement(i.ComboboxContainer,{label:"Time",autocomplete:!0,className:"slds-combobox-picklist slds-timepicker",inputIcon:"right",inputIconRightSymbol:"clock",inputIconRightAssistiveText:"Select a time",placeholder:" ",listbox:a.default.createElement(c,null)})))))},{id:"time-selection",label:"Time selected",element:a.default.createElement("div",{className:"slds-form slds-form--compound"},a.default.createElement("fieldset",{className:"slds-form-element"},a.default.createElement("legend",{className:"slds-form-element__label"},"Date and Time"),a.default.createElement("div",{className:"slds-form-element__group"},a.default.createElement("div",{className:"slds-form-element__row"},a.default.createElement(s.FormElement,{className:"slds-dropdown-trigger slds-dropdown-trigger_click",label:"Date",inputId:"date-input-id",inputIcon:"right",dropdown:a.default.createElement(n.DatePicker,{todayActive:!0,dateSelected:"single",dateRange:"week-4"})},a.default.createElement(o.Input,{id:"date-input-id",placeholder:" ",defaultValue:"06/24/2014"}),a.default.createElement(d.default,{className:"slds-input__icon slds-input__icon--right",symbol:"event",assistiveText:"Select a date",title:"Select a date"})),a.default.createElement(i.ComboboxContainer,{label:"Time",autocomplete:!0,isOpen:!0,className:"slds-combobox-picklist slds-timepicker",inputIcon:"right",inputIconRightSymbol:"clock",inputIconRightAssistiveText:"Select a time",placeholder:" ",value:"8:00am",listbox:a.default.createElement(c,{optionSelected:!0})})))))}]}},[131]);