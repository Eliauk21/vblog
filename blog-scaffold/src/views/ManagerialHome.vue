<template>
  <div id="ManagerialHome-all">
    <h1 class="ManagerialHome-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "ManagerialHome",
  data() {
    return {
      title:"闲来无事，想想改点啥",
    };
  },
};
</script>

<style>
#ManagerialHome-all {
  font-size: 20px;
  color: #eee;
}
.ManagerialHome-title {
  text-align: center;
}
</style>