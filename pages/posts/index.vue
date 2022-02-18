<template>
    <div class="posts-page">
        <PostList :posts="loadedPosts" />
    </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
export default {
  components:{
    PostList
  },
  asyncData(context){//callback le indica a la pagina q ya obtubo los datos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
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
          ]
        });
      },1500)
    })
    .then(data => {
      return data;
    })
    .catch(e =>{
      context.error(new Error());
    });
  },
  created(){// se ejecuta despues de cargar la vista y la data
    this.$store.dispatch('setPosts',this.loadedPosts)
    console.log(this.$store.getters.loadedPosts)
  }
  /*
  data(){
    return{
      loadedPosts:[
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
      ]
    }
  },
  */
}
</script>

<style>
.posts-page{
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>