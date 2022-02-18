import Vuex from 'vuex'
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
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts',[//llena los datos 
                            {
                                id: '1', 
                                title: 'First Post', 
                                previewText: 'This is our first post!',
                                thumbnail:'https://ecuador.unir.net/wp-content/uploads/2019/12/mba-tech.jpg'
                            },
                            {
                                id: '2', 
                                title: 'Second Post', 
                                previewText: 'This is our second post!',
                                thumbnail:'https://ecuador.unir.net/wp-content/uploads/2019/12/mba-tech.jpg'
                            }
                        ]);
                      resolve();
                    },1000);
                });
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts)
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