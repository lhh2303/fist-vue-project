<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        // 初始化组件
        mui(".mui-numbox").numbox()
        console.log(this.max)
    },
    methods: {
        countChange(){
            // 文本框数据修改时 通过事件调用传递给父组件
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        'max':function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>


<style>

</style>
