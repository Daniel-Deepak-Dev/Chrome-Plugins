var SLDS=SLDS||{};SLDS["__internal/chunked/showcase/ui/utilities/grid/example.jsx.js"]=webpackJsonpSLDS___internal_chunked_showcase([20,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],{0:function(e,l){e.exports=React},65:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.examples=l.Context=void 0;var a,s=t(0),i=(a=s)&&a.__esModule?a:{default:a};l.Context=function(e){return i.default.createElement("div",{className:"demo-only-grid"},e.children)},l.examples=[{id:"stretch",label:"Column Stretch",element:i.default.createElement("div",{className:"slds-grid"},i.default.createElement("div",{className:"slds-col"}),i.default.createElement("div",{className:"slds-col"})),description:"By default, the grid items within a `.slds-grid` do not stretch to take up that available white-space on the main axis. Apply `.slds-col` to a grid item, it will stretch across the main axis. The width of each grid item will be determined by the content within that region."},{id:"stretch-gutters",label:"Column Stretch w/ Gutters",element:i.default.createElement("div",{className:"slds-grid slds-grid_pull-padded-medium"},i.default.createElement("div",{className:"slds-col slds-p-horizontal_medium"}),i.default.createElement("div",{className:"slds-col slds-p-horizontal_medium"})),description:"To apply gutters between each grid item, the following spacing classes are available to add your intended gutters, `.slds-p-horizontal_small`, `.slds-p-horizontal_medium`, `.slds-p-horizontal_large`, `.slds-p-around_small`, `.slds-p-around_medium` and `.slds-p-around_large`. You may need to pull the grid items back to their original grid boundaries of the grid container, apply the classes `.slds-grid_pull-padded`, `.slds-grid_pull-padded-medium` or `.slds-grid_pull-padded-large` to the `.slds-grid`."},{id:"no-stretch",label:"No Column Stretch",element:i.default.createElement("div",{className:"slds-grid"},i.default.createElement("div",null),i.default.createElement("div",null))},{id:"no-stretch-gutters",label:"No Column Stretch w/ Gutters",element:i.default.createElement("div",{className:"slds-grid slds-grid_pull-padded-medium"},i.default.createElement("div",{className:"slds-p-horizontal_medium"}),i.default.createElement("div",{className:"slds-p-horizontal_medium"}))},{id:"regions-with-sizing",label:"Manual Sizing",element:i.default.createElement("div",{className:"slds-grid slds-wrap slds-grid_pull-padded"},i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-1"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-2 slds-medium-size_5-of-6 slds-large-size_8-of-12"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-2 slds-medium-size_1-of-6 slds-large-size_4-of-12"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-1 slds-large-size_1-of-3"},i.default.createElement("div",{className:"slds-grid slds-wrap slds-grid_pull-padded"},i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-2 slds-medium-size_1-of-1 slds-large-size_1-of-2"}),i.default.createElement("div",{className:"slds-p-horizontal_small slds-size_1-of-2 slds-medium-size_1-of-1 slds-large-size_1-of-2"})))),description:"If you need to set explicit widths to your grid items, apply the sizing classes to your grid items. Check out [sizing helpers here](/utilities/sizing)."},{id:"horizontal-align-center",label:"Horizontal Alignment - Center",element:i.default.createElement("div",{className:"slds-grid slds-grid_align-center"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"If you want your columns to grow from the the center of the main (horizontal) axis, apply the class `slds-grid_align-center`."},{id:"horizontal-align-space",label:"Horizontal Alignment - Space",element:i.default.createElement("div",{className:"slds-grid slds-grid_align-space"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"To evenly distribute columns on the main axis with an equal amount of white space separating the columns, apply the class `slds-grid_align-space`."},{id:"horizontal-align-spread",label:"Horizontal Alignment - Spread",element:i.default.createElement("div",{className:"slds-grid slds-grid_align-spread"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"To spread out your columns on the main axis, with the first column starting at the start of your main axis and last item ending at the far end of your main axis, apply the class `.slds-grid_align-spread`."},{id:"horizontal-align-end",label:"Horizontal Alignment - End",element:i.default.createElement("div",{className:"slds-grid slds-grid_align-end"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"If you want your columns to grow from the end of the main axis, apply the class `.slds-grid_align-end`."},{id:"vertical-align-start",label:"Vertical Alignment - Start",element:i.default.createElement("div",{className:"slds-grid slds-grid_vertical-align-start"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"To align a single row or multi-line rows to the beginning of the cross axis, apply the class `.slds-grid_vertical-align-start`. Note, to vertically align elements on a cross-axis of a `.slds-grid`, the elements need available vertical white space. This is usually achieved by having a height applied to the `.slds-grid`."},{id:"vertical-align-center",label:"Vertical Alignment - Center",element:i.default.createElement("div",{className:"slds-grid slds-grid_vertical-align-center"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"To vertically center align a single row or multi-line rows to the height of a grid container, apply the class `.slds-grid_vertical-align-center`. Note, to vertically align elements on a cross-axis of a `.slds-grid`, the elements need available vertical white space. This is usually achieved by having a height applied to the `.slds-grid`.When `.slds-grid_vertical-align-center` is used in conjunction with `.slds-grid_align-center`, the outcome would horizontally and vertically center align your content in the center of the `.slds-grid`."},{id:"vertical-align-end",label:"Vertical Alignment - End",element:i.default.createElement("div",{className:"slds-grid slds-grid_vertical-align-end"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"To align a single row or multi-line rows to the end of the cross axis, apply the class `.slds-grid_vertical-align-center`. Note, to vertically align elements on a cross-axis of a `.slds-grid`, the elements need available vertical white space. This is usually achieved by having a height applied to the `.slds-grid`."},{id:"vertical-align-item",label:"Vertical Alignment - Item",element:i.default.createElement("div",{className:"slds-grid"},i.default.createElement("div",{className:"slds-align-top"}),i.default.createElement("div",{className:"slds-align-middle"}),i.default.createElement("div",{className:"slds-align-bottom"})),description:"To specify the vertical placement of grid items on the cross axis, you can apply `.slds-align-top`, `.slds-align-middle`, and `.slds-align-bottom` to a grid item. Note, to vertically align elements on a cross-axis of a `.slds-grid`, the elements need available vertical white space. This is usually achieved by having a height applied to the `.slds-grid`."},{id:"vertical-strecth",label:"Vertical Stretch",element:i.default.createElement("div",{className:"slds-grid slds-grid_vertical-stretch"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null)),description:"By default, grid items extend vertically unless `.slds-wrap` is applied to your parent grid container or you have multiple rows. If you have need multiple rows that stretch the height of the parent grid container, you can apply the class `.slds-grid_vertical-stretch`. Note, to vertically align elements on a cross-axis of a `.slds-grid`, the elements need available vertical white space. This is usually achieved by having a height applied to the `.slds-grid`."},{id:"align-item-bump",label:"Alignment Item Bump",element:i.default.createElement("div",{className:"slds-grid"},i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",null),i.default.createElement("div",{className:"slds-col_bump-left"}),i.default.createElement("div",null)),description:'To "bump" a single grid item or a grid item plus the precedding grid items that follow, apply the class `.slds-col_bump-{direction}`, with `{direction}` being either `left`, `right`, `top` or `bottom` to a grid item.'},{id:"order",label:"Ordering",element:i.default.createElement("div",{className:"slds-grid"},i.default.createElement("div",{className:"slds-order_2 slds-medium-order_1 slds-large-order_3"}),i.default.createElement("div",{className:"slds-order_3 slds-medium-order_2 slds-large-order_2"}),i.default.createElement("div",{className:"slds-order_1 slds-medium-order_3 slds-large-order_1"})),description:"These helper classes visually reorder grid elements independently from their position in the markup."},{id:"container-app-frame",label:"Container - App Frame",element:i.default.createElement("div",{className:"slds-grid slds-grid_frame"},i.default.createElement("div",null)),description:"If you want your application to fill 100% of the width and height of the viewport and nest other grids inside, use the top-level app helper class `.slds-grid_frame`."},{id:"containers",label:"Containers",element:i.default.createElement("div",{className:"slds-grid slds-grid_vertical"},i.default.createElement("div",{className:"slds-container_small"}),i.default.createElement("div",{className:"slds-container_medium"}),i.default.createElement("div",{className:"slds-container_large"}),i.default.createElement("div",{className:"slds-container_x-large"}),i.default.createElement("div",{className:"slds-container_fluid"})),description:"You can use the grid system&rsquo;s containers to constrain your content to a certain width. You can center or left or right align the containers within your viewport."}]}},[65]);