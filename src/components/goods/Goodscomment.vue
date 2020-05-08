<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>


<script>
    import cmtbox from "../sub/comment.vue"
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
    props:[],
    components:{
        cmtbox
    }
}
</script>




<style lang="scss",scoped>



</style>