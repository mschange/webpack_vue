<template>
  <div>
    <p>{{msg}}</p>
    <p><span>颜色变化了没</span></p>
    <p>
      <img src="./asset/swiper2.jpg" alt="">
    </p>
    <p class="box"></p>
    <orderTest @test="orderTests">
      <div>
        <p>slot第一行</p>
        <p>slot第二行</p>
      </div>
    </orderTest>
    <router-view/>
  </div>
</template>

<script>
  import orderTest from './component/test'
  export default {
    name: "app.vue",
    data() {
      return {
        msg: '我看看能不能打包成功'
      }
    },
    components: {orderTest},
    methods: {
      orderTests() {
        console.log('子组件传递过来的啊')
      }
    }
  }
</script>

<style lang="less">
p {
  span {
    color: red;
    font-size: 16px;
  }
}
.box {
  width: 300px;
  height: 100px;
  background: url("./asset/swiper2.jpg") no-repeat center center;
  background-size: 100% 100%;
}
</style>
