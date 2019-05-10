<template>
  <div class="hello">
  	<router-link to="/store/storeList" >在线取号</router-link>
    <router-link to="/member/memberCenter">会员中心</router-link>
    <router-link to="/scanCode/qrCode">扫码点餐</router-link>
    <router-link to="/store/storeNav">门店导航</router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
	height: 50px;
	display: flex;
	align-items: center;
	width: 100%;
	padding-top: 50px;
  display: block;
  color: #42b983;
}
</style>
