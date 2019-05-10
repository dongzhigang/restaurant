 <template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive">
          <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive">
    <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  },
  //挂载结束
  mounted (){
    //获取视窗宽度
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

    //获取视窗高度
    let htmlDom = document.getElementsByTagName('html')[0];
    if(htmlWidth > 750){
      htmlDom.style.fontSize = 750/20 + "px";
    }else{
      htmlDom.style.fontSize = htmlWidth/7.5 + "px";
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin:0;
}
html{
  height: 100%;
}
body{
  max-width: 750px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  margin:0 auto;
  font-family:SourceHanSansCN-Regular;
  position: relative;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family:SourceHanSansCN-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
