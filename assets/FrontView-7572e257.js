import{_ as d,R as h,a as u,r as i,o as p,c as f,b as t,w as n,d as e,e as a,f as m,F as k}from"./index-be1a73cb.js";const{VITE_APP_URL:w}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"qwe1234",BASE_URL:"/week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},V={components:{RouterView:h},methods:{checkLogin(){u.post(`${w}/api/user/check`).then(o=>{o.data.success?this.$router.push("/admin"):this.$router.push("/login")}).catch(o=>{console.log(o),alert(o.response.data.message),this.$router.push("/login")})}},mounted(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)tokenId\s*=\s*([^;]*).*$)|^.*$/,"$1");u.defaults.headers.common.Authorization=o}},$=a("div",null,"這是一個前台頁面",-1),g=a("hr",null,null,-1);function P(o,r,v,x,E,c){const s=i("router-link"),l=i("router-view");return p(),f(k,null,[$,t(s,{to:"/"},{default:n(()=>[e("首頁")]),_:1}),e(" | "),t(s,{to:"/about"},{default:n(()=>[e("關於我們")]),_:1}),e(" | "),t(s,{to:"/products"},{default:n(()=>[e("產品列表")]),_:1}),e(" | "),t(s,{to:"/cart"},{default:n(()=>[e("購物車")]),_:1}),e(" | "),a("a",{href:"#",onClick:r[0]||(r[0]=m((..._)=>c.checkLogin&&c.checkLogin(..._),["prevent"]))},"參觀後台"),g,t(l)],64)}const A=d(V,[["render",P]]);export{A as default};
