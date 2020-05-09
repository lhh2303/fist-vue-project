<template>
  <div class="shopcar-contanier">
    <!-- 列表区 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in goodslists" :key="item.id">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
             <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
             @change='selectedChange(item.id,   $store.getters.getGoodsSelected[item.id])'></mt-switch>
             <img :src="item.thumb_path" alt="">

             <div class="info">
               <h1>{{item.title}}</h1>
               <p>
                 <span class="price">{{item.sell_price}}</span>
                 <numbox :initcount ="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                 <!-- 从购物车中获取商品数量 -->
                 <!--: 1.创建空对象，循环购物车中所有商品数据
                  {
                  88 : 2 ,
                  89 : 1
                  }
                -->
                 <a href="#"@click.prevent="remove(item.id,index)">删除</a>
               </p>
             </div>
            </div>
        </div>
    </div>

    <!-- 结算区 -->
    <div class="mui-card">
      <div class="mui-card-content">
          <div class="mui-card-content-inner">
              <div class="left">
                <p>总计(不含运费)</p>
                <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amout}}</span></p>
              </div>
              <mt-button type="danger">结算</mt-button>
          </div>
      </div>
  </div>

    </div>
  </div>
</template>

<script>
  import numbox from '../sub/shopcar_numbox.vue'
export default {
  data() {
    return {
      goodslists:[]
    }
  },
  methods: {
    getGoodList(){
      var idArr =[]
      this.$store.state.car.forEach(item => idArr.push(item.id))

      if(idArr.length <=0){
        return
      }
      this.$http.get('goods/getshopcarlist/'+ idArr.join(",")).then(result=>{
                if(result.body.status ===0){
                   
                   this.goodslists = result.body.message
                }
            })
    },
    
    remove(id,index){
      this.goodslists.splice(index,1);
      this.$store.commit('removeFromCar',id)
    },
    selectedChange(id ,val ){
      // 同步状态
    this.$store.commit('updateGoodsSelected',{id,selected: val})
    }
  },
  created() {
    this.getGoodList()
  },
  components:{
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-contanier{
  background-color: #eee;
  overflow: hidden;
  .goods-list{
    .mui-card-content-inner{
      display: flex;
      align-items:center;
    }
    img{
      width: 60px;
      height: 60px;
    }
    h1{
      font-size: 13px;
    }
    .info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price{
        color: red;
        font-weight:bold;
      }
    }
  }
  .mui-card-content-inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight:bold;
      font-size:16px;
    }
  }
}
</style>
