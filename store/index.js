import Vuex from 'vuex';
import axios from 'axios';

const createStore = () =>{
    return new Vuex.Store({
        state:{
            loadedPosts: []
        },
        mutations: {
            setPosts(state,posts){
                state.loadedPosts=posts
            }
        },
        actions: {
            nuxtServerInit(vuexContext,context){//se corre automaticamente
               return axios.get('https://nuxt-blog-d3290-default-rtdb.firebaseio.com/posts.json')
                .then(res => {
                    const postsArray = [];
                    for(const key in res.data){
                        postsArray.push({...res.data[key], id:key})//los ... significa q saca toda la estructura y le agrega el id:key
                    }
                    vuexContext.commit('setPosts',postsArray)
                })
                .catch(e => context.error(e));
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts);
            }
        },
        getters: {
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    })
}

export default createStore