(this["webpackJsonpjsegal205.github.io"]=this["webpackJsonpjsegal205.github.io"]||[]).push([[0],{14:function(e,t,a){},159:function(e,t,a){},160:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(47),r=a.n(l),i=(a(56),a(14),a(13)),o=a(1),s=a(17),u=a(19);u.a.initialize("UA-45142145-1",{testMode:!1,gaOptions:{cookieDomain:"auto"}});var m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=function(e){u.a.set(Object(s.a)({page:e},t)),u.a.pageview(e)},l=function(t){return Object(n.useEffect)((function(){return a(t.location.pathname)}),[t.location.pathname]),c.a.createElement(e,t)};return l},p=a(10),E=a(28),f=a.n(E),h=a(48),d=a(49),g=a.n(d),v=function(e,t){var a=Object(n.useState)(t),c=Object(p.a)(a,2),l=c[0],r=c[1],i=Object(n.useState)(!0),o=Object(p.a)(i,2),s=o[0],u=o[1];return Object(n.useEffect)((function(){(function(){var t=Object(h.a)(f.a.mark((function t(){var a,n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,u(!0),t.next=4,g.a.get(e);case 4:a=t.sent,r(a.data),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),n=t.t0.response,r({status:n.status});case 12:return t.prev=12,u(!1),t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,8,12,15]])})));return function(){return t.apply(this,arguments)}})()()}),[e]),{loading:s,data:l}},b=(a(76),function(){var e=v("".concat("https://api.jimsegal.com","/recipes")),t=e.loading,a=e.data,l=Object(n.useState)(""),r=Object(p.a)(l,2),o=r[0],u=r[1],m=Object(n.useState)([]),E=Object(p.a)(m,2),f=E[0],h=E[1];return Object(n.useEffect)((function(){if(!t){var e=a.filter((function(e){return e.title.toLowerCase().includes(o.toLowerCase())}));h(e)}}),[t,a,o]),c.a.createElement("section",null,c.a.createElement("h2",null,"Recipes"),t&&c.a.createElement("section",null,"Loading..."),a&&a.length&&c.a.createElement(c.a.Fragment,null,c.a.createElement("section",{className:"recipes-filter-container"},c.a.createElement("label",{htmlFor:"recipes-filter"},"Search"),c.a.createElement("input",{type:"text",id:"recipes-filter",className:"recipes-filter-input",value:o,onChange:function(e){u(e.target.value)},"data-testid":"recipes-filter"}),o&&c.a.createElement("button",{className:"recipes-filter-reset",onClick:function(){u("")},"data-testid":"recipes-filter-reset"},"reset")),f.length?c.a.createElement("ul",{"data-testid":"recipes-list"},f.map((function(e){return c.a.createElement("li",{key:e.slug},c.a.createElement(i.b,{to:{pathname:"/recipe/".concat(e.slug),state:Object(s.a)({},e)}},e.title))}))):c.a.createElement("div",{className:"recipes-no-results"},"No results for"," ",c.a.createElement("strong",null,c.a.createElement("em",null,o)))))}),j=a(18),O=a.n(j),k=(a(159),function(){return c.a.createElement("h1",null,"Not Found")}),w=function(e){var t=function(e){var t=e.pathname,a=e.state;if(a&&a.slug)return a.slug;var n=t.split("/");return n[n.length-1]}(e.location),a=v("".concat("https://api.jimsegal.com","/recipe/").concat(t)),n=a.loading,l=a.data;if(n)return c.a.createElement("section",null,"Loading...");if(404===l.status)return c.a.createElement(k,null);var r=l.title,i=l.referenceLink,o=l.ingredients,s=l.directions,u=l.notes;return c.a.createElement("section",null,c.a.createElement("h2",null,r),i&&c.a.createElement("small",null,c.a.createElement("a",{href:i,target:"_blank",rel:"noopener noreferrer"},"Original Reference")),c.a.createElement("h3",null,"Ingredients"),c.a.createElement("div",{className:"ingredients"},c.a.createElement(O.a,{source:o})),c.a.createElement("h3",null,"Directions"),c.a.createElement("div",{className:"directions"},c.a.createElement(O.a,{source:s})),u&&[c.a.createElement("h3",{key:"notes-header"},"Notes"),c.a.createElement("div",{key:"notes-desc"},c.a.createElement(O.a,{source:u}))])},x=(a(160),function(){var e=v("https://api.spacexdata.com/v3/launches/upcoming?limit=1"),t=e.loading,a=e.data,l=function(e){var t=+new Date(e)-+new Date,a={};return t>0&&(a={days:Math.floor(t/864e5),hours:Math.floor(t/36e5%24),minutes:Math.floor(t/1e3/60%60),seconds:Math.floor(t/1e3%60)}),a},r=Object(n.useState)(l()),i=Object(p.a)(r,2),o=i[0],s=i[1];Object(n.useEffect)((function(){t||setTimeout((function(){s(l(a[0].launch_date_utc))}),1e3)}));var u=[];return Object.keys(o).forEach((function(e){o[e]&&u.push(c.a.createElement("span",null,o[e]," ",e," "))})),c.a.createElement("section",{className:"spacex-container"},c.a.createElement("h2",null,"Next Space X Launch"),t&&c.a.createElement("section",null,"Loading..."),a&&a.length&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"spacex-mega"},u),c.a.createElement("h3",null,a[0].mission_name),c.a.createElement("div",{className:"spacex-item"},c.a.createElement("label",null,"Rocket:"),c.a.createElement("span",null,a[0].rocket.rocket_name)),c.a.createElement("div",{className:"spacex-item"},c.a.createElement("label",null,"Launch Site:"),c.a.createElement("span",null,a[0].launch_site.site_name_long)),c.a.createElement("div",{className:"spacex-details"},a[0].details)))}),N=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",null,c.a.createElement("h1",null,"Jim Segal Projects")),c.a.createElement(i.a,null,c.a.createElement("article",null,c.a.createElement("nav",null,c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(i.b,{to:"/recipes"},"All Recipes")),c.a.createElement("li",null,c.a.createElement(i.b,{to:"/spacex"},"Space X")))),c.a.createElement("hr",null),c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:"/",component:m(b)}),c.a.createElement(o.a,{path:"/recipes",component:m(b)}),c.a.createElement(o.a,{path:"/recipe/:recipeSlug",component:m(w)}),c.a.createElement(o.a,{path:"/spacex",component:m(x)}),c.a.createElement(o.a,{path:"*",component:m(k)})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},51:function(e,t,a){e.exports=a(161)},56:function(e,t,a){},76:function(e,t,a){}},[[51,1,2]]]);
//# sourceMappingURL=main.3f5e7688.chunk.js.map