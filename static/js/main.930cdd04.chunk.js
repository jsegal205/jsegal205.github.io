(this["webpackJsonpjsegal205.github.io"]=this["webpackJsonpjsegal205.github.io"]||[]).push([[0],{13:function(e,t,n){},155:function(e,t,n){},156:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(45),r=n.n(l),o=(n(54),n(13),n(12)),i=n(8),u=n(48),s=n(17),m=n(16),E=n.n(m),h=function(){var e=Object(a.useState)(),t=Object(s.a)(e,2),n=t[0],l=t[1];return Object(a.useEffect)((function(){E.a.get("".concat("https://api.jimsegal.com","/recipes")).then((function(e){var t=e.data;l(t)}))}),[]),n&&n.length?c.a.createElement("section",null,c.a.createElement("h1",null,"Recipes"),c.a.createElement("ul",null,n.map((function(e){return c.a.createElement("li",{key:e.slug},c.a.createElement(o.b,{to:{pathname:"/recipe/".concat(e.slug),state:Object(u.a)({},e)}},e.title))})))):c.a.createElement("section",null,"Loading...")},p=n(28),f=n.n(p),g=(n(155),function(){return c.a.createElement("h1",null,"Not Found")}),d=function(e){var t=Object(a.useState)(),n=Object(s.a)(t,2),l=n[0],r=n[1],o=function(e){var t=e.pathname,n=e.state;if(n&&n.slug)return n.slug;var a=t.split("/");return a[a.length-1]}(e.location);if(Object(a.useEffect)((function(){E.a.get("".concat("https://api.jimsegal.com","/recipe/").concat(o)).then((function(e){var t=e.data;r(t)})).catch((function(e){var t=e.response;404===t.status&&r({status:t.status})}))}),[o]),!l)return c.a.createElement("section",null,"Loading...");if(404===l.status)return c.a.createElement(g,null);var i=l.title,u=l.referenceLink,m=l.ingredients,h=l.directions;return c.a.createElement("section",null,c.a.createElement("h2",null,i),c.a.createElement("small",null,c.a.createElement("a",{href:u,target:"_blank",rel:"noopener noreferrer"},"Original Reference")),c.a.createElement("h3",null,"Ingredients"),c.a.createElement("div",{className:"ingredients"},c.a.createElement(f.a,{source:m})),c.a.createElement("h3",null,"Directions"),c.a.createElement("div",{className:"directions"},c.a.createElement(f.a,{source:h})))},v=function(){return c.a.createElement("h1",null,"Home")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement((function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",null,c.a.createElement("h1",null,"Jim Segal Projects")),c.a.createElement(o.a,null,c.a.createElement("article",null,c.a.createElement("nav",null,c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(o.b,{to:"/"},"Home")),c.a.createElement("li",null,c.a.createElement(o.b,{to:"/recipes"},"Recipes")))),c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/",component:v}),c.a.createElement(i.a,{path:"/recipes",component:h}),c.a.createElement(i.a,{path:"/recipe/:recipeSlug",component:d}),c.a.createElement(i.a,{path:"*",component:g})))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},49:function(e,t,n){e.exports=n(156)},54:function(e,t,n){}},[[49,1,2]]]);
//# sourceMappingURL=main.930cdd04.chunk.js.map