export default function(context){
    console.log('[Middleware] Check Auth');
    context.store.dispatch('initAuth',context.req);
    /* if(process.client){//sea agrega esto pq solo el cliente tiene acceso al localStorage q se maneja en el store/index.js
        context.store.dispatch('initAuth',null);
    }else{
        context.store.dispatch('initAuth',context.req);
    }
     */   
}