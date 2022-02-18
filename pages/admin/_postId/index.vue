<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';
import axios from 'axios'
export default {
    layout:'admin',
    components:{
        AdminPostForm
    },
    asyncData(context){
        //console.log(context.params)
        return axios.get('https://nuxt-blog-d3290-default-rtdb.firebaseio.com/posts/'+context.params.postId+'.json')
        .then(res => {
            return {
                loadedPost: res.data
            }
        })
        .catch(e => context.error(e))
    }
    /*
    data(){
        return{
            loadedPost:{
                author: 'Felix',
                title: 'My awesome Post',
                content: 'Super amazing, thanks for that!',
                thumbnailLink: 'https://ecuador.unir.net/wp-content/uploads/2019/12/mba-tech.jpg'
            }
        }
    }
    */
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>