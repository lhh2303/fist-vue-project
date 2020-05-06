<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class='["mui-control-item ",item.id ==0 ? "mui-active":""]' v-for="(item, index) in cates" :key="index.id"
                    @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>

        <!-- 图片列表去 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
              <img v-lazy="item.img_url">
              <div class="info">
                  <div class="info-title">{{item.title}}</div>
                  <div class="info-body">{{item.zhaiyao}}</div>
              </div>
            </router-link>
          </ul>

    </div>
</template>

<script>
import  mui from '../../lib/mui/js/mui.min.js'

export default{
    data() {
        return {
            cates:[],
            list:[]
        }
    },
    created() {
        this.getAllCategory()
        this.getPhotoList(0)//请求所有图片数据
    },
    methods: {
        getAllCategory(){
            this.$http.get('getimgcategory').then(result=>{
                if(result.body.status ===0){
                    // 手动添加 “全部”分类
                    result.body.message.unshift({title:"全部",id:0})
                    this.cates =result.body.message
                }
            })
        },
        getPhotoList(cateId){
            this.$http.get('getimages/' +cateId).then(result=>{
                if(result.body.status ===0){
                    this.list =result.body.message
                }
            })
        }
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005
})
    },
}
</script>


<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }


.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        text-align: center;
        background-color: #ccc;
        margin-bottom:10px;
        box-shadow:0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            color: white;
            text-align: left ;
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
                }
        }
    }
}
</style>