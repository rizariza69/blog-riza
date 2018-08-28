<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <router-link to="/">UR-blog</router-link>
      </div>
      
      <router-link to="/" > Home |</router-link>
      <router-link  to="/myArticle"> MyArticle |</router-link>
      <router-link  to="/login"> Login |</router-link> 
      <a href="/" @click="logout"> Logout |</a> 
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import router from './router.js'

export default {
  data:function (){
    return{
      token:localStorage.getItem("token")
    }
  },methods:{
    logout(){
      localStorage.removeItem('token')
      // this.$router.push('/')

    }
  }
}
</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#logo{
  font-size: 40px
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
