(this["webpackJsonpjsegal205.github.io"]=this["webpackJsonpjsegal205.github.io"]||[]).push([[0],{127:function(e,t,a){},248:function(e,t,a){e.exports=a(535)},253:function(e,t,a){},274:function(e,t,a){},275:function(e,t,a){},276:function(e,t,a){},31:function(e,t,a){},358:function(e,t,a){},359:function(e,t,a){},532:function(e,t,a){},533:function(e,t,a){},534:function(e,t,a){},535:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(89),c=a.n(r),s=a(540),o=a(221),i=(a(253),a(31),a(18)),m=a(13),u=a(12),d=a(96);d.a.initialize("UA-45142145-1",{testMode:!1,gaOptions:{cookieDomain:"auto"}});var E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=function(e){d.a.set(Object(u.a)({page:e},t)),d.a.pageview(e)},r=function(t){return Object(n.useEffect)((function(){return a(t.location.pathname)}),[t.location.pathname]),l.a.createElement(e,t)};return r},h=a(20),p="https://api.jimsegal.com",g=[{absolute:!0,link:"https://jimsegal.com",subtitle:"OG site with other projects",title:"JimSegal.com"},{link:"/congress",subtitle:"Some fun data surrounding the current congressional sesssion",title:"Congress"},{link:"/isJimWearingShorts",subtitle:"A site to predict if Jim is wearing shorts or not",title:"Is Jim Wearing Shorts?"},{link:"mountaingoat",subtitle:"Digital game",title:"Mountain Goat Game"},{link:"/recipes",subtitle:"A bunch of recipes that I frequent and wanted to show off",title:"Recipes"},{link:"/spacex",subtitle:"A countdown timer until the next launch of a Space X rocket",title:"Space X"}],f=a(128),b=a.n(f),v=a(205),y=a(206),k=a.n(y),N=function(e,t){var a=Object(n.useState)(t),l=Object(h.a)(a,2),r=l[0],c=l[1],s=Object(n.useState)(!0),o=Object(h.a)(s,2),i=o[0],m=o[1];return Object(n.useEffect)((function(){(function(){var t=Object(v.a)(b.a.mark((function t(){var a,n,l;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,m(!0),t.next=4,k.a.get(e);case 4:a=t.sent,c(a.data),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(0),n=t.t0.message,l=t.t0.response,c({error:n,status:l?l.status:"500"});case 13:return t.prev=13,m(!1),t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[0,8,13,16]])})));return function(){return t.apply(this,arguments)}})()()}),[e]),{loading:i,data:r}},w=function(e){var t=e.componentName;return l.a.createElement("section",null,l.a.createElement("h3",null,"Whoops! There was a problem loading"," ",t?"".concat(t," data."):"data."),l.a.createElement("p",null,"Please reload browser to try again in a little bit."))},j=(a(274),a(275),function(){return l.a.createElement("section",{className:"loader"},l.a.createElement("div",{className:"loader-wheel"}),l.a.createElement("div",{className:"loader-text"},"Loading"))}),O=(a(276),function(e){var t=e.handleResetClick,a=e.handleSearchChange,n=e.searchValue;return l.a.createElement("section",{className:"search-filter-container"},l.a.createElement("label",{htmlFor:"search-filter"},"Search"),l.a.createElement("input",{type:"text",id:"search-filter",className:"search-filter-input",value:n,onChange:a,"data-testid":"search-filter"}),n&&l.a.createElement("button",{className:"search-filter-reset",onClick:t,"data-testid":"search-filter-reset"},"Reset"))}),S=function(){var e=N("".concat(p,"/recipes")),t=e.loading,a=e.data,r=Object(n.useState)(""),c=Object(h.a)(r,2),s=c[0],o=c[1],m=Object(n.useState)([]),d=Object(h.a)(m,2),E=d[0],g=d[1];return Object(n.useEffect)((function(){if(!t&&a){if(a.error)return void g([]);var e=a.filter((function(e){return e.title.toLowerCase().includes(s.toLowerCase())}));g(e)}}),[t,a,s]),l.a.createElement("section",null,l.a.createElement("h2",null,"Recipes"),t&&l.a.createElement(j,null),a&&a.error&&l.a.createElement(w,{componentName:"Recipes"}),a&&a.length&&l.a.createElement(l.a.Fragment,null,l.a.createElement(O,{searchValue:s,handleResetClick:function(){o("")},handleSearchChange:function(e){o(e.target.value)}}),E.length?l.a.createElement("ul",{className:"recipes-list","data-testid":"recipes-list"},E.map((function(e){return l.a.createElement("li",{key:e.slug},l.a.createElement(i.b,{to:{pathname:"/recipe/".concat(e.slug),state:Object(u.a)({},e)}},e.title))}))):l.a.createElement("div",{className:"recipes-no-results"},"No results for"," ",l.a.createElement("strong",null,l.a.createElement("em",null,s)))))},P=a(60),C=a.n(P),R=function(){return l.a.createElement("h1",null,"Not Found")},_=(a(358),function(e){var t=function(e){var t=e.pathname,a=e.state;if(a&&a.slug)return a.slug;var n=t.split("/");return n[n.length-1]}(e.location),a=N("".concat(p,"/recipe/").concat(t)),n=a.loading,r=a.data;if(n)return l.a.createElement(j,null);if(404===r.status)return l.a.createElement(R,null);if(r.error)return l.a.createElement(w,{componentName:"Recipe"});var c=r.title,s=r.referenceLink,o=r.ingredients,i=r.directions,m=r.notes;return l.a.createElement("section",null,l.a.createElement("h2",null,c),s&&l.a.createElement("small",null,l.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer"},"Original Reference")),l.a.createElement("h3",null,"Ingredients"),l.a.createElement("div",{className:"ingredients"},l.a.createElement(C.a,{source:o})),l.a.createElement("h3",null,"Directions"),l.a.createElement("div",{className:"directions"},l.a.createElement(C.a,{source:i})),m&&[l.a.createElement("h3",{key:"notes-header"},"Notes"),l.a.createElement("div",{key:"notes-desc"},l.a.createElement(C.a,{source:m}))])}),F=(a(359),function(){var e=N("".concat(p,"/spacex/next")),t=e.loading,a=e.data,r=function(){var e={};if(!t&&c.current){if(a.error)return e;if(a.date_unix){var n=a.date_unix-Date.now()/1e3;n>0&&(e={days:Math.floor(n/86400),hours:Math.floor(n/3600%24),minutes:Math.floor(n/60%60),seconds:Math.floor(n%60)})}}return e},c=Object(n.useRef)(!1),s=Object(n.useState)(r()),o=Object(h.a)(s,2),i=o[0],m=o[1];Object(n.useEffect)((function(){var e=setTimeout((function(){c.current||(c.current=!0),m(r())}),1e3);return function(){return clearTimeout(e)}}));var u=[];Object.keys(i).forEach((function(e){("seconds"===e||i[e])&&u.push(l.a.createElement("div",{key:e},i[e]," ",e," "))}));return l.a.createElement("section",{className:"spacex-container"},l.a.createElement("h2",null,"Next Space X Launch"),(t||!c.current)&&!(a&&a.error)&&l.a.createElement(j,null),a&&a.error&&l.a.createElement(w,{componentName:"SpaceX"}),!t&&!a.error&&function(){if(!c.current)return null;var e=new Date(a.date_utc).toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"});return l.a.createElement(n.Fragment,{key:a.mission_name},l.a.createElement("div",{className:"spacex-mega"},u),l.a.createElement("h3",null,a.mission_name),l.a.createElement("div",{className:"spacex-item"},l.a.createElement("label",null,"When:"),l.a.createElement("span",null,e)),l.a.createElement("div",{className:"spacex-item"},l.a.createElement("label",null,"Rocket:"),l.a.createElement("span",null,a.rocket_name)),l.a.createElement("div",{className:"spacex-item"},l.a.createElement("label",null,"Launch Site:"),l.a.createElement("span",null,a.launchpad)),l.a.createElement("div",{className:"spacex-details"},a.details))}())}),M=function(){var e=window;return{height:e.innerHeight,width:e.innerWidth}},x=function(){var e=Object(n.useState)(M()),t=Object(h.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){var e=function(){l(M())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a},G=function(e){switch(e){case"house":return"Representatives";case"senate":return"Senators";default:return"Members"}},B=function(e){return"house"===e?"senate":"house"},D=function(e){switch(e.toLowerCase()){case"d":return"Democrat";case"r":return"Republican";case"i":return"Independent";default:return""}},A=function(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""},I=a(17),T=(a(127),function(){var e=N("".concat(p,"/congress/stats")),t=e.loading,a=e.data,n=x().width,r={D:"democrat",F:"female",M:"male",R:"republican",house:"House of Representatives",senate:"Senate"},c=function(e,t){return l.a.createElement("div",null,l.a.createElement("label",null,e,": "),l.a.createElement("span",null,t))},s=function(e){var t=Object.keys(e).map((function(t){return Object(u.a)({},e[t],{age:t})}));return l.a.createElement("section",{className:"chamber-chart"},l.a.createElement("h3",null,"Distribution of age"),l.a.createElement(I.b,{width:.9*n,height:400,data:t,barGap:"10%",barCategoryGap:"20%",margin:{top:20,right:10,left:10,bottom:20}},l.a.createElement(I.c,{strokeDasharray:"3 3"}),l.a.createElement(I.i,{dataKey:"age",label:{value:"Age",position:"bottom"}}),l.a.createElement(I.j,{allowDecimals:!1}),l.a.createElement(I.h,null),l.a.createElement(I.e,{verticalAlign:"top"}),l.a.createElement(I.a,{dataKey:"D",stackId:"a",fill:"#0015BC",name:A(r.D)}),l.a.createElement(I.a,{dataKey:"R",stackId:"a",fill:"#E9141D",name:A(r.R)}),l.a.createElement(I.a,{dataKey:"M",stackId:"b",fill:"#00D136",name:A(r.M)}),l.a.createElement(I.a,{dataKey:"F",stackId:"b",fill:"#B533FF",name:A(r.F)})))},o=function(e,t){return l.a.createElement(l.a.Fragment,null,l.a.createElement("section",null,l.a.createElement("h4",null,"Average Age"),m("",e.average.all),l.a.createElement("section",null,l.a.createElement("h5",null,"By Party"),m(A(r.D),e.average.democrat),m(A(r.R),e.average.republican)),l.a.createElement("section",null,l.a.createElement("h5",null,"By Gender"),m(A(r.F),e.average.female),m(A(r.M),e.average.male))),d(e,"youngest",t),d(e,"oldest",t))},m=function(e,t){return l.a.createElement("div",null,e?l.a.createElement("label",null,e,": "):"",l.a.createElement("span",null,t," years old"))},d=function(e,t,a){return l.a.createElement("section",null,l.a.createElement("h4",null,A(t)," Member"),l.a.createElement("label",null,l.a.createElement(i.b,{to:{pathname:"/congress/".concat(a,"/member/").concat(e[t].id),state:Object(u.a)({},e[t])}},e[t].full_name)),m("Age",e[t].age),c("Date of Birth",e[t].date_of_birth),c("State Representation",e[t].state),c("Gender",A(r[e[t].gender])),c("Party",A(r[e[t].party])))},E=function(e){return l.a.createElement("section",null,l.a.createElement("h4",null,"Number of Members by Gender"),h(e))},h=function(e){return l.a.createElement(l.a.Fragment,null,c("Total",e.total),c(A(r.F),"".concat(e.women," (").concat(e.percentWomen,"%)")),c(A(r.M),"".concat(e.men," (").concat(e.percentMen,"%)")))},g=function(e){return l.a.createElement("section",{className:"congress-party-section"},l.a.createElement("h4",null,"Number of Members by Party"),f(e))},f=function(e){var t=[{name:"Male",value:e.D.men,color:"#00D136"},{name:"Female",value:e.D.women,color:"#B533FF"}],a=[{name:"Male",value:e.R.men,color:"#00D136"},{name:"Female",value:e.R.women,color:"#B533FF"}];return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"congress-party-chart-legend"},l.a.createElement("span",{className:"congress-party-chart-legend-item congress-party-chart-legend-item-male"},"."),l.a.createElement("span",null,"Male"),l.a.createElement("span",{className:"congress-party-chart-legend-item congress-party-chart-legend-item-female"},"."),l.a.createElement("span",null,"Female")),l.a.createElement("section",{className:"congress-party-chart-section"},l.a.createElement("h4",{className:"congress-party-chart-section-header"},"Democrats"),l.a.createElement(I.g,{width:200,height:200},l.a.createElement(I.f,{dataKey:"value",data:t,outerRadius:80},t.map((function(e){return l.a.createElement(I.d,{fill:e.color,key:e.name})}))),l.a.createElement(I.h,null)),h(e.D)),l.a.createElement("section",{className:"congress-party-chart-section"},l.a.createElement("h4",{className:"congress-party-chart-section-header"},"Republicans"),l.a.createElement(I.g,{width:200,height:200},l.a.createElement(I.f,{dataKey:"value",data:a,outerRadius:80},a.map((function(e){return l.a.createElement(I.d,{fill:e.color,key:e.name})}))),l.a.createElement(I.h,null)),h(e.R)))};return l.a.createElement("section",null,l.a.createElement("h2",{className:"congress-header"},"Congressional Information"),l.a.createElement("article",{className:"congress-citation"},l.a.createElement("span",null,"Data provided by "),l.a.createElement("a",{href:"https://projects.propublica.org/api-docs/congress-api/",target:"_blank",rel:"noopener noreferrer"},"Propublica Congress API")),t&&l.a.createElement(j,null),a&&a.error&&l.a.createElement(w,{componentName:"Congress"}),a&&!a.error&&l.a.createElement("div",{className:"congress"},["house","senate"].map((function(e){return function(e,t){return l.a.createElement("article",{key:t},l.a.createElement("hr",null),l.a.createElement("h3",null,r[t]),l.a.createElement(i.b,{className:"chamber-members",to:{pathname:"/congress/".concat(t,"/members"),state:{chamber:t}}},"View Current ",G(t)),l.a.createElement("section",{className:"chamber"},!!e[t].age.distribution&&s(e[t].age.distribution),l.a.createElement("section",{className:"chamber-data"},o(e[t].age,t),E(e[t].gender),g(e[t].party))))}(a,e)}))))}),V=function(e){var t=function(e){var t=e.pathname,a=e.state;if(a&&a.chamber)return a.chamber;var n=t.split("/");return n[n.length-2]}(e.location),a=N("".concat(p,"/congress/").concat(t,"/members")),r=a.loading,c=a.data,s=Object(n.useState)(""),o=Object(h.a)(s,2),m=o[0],d=o[1],E=Object(n.useState)([]),g=Object(h.a)(E,2),f=g[0],b=g[1];if(Object(n.useEffect)((function(){if(!r&&c){if(c.error||404===c.status)return void b([]);var e=c[t]?c[t].filter((function(e){return e.first_name.toLowerCase().includes(m.toLowerCase())||e.last_name.toLowerCase().includes(m.toLowerCase())})):[];b(e)}}),[r,c,t,m]),r)return l.a.createElement(j,null);if(404===c.status||!t.match(/^(house|senate)$/))return l.a.createElement(R,null);if(c.error)return l.a.createElement(w,{componentName:"Congress Memebers"});var v=function(e){e.target.src="/assets/congress-seal.png",e.target.alt="United States Seal of Congress"};return l.a.createElement("section",null,l.a.createElement(i.b,{className:"chamber-members",to:{pathname:"/congress"}},"All Congress Data"),l.a.createElement("h2",{className:"congress-header"},"Current ",G(t)),l.a.createElement(i.b,{className:"chamber-members",to:{pathname:"/congress/".concat(B(t),"/members")}},"View Current ",G(B(t))),l.a.createElement("hr",null),l.a.createElement(O,{searchValue:m,handleResetClick:function(){d("")},handleSearchChange:function(e){d(e.target.value)}}),f.length?l.a.createElement("ul",{className:"congress-members","data-testid":"members-list"},f.map((function(e){return l.a.createElement("li",{key:"".concat(e.id,"-").concat(e.party)},l.a.createElement(i.b,{to:{pathname:"/congress/".concat(t,"/member/").concat(e.id),state:Object(u.a)({},e)},className:"congress-members-card"},l.a.createElement("img",{src:"https://www.congress.gov/img/member/".concat(e.id.toLowerCase(),".jpg"),alt:"Professional headshot of ".concat(e.first_name," ").concat(e.last_name),onError:v}),l.a.createElement("label",null,e.first_name," ",e.last_name),D(e.party)," - ",e.state))}))):l.a.createElement("div",{className:"members-no-results"},"No results for"," ",l.a.createElement("strong",null,l.a.createElement("em",null,m))))},J=function(e){var t=function(e){var t=e.pathname,a=e.state;if(a&&a.chamber&&a.id)return{chamber:a.chamber,id:a.id};var n=t.split("/");return{chamber:n[n.length-3],id:n[n.length-1]}}(e.location),a=t.chamber,n=t.id,r=N("".concat(p,"/congress/").concat(a,"/member/").concat(n)),c=r.loading,s=r.data;if(c)return l.a.createElement(j,null);if(404===s.status||!a.match(/^(house|senate)$/))return l.a.createElement(R,null);if(s.error)return l.a.createElement(w,{componentName:"Congress Memeber"});var o=s.age,m=s.first_name,u=s.last_name,d=s.date_of_birth,E=s.gender,h=s.current_party,g=s.url,f=s.twitter_account,b=s.state,v=s.next_election,y=s.terms,k=s.initial_elected_in,O=s.most_recent_vote,S=s.careerVoting,P=s.termInfo,_=s.misconduct;return l.a.createElement("section",{className:"congress-member"},l.a.createElement(i.b,{to:{pathname:"/congress/".concat(a,"/members"),state:{chamber:a}}},"Back to all members"),l.a.createElement("h2",null,m," ",u),l.a.createElement("div",{className:"headshot"},l.a.createElement("img",{src:"https://www.congress.gov/img/member/".concat(n.toLowerCase(),".jpg"),alt:"Professional headshot of ".concat(m," ").concat(u),onError:function(e){e.target.src="/assets/congress-seal.png",e.target.alt="United States Seal of Congress"}})),l.a.createElement("section",{className:"congress-member-links"},l.a.createElement("a",{href:g,target:"_blank",rel:"noopener noreferrer"},"Website"),l.a.createElement("a",{href:"https://twitter.com/".concat(f),target:"_blank",rel:"noopener noreferrer"},"Twitter")),l.a.createElement("hr",null),l.a.createElement("article",{className:"information"},l.a.createElement("section",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",null,"Most recent vote:")," ",O),l.a.createElement("li",null,l.a.createElement("label",null,"Date of Birth:")," ",d," (age: ",o,")"),l.a.createElement("li",null,l.a.createElement("label",null,"Gender:")," ",E),l.a.createElement("li",null,l.a.createElement("label",null,"Current Party:")," ",D(h)),l.a.createElement("li",null,l.a.createElement("label",null,"State Representing:")," ",b),l.a.createElement("li",null,l.a.createElement("label",null,"Will be up for re-election in:")," ",v),l.a.createElement("li",null,l.a.createElement("p",null,"Has served ",l.a.createElement("em",null,y)," terms starting initially elected into office in ",l.a.createElement("em",null,k))))),!!_.length&&l.a.createElement("section",null,l.a.createElement("h3",null,"Official Misconduct Reports"),l.a.createElement("h4",null,"Data provided by"," ",l.a.createElement("a",{href:"https://github.com/govtrack/misconduct",target:"_blank",rel:"noopener noreferrer"},"GovTrack Congressional Misconduct DB")),_.map((function(e){return l.a.createElement("ul",{key:e.first_date},l.a.createElement("li",null,l.a.createElement("label",null,"Allegation:")," ",A(e.allegation)),l.a.createElement("li",null,l.a.createElement("label",null,"Initiated on:")," ",e.first_date),l.a.createElement("li",null,l.a.createElement("label",null,"Allegation Categories:")," ",e.allegationCategories.join(", ")),l.a.createElement("li",null,l.a.createElement("label",null,"Current Status:")," ",A(e.currentStatus)),l.a.createElement("li",null,l.a.createElement(C.a,{source:e.text})))}))),l.a.createElement("section",null,l.a.createElement("h3",null,"Career Voting History"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",null,"Total Votes Eligible:")," ",S.careerVotesEligible),l.a.createElement("li",null,l.a.createElement("label",null,"Total Cast Votes:")," ",S.careerVotesCast),l.a.createElement("li",null,l.a.createElement("label",null,"Total Missed Votes:")," ",S.careerMissedVotes),l.a.createElement("li",null,l.a.createElement("label",null,"Total Present Votes:")," ",S.careerPresentVotes),l.a.createElement("li",null,l.a.createElement("label",null,"Total Votes With ",D(h)," Party:")," ",S.careerVotesWithParty,"*"),l.a.createElement("li",null,l.a.createElement("label",null,"Total Votes Against ",D(h)," Party:")," ",S.careerVotesAgainstParty,"*"))),l.a.createElement("section",null,l.a.createElement("h3",null,"Individual Term Voting Statistics"),P.map((function(e){var t=e.congress,a=e.start_date,n=e.end_date,r=e.total_votes,c=e.missed_votes,s=e.party,o=e.total_present,i=e.votesWithParty,m=e.votesAgainstParty;return l.a.createElement("ul",{key:"".concat(t,"-").concat(s),className:"term-info"},l.a.createElement("li",null,l.a.createElement("label",null,"Congressional Session:")," ",t," - From"," ",a," until ",n),h!==s?l.a.createElement("li",null,l.a.createElement("label",null,"Party:")," ",D(s)):null,l.a.createElement("li",null,l.a.createElement("label",null,"Cast Votes:")," ",r-c-o),l.a.createElement("li",null,l.a.createElement("label",null,"Votes With ",D(s)," Party:")," ",i,"*"),l.a.createElement("li",null,l.a.createElement("label",null,"Votes Against ",D(s)," Party:")," ",m,"*"))}))),l.a.createElement("footer",{className:"footnote"},"* - counts relating to votes with or against party might be off due to rounding precision or insufficient historical data provided")))},L=(a(532),function(e){return"/"===e.location.pathname?null:l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",null,l.a.createElement("ul",{className:"topnav-list"},g.map((function(e){return l.a.createElement("li",{className:"topnav-list-item",key:e.title},e.absolute?l.a.createElement("a",{title:e.subtitle,href:e.link},e.title):l.a.createElement(i.b,{title:e.subtitle,to:e.link},e.title))})))),l.a.createElement("hr",null))}),W=Object(m.f)((function(e){return l.a.createElement(L,e)})),z=(a(533),function(e){return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}),H=function(e){var t=z(e),a=t.r,n=t.g,l=t.b;return Math.round((299*a+587*n+114*l)/1e3)>125?"444444":"efefef"},K=function(e,t){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"project-list-item-placeholder",style:{backgroundColor:"#".concat(t)}},l.a.createElement("h2",{className:"project-list-item-title",style:{color:"#".concat(H(t))}},e.title)),l.a.createElement("p",null,e.subtitle))},U=function(){return l.a.createElement("section",null,l.a.createElement("ul",{className:"project-list"},g.map((function(e){var t=Math.floor(16777215*Math.random()).toString(16),a=function(e){var t=function(e){return("00"+(255-e).toString(16)).slice(-2)},a=z(e),n=a.r,l=a.g,r=a.b;return t(n)+t(l)+t(r)}(t);return l.a.createElement("li",{key:e.title,className:"project-list-item",style:{borderColor:"#".concat(t)}},e.absolute?l.a.createElement("a",{className:"project-list-item-link",href:e.link},K(e,a)):l.a.createElement(i.b,{className:"project-list-item-link",to:e.link},K(e,a)))}))))},X=function(){var e=N("".concat(p,"/shorts")),t=e.loading,a=e.data;return t?l.a.createElement(j,null):a.error?l.a.createElement(w,{componentName:'"Is Jim Wearing Shorts"'}):l.a.createElement("section",null,l.a.createElement("h2",null,"Is Jim wearing shorts?"),l.a.createElement("section",null,l.a.createElement("article",null,"There is a ",l.a.createElement("strong",null,a.probability,"%")," chance he is."),l.a.createElement("br",null),l.a.createElement("article",null,"Based on the following criteria:",l.a.createElement("ul",null,a.criteria.map((function(e){return l.a.createElement("li",{key:e.label},e.label,": ",e.value)}))))))},q=a(59),Y=a(47),$=(a(534),{players:[],mountainPeaks:{5:{value:5,size:4,points:10,goats:{}},6:{value:6,size:4,points:9,goats:{}},7:{value:7,size:3,points:8,goats:{}},8:{value:8,size:3,points:7,goats:{}},9:{value:9,size:2,points:6,goats:{}},10:{value:10,size:2,points:5,goats:{}}},bonusPoints:[15,12,9,6],setup:{maxPlayers:4,diceRolls:4},winConditions:{peaksEmpty:3},gameStarted:!1,currentPlayer:-1,showRules:!0,history:[],showHistory:!1,gameFinished:!1}),Q=function(){var e=Object(n.useState)($),t=Object(h.a)(e,2),a=t[0],r=t[1],c=function(){var e=Object(n.useState)(""),t=Object(h.a)(e,2),c=t[0],s=t[1],o=""===c.trim(),i=a.players.map((function(e){return e.name})).includes(c.trim());if(a.players.length===a.setup.maxPlayers)return null;return l.a.createElement("div",null,l.a.createElement("input",{type:"text",value:c,onChange:function(e){return s(e.target.value)}}),l.a.createElement("button",{className:"add-new-player",disabled:o||i,onClick:function(){var e={number:a.players.length+1,name:c,totalPoints:0,peaksSummited:{5:0,6:0,7:0,8:0,9:0,10:0}};o||i||r(Object(u.a)({},a,{players:[].concat(Object(Y.a)(a.players),[e]),history:[].concat(Object(Y.a)(a.history),["".concat(c," has joined")])}))}},"Add new player"),o&&l.a.createElement("label",{className:"error-text"},"Please enter player name"),i&&l.a.createElement("label",{className:"error-text"},"Name already taken"))},s=function(e){var t=e.player,a=e.gameState,r=e.setGameState,c=Object.keys(a.mountainPeaks),s=Object(n.useState)({playerNumber:t.number,rolls:{},showOutcomes:!1,stagedRolls:[],toBeStaged:[]}),o=Object(h.a)(s,2),m=o[0],d=o[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement("h3",{className:"current-player-name"},"Current Player: ",t.name),0===Object.keys(m.rolls).length&&l.a.createElement("section",{className:"roll-the-dice"},l.a.createElement("button",{onClick:function(){for(var e={d1:{},d2:{},d3:{},d4:{}},t=0;t<a.setup.diceRolls;t++)e["d".concat(t+1)]={value:Math.ceil(Math.random()*Math.floor(6)),staged:!1,checked:!1};d(Object(u.a)({},m,{rolls:e}))}},"Roll ",a.setup.diceRolls," dice")),!!Object.keys(m.rolls).length&&l.a.createElement(l.a.Fragment,null,l.a.createElement("h3",null,"Dice Rolls"),Object.keys(m.rolls).map((function(e){return l.a.createElement("div",{key:e},l.a.createElement("input",{type:"checkbox",value:e,name:e,id:e,disabled:!!m.rolls[e].staged,checked:!!m.rolls[e].checked,onChange:function(e){},onClick:function(t){var a=[];a=m.toBeStaged.includes(t.target.value)?m.toBeStaged.filter((function(e){return e!==t.target.value})):[].concat(Object(Y.a)(m.toBeStaged),[t.target.value]),d(Object(u.a)({},m,{rolls:Object(u.a)({},m.rolls,Object(q.a)({},e,Object(u.a)({},m.rolls[e],{checked:t.target.checked}))),toBeStaged:a}))}}),l.a.createElement("label",{htmlFor:e},e," ","->"," ",m.rolls[e].value))})),l.a.createElement("button",{disabled:!m.toBeStaged.length,onClick:function(){var e=JSON.parse(JSON.stringify(m.rolls));m.toBeStaged.forEach((function(t){e[t].checked=!1,e[t].staged=!0})),d(Object(u.a)({},m,{rolls:e,stagedRolls:[].concat(Object(Y.a)(m.stagedRolls),[m.toBeStaged]),toBeStaged:[]}))}},"Use selected"),!!m.stagedRolls.length&&l.a.createElement("section",{className:"player-turn"},l.a.createElement("h4",null,"Here are your grouped rolls"),l.a.createElement("div",{className:"current-grouped-rolls"},m.stagedRolls.map((function(e,t){var n=e.reduce((function(e,t){return e+m.rolls[t].value}),0),r=Object.keys(a.mountainPeaks);return l.a.createElement("div",{key:t,className:"grouped-roll"},e.map((function(e){return l.a.createElement("div",{key:e},e," ","->"," ",m.rolls[e].value)})),l.a.createElement("label",null,"Total: ",n),!r.includes(n.toString())&&l.a.createElement("label",{className:"error-text",style:{display:"block"}},"This doesn't match a peak!"),l.a.createElement("button",{style:{display:"block"},onClick:function(){var t=JSON.parse(JSON.stringify(m.rolls));e.forEach((function(e){t[e].staged=!1})),d(Object(u.a)({},m,{rolls:t,stagedRolls:m.stagedRolls.filter((function(t){return t!==e}))}))}},"Remove"))}))),l.a.createElement("section",{className:"finish-turn"},l.a.createElement("button",{onClick:function(){var e=JSON.parse(JSON.stringify(a.mountainPeaks)),t=a.players.find((function(e){return e.number===m.playerNumber})),n=[];m.stagedRolls.forEach((function(l){var r=l.reduce((function(e,t){return e+m.rolls[t].value}),0);if(Object.keys(a.mountainPeaks).includes(r.toString())){var c=e[r],s=c.goats,o=c.size,i=-1;Object.keys(s).forEach((function(e){s[e].includes(t.name)&&(i=parseInt(e))})),i===o?e[r].points>0&&(e[r].points-=1,t.totalPoints+=r,t.peaksSummited[r]+=1,n.push("".concat(t.name," scored ").concat(r," points from staying at the summit"))):(s[i]=s[i].filter((function(e){return e!==t.name})),i+1===o&&s[i+1].length>0&&(n.push("".concat(s[i+1]," was overthrown by ").concat(t.name," on peak ").concat(r)),s[0]=s[0].concat(s[i+1]),s[i+1]=[]),s[i+1]=[].concat(Object(Y.a)(s[i+1]),[t.name]),n.push("".concat(t.name," moved up peak ").concat(r)),e[r].goats=s,i+1===o&&e[r].points>0&&(e[r].points-=1,t.totalPoints+=r,t.peaksSummited[r]+=1,n.push("".concat(t.name," scored ").concat(r," points from reaching the summit of peak ").concat(r))))}}));var l=a.currentPlayer+=1;l>a.players.length-1&&(l=0);var c=JSON.parse(JSON.stringify(a.players)),s=c.findIndex((function(e){return e.number===t.number}));c[s]=t,n.push("".concat(t.name," finished turn"),"".concat(a.players.find((function(e){return e.number===l+1})).name," is starting their turn"));var o=Object.keys(e).reduce((function(t,a){return e[a].points<=0?t+1:t}),0),d=Object.values(t.peaksSummited).every((function(e){return e>=1||e>=2||e>=3||e>=4})),E=a.bonusPoints;d&&(t.totalPoints+=E[0],n.push("".concat(t.name," just scored ").concat(E[0]," bonus points!")),E.shift());var h=o>=a.winConditions.peaksEmpty||0===E.length;if(h){var p=i()[0],g=p.name,f=p.totalPoints;n.push("Game Finished!"),n.push("Congrats ".concat(g," with ").concat(f," points!"))}r(Object(u.a)({},a,{players:c,mountainPeaks:e,currentPlayer:l,history:a.history.concat(n),bonusPoints:E,gameFinished:h}))}},"Finish turn"))),!m.showOutcomes&&l.a.createElement("div",null,l.a.createElement("hr",null),l.a.createElement("button",{onClick:function(){d(Object(u.a)({},m,{showOutcomes:!0}))}},"Show All Possible Combinations")),m.showOutcomes&&l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement("h3",null,"Possible Groupings"),l.a.createElement("button",{onClick:function(){d(Object(u.a)({},m,{showOutcomes:!1}))}},"Hide Possibilities"),function(e){var t=c.reduce((function(e,t){return Object(u.a)({},e,Object(q.a)({},t,[]))}),{});return[["d1"],["d2"],["d3"],["d4"],["d1","d2"],["d1","d3"],["d1","d4"],["d1","d2","d3"],["d1","d2","d4"],["d1","d3","d4"],["d2","d3"],["d2","d4"],["d2","d3","d4"],["d3","d4"],["d1","d2","d3","d4"]].map((function(a){var n=a.reduce((function(t,a){return t+e[a].value}),0);return c.includes(n.toString())?Object(u.a)({},t,Object(q.a)({},n,t[n].push(a))):t})),l.a.createElement("section",{className:"possible-outcomes"},Object.keys(t).map((function(e){return l.a.createElement("div",{key:e,className:"dice-combo"},l.a.createElement("h4",null,e),!t[e].length&&l.a.createElement("div",null,"No matches"),!!t[e].length&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,"Select:"),t[e].map((function(e){return l.a.createElement("div",{className:"dice-combo-match",key:e.join(",")},e.join(" & "))}))))})))}(m.rolls))))},o=function(e,t){return a.mountainPeaks[e].goats[t].join(", ")},i=function(){return a.players.sort((function(e,t){return e.totalPoints>t.totalPoints?-1:e.totalPoints<=t.totalPoints?1:0}))};return l.a.createElement("main",null,l.a.createElement("h2",null,"Mountain Goat Game"),l.a.createElement("section",null,"This is my interpretation of"," ",l.a.createElement("a",{href:"https://www.boardgametables.com/products/gps-sequoia-and-mountain-goats",target:"_blank",rel:"noopener noreferrer"},"Mountain Goats by Board Game Tables"),".",l.a.createElement("hr",null),l.a.createElement("strong",null,"This is still in active development and are likely to be issues (like styling and usability on phone, try landscape mode if you run into this). If you have any feedback, find any issues or have more ideas for the game, please reach out to me at"," ",l.a.createElement("a",{href:"mailto:projects@jimsegal.com?subject=Mountain Goat Game Feedback!",target:"_blank",rel:"noopener noreferrer"},"projects@jimsegal.com"),". Enjoy!"),l.a.createElement("hr",null)),l.a.createElement("section",null,l.a.createElement("h3",null,"Rules",l.a.createElement("button",{className:"toggle-rules",onClick:function(){r(Object(u.a)({},a,{showRules:!a.showRules}))}},a.showRules?"Hide":"Show"," Rules")),a.showRules&&l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",null,l.a.createElement("li",null,"You and up to ",a.setup.maxPlayers-1," friends can join to play locally"),l.a.createElement("li",null,"On your turn, you will roll ",a.setup.diceRolls," dice"),l.a.createElement("li",null,"You can then choose combinations of dice that add up to mountain peaks (5 through 10)"),l.a.createElement("li",null,"You do not have to use all the dice on you turn"),l.a.createElement("li",null,"Points will be earned when reaching the summit of the mountain or when rolling that peak value while currently holding the summit"),l.a.createElement("li",null,"If there is an opposing goat at the summit when you are reaching the summit, the opposing goat will be sent to the base of the peak")),l.a.createElement("h3",null,"Game End"),l.a.createElement("ul",null,l.a.createElement("li",null,"When ",a.winConditions.peaksEmpty," of the peak summits have no point tokens left"),l.a.createElement("li",null,"When all 4 of the bonus tokens are claimed "),l.a.createElement("li",null,"The goat with the most points, wins!"))),l.a.createElement("hr",null)),a.gameStarted&&l.a.createElement("section",{className:"game-reset"},l.a.createElement("button",{onClick:function(){r(Object(u.a)({},$))}},"Reset Game!")),!!a.history.length&&l.a.createElement("section",null,l.a.createElement("h3",null,"Game Log",l.a.createElement("button",{className:"toggle-rules",onClick:function(){r(Object(u.a)({},a,{showHistory:!a.showHistory}))}},a.showHistory?"Hide":"Show"," Log")),a.showHistory&&l.a.createElement("ul",null,a.history.map((function(e,t){return l.a.createElement("li",{key:t},e)})))),!a.gameStarted&&l.a.createElement("section",null,l.a.createElement("h3",null,"New Game"),l.a.createElement(c,null)),!!a.players.length&&l.a.createElement(l.a.Fragment,null,l.a.createElement("h3",{style:{textAlign:"center"}},"Players"),l.a.createElement("div",{className:"players-area"},a.players.map((function(e){return l.a.createElement("div",{key:e.name,className:"player"},l.a.createElement("h4",null,"Goat ",e.name),l.a.createElement("span",null,"Points: ",e.totalPoints))})))),!a.gameStarted&&a.players.length>1&&l.a.createElement("section",{className:"start-game"},l.a.createElement("button",{onClick:function(){var e=JSON.parse(JSON.stringify(a.mountainPeaks));Object.keys(e).forEach((function(t){for(var n={0:a.players.map((function(e){return e.name}))},l=1;l<=e[t].size;l++)n[l]=[];e[t]=Object(u.a)({},e[t],{goats:n})})),r(Object(u.a)({},a,{gameStarted:!0,currentPlayer:0,mountainPeaks:e,history:[].concat(Object(Y.a)(a.history),["Game Started"])}))}},"Start the game!")),a.gameStarted&&l.a.createElement("section",null,l.a.createElement("h3",{style:{textAlign:"center"}},"Bonus Points"),l.a.createElement("div",{className:"bonus-points"},l.a.createElement("div",null,"Bonus points can be claimed by reaching or maintaining the summit of all the peaks. This can be claimed multiple times."),l.a.createElement("div",{className:"bonus-points-available"},a.bonusPoints.map((function(e){return l.a.createElement("h3",{key:e},e)})))),l.a.createElement("h3",{style:{textAlign:"center"}},"Game Board"),l.a.createElement("div",{className:"game-board"},l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"5"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[5].points),l.a.createElement("div",{className:"peak-point"},o(5,4)),l.a.createElement("div",{className:"peak-point"},o(5,3)),l.a.createElement("div",{className:"peak-point"},o(5,2)),l.a.createElement("div",{className:"peak-point"},o(5,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(5,0))),l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"6"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[6].points),l.a.createElement("div",{className:"peak-point"},o(6,4)),l.a.createElement("div",{className:"peak-point"},o(6,3)),l.a.createElement("div",{className:"peak-point"},o(6,2)),l.a.createElement("div",{className:"peak-point"},o(6,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(6,0))),l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"7"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[7].points),l.a.createElement("div",{className:"peak-point"},o(7,3)),l.a.createElement("div",{className:"peak-point"},o(7,2)),l.a.createElement("div",{className:"peak-point"},o(7,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(7,0))),l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"8"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[8].points),l.a.createElement("div",{className:"peak-point"},o(8,3)),l.a.createElement("div",{className:"peak-point"},o(8,2)),l.a.createElement("div",{className:"peak-point"},o(8,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(8,0))),l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"9"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[9].points),l.a.createElement("div",{className:"peak-point"},o(9,2)),l.a.createElement("div",{className:"peak-point"},o(9,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(9,0))),l.a.createElement("div",{className:"peak"},l.a.createElement("h4",null,"10"),l.a.createElement("div",null,"Points tokens left: ",a.mountainPeaks[10].points),l.a.createElement("div",{className:"peak-point"},o(10,2)),l.a.createElement("div",{className:"peak-point"},o(10,1)),l.a.createElement("div",{className:"peak-point peak-zero"},o(10,0)))),!a.gameFinished&&l.a.createElement(s,{player:a.players[a.currentPlayer],gameState:a,setGameState:r}),a.gameFinished&&l.a.createElement("section",{className:"game-finished"},l.a.createElement("h2",null,"Game Finished"),l.a.createElement("ol",null,i().map((function(e){return l.a.createElement("li",{key:e.number},e.name,": ",e.totalPoints," points")}))),l.a.createElement("div",null,"If you liked this game, please consider supporting the creators by"," ",l.a.createElement("a",{href:"https://www.boardgametables.com/products/gps-sequoia-and-mountain-goats",target:"_blank",rel:"noopener noreferrer"},"purchasing Mountain Goats on Board Game Tables")),l.a.createElement("button",{onClick:function(){r(Object(u.a)({},$))}},"Play Again!"))))},Z=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.a,null,l.a.createElement("header",null,l.a.createElement("h1",{className:"app-header"},"Jim Segal Projects"),l.a.createElement(W,null)),l.a.createElement("article",null,l.a.createElement(m.c,null,l.a.createElement(m.a,{exact:!0,path:"/",component:E(U)}),l.a.createElement(m.a,{path:"/congress/:chamber/members",component:E(V)}),l.a.createElement(m.a,{path:"/congress/:chamber/member/:id",component:E(J)}),l.a.createElement(m.a,{path:"/congress",component:E(T)}),l.a.createElement(m.a,{path:"/isJimWearingShorts",component:E(X)}),l.a.createElement(m.a,{path:"/mountaingoat",component:E(Q)}),l.a.createElement(m.a,{path:"/recipes",component:E(S)}),l.a.createElement(m.a,{path:"/recipe/:recipeSlug",component:E(_)}),l.a.createElement(m.a,{path:"/spacex",component:E(F)}),l.a.createElement(m.a,{path:"*",component:E(R)})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a({dsn:"https://3ec844af5d6d4927932a6c92934cdf1a@o345528.ingest.sentry.io/5583309",autoSessionTracking:!0,integrations:[new o.a.BrowserTracing],tracesSampleRate:1}),c.a.render(l.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[248,1,2]]]);
//# sourceMappingURL=main.d9d51b47.chunk.js.map