import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () =>{
    return new Vuex.Store({
        state:{
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state,posts){
                state.loadedPosts=posts
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
                const postIndex = state.loadedPosts.findIndex(
                    post => post.id === editedPost.id
                );
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state,token){
                state.token=token;
            },
            clearToken(state){
                state.token=null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext,context){//se corre automaticamente
               return context.app.$axios
                .$get('/posts.json')
                .then(data => {
                    const postsArray = [];
                    for(const key in data){
                        postsArray.push({...data[key], id:key})//los ... significa q saca toda la estructura y le agrega el id:key
                    }
                    vuexContext.commit('setPosts',postsArray)
                })
                .catch(e => context.error(e));
            },
            addPost(vuexContext,post){
                const createdPost ={...post, updatedDate: new Date()};
                return this.$axios
                    .$post('/posts.json?auth='+vuexContext.state.token,createdPost)//mandar los datos firebase junto con el token
                    .then(data => {
                        vuexContext.commit('addPost',{...createdPost, id: data.name})//el name de bota el id del registro en firebase
                    })
                    .catch(e => console.log(e))
            },
            editPost(vuexContext,editedPost){
                return this.$axios.$put('/posts/'+
                    editedPost.id+//se usa route pq el componente y la vista ya estan cargadas
                    '.json?auth='+vuexContext.state.token,editedPost)
                .then(res => {
                    vuexContext.commit('editPost',editedPost)
                })
                .catch(e => console.log(e))
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts);
            },
            authenticateUser(vuexContext,authData){
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+
                    process.env.fbAPIKey;
                if(!authData.isLogin) {
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+
                            process.env.fbAPIKey;
                }

                return this.$axios.$post(authUrl,{
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(result => {
                        vuexContext.commit('setToken',result.idToken);//es el atributo q almacena el token
                        localStorage.setItem('token',result.idToken);
                        localStorage.setItem(
                                        'tokenExpiration',
                                        new Date().getTime() + Number.parseInt(result.expiresIn)*1000);//expiresIn en segundos
                        Cookie.set('jwt',result.idToken);//tmb se almacena todo en cookie
                        Cookie.set(
                                'expirationDate',
                                new Date().getTime() + Number.parseInt(result.expiresIn)*1000);
                        
                        return this.$axios.$post('http://localhost:3000/api/track-data',{
                            data: 'Authenticated'
                        })
                    })
                    .catch(e => console.log(e));
            },
            initAuth(vuexContext, req){
                let token;
                let expirationDate;
                if(req){//Se corre en servidor
                    if(!req.headers.cookie){
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                                    .split(';')//separa la cookie por ';'
                                    .find(c => c.trim().startsWith('jwt='));//selecciona la parte q comience con 'jwt=' (sin espacion .trim())
                    if(!jwtCookie){
                        return;
                    }
                    token=jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie
                                    .split(';')//separa la cookie por ';'
                                    .find(c => c.trim().startsWith('expirationDate='))
                                    .split('=')[1];
                }else{//corre en cliente
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }

                
                if(new Date().getTime() > +expirationDate || !token){
                    console.log('No token o invalid token')
                    vuexContext.dispatch('logout');
                    return;
                }
                
                vuexContext.commit('setToken',token)
            },
            logout(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state){
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null;
            }
        }
    })
}

export default createStore