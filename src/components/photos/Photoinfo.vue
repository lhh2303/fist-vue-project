<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time |dateFormat}}</span>
            <span>点击:{{photoinfo.click}}</span>
        </p>
        <hr>

        <!-- 缩略图 -->
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        <!-- 图片内容 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件 -->
        <comment :id="this.id"></comment>
    </div>
</template>


<script>
// 导入评论子组件
import comment from '../sub/comment.vue'
export default{
    data() {
        return {
            id:this.$route.params.id ,//获取图片详情id
            photoinfo:{},
            list:[]//缩略图

        }
    },
    created() {
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            this.$http.get('getimageInfo/'+this.id).then(result=>{
                if(result.body.status ===0){
                    this.photoinfo = result.body.message[0]
                }
            })
        },
        getThumbs(){
            // 获取缩略图
            this.$http.get('getthumimages/'+ this.id).then(result=>{
                // 循环补宽高
                if(result.body.status ===0){
                   result.body.message.forEach(item =>{
                       item.w =600
                       item.h =400
                   })
                   this.list = result.body.message
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
        
    },
    // 注册组件
    components:{
        comment
    }
}
</script>



<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size:15px;
        text-align:center;
        margin:15px  0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>