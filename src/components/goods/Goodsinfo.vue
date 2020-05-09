<template>
    <div class="goodslnfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品图片 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList='lunbodu' :isfull="false"></swiper>
                </div>
            </div>
        </div>


        <!-- 商品购买 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p class="price">
                       市场价：<del>${{goodsinfo.market_price}}</del> &nbsp;&nbsp;销售价 :<span class="now_price">{{goodsinfo.sell_price}}</span>
                   </p>
                   <p>购买数量:<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
                   <p>
                       <mt-button type="primary"size="small">立即购买</mt-button>
                       <mt-button type="danger"size="small" @click="addToShopCar">加入购物车</mt-button>


                       <!-- 子组件传值（事件调用机制） -->
                       
                   </p>
                </div>
            </div>
        </div>


        <!-- 商品评论 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p>商品货号：{{goodsinfo.goods_no}}</p>
                   <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                   <p>上架时间：{{goodsinfo.add_time |dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large"plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swiper from '../sub/swiper.vue'
    import numberbox from '../sub/goodsinfo_numberbox.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,//图片id
            lunbodu:[],
            goodsinfo:{},
            ballFlag:false ,//控制小球隐藏
            selectedCount:1
        }
    },
    methods: {
        getLunbotu(){
             // 获取轮播图
             this.$http.get('getthumimages/'+ this.id).then(result=>{
                if(result.body.status ===0){
                    result.body.message.forEach(item =>{
                        item.img =item.src
                    }) 
                   this.lunbodu = result.body.message
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('goods/getinfo/'+ this.id).then(result=>{
                if(result.body.status ===0){
                   this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            // 编程时导航
            this.$router.push({name:'goodsdesc', params: {id } } )
        },
        goComment(id){
            this.$router.push({name:'goodscomment', params: {id } } )
        },
        addToShopCar(){
            this.ballFlag = ! this.ballFlag
            // 要存入store数组中的商品对象信息
            var goodsinfo ={
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            // 调用store 讲商品加入购物车
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform ="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            // 适应不同分辨率和滑动屏幕      
            // 得到徽标横纵坐标 和小球横纵坐标 各自相减
            
            // 获取小球的位置
            const ballPositon =this.$refs.ball.getBoundingClientRect();
            // 获取徽标位置
            const badgePostion = document.getElementById("badge").getBoundingClientRect()
            const xDist =badgePostion.left-ballPositon.left
            const yDist =badgePostion.top-ballPositon.top

            el.style.transform =`translate(${xDist}px,${yDist}230px)`
            el.style.transition ="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){

            this.ballFlag = ! this.ballFlag
        },
        getSelectedCount(count){
            this.selectedCount = count
            console.log('父组件拿到',+this.selectedCount)
        }
    },
    created() {
        this.getLunbotu()
        this.getGoodsInfo()
    },
    components:{
        swiper,
        numberbox
    },
}
</script>

<style lang="scss",scoped>
.goodslnfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size:16px
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:390px;
        left: 146px;
    }
}
</style>