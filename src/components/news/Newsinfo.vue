<template>
    <div class="newsinfo-containter">
       <h3 class="title">{{newsinfo.title}}</h3>
       <p class="subtitle">
           <span>发表时间：{{newsinfo.add_time |dateFormat}}</span>
           <span>点击：{{newsinfo.click}}</span>
       </p>
       <hr>

       <div class="content" v-html="newsinfo.content"></div>
       <comment :id=this.id></comment>
    </div>
</template>

<script>

    // 导入评论组件
import comment from '../sub/comment.vue'
export default{
    data() {
        return {
            id:this.$route.params.id,
            newsinfo : {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('getnew/'+this.id).then(result =>{
                if(result.body.status ===0){
                    this.newsinfo =result.body.message[0]
                    console.log(this.newsinfo)
                }
                else{

                }
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="scss">
.newsinfo-containter{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align:center;
        margin:15px 0;
        color:red;
    }
    .subtitle{
        font-size: 13px;
        color: lightblue;
        display: flex;
        justify-content: space-between;
    }
    .content{

    }
}

</style>