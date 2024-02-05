(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(1886)}])},1886:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return ew}});var n,i,a,l,r=t(5893),c=t(5616),x=t(5582);let o=e=>{let{children:s}=e;return(0,r.jsx)(c.Z,{sx:{display:"flex",flexDirection:"column",flex:1,mt:{xs:"-32px",lg:"-46px",xl:"-44px",xxl:"-48px"}},children:(0,r.jsx)(x.Z,{className:"abc-container",children:s})})};var d=t(2734),h=t(8396),p=t(5861);let m=e=>{let{pageTitle:s,withMarketSwitcher:t,withMigrateButton:n}=e,i=(0,d.Z)(),a=(0,h.Z)(i.breakpoints.up("lg")),l=(0,h.Z)(i.breakpoints.down("xsm"));return(0,r.jsx)(c.Z,{sx:{display:"flex",alignItems:{xs:"flex-start",xsm:"center"},mb:s?4:0,flexDirection:{xs:"column",xsm:"row"}},children:s&&(l||!t)&&(0,r.jsx)(c.Z,{sx:{display:"flex",alignItems:"flex-start"},children:(0,r.jsx)(p.Z,{variant:l?"h2":a?"display1":"h1",sx:{color:t?"text.muted":"text.white",mr:{xs:5,xsm:3},mb:{xs:1,xsm:0}},children:s})})})},g=e=>{let{pageTitle:s,titleComponent:t,withMarketSwitcher:n,withMigrateButton:i,bridge:a,children:l,containerProps:o={}}=e;return(0,r.jsx)(c.Z,{sx:{mt:{xs:5,md:2},pt:{xs:6,md:12},pb:{xs:18,md:20,lg:"94px",xl:"92px",xxl:"96px"},color:"primary.light",borderRadius:"20px"},children:(0,r.jsx)(x.Z,{...o,sx:{...o.sx,pb:0},children:(0,r.jsxs)(c.Z,{sx:{px:{xs:4,xsm:6}},children:[!t&&(0,r.jsx)(m,{pageTitle:s,withMarketSwitcher:n,withMigrateButton:i,bridge:a}),t&&t,(0,r.jsx)(c.Z,{sx:{display:"flex",alignItems:"flex-start",gap:{xs:3,xsm:8},flexWrap:"wrap",width:"100%"},children:l})]})})})};var j=t(7421);let f=e=>{let{tvl:s,stkEmission:t,loading:n}=e,i=(0,d.Z)();(0,h.Z)(i.breakpoints.down("sm"));let{t:a}=(0,j.$G)();return(0,r.jsx)(g,{titleComponent:(0,r.jsxs)(c.Z,{mb:4,children:[(0,r.jsx)(p.Z,{sx:{color:"#8E92A3",maxWidth:"824px"},children:a("Stake is a common concept in the blockchain and cryptocurrency space. It refers to locking a certain amount of cryptocurrency assets in a specific smart contract in order to gain certain rights or rewards.")}),(0,r.jsx)(p.Z,{})]})})};var u=t(629),b=t(7294),v=t(66),Z=t(2210),w=t(9417),y=t(7922);let k=e=>{let{children:s,minHeight:t=71,px:n=4,button:i,...a}=e;return(0,r.jsx)(c.Z,{...a,sx:{display:"flex",minHeight:t,gap:"16px",px:n,...a.sx},children:s})};var C=t(1366),I=t(4597),M=t(5503),F=t(813);let S=e=>{var s,t;let{pool:n,hideBottom:i,account:a,chainId:l,abcBalance:x,openStake:o,openUnStake:d,openClaim:h}=e,[m,g]=(0,b.useState)(!1),f=()=>{g(e=>!e)},{t:u}=(0,j.$G)();return(0,r.jsxs)("div",{className:"abc-pool-item",children:[(0,r.jsxs)(k,{className:"item-row",minHeight:76,onClick:()=>f,sx:{borderBottom:"".concat(i?"0":"1px solid ")},button:!0,"data-cy":"poolListItemListItem_1",children:[(0,r.jsx)("div",{className:"abc-list-column",children:(0,r.jsxs)("div",{className:"info",children:[(0,r.jsx)(c.Z,{sx:{display:"inline-flex",position:"relative"},children:["cfx","abc-logo"].map((e,s)=>(0,r.jsx)(I.LT,{symbol:e,sx:{ml:0===s?0:"calc(-1 * 0.5em)",mt:0===s?0:"calc(1 * 0.4em)",width:0===s?"1.1em":"0.8em",height:0===s?"1.1em":"0.8em"}},e))}),(0,r.jsxs)(c.Z,{sx:{display:{xs:"flex",xsm:"block"},width:{xs:"100%"},justifyContent:"space-between",alignItems:"center"},children:[(0,r.jsx)(p.Z,{variant:"main16",children:n.name}),(0,r.jsxs)(p.Z,{component:"span",variant:"subheader2",color:"text.secondary",children:[u("Earn")," CFX"]})]})]})}),(0,r.jsx)("div",{className:"abc-list-column",children:(0,r.jsxs)(c.Z,{sx:{display:{xs:"flex",xsm:"block"},width:{xs:"100%"},justifyContent:"space-between",alignItems:"center",mb:{xs:3,xsm:0}},children:[(0,r.jsx)(p.Z,{variant:"subheader2",color:"text.secondary",sx:{mb:2},children:u("Earnable")}),(0,r.jsx)(c.Z,{children:(0,r.jsx)(C.B,{value:n.totalRewardsCfx,symbol:"CFX",variant:"main16"})})]})}),(0,r.jsx)("div",{className:"abc-list-column",children:(0,r.jsxs)(c.Z,{sx:{display:{xs:"flex",xsm:"block"},width:{xs:"100%"},justifyContent:"space-between",alignItems:"center",mb:{xs:3,xsm:0}},children:[(0,r.jsx)(p.Z,{variant:"subheader2",color:"text.secondary",sx:{mb:2},children:u("Total staked")}),(0,r.jsx)(c.Z,{children:(0,r.jsx)(C.B,{value:n.totalStaked,symbol:"ABC",variant:"main16"})})]})}),(0,r.jsx)("div",{className:"abc-list-column",children:(0,r.jsxs)(c.Z,{sx:{display:{xs:"flex",xsm:"block"},width:{xs:"100%"},justifyContent:"space-between",alignItems:"start",mb:{xs:3,xsm:0}},children:[(0,r.jsx)(p.Z,{variant:"subheader2",color:"text.secondary",sx:{mb:2},children:"APR"}),(0,r.jsx)(C.B,{value:n.apr,compact:!1,percent:!0,variant:"main16"})]})}),(0,r.jsx)("div",{className:"abc-list-column",children:(0,r.jsxs)(c.Z,{sx:{display:{xs:"flex",xsm:"block"},width:{xs:"100%",xsm:"unset"},justifyContent:"space-between",alignItems:"start",mb:{xs:3,xsm:0}},children:[(0,r.jsx)(p.Z,{variant:"subheader2",color:"text.secondary",sx:{mb:2},children:u("End Time")}),(0,r.jsx)(p.Z,{variant:"subheader2",children:n.endTime})]})}),(0,r.jsx)("div",{className:"abc-list-column abc-center",children:(0,r.jsx)(w.Z,{className:"detail-btn",sx:{color:"#571AFF",borderRadius:"36px",backgroundColor:"rgb(87,26,255,0.08)",height:"36px",width:"110px",gap:"4px",fontSize:"14px","&:hover":{backgroundColor:"rgb(87,26,255,0.08)"}},onClick:f,endIcon:m?(0,r.jsx)(F.Z,{}):(0,r.jsx)(M.Z,{}),children:u("Details")})})]}),(0,r.jsx)(y.Z,{className:"abc-collapse",in:m,sx:{},children:(0,r.jsxs)("div",{className:"collapse-box",children:[(0,r.jsx)("div",{className:"button-box",style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"start",padding:"20px 20px"},children:(0,r.jsxs)(c.Z,{sx:{flex:"1",gap:"6px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[(0,r.jsxs)(p.Z,{color:"text.secondary",children:["ABC ",u("Balance")]}),(0,r.jsx)(c.Z,{sx:{mt:1},children:(0,r.jsx)(C.B,{value:x?x.toString():0})}),(0,r.jsx)(w.Z,{variant:"gradient",sx:{flex:"1",borderRadius:"40px",minWidth:"60%"},onClick:()=>{o(n)},children:u("Stake")})]})}),(0,r.jsxs)("div",{className:"button-box",style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"start",padding:"20px 20px"},children:[(0,r.jsxs)(c.Z,{sx:{flex:"1",gap:"6px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[(0,r.jsxs)(p.Z,{color:"text.secondary",children:[u("My Staked")," ABC"]}),(0,r.jsx)(c.Z,{sx:{mt:1},children:(0,r.jsx)(C.B,{value:null!==(s=n.myStaked)&&void 0!==s?s:"0",variant:"main16"})}),(0,r.jsx)(w.Z,{variant:Number(n.myStaked)>0&&!0==n.isEnd?"gradient":"contained",sx:{flex:"1",borderRadius:"40px",minWidth:"80%"},onClick:()=>{d(n)},disabled:!(Number(n.myStaked)>0)||!0!=n.isEnd,children:u("UnStake")})]}),(0,r.jsxs)(c.Z,{sx:{flex:"1",gap:"6px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[(0,r.jsxs)(p.Z,{color:"text.secondary",children:[u("Claimable")," CFX"]}),(0,r.jsx)(c.Z,{sx:{mt:1},children:(0,r.jsx)(C.B,{value:null!==(t=n.rewardEarned)&&void 0!==t?t:"0",visibleDecimals:4,variant:"main16"})})]})]})]})})]})};var N=t(4032),z=t(891),E=t(8078);let W=e=>{let{isRow:s,children:t,minWidth:n,align:i="left",overFlow:a="visible"}=e;return(0,r.jsx)(c.Z,{sx:{display:"flex",flexDirection:s?"row":"column",alignItems:s?"center":"left"===i?"flex-start":"right"===i?"flex-end":i,justifyContent:s?"flex-start":"flex-end",flex:1,minWidth:n||"70px",overflow:a,p:1},children:t})};var B=t(5118),_=t(7985),A=t(7061);function D(){let{chainId:e,account:s}=(0,_.useWeb3React)(),{fluentWeb3Context:t}=(0,A.v)(),n=localStorage.getItem("app_connect_wallet"),i="fluent"==n?null==t?void 0:t.account:s,a="fluent"==n?null==t?void 0:t.chainId:e,{setWalletModalOpen:l}=(0,A.v)(),{setType:c}=(0,N.a)(),{pools:x,abc_balance:o,setPoolModal:d}=Z.a2.getState();function p(e){i?(d(e),c(N.w.Stake)):l(!0)}function m(e){i?(d(e),c(N.w.UNStake)):l(!0)}function g(e){i?(d(e),c(N.w.StakeRewardsClaim)):l(!0)}let j=(0,h.Z)("(max-width:1204px)");return(0,r.jsx)("div",{className:"abc-pool-box",style:{},children:x?(0,r.jsx)(r.Fragment,{children:x.map((e,s)=>(0,r.jsx)(S,{pool:e,account:i,chainId:a,abcBalance:o,openStake:p,openUnStake:m,openClaim:g,hideBottom:s===x.length-1},s))}):(0,r.jsx)(r.Fragment,{children:j?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(L,{}),(0,r.jsx)(L,{}),(0,r.jsx)(L,{})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(R,{}),(0,r.jsx)(R,{}),(0,r.jsx)(R,{})]})})})}let R=()=>(0,r.jsxs)(z.ZP,{children:[(0,r.jsxs)(W,{isRow:!0,maxWidth:280,children:[(0,r.jsx)(E.Z,{variant:"circular",width:32,height:32}),(0,r.jsx)(c.Z,{sx:{pl:3.5,overflow:"hidden"},children:(0,r.jsx)(E.Z,{width:75,height:24})})]}),(0,r.jsx)(W,{children:(0,r.jsx)(E.Z,{width:70,height:24})}),(0,r.jsx)(W,{children:(0,r.jsx)(E.Z,{width:70,height:24})}),(0,r.jsx)(W,{children:(0,r.jsx)(E.Z,{width:70,height:24})}),(0,r.jsx)(W,{children:(0,r.jsx)(E.Z,{width:70,height:24})}),(0,r.jsx)(W,{maxWidth:95,minWidth:95,align:"right",children:(0,r.jsx)(E.Z,{width:74,height:38})})]}),L=()=>(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(c.Z,{sx:{px:4,pt:4,pb:6,background:"#FFF",borderRadius:"6px",margin:"10px 0 20px 0"},children:[(0,r.jsx)(B.X,{caption:(0,r.jsx)(E.Z,{width:100,height:20}),captionVariant:"description",mb:3,children:(0,r.jsx)(E.Z,{width:45,height:20})}),(0,r.jsx)(B.X,{caption:(0,r.jsx)(E.Z,{width:100,height:20}),captionVariant:"description",mb:3,align:"flex-start",children:(0,r.jsx)(E.Z,{width:45,height:20})}),(0,r.jsx)(B.X,{caption:(0,r.jsx)(E.Z,{width:100,height:20}),captionVariant:"description",mb:3,children:(0,r.jsx)(E.Z,{width:45,height:20})}),(0,r.jsx)(B.X,{sx:{justifyContent:"center"},children:(0,r.jsx)(E.Z,{width:"50%",height:38})})]})}),G=e=>{let{stakeTitle:s}=e,{currentTime:t}=(0,v.fq)(),{t:n}=(0,j.$G)();return(0,r.jsxs)(u.Z,{sx:{p:{xs:4,xsm:6},pt:4,height:"100%",borderRadius:"8px"},children:[(0,r.jsx)(c.Z,{sx:{display:{xsm:"flex"},alignItems:"center",mb:8},children:(0,r.jsxs)(p.Z,{variant:"h3",children:[n("Stake")," ",s]})}),(0,r.jsx)(D,{})]})};var T=t(822),H=t(1782),O=t(3219);let X=(e,s,t)=>e&&""!==e?"".concat(e.substr(0,s),"...").concat(e.substr(e.length-t,e.length)):"";var P=t(1288),V=t.n(P),$=t(4948),U=t(9661);(n=a||(a={}))[n.XS=20]="XS",n[n.SM=22]="SM",n[n.MD=24]="MD",n[n.LG=32]="LG",n[n.XL=40]="XL";let q=e=>{let{image:s,fallbackImage:t=V()("default"),size:n=a.MD,sx:i,loading:l=!1,invisibleBadge:c=!1,badge:x,...o}=e,[d,h]=(0,b.useState)(!1);return(0,b.useEffect)(()=>{h(!1)},[s]),l?(0,r.jsx)(E.Z,{variant:"circular",width:n,height:n}):(0,r.jsx)($.Z,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:x,invisible:c||l,children:(0,r.jsx)(U.Z,{src:d||!s?t:s,sx:{width:n,height:n,border:"1px solid #FAFBFC1F",...i},alt:"avatar",imgProps:{onError:()=>h(!0)},...o})})};var Q=t(3772);(i=l||(l={}))[i.SM=15]="SM",i[i.MD=20]="MD";let K=e=>{let{size:s,iconProps:t={}}=e,{sx:n,...i}=t;return(0,r.jsx)(O.Z,{color:"warning",sx:{width:s,height:s,borderRadius:"50%",background:"#383D51",...n},...i,children:(0,r.jsx)(Q.Z,{})})};var Y=t(7850),J=t(7720),ee=t(8885),es=t(9334),et=t(4187);let en=e=>{let{anchorEl:s,setAnchorEl:t,openWallet:n,setOpenWallet:i,setWalletModalOpen:l}=e,{t:x}=(0,j.$G)(),{disconnectWallet:o}=(0,A.v)(),{chainId:d,account:h,provider:m,connector:g}=(0,_.useWeb3React)(),{fluentWeb3Context:f}=(0,A.v)(),u=localStorage.getItem("app_connect_wallet"),v="fluent"==u?null==f?void 0:f.account:h,Z="fluent"==u?null==f?void 0:f.chainId:d,y=()=>{i(!1)},k=()=>{o(g),y()},C=async()=>{navigator.clipboard.writeText(v),y()},I=(0,b.useMemo)(()=>v?V()(v):void 0,[v]);return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(Y.Z,{id:"wallet-menu",MenuListProps:{"aria-labelledby":"wallet-button",className:"abc-menulist"},anchorEl:s,open:n,onClose:y,keepMounted:!0,sx:{".abc-menulist":{".MuiMenuItem-root.Mui-disabled":{opacity:1},backgroundColor:"#ffffff",padding:"10px"}},children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center",gap:"10px",width:"100%",marginTop:"6px",fontSize:"0.875rem",letterSpacing:"0.009375rem",fontWeight:"600"},children:[(0,r.jsx)(q,{fallbackImage:I,loading:!1,invisibleBadge:!0,size:a.LG,sx:{".MuiAvatar-img":{borderRadius:"50%"}}}),v&&(0,r.jsx)("span",{children:X(v,7,4)})]}),(0,r.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"row",padding:"10px 0px 10px"},children:[(0,r.jsx)(w.Z,{variant:"outlined",sx:{padding:"0 5px",marginRight:"10px",backgroundColor:"rgba(56, 61, 81, 0.08)"},size:"small",onClick:()=>{l(!0),k()},children:x("Switch wallet")}),(0,r.jsx)(w.Z,{variant:"outlined",sx:{padding:"0 5px",backgroundColor:"rgba(56, 61, 81, 0.08)"},size:"small",onClick:()=>{k()},"data-cy":"disconnect-wallet",children:x("Disconnect")})]}),(0,r.jsx)(J.Z,{sx:{padding:"5px 0 5px 0"}}),(0,r.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,r.jsx)(p.Z,{variant:"caption",children:(0,r.jsx)(r.Fragment,{children:x("Network")})}),(0,r.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center",justifyItems:"flex-end"},children:[(0,r.jsx)(c.Z,{sx:{width:6,height:6,mr:1,borderRadius:"50%",backgroundColor:"rgb(101, 201, 112)",boxShadow:"rgba(0, 0, 0, 0.05) 0px 2px 1px, rgba(0, 0, 0, 0.25) 0px 0px 1px"}}),(0,r.jsx)(p.Z,{variant:"caption",children:Z&&Z==et.KY?(0,r.jsx)(r.Fragment,{children:et.zG[Z].name}):(0,r.jsxs)(r.Fragment,{children:["unknown chainId: ",Z]})})]})]}),(0,r.jsx)(J.Z,{sx:{margin:"10px 0 10px 0"}}),(0,r.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center",cursor:"pointer",marginTop:"10px"},onClick:C,children:[(0,r.jsx)(ee.Z,{sx:{minWidth:"22px"},children:(0,r.jsx)(O.Z,{fontSize:"small",children:(0,r.jsxs)("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4666",width:"20",height:"20",children:[(0,r.jsx)("path",{d:"M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z","p-id":"4667",fill:"#5F6A7F"}),(0,r.jsx)("path",{d:"M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z","p-id":"4668",fill:"#5F6A7F"})]})})}),(0,r.jsx)(es.Z,{style:{color:"#5F6A7F"},children:(0,r.jsx)(r.Fragment,{children:x("Copy address")})})]}),et.zG[Number(Z)]&&(0,r.jsx)("a",{target:"_blank",href:"".concat(et.zG[Number(Z)].blockExplorerUrls[0],"/address/").concat(v),children:(0,r.jsxs)(c.Z,{sx:{alignItems:"center",cursor:"pointer",display:"flex"},onClick:y,children:[(0,r.jsx)(ee.Z,{sx:{minWidth:"22px"},children:(0,r.jsx)(O.Z,{fontSize:"small",children:(0,r.jsxs)("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"8461",width:"20",height:"20",children:[(0,r.jsx)("path",{d:"M762.38 19.59L430.31 351.68l65.82 65.82 266.25-266.28 127.5 127.5-266.27 266.25 65.82 65.82 332.09-332.07zM292.74 875.86l-127.47-127.5 266.25-266.25-65.82-65.82L33.63 748.36l259.11 259.14 332.07-332.09-65.82-65.82z","p-id":"8462",fill:"#5F6A7F"}),(0,r.jsx)("path",{d:"M368.925 606.364L620.39 354.898l65.817 65.817-251.466 251.466z","p-id":"8463",fill:"#5F6A7F"})]})})}),(0,r.jsx)(es.Z,{style:{color:"#5F6A7F"},children:(0,r.jsx)(r.Fragment,{children:x("View on Explorer")})})]})})]})})})},ei={en:"English",zh:"中文"},ea=e=>{let{anchorEl:s,setAnchorEl:t,openLg:n,setOpenLg:i,setLanguageVal:a}=e,{i18n:l,t:x}=(0,j.$G)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(Y.Z,{id:"wallet-menu",MenuListProps:{"aria-labelledby":"wallet-button",className:"abc-menulist"},anchorEl:s,open:n,onClose:()=>{i(!1)},keepMounted:!0,sx:{".abc-menulist":{".MuiMenuItem-root.Mui-disabled":{opacity:1},backgroundColor:"#ffffff",padding:"10px"}},children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{sx:{mb:"12px"},children:(0,r.jsx)(es.Z,{disableTypography:!0,children:(0,r.jsx)(p.Z,{variant:"subheader1",children:(0,r.jsx)(r.Fragment,{children:x("Select language")})})})}),Object.keys(ei).map(e=>(0,r.jsxs)(c.Z,{onClick:()=>{l.changeLanguage(e),a(ei[e]),i(!1)},sx:{display:"flex",alignItems:"center",cursor:"pointer",color:{md:"text.primary"},".MuiListItemIcon-root":{minWidth:"unset"},".MuiMenuItemIcon-root":{minWidth:"unset"}},children:[(0,r.jsx)(ee.Z,{sx:{mr:3,borderRadius:"2px",overflow:"hidden",width:20,height:14},children:(0,r.jsx)("img",{src:"/icons/flags/".concat(e,".svg"),width:"100%",height:"100%",alt:"".concat(e," icon")})}),(0,r.jsx)(es.Z,{children:ei[e]})]},e))]})})})};var el=t(3795),er=t(948),ec=t(512),ex=t(1664),eo=t.n(ex),ed=t(1163);let eh=(0,er.ZP)("div")({}),ep=b.forwardRef(function(e,s){let{to:t,linkAs:n,href:i,replace:a,scroll:l,shallow:c,prefetch:x,locale:o,...d}=e;return(0,r.jsx)(eo(),{href:t,prefetch:x,as:n,replace:a,scroll:l,shallow:c,passHref:!0,locale:o,children:(0,r.jsx)(eh,{ref:s,...d})})}),em=b.forwardRef(function(e,s){let{as:t,className:n,href:i,noLinkStyle:a,role:l,...c}=e,x="string"==typeof i&&(0===i.indexOf("http")||0===i.indexOf("mailto:")),o=(0,ed.useRouter)(),d="string"==typeof i?i:i.pathname,h=(0,ec.Z)(n,{active:(null==o?void 0:o.pathname)===d});return x?a?(0,r.jsx)(eh,{className:h,href:i,ref:s,rel:"noopener",underline:"none",...c}):(0,r.jsx)(el.Z,{className:h,href:i,ref:s,rel:"noopener",underline:"none",...c}):a?(0,r.jsx)(ep,{className:h,ref:s,to:i,underline:"none",...c}):(0,r.jsx)(el.Z,{component:ep,linkAs:t,className:h,ref:s,to:i,underline:"none",...c})});var eg=t(8462);let ej=[{link:"https://confluxpos.cn/",title:"Pool",dataCy:"menuMarkets"},{link:"/",title:"Stake",dataCy:"menuDashboard"}],ef=e=>{let{setOpen:s}=e,{t}=(0,j.$G)(),{breakpoints:n}=(0,d.Z)(),i=(0,h.Z)(n.down("md")),a=(e,t)=>{t&&s&&s(!1)};return(0,r.jsx)(eg.Z,{sx:{display:"flex",alignItems:{xs:"flex-start",md:"center"},flexDirection:"row"},disablePadding:!0,children:ej.map((e,s)=>(0,r.jsx)(z.ZP,{sx:{width:{xs:"100%",md:"unset"},margin:"0px 10px"},"data-cy":e.dataCy,disablePadding:!0,children:i?(0,r.jsx)(p.Z,{component:em,href:e.link,variant:"h2",sx:{width:"100%",p:4},onClick:()=>a(e.title,!0),children:t(e.title)}):(0,r.jsx)(w.Z,{component:em,onClick:()=>a(e.title,!1),href:e.link,sx:e=>({fontSize:"16px",fontWeight:"600",p:"6px 8px",position:"relative","&.active":{color:"#2C70F4 !important"},".active&:after, &:hover&:after":{transform:"scaleX(1)",transformOrigin:"bottom left"},"&:after":{content:"''",position:"absolute",width:"100%",transform:"scaleX(0)",height:"2px",bottom:"-6px",left:"0",background:"linear-gradient(248.86deg, #2C70F4 10.51%, #2C70F4 93.41%)",transformOrigin:"bottom right",transition:"transform 0.25s ease-out"}}),children:t(e.title)})},s))})},eu=()=>{let{account:e}=(0,_.useWeb3React)(),{fluentWeb3Context:s}=(0,A.v)(),t=localStorage.getItem("app_connect_wallet"),n="fluent"==t?null==s?void 0:s.account:e,{t:i}=(0,j.$G)(),o=(0,A.v)(e=>e.setWalletModalOpen),d=(0,b.useMemo)(()=>n?V()(n):void 0,[n]),[p,m]=(0,b.useState)(null),[g,f]=(0,b.useState)(!1),[u,v]=(0,b.useState)(!1),[Z,y]=(0,b.useState)("English"),k=e=>{n?(v(!0),m(e.currentTarget)):o(!0)},[C,I]=(0,b.useState)(!1),M=(0,h.Z)("(max-width:1204px)");return(0,r.jsxs)(r.Fragment,{children:[!M&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.Z,{className:"top-header",component:"header",sx:e=>({height:80,top:0,transition:e.transitions.create("top"),zIndex:e.zIndex.appBar,padding:{xs:C?"8px 20px":"8px 8px 8px 20px",xsm:"8px 20px"},display:"flex",alignItems:"center",flexDirection:"space-between"}),children:[(0,r.jsx)(c.Z,{component:em,href:"/","aria-label":"Go to homepage",sx:{lineHeight:0,mr:3,transition:"0.3s ease all","&:hover":{opacity:.7}},onClick:()=>I(!1),children:(0,r.jsx)("img",{src:"/logo@2x.png",alt:"An SVG of an eye",height:36})}),(0,r.jsx)(c.Z,{sx:{display:{md:"block"},marginLeft:"30px"},children:(0,r.jsx)(ef,{})}),(0,r.jsx)(c.Z,{sx:{flexGrow:1}}),(0,r.jsx)(x.Z,{className:"header-button",sx:{display:"flex",justifyContent:"flex-end",alignItems:"center",flexDirection:"row",paddingTop:"0",paddingBottom:"0",height:"80px",gap:"12px"},children:(0,r.jsx)(w.Z,{"aria-label":"wallet",id:"wallet-button","aria-controls":u?"wallet-button":void 0,"aria-expanded":u?"true":void 0,onClick:k,"aria-haspopup":"true",sx:{color:"#ffffff",borderRadius:"40px",backgroundColor:"rgb(44,112,244,0.8)",height:"40px",minWidth:"140px",gap:"0px",fontSize:"14px","&:hover":{backgroundColor:"rgb(44,112,244,1)"}},startIcon:n?(0,r.jsx)(q,{fallbackImage:d,loading:!1,badge:(0,r.jsx)(K,{size:l.SM}),invisibleBadge:!0,size:a.SM,sx:{".MuiAvatar-img":{borderRadius:"50%"}}}):(0,r.jsxs)("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7011",width:"20",height:"20",children:[(0,r.jsx)("path",{d:"M864 896H160c-52.8 0-96-43.2-96-96V224c0-52.8 43.2-96 96-96h704c52.8 0 96 43.2 96 96v64c0 17.6-14.4 32-32 32s-32-14.4-32-32v-64c0-17.6-14.4-32-32-32H160c-17.6 0-32 14.4-32 32v576c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-64c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 52.8-43.2 96-96 96z",fill:"#ffffff","p-id":"7012"}),(0,r.jsx)("path",{d:"M768 544h-32c-17.6 0-32-14.4-32-32s14.4-32 32-32h32c17.6 0 32 14.4 32 32s-14.4 32-32 32z",fill:"#ffffff","p-id":"7013"}),(0,r.jsx)("path",{d:"M928 640H672c-52.8 0-96-43.2-96-96v-64c0-52.8 43.2-96 96-96h256c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM672 448c-17.6 0-32 14.4-32 32v64c0 17.6 14.4 32 32 32h224v-128H672z",fill:"#ffffff","p-id":"7014"})]}),endIcon:n&&(0,r.jsx)(O.Z,{sx:{display:{xs:"none",md:"block"}},children:u?(0,r.jsx)(T.Z,{}):(0,r.jsx)(H.Z,{})}),children:n?(0,r.jsx)(r.Fragment,{children:X(n,4,4)}):(0,r.jsx)(r.Fragment,{children:i("Connect Wallet")})})})]}),(0,r.jsx)(ea,{anchorEl:p,setAnchorEl:m,openLg:g,setOpenLg:f,setLanguageVal:y}),(0,r.jsx)(en,{anchorEl:p,setAnchorEl:m,openWallet:u,setOpenWallet:v,setWalletModalOpen:o})]}),M&&(0,r.jsxs)("div",{style:{},children:[(0,r.jsxs)(c.Z,{className:"top-header",component:"header",sx:e=>({height:80,top:0,transition:e.transitions.create("top"),zIndex:e.zIndex.appBar,padding:{xs:C?"8px 20px":"8px 8px 8px 16px",xsm:"8px 16px"},display:"flex",alignItems:"center",justifyContent:"space-between"}),children:[(0,r.jsx)(c.Z,{component:em,href:"/","aria-label":"Go to homepage",sx:{lineHeight:0,mr:3,transition:"0.3s ease all","&:hover":{opacity:.7}},onClick:()=>I(!1),children:(0,r.jsx)("img",{src:"/logo.png",alt:"An SVG of an eye",height:36})}),(0,r.jsx)(c.Z,{sx:{marginLeft:"0px"},children:(0,r.jsx)(ef,{})})]}),(0,r.jsx)(x.Z,{className:"header-button",sx:{display:"flex",justifyContent:"flex-end",alignItems:"center",flexDirection:"row",paddingTop:"0",paddingBottom:"0",height:"80px",gap:"8px"},children:(0,r.jsx)(w.Z,{"aria-label":"wallet",id:"wallet-button","aria-controls":u?"wallet-button":void 0,"aria-expanded":u?"true":void 0,onClick:k,"aria-haspopup":"true",sx:{color:"#ffffff",borderRadius:"40px",backgroundColor:"rgb(44,112,244,0.8)",height:"40px",minWidth:"140px",gap:"0px",fontSize:"14px","&:hover":{backgroundColor:"rgb(44,112,244,1)"}},startIcon:n?(0,r.jsx)(q,{fallbackImage:d,loading:!1,badge:(0,r.jsx)(K,{size:l.SM}),invisibleBadge:!0,size:a.SM,sx:{".MuiAvatar-img":{borderRadius:"50%"}}}):(0,r.jsxs)("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7011",width:"20",height:"20",children:[(0,r.jsx)("path",{d:"M864 896H160c-52.8 0-96-43.2-96-96V224c0-52.8 43.2-96 96-96h704c52.8 0 96 43.2 96 96v64c0 17.6-14.4 32-32 32s-32-14.4-32-32v-64c0-17.6-14.4-32-32-32H160c-17.6 0-32 14.4-32 32v576c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-64c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 52.8-43.2 96-96 96z",fill:"#ffffff","p-id":"7012"}),(0,r.jsx)("path",{d:"M768 544h-32c-17.6 0-32-14.4-32-32s14.4-32 32-32h32c17.6 0 32 14.4 32 32s-14.4 32-32 32z",fill:"#ffffff","p-id":"7013"}),(0,r.jsx)("path",{d:"M928 640H672c-52.8 0-96-43.2-96-96v-64c0-52.8 43.2-96 96-96h256c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM672 448c-17.6 0-32 14.4-32 32v64c0 17.6 14.4 32 32 32h224v-128H672z",fill:"#ffffff","p-id":"7014"})]}),endIcon:n&&(0,r.jsx)(O.Z,{sx:{display:{xs:"none",md:"block"}},children:u?(0,r.jsx)(T.Z,{}):(0,r.jsx)(H.Z,{})}),children:n?(0,r.jsx)(r.Fragment,{children:X(n,4,4)}):(0,r.jsx)(r.Fragment,{children:i("Connect Wallet")})})}),(0,r.jsx)(ea,{anchorEl:p,setAnchorEl:m,openLg:g,setOpenLg:f,setLanguageVal:y}),(0,r.jsx)(en,{anchorEl:p,setAnchorEl:m,openWallet:u,setOpenWallet:v,setWalletModalOpen:o})]})]})},eb=()=>(0,r.jsx)(c.Z,{component:"header",sx:{mt:8,mb:6},children:(0,r.jsxs)(c.Z,{className:"footer-link",children:[(0,r.jsxs)(c.Z,{className:"item",children:[(0,r.jsx)("img",{src:"https://confluxpos.cn/static/images/wechat_logo.png",alt:""})," Wechat: DP494935329"]}),(0,r.jsxs)(c.Z,{className:"item",children:[(0,r.jsx)("img",{src:"https://confluxpos.cn/static/images/qq_logo.png",alt:""})," QQ: 1027288241"]}),(0,r.jsxs)(c.Z,{className:"item",children:[(0,r.jsx)("img",{src:"https://confluxpos.cn/static/images/telegram_logo.png",alt:""})," Telegram"," ",(0,r.jsx)("a",{href:"https://t.me/abcpoolchinese",target:"_blank",children:"https://t.me/abcpoolchinese"})]}),(0,r.jsxs)(c.Z,{className:"item",children:[(0,r.jsx)("img",{src:"https://confluxpos.cn/static/images/twitter_logo.png",alt:""})," Twitter @ABCpospool"]}),(0,r.jsxs)(c.Z,{className:"item",children:[(0,r.jsx)("img",{src:"https://confluxpos.cn/static/images/telegram_logo.png",alt:""})," Telegram"," ",(0,r.jsx)("a",{href:"https://t.me/abcdaohome",target:"_blank",children:"https://t.me/abcpoolenglish"})]})]})});function ev(e){let{children:s}=e;(0,d.Z)();let{breakpoints:t}=(0,d.Z)();(0,h.Z)(t.down("sm"));let n=(0,h.Z)("(max-width:1204px)");return(0,r.jsx)(c.Z,{sx:e=>({display:"flex",justifyContent:"space-between"}),children:(0,r.jsxs)(c.Z,{component:"main",className:"abc-main",sx:{position:"absolute",top:0,right:0,width:"calc(100% - 0px)",minHeight:"100%"},children:[!n&&(0,r.jsxs)(r.Fragment,{children:["  ",(0,r.jsx)("div",{className:"right-bg-r"}),(0,r.jsx)("div",{className:"right-bg-l"})]}),(0,r.jsx)(eu,{}),(0,r.jsx)(x.Z,{className:"abc-main-wrap",children:s}),(0,r.jsx)(eb,{})]})})}var eZ=t(6886);function ew(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(ev,{children:[(0,r.jsx)(f,{tvl:"3000",stkEmission:"1500",loading:!1}),(0,r.jsx)(o,{children:(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(eZ.ZP,{className:"abc-grid",item:!0,xs:12,lg:12,sx:{display:"block"},children:(0,r.jsx)(G,{stakeTitle:"ABC"})})})})]})})}}},function(e){e.O(0,[87,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);