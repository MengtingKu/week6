import{_ as n,f as p,o as c,c as e,d as o,t as s}from"./index-04c4e9e9.js";const{VITE_APP_URL:d,VITE_APP_PATH:_}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"qwe1234",BASE_URL:"/week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},l={data(){return{product:{}}},methods:{getProductItem(){const{id:r}=this.$route.params;p.get(`${d}/api/${_}/product/${r}`).then(i=>{this.product=i.data.product})}},mounted(){this.getProductItem()}},u={class:"container"},a={class:"row"},h={class:"col-md-6"},m=["src","alt"],P={class:"col-md-6"},g={class:"badge bg-primary rounded-pill mb-3"},f={key:0,class:"h5"},E={key:1},v={class:"h6 text-decoration-line-through"},A={class:"h5"};function V(r,i,x,I,t,T){return c(),e("div",u,[o("h1",null,s(t.product.title),1),o("div",a,[o("div",h,[o("img",{class:"img-fluid",src:t.product.imageUrl,alt:t.product.title,"aria-label":"img"},null,8,m)]),o("div",P,[o("span",g,s(t.product.title),1),o("p",null,"商品描述："+s(t.product.description),1),o("p",null,"商品內容："+s(t.product.content),1),t.product.price===t.product.origin_price?(c(),e("p",f,s(t.product.price)+" 元 ",1)):(c(),e("div",E,[o("p",v," 原價 "+s(t.product.origin_price)+" 元 ",1),o("p",A,"現在只要 "+s(t.product.price)+" 元",1)]))])])])}const R=n(l,[["render",V]]);export{R as default};
