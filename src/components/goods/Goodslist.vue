<template>
    <div class="goods-list">

 <!--        <router-link :to="'/home/goodsinfo/'+item.id"class="goods-item" v-for="(item, index) in goodslists" :key="item.id"tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="cell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}</span>
                </div>
            </div>
        </router-link> -->
        <!-- 两种跳转 -->
        <!-- a跳转 -->
        <!-- bom跳转 window.location.href -->
        <div class="goods-item" v-for="(item, index) in goodslists" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="cell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large"@click="getMore">加载更多</mt-button>
    </div>


    
</template>

<script>
export default {
    data() {
        return {
            pageindex:1,
            goodslists:[]//存放商品列表
        }
    },
    methods: {
        getGoodsList(){
            this.$http.get('getgoods?pageindex='+this.pageindex).then(result =>{
                if(result.body.status ===0){
                    this.goodslists =this.goodslists.concat(result.body.message)
                }
                else{

                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        goDetail(id){
           this.$router.push('/home/goodsinfo/'+ id)
        }
    },
    created() {
        this.getGoodsList()
    },
}    
</script>


<style lang="scss",scoped>
.goods-list{
    display:flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        border: 1px solid #ccc;
        box-shaodw:0 0 8px #ccc;
        margin:3px 0;
        width: 49%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        min-height:293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            P{
                margin: 0;
                padding:5px
            }
            .price{
                .old{
                    text-decoration: line-through;
                    font-size:12px;
                    margin-left:10px;
                }
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>