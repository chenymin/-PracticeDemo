export default function auth ({ next, store, nexts }){
 if(!store.getters.auth.loggedIn){
     return next({
        name: 'login'
     })
 }

 return nexts ? nexts() : next()
}