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
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
                const postIndex = state.loadedPosts.findIndex(
                    post => post.id === editedPost.id
                );
                state.loadedPosts[postIndex] = editedPost;
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
            addPost(vuexContext,post){
                const createdPost ={...post, updatedDate: new Date()};
                return axios
                    .post('https://nuxt-blog-d3290-default-rtdb.firebaseio.com/posts.json',createdPost)//mandar los datos firebase
                    .then(res => {
                        vuexContext.commit('addPost',{...createdPost, id: res.data.name})//el name de bota el id del registro en firebase
                    })
                    .catch(e => console.log(e))
            },
            editPost(vuexContext,editedPost){
                return axios.put('https://nuxt-blog-d3290-default-rtdb.firebaseio.com/posts/'+
                    editedPost.id+//se usa route pq el componente y la vista ya estan cargadas
                    '.json',editedPost)
                .then(res => {
                    vuexContext.commit('editPost',editedPost)
                })
                .catch(e => console.log(e))
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