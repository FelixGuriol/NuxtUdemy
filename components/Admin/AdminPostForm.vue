<template>
    <form @submit.prevent="onSave">
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

        <AppControlInput v-model="editedPost.title">Title</AppControlInput>
                
        <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>
                
        <AppControlInput
                control-type="textarea"
                v-model="editedPost.content">Content</AppControlInput>

        <AppControlInput
                control-type="textarea"
                v-model="editedPost.previewText">Preview Text</AppControlInput>
                
        <AppButton type="submit">Save</AppButton>
                
        <AppButton
                type="button"
                style="margin-left: 10px"
                btn-style="cancel"
                @click="onCancel">Cancel</AppButton>
    </form>
</template>

<script>
export default {
    props:{
        post:{
            type: Object,
            required: false
        }
    },
    data(){
        return{
            editedPost: this.post
            ? {...this.post}//si this.post existe, saca toda la data y su estructura y la guarda en editedPost
            : {//si this. post no existe crea un objeto vacio
                author:'',
                title:'',
                thumbnailLink:'',
                content:'',
                previewText:''
            }
        }
    },
    methods:{
        onSave(){
            //Save the post
            //console.log(this.editedPost);
            this.$emit('submit',this.editedPost)
        },
        onCancel(){
            //Navigate back
            this.$router.push('/admin');
        }
    }
}
</script>