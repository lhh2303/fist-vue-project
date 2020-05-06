<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        
        <textarea placeholder="请输入评论内容" maxlength="120" v-model="msg">

        </textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{index+1}}楼用户&nbsp;&nbsp;：用户:{{item.user_name}} &nbsp;&nbsp;发表时间：{{item.add_time |dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content  ===""? '什么都没发':item.content}}
                </div>
            </div>

        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default{
    data() {
        return {
            pageindex :1,
            comments:[],
            msg:""
        }
    },
    created() {
        this.getComment()
    },
    props:["id"],
    methods: {
        // 加载评论
        getComment(){
            this.$http.get("getcomments/" +this.id +"?pageindex="+this.pageindex).then(result =>{
                if(result.body.status ===0){
                    this.comments = this.comments.concat(result.body.message)
                }
                else{

                }
            })
        },
        // 加载更多
        getMore(){
            this.pageindex++
            this.getComment()
        },
        postComment(){
            if(this.msg.trim()==""){
                console.log("不为空")
            }
            this.$http.post('postcomment/'+ this.id ,
             {content: this.msg.trim()
                })
             .then(function(result){
                if(result.body.status ===0){
                    var cmt ={
                        user_name :"匿名用户",
                        add_time :Date.now(),
                        content:this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg =""
                }
             })
        }
    },
}
</script>


<style lang="scss"  scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{ 
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }


}
</style>