<template>
    <div>
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            info:{}  
        }
    },
    methods: {
        getGoodsDesc(){
            this.$http.get('goods/getdesc/'+ this.$route.params.id).then(result=>{
                if(result.body.status ===0){
                   
                   this.info = result.body.message[0]
                }
            })
        }
    },
    created() {
        this.getGoodsDesc()
    },
}
</script>




<style lang="scss",scoped>



</style>