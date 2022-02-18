<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
    layout:'admin',
    components:{
        AdminPostForm
    },
    asyncData(context){
        //console.log(context.params)
        return context.app.$axios.$get('/posts/'+
                        context.params.postId+
                        '.json')
        .then(data => {
            return {
                loadedPost: {...data, id: context.params.postId}
            }
        })
        .catch(e => context.error(e))
    },
    methods:{
        onSubmitted(editedPost){
            this.$store.dispatch('editPost',editedPost).then(()=>{
                this.$router.push('/admin');
            });
        }
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