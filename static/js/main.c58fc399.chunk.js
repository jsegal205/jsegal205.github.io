(this["webpackJsonpjsegal205.github.io"]=this["webpackJsonpjsegal205.github.io"]||[]).push([[0],{13:function(e,t,n){},156:function(e,t,n){},157:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(44),r=n.n(l),o=(n(55),n(13),n(12)),i=n(8),u=n(49),s=n(47),m=n(16),E=n.n(m),h=function(){var e=Object(a.useState)(),t=Object(s.a)(e,2),n=t[0],l=t[1];return Object(a.useEffect)((function(){E.a.get("".concat("https://api.jimsegal.com","/recipes")).then((function(e){var t=e.data;l(t)}))}),[]),n&&n.length?c.a.createElement("section",null,c.a.createElement("h2",null,"Recipes"),c.a.createElement("ul",null,n.map((function(e){return c.a.createElement("li",{key:e.slug},c.a.createElement(o.b,{to:{pathname:"/recipe/".concat(e.slug),state:Object(u.a)({},e)}},e.title))})))):c.a.createElement("section",null,"Loading...")},p=n(48),f=n(27),g=n.n(f),d=(n(156),function(){return c.a.createElement("h1",null,"Not Found")}),v=function(e){var t=Object(a.useState)(),n=Object(p.a)(t,2),l=n[0],r=n[1],o=function(e){var t=e.pathname,n=e.state;if(n&&n.slug)return n.slug;var a=t.split("/");return a[a.length-1]}(e.location);if(Object(a.useEffect)((function(){E.a.get("".concat("https://api.jimsegal.com","/recipe/").concat(o)).then((function(e){var t=e.data;r(t)})).catch((function(e){var t=e.response;404===t.status&&r({status:t.status})}))}),[o]),!l)return c.a.createElement("section",null,"Loading...");if(404===l.status)return c.a.createElement(d,null);var i=l.title,u=l.referenceLink,s=l.ingredients,m=l.directions;return c.a.createElement("section",null,c.a.createElement("h2",null,i),c.a.createElement("small",null,c.a.createElement("a",{href:u,target:"_blank",rel:"noopener noreferrer"},"Original Reference")),c.a.createElement("h3",null,"Ingredients"),c.a.createElement("div",{className:"ingredients"},c.a.createElement(g.a,{source:s})),c.a.createElement("h3",null,"Directions"),c.a.createElement("div",{className:"directions"},c.a.createElement(g.a,{source:m})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement((function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",null,c.a.createElement("h1",null,"Jim Segal Projects")),c.a.createElement(o.a,null,c.a.createElement("article",null,c.a.createElement("nav",null,c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(o.b,{to:"/recipes"},"All Recipes")))),c.a.createElement("hr",null),c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/",component:h}),c.a.createElement(i.a,{path:"/recipes",component:h}),c.a.createElement(i.a,{path:"/recipe/:recipeSlug",component:v}),c.a.createElement(i.a,{path:"*",component:d})))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},50:function(e,t,n){e.exports=n(157)},55:function(e,t,n){}},[[50,1,2]]]);
//# sourceMappingURL=main.c58fc399.chunk.js.map