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
}
</script>

<style>
.posts-page{
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>