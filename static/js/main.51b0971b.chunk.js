(this["webpackJsonpblog-front-end"]=this["webpackJsonpblog-front-end"]||[]).push([[0],{129:function(e,t,a){},130:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),i=a(59),s=a(34),l=a(12),d="CREATE_NEW_USER",b="LOGIN",u="REMOVE_USER";var j={id:"",username:"",profileImageUrl:"",token:"",isLogged:!1};var p=Object(s.combineReducers)({authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0,a=Object(l.a)({},e);switch(t.type){case d:return Object(l.a)({},a);case b:return 200===t.code?(localStorage.setItem("userToken",t.user.token),localStorage.setItem("userID",t.user.id),localStorage.setItem("userImageUrl",t.user.profileImageUrl),localStorage.setItem("username",t.user.username),Object(l.a)(Object(l.a)(Object(l.a)({},a),t.user),{},{isLogged:!0})):Object(l.a)({},a);case u:return Object(l.a)({},a);default:return localStorage.getItem("userToken")&&(j.token=localStorage.getItem("userToken"),j.id=localStorage.getItem("userID"),j.profileImageUrl=localStorage.getItem("userImageUrl"),j.username=localStorage.getItem("username"),j.isLogged=!0),a}}}),h=a(51),m=a(21),g=a(39),O=a(171),x=a(18),f=a(177),v=a(181),w=a(179),k=a(175),y=a(185),C=a(180),I=a(186),N=a(87),S=a(82),R=a.n(S),L=a(81),E=a.n(L),T=a(79),B=a.n(T),M=a(80),P=a.n(M),U=a(84),D=a.n(U),z=a(187),W=a(83),A=a.n(W),F=a(14),G=a(173),J=a(3),_=Object(O.a)((function(e){return{colors:{backgroundColor:"#393e46",color:"#eee",marginTop:"1vh",padding:"1vw"}}}));function V(e){return function(t){var a=_();return Object(J.jsx)(r.a.Fragment,{children:Object(J.jsx)(G.a,{className:a.colors,fixed:!0,children:Object(J.jsx)(e,Object(l.a)({},t))})})}}var q=a(88);function H(e){return Object(i.b)((function(e){var t=e.authReducer;return Object(l.a)({},t)}),null)((function(t){return Object(J.jsx)(r.a.Fragment,{children:Object(J.jsx)(e,Object(l.a)({},t))})}))}var K=a(75),Q=a.n(K),X=a(36),Y=a(184),Z=a(178),$=a(182),ee=a(77),te=a.n(ee),ae=a(78),ne=a.n(ae),re=a(183),ce=a(176),oe=a(64),ie=a.n(oe),se=a(76);var le={login:function(e){var t=e.email,a=e.password;return function(){var e=Object(se.a)(ie.a.mark((function e(n){return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://blog-back-end-nodejs.herokuapp.com/api/auth/signin",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({email:t,password:a})}).then((function(e){if(400===e.status)throw new Error("Server Error");if(404===e.status)throw new Error("Not Found");return e.json()})).then((function(e){var t;n((t={code:200,user:e},Object(l.a)({type:b},t)))})).catch((function(e){return{code:400,err:e}}));case 2:return e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}};function de(e){var t=e.children,a=e.value,n=e.index,r=Object(q.a)(e,["children","value","index"]);return Object(J.jsx)("div",Object(l.a)(Object(l.a)({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},r),{},{children:a===n&&Object(J.jsx)($.a,{p:3,children:Object(J.jsx)(k.a,{children:t})})}))}function be(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}var ue=Object(O.a)((function(e){return{root:Object(m.a)({margin:"-15px"},e.breakpoints.down("sm"),{margin:"-1px"}),tabColor:{backgroundColor:"#393e46",color:"#eeeeee"},menuColor:{backgroundColor:"#232931",borderColor:"white",color:"#4ecca3"},btnColor:{backgroundColor:"#eeeeee",color:"#4ecca3",borderRadius:"5px",marginBottom:"5px"},inputGroup:{display:"flex",justifyContent:"space-around",flexDirection:"column"},submit:{backgroundColor:"#4ecca3",color:"#232931","&:hover":{color:"#2baa81",backgroundColor:"#eeeeee",border:"2px solid #2baa81"}}}})),je=function(e){var t=ue();return Object(J.jsxs)("div",{className:t.inputGroup,children:[Object(J.jsx)(re.a,{type:"email",className:t.btnColor,id:"email",label:"E-mail",variant:"filled"}),Object(J.jsx)(re.a,{type:"password",className:t.btnColor,id:"password",label:"Password",variant:"filled"}),Object(J.jsxs)(ce.a,{className:t.submit,onClick:function(){var t=document.getElementById("email").value,a=document.getElementById("password").value;le.login({email:t,password:a})(e.dispatch)},children:[" ","Login"," "]})]})},pe=H(V((function(e){var t=ue(),a=Object(X.a)(),n=r.a.useState(0),c=Object(h.a)(n,2),o=c[0],i=c[1];return Object(J.jsxs)("div",{className:t.root,children:[Object(J.jsx)(f.a,{position:"static",children:Object(J.jsxs)(Y.a,{value:o,onChange:function(e,t){i(t)},className:t.menuColor,TabIndicatorProps:{style:{background:"#4ecca3"}},variant:"fullWidth","aria-label":"full width tabs example",children:[Object(J.jsx)(Z.a,Object(l.a)({label:"Login",icon:Object(J.jsx)(te.a,{})},be(0))),Object(J.jsx)(Z.a,Object(l.a)({label:"Register",icon:Object(J.jsx)(ne.a,{})},be(1)))]})}),Object(J.jsxs)(Q.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:o,onChangeIndex:function(e){i(e)},className:t.tabColor,children:[Object(J.jsx)(de,{value:o,index:0,dir:a.direction,className:t.tabColor,children:Object(J.jsx)(je,Object(l.a)({},e))}),Object(J.jsx)(de,{value:o,index:1,dir:a.direction,className:t.tabColor,children:"Register"})]})]})}))),he=V((function(){return Object(J.jsxs)("div",{children:[" ","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"," "]})})),me=V((function(){return Object(J.jsx)("div",{children:"Page 2"})})),ge=function(e){return Object(J.jsxs)(F.d,{children:[Object(J.jsx)(F.b,{exact:!0,path:"/",component:he}),Object(J.jsx)(F.b,{path:"/page2",component:me}),Object(J.jsx)(F.b,{path:"/blog-front-end/user",children:e.isLogged?Object(J.jsx)(F.a,{to:"/"}):Object(J.jsx)(pe,{})}),Object(J.jsx)(F.b,{path:"*",component:function(){return Object(J.jsx)("div",{children:"404"})}})]})},Oe=Object(O.a)((function(e){return{colors:{backgroundColor:"#393e46",color:"#eee"},active:{color:"#4ecca3 !important"},logo:{display:"flex !important",width:"6vw","&:hover":{backgroundColor:Object(x.b)("#4ecca3",.25),borderRadius:"5px"}},left:Object(m.a)({marginLeft:"90vw"},e.breakpoints.down("sm"),{marginLeft:"75vw"}),logoSize:{maxWidth:"20px",minWidth:"15px",display:"inline",paddingLeft:"2px",marginRight:e.spacing(1)},links:{textDecoration:"none",color:"#eeeeee"},grow:{flexGrow:1},appBarRes:Object(m.a)({},e.breakpoints.down("sm"),{width:"100vw",marginBottom:"50px"}),menuButton:{marginRight:e.spacing(2)},title:Object(m.a)({display:"none",letterSpacing:e.spacing(1)},e.breakpoints.up(e.breakpoints.values.lg+500),{display:"block"}),search:Object(m.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(x.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(x.b)(e.palette.common.white,.25)},marginRight:e.spacing(4),marginLeft:0,width:"40vw%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),maxWidth:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(m.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"}),sectionDesktop:Object(m.a)({display:"none"},e.breakpoints.up("md"),{display:"flex"}),sectionMobile:Object(m.a)({display:"flex"},e.breakpoints.up("md"),{display:"none"})}})),xe=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return[].concat(t).join(" ")},fe=H((function(e){var t=Oe(),a=r.a.useState(null),n=Object(h.a)(a,2),c=n[0],o=n[1],i=r.a.useState(null),s=Object(h.a)(i,2),d=s[0],b=s[1],u=Boolean(c),j=Boolean(d),p=function(e){o(e.currentTarget)},m=function(){b(null)},O=function(){o(null),m()},x="primary-search-account-menu",S=Object(J.jsxs)(N.a,{classes:{paper:t.colors},anchorEl:c,anchorOrigin:{vertical:"top",horizontal:"right"},id:x,keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:u,onClose:O,children:[Object(J.jsx)(g.b,{exact:!0,className:t.links,activeClassName:t.active,to:"/",children:Object(J.jsx)(I.a,{onClick:O,children:"My account"})}),Object(J.jsx)(g.b,{exact:!0,className:t.links,activeClassName:t.active,to:"/page2",children:Object(J.jsx)(I.a,{onClick:O,children:"Profile"})})]}),L="primary-search-account-menu-mobile",T=Object(J.jsxs)(N.a,{classes:{paper:t.colors},anchorEl:d,anchorOrigin:{vertical:"top",horizontal:"right"},id:L,keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:j,onClose:m,children:[Object(J.jsxs)(I.a,{children:[Object(J.jsx)(w.a,{"aria-label":"show 4 new mails",color:"inherit",children:Object(J.jsx)(C.a,{badgeContent:4,color:"secondary",children:Object(J.jsx)(B.a,{})})}),Object(J.jsx)("p",{children:"Messages"})]}),Object(J.jsxs)(I.a,{children:[Object(J.jsx)(w.a,{"aria-label":"show 11 new notifications",color:"inherit",children:Object(J.jsx)(C.a,{badgeContent:11,color:"secondary",children:Object(J.jsx)(P.a,{})})}),Object(J.jsx)("p",{children:"Notifications"})]}),Object(J.jsxs)(I.a,{onClick:p,children:[Object(J.jsx)(w.a,{"aria-label":"account of current user","aria-controls":"primary-search-account-menu","aria-haspopup":"true",color:"inherit",children:Object(J.jsx)(E.a,{})}),Object(J.jsx)("p",{children:"Profile"})]})]});return Object(J.jsxs)("div",{className:t.grow,children:[Object(J.jsx)(f.a,{position:"static",className:xe(t.colors,t.appBarRes),children:Object(J.jsxs)(v.a,{children:[Object(J.jsxs)(g.b,{className:xe(t.links,t.logo),to:"/",children:[Object(J.jsx)("img",{src:"logo.svg",className:t.logoSize,alt:"logo"}),Object(J.jsx)(k.a,{className:t.title,variant:"h6",children:"ossip"})]}),e.isLogged?Object(J.jsxs)(r.a.Fragment,{children:[Object(J.jsxs)("div",{className:t.search,children:[Object(J.jsx)("div",{className:t.searchIcon,children:Object(J.jsx)(R.a,{})}),Object(J.jsx)(y.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput},inputProps:{"aria-label":"search"}})]}),Object(J.jsx)("div",{className:t.grow}),Object(J.jsx)("div",{className:t.sectionDesktop,children:Object(J.jsx)(w.a,{edge:"end","aria-label":"account of current user","aria-controls":x,"aria-haspopup":"true",onClick:p,color:"inherit",children:Object(J.jsx)(z.a,{alt:e.username,src:"https://www.gravatar.com/avatar/".concat(e.profileImageUrl)})})}),Object(J.jsx)("div",{className:t.sectionMobile,children:Object(J.jsx)(w.a,{className:t.colors,"aria-label":"show more","aria-controls":L,"aria-haspopup":"true",onClick:function(e){b(e.currentTarget)},color:"inherit",children:Object(J.jsx)(A.a,{})})})]}):Object(J.jsx)("div",{children:Object(J.jsx)("div",{className:t.left,children:Object(J.jsx)(g.b,{className:t.links,to:"/blog-front-end/user",children:Object(J.jsx)(w.a,{edge:"end","aria-label":"Login/ Register",color:"inherit",children:Object(J.jsx)(D.a,{})})})})})]})}),Object(J.jsx)("div",{children:Object(J.jsx)(ge,Object(l.a)({},e))}),T,S]})})),ve=a(85),we=a(86),ke=(a(129),Object(we.composeWithDevTools)(Object(s.applyMiddleware)(ve.a))),ye=Object(s.createStore)(p,ke);o.a.render(Object(J.jsx)(i.a,{store:ye,children:Object(J.jsx)(g.a,{children:Object(J.jsx)(fe,{})})}),document.getElementById("root"))}},[[130,1,2]]]);
//# sourceMappingURL=main.51b0971b.chunk.js.map