(this["webpackJsonpjsegal205.github.io"]=this["webpackJsonpjsegal205.github.io"]||[]).push([[0],{247:function(e,t,a){e.exports=a(628)},252:function(e,t,a){},272:function(e,t,a){},35:function(e,t,a){},354:function(e,t,a){},355:function(e,t,a){},625:function(e,t,a){},626:function(e,t,a){},627:function(e,t,a){},628:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(74),c=a.n(l),o=(a(252),a(35),a(27)),i=a(7),s=a(43),m=a(79);m.a.initialize("UA-45142145-1",{testMode:!1,gaOptions:{cookieDomain:"auto"}});var u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=function(e){m.a.set(Object(s.a)({page:e},t)),m.a.pageview(e)},l=function(t){return Object(n.useEffect)((function(){return a(t.location.pathname)}),[t.location.pathname]),r.a.createElement(e,t)};return l},E=a(18),p="https://api.jimsegal.com",f=[{link:"/congress",subtitle:"Some fun data surrounding the current congressional sesssion",title:"Congress"},{link:"/recipes",subtitle:"A bunch of recipes that I frequent and wanted to show off",title:"Recipes"},{link:"/spacex",subtitle:"A countdown timer until the next launch of a Space X rocket",title:"Space X"}],h=a(120),d=a.n(h),g=a(209),b=a(210),v=a.n(b),y=function(e,t){var a=Object(n.useState)(t),r=Object(E.a)(a,2),l=r[0],c=r[1],o=Object(n.useState)(!0),i=Object(E.a)(o,2),s=i[0],m=i[1];return Object(n.useEffect)((function(){(function(){var t=Object(g.a)(d.a.mark((function t(){var a,n,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,m(!0),t.next=4,v.a.get(e);case 4:a=t.sent,c(a.data),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(0),n=t.t0.message,r=t.t0.response,c({error:n,status:r?r.status:"500"});case 13:return t.prev=13,m(!1),t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[0,8,13,16]])})));return function(){return t.apply(this,arguments)}})()()}),[e]),{loading:s,data:l}},N=function(e){var t=e.componentName;return r.a.createElement("section",null,r.a.createElement("h3",null,"Whoops! There was a problem loading"," ",t?"".concat(t," data."):"data."),r.a.createElement("p",null,"Please reload browser to try again in a little bit."))},k=(a(272),function(){var e=y("".concat(p,"/recipes")),t=e.loading,a=e.data,l=Object(n.useState)(""),c=Object(E.a)(l,2),i=c[0],m=c[1],u=Object(n.useState)([]),f=Object(E.a)(u,2),h=f[0],d=f[1];return Object(n.useEffect)((function(){if(!t&&a){if(a.error)return void d([]);var e=a.filter((function(e){return e.title.toLowerCase().includes(i.toLowerCase())}));d(e)}}),[t,a,i]),r.a.createElement("section",null,r.a.createElement("h2",null,"Recipes"),t&&r.a.createElement("section",null,"Loading..."),a&&a.error&&r.a.createElement(N,{componentName:"Recipes"}),a&&a.length&&r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"recipes-filter-container"},r.a.createElement("label",{htmlFor:"recipes-filter"},"Search"),r.a.createElement("input",{type:"text",id:"recipes-filter",className:"recipes-filter-input",value:i,onChange:function(e){m(e.target.value)},"data-testid":"recipes-filter"}),i&&r.a.createElement("button",{className:"recipes-filter-reset",onClick:function(){m("")},"data-testid":"recipes-filter-reset"},"reset")),h.length?r.a.createElement("ul",{"data-testid":"recipes-list"},h.map((function(e){return r.a.createElement("li",{key:e.slug},r.a.createElement(o.b,{to:{pathname:"/recipe/".concat(e.slug),state:Object(s.a)({},e)}},e.title))}))):r.a.createElement("div",{className:"recipes-no-results"},"No results for"," ",r.a.createElement("strong",null,r.a.createElement("em",null,i)))))}),w=a(77),j=a.n(w),O=function(){return r.a.createElement("h1",null,"Not Found")},F=(a(354),function(e){var t=function(e){var t=e.pathname,a=e.state;if(a&&a.slug)return a.slug;var n=t.split("/");return n[n.length-1]}(e.location),a=y("".concat(p,"/recipe/").concat(t)),n=a.loading,l=a.data;if(n)return r.a.createElement("section",null,"Loading...");if(404===l.status)return r.a.createElement(O,null);if(l.error)return r.a.createElement(N,{componentName:"Recipe"});var c=l.title,o=l.referenceLink,i=l.ingredients,s=l.directions,m=l.notes;return r.a.createElement("section",null,r.a.createElement("h2",null,c),o&&r.a.createElement("small",null,r.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer"},"Original Reference")),r.a.createElement("h3",null,"Ingredients"),r.a.createElement("div",{className:"ingredients"},r.a.createElement(j.a,{source:i})),r.a.createElement("h3",null,"Directions"),r.a.createElement("div",{className:"directions"},r.a.createElement(j.a,{source:s})),m&&[r.a.createElement("h3",{key:"notes-header"},"Notes"),r.a.createElement("div",{key:"notes-desc"},r.a.createElement(j.a,{source:m}))])}),D=(a(355),function(){var e=y("https://api.spacexdata.com/v3/launches/upcoming?limit=1"),t=e.loading,a=e.data,l=function(){var e={};if(!t){if(a.error)return e;if(a[0]){var n=+new Date(a[0].launch_date_utc)-+new Date;n>0&&(e={days:Math.floor(n/864e5),hours:Math.floor(n/36e5%24),minutes:Math.floor(n/1e3/60%60),seconds:Math.floor(n/1e3%60)})}}return e},c=Object(n.useState)(l()),o=Object(E.a)(c,2),i=o[0],s=o[1];Object(n.useEffect)((function(){var e=setTimeout((function(){s(l())}),1e3);return function(){return clearTimeout(e)}}));var m=[];return Object.keys(i).forEach((function(e){("seconds"===e||i[e])&&m.push(r.a.createElement("div",{key:e},i[e]," ",e," "))})),r.a.createElement("section",{className:"spacex-container"},r.a.createElement("h2",null,"Next Space X Launch"),t&&r.a.createElement("section",null,"Loading..."),a&&a.error&&r.a.createElement(N,{componentName:"SpaceX"}),a&&a.length&&r.a.createElement(r.a.Fragment,null,a.map((function(e){var t=new Date(e.launch_date_utc).toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"});return r.a.createElement(n.Fragment,{key:e.mission_name},r.a.createElement("div",{className:"spacex-mega"},m),r.a.createElement("h3",null,e.mission_name),r.a.createElement("div",{className:"spacex-item"},r.a.createElement("label",null,"When:"),r.a.createElement("span",null,t)),r.a.createElement("div",{className:"spacex-item"},r.a.createElement("label",null,"Rocket:"),r.a.createElement("span",null,e.rocket.rocket_name)),r.a.createElement("div",{className:"spacex-item"},r.a.createElement("label",null,"Launch Site:"),r.a.createElement("span",null,e.launch_site.site_name_long)),r.a.createElement("div",{className:"spacex-details"},e.details))}))))}),M=function(){var e=window;return{height:e.innerHeight,width:e.innerWidth}},S=function(){var e=Object(n.useState)(M()),t=Object(E.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){var e=function(){r(M())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a},R=a(9),x=(a(625),function(){var e=y("".concat(p,"/congress/stats")),t=e.loading,a=e.data,n=S().width,l={D:"democrat",F:"female",M:"male",R:"republican",house:"House of Representatives",senate:"Senate"},c=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},o=function(e,t){return r.a.createElement("div",null,r.a.createElement("label",null,e,": "),r.a.createElement("span",null,t))},i=function(e){var t=Object.keys(e).map((function(t){return Object(s.a)({},e[t],{age:t})}));return r.a.createElement("section",{className:"chamber-chart"},r.a.createElement("h3",null,"Distrobution of age"),r.a.createElement(R.b,{width:.9*n,height:400,data:t,barGap:"10%",barCategoryGap:"20%",margin:{top:20,right:10,left:10,bottom:20}},r.a.createElement(R.c,{strokeDasharray:"3 3"}),r.a.createElement(R.i,{dataKey:"age",label:{value:"Age",position:"bottom"}}),r.a.createElement(R.j,{allowDecimals:!1}),r.a.createElement(R.h,null),r.a.createElement(R.e,{verticalAlign:"top"}),r.a.createElement(R.a,{dataKey:"D",stackId:"a",fill:"#0015BC",name:c(l.D)}),r.a.createElement(R.a,{dataKey:"R",stackId:"a",fill:"#E9141D",name:c(l.R)}),r.a.createElement(R.a,{dataKey:"M",stackId:"b",fill:"#00D136",name:c(l.M)}),r.a.createElement(R.a,{dataKey:"F",stackId:"b",fill:"#B533FF",name:c(l.F)})))},m=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement("h4",null,"Average Age"),u("",e.average.all),r.a.createElement("section",null,r.a.createElement("h5",null,"By Party"),u(c(l.D),e.average.democrat),u(c(l.R),e.average.republican)),r.a.createElement("section",null,r.a.createElement("h5",null,"By Gender"),u(c(l.F),e.average.female),u(c(l.M),e.average.male))),E(e,"youngest"),E(e,"oldest"))},u=function(e,t){return r.a.createElement("div",null,e?r.a.createElement("label",null,e,": "):"",r.a.createElement("span",null,t," years old"))},E=function(e,t){return r.a.createElement("section",null,r.a.createElement("h4",null,c(t)," Member"),r.a.createElement("label",null,e[t].full_name),u("Age",e[t].age),o("Date of Birth",e[t].date_of_birth),o("State Representation",e[t].state),o("Gender",c(l[e[t].gender])),o("Party",c(l[e[t].party])))},f=function(e){return r.a.createElement("section",null,r.a.createElement("h4",null,"Number of Members by Gender"),h(e))},h=function(e){return r.a.createElement(r.a.Fragment,null,o("Total",e.total),o(c(l.F),"".concat(e.women," (").concat(e.percentWomen,"%)")),o(c(l.M),"".concat(e.men," (").concat(e.percentMen,"%)")))},d=function(e){return r.a.createElement("section",{className:"congress-party-section"},r.a.createElement("h4",null,"Number of Members by Party"),g(e))},g=function(e){var t=[{name:"Male",value:e.D.men,color:"#00D136"},{name:"Female",value:e.D.women,color:"#B533FF"}],a=[{name:"Male",value:e.R.men,color:"#00D136"},{name:"Female",value:e.R.women,color:"#B533FF"}];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"congress-party-chart-legend"},r.a.createElement("span",{className:"congress-party-chart-legend-item congress-party-chart-legend-item-male"},"."),r.a.createElement("span",null,"Male"),r.a.createElement("span",{className:"congress-party-chart-legend-item congress-party-chart-legend-item-female"},"."),r.a.createElement("span",null,"Female")),r.a.createElement("section",{className:"congress-party-chart-section"},r.a.createElement("h4",{className:"congress-party-chart-section-header"},"Democrats"),r.a.createElement(R.g,{width:200,height:200},r.a.createElement(R.f,{dataKey:"value",data:t,outerRadius:80},t.map((function(e){return r.a.createElement(R.d,{fill:e.color,key:e.name})}))),r.a.createElement(R.h,null)),h(e.D)),r.a.createElement("section",{className:"congress-party-chart-section"},r.a.createElement("h4",{className:"congress-party-chart-section-header"},"Republicans"),r.a.createElement(R.g,{width:200,height:200},r.a.createElement(R.f,{dataKey:"value",data:a,outerRadius:80},a.map((function(e){return r.a.createElement(R.d,{fill:e.color,key:e.name})}))),r.a.createElement(R.h,null)),h(e.R)))};return r.a.createElement("section",null,r.a.createElement("h2",{className:"congress-header"},"Congressional Information"),r.a.createElement("article",{className:"congress-citation"},r.a.createElement("span",null,"Data provided by "),r.a.createElement("a",{href:"https://projects.propublica.org/api-docs/congress-api/",target:"_blank",rel:"noopener noreferrer"},"Propublica Congress API")),t&&r.a.createElement("section",{className:"congress-header"},"Loading..."),a&&a.error&&r.a.createElement(N,{componentName:"Congress"}),a&&!a.error&&r.a.createElement("div",{className:"congress"},["house","senate"].map((function(e){return function(e,t){return r.a.createElement("article",{key:t},r.a.createElement("h3",null,l[t]),r.a.createElement("hr",null),r.a.createElement("section",{className:"chamber"},!!e[t].age.distribution&&i(e[t].age.distribution),r.a.createElement("section",{className:"chamber-data"},m(e[t].age),f(e[t].gender),d(e[t].party))))}(a,e)}))))}),_=(a(626),function(e){return"/"===e.location.pathname?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",null,r.a.createElement("ul",{className:"topnav-list"},f.map((function(e){return r.a.createElement("li",{className:"topnav-list-item",key:e.title},r.a.createElement(o.b,{to:e.link},e.title))})))),r.a.createElement("hr",null))}),C=Object(i.f)((function(e){return r.a.createElement(_,e)})),I=(a(627),function(e){return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}),L=function(e){var t=I(e),a=t.r,n=t.g,r=t.b;return Math.round((299*a+587*n+114*r)/1e3)>125?"444444":"efefef"},A=function(){return r.a.createElement("section",null,r.a.createElement("ul",{className:"project-list"},f.map((function(e){var t=Math.floor(16777215*Math.random()).toString(16),a=function(e){var t=function(e){return("00"+(255-e).toString(16)).slice(-2)},a=I(e),n=a.r,r=a.g,l=a.b;return t(n)+t(r)+t(l)}(t);return r.a.createElement("li",{key:e.title,className:"project-list-item",style:{borderColor:"#".concat(t)}},r.a.createElement(o.b,{className:"project-list-item-link",to:e.link},r.a.createElement("div",{className:"project-list-item-placeholder",style:{backgroundColor:"#".concat(a)}},r.a.createElement("h2",{className:"project-list-item-title",style:{color:"#".concat(L(a))}},e.title)),r.a.createElement("p",null,e.subtitle)))}))))},B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{role:"banner",className:"vote-banner"},"Vote on November 3, 2020. More information at"," ",r.a.createElement("a",{href:"https://www.vote.org/",target:"_blank",rel:"noopener noreferrer"},"vote.org")),r.a.createElement("header",null,r.a.createElement("h1",{className:"app-header"},"Jim Segal Projects")),r.a.createElement(o.a,null,r.a.createElement("article",null,r.a.createElement(C,null),r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/",component:u(A)}),r.a.createElement(i.a,{path:"/congress",component:u(x)}),r.a.createElement(i.a,{path:"/recipes",component:u(k)}),r.a.createElement(i.a,{path:"/recipe/:recipeSlug",component:u(F)}),r.a.createElement(i.a,{path:"/spacex",component:u(D)}),r.a.createElement(i.a,{path:"*",component:u(O)})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[247,1,2]]]);
//# sourceMappingURL=main.56c72267.chunk.js.map