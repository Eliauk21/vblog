<template>
  <div class="demo-image__lazy">    
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next, slot"
      :total="list.length * 10">
        <div>
          <el-card>
            <img :src="img" class="image">
          </el-card>
        </div>
    </el-pagination>
  </div>
</template>

<script>
import { find } from "@/api/photos.js";

export default {
  data() {
    return {
      list: "",
      img:""
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.img = this.list[val-1].photosUrl;
    }
  },
  mounted() {
    find() //查找所有照片存入list
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list;
          this.img = res.data.list[0].photosUrl;
        } else {
          this.$message({
            message: "图片加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "图片加载失败",
          type: "error",
        });
      });
  },
};
</script>

<style>
.el-card{
  display: inline-block;
}
</style>