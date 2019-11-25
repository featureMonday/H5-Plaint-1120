<template>
  <div class="hello">
    <vm-switch v-model="checked" />
    <img src="../assets/vortex.jpeg">
    <div class="text">{{msg}}</div>
    <!-- <vm-loading type="spinner" /> -->
    <vm-button tag="a" href="http://vortex.zj.chinamobile.com/components" block size="lg" class="bg-blue button-item">组件库</vm-button>
  </div>
</template>

<script>
import { Button } from 'vortex-mobile';
export default {
  name: 'HelloMobileTemplate',
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      msg: 'Welcome to vortex',
      checked: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
}
img {
  width: 200px;
  text-align: center;
  padding-top: 100px;
}
.text {
  margin-top: 100px;
  text-align: center;
  font-size: 32px;
}
.button-item {
  position: fixed;
  bottom: 0;
}
</style>
