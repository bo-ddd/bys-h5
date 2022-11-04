 <template>
  <div>
    <van-nav-bar title="上传简历" left-text left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="fs-20 fw-700">选择一种方式上传简历/作品集</div>
      <div class="color-gray">支持pdf、doc、docx格式附件，文件大小不超过20M</div>
      <van-cell @click="to('/uploadResumeDetails')" center is-link class="mt-20">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title class="flex-noshrink">
          <div class="align-center flex-noshrink fs-16">
            <div class="circle-border green-border flex-noshrink mr-10">
              <img :src="parseAssetFile('icon-wechat.png')" alt />
            </div>
            <div class="flex-noshrink">微信聊天文件上传</div>
          </div>
        </template>
        <template #value>
          <div class="flex-noshrink">
            <span class="ellipse-border">推荐</span>
          </div>
        </template>
      </van-cell>
      <van-cell @click="to('/uploadResumeComputer')" center is-link class="mt-10">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title class="flex-noshrink">
          <div class="align-center flex-noshrink fs-16">
            <div class="circle-border blue-border flex-noshrink mr-10">
              <img :src="parseAssetFile('icon-computer.png')" alt />
            </div>
            <div class="flex-noshrink">电脑端上传</div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
const router = useRouter();
const onClickLeft = () => history.back();
const to = function (path: any) {
  router.push(path);
};
</script>
<style lang="scss" scoped>
.flex-noshrink {
  flex-shrink: 0;
  height: 100%;
}
.content {
  background-color: #f2f3f6;
  height: calc(100vh - 4.6rem);
  box-sizing: border-box;
  padding: 2rem;
  position: relative;
  .ellipse-border{
    display: inline-block;
    box-sizing: border-box;
    border: 0.1rem solid #3b80fb;
    color: #3b80fb;
    border-radius: 1.2rem;
    padding:0 0.8rem;
    font-size: 1.2rem;
  }
  .circle-border {
    width: 4rem;
    height: 4rem;
    box-sizing: border-box;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
    }
  }
  .blue-border{
    border: 0.1rem solid #347cfe;
  }
  .green-border{
    border: 0.1rem solid #4cba42;
  }
  .img {
    width: 15rem;
    height: 13rem;
    display: block;
    margin: 0 auto;
  }
  .fw-700 {
    font-weight: 700;
  }
  .color-gray {
    color: gray;
  }
  .text-center {
    text-align: center;
  }
  .upload-btn {
    position: absolute;
    bottom: 2rem;
    width: calc(100% - 4rem);
  }
  .fs-14 {
    font-size: 1.4rem;
  }
  .fs-20 {
    font-size: 2rem;
  }
  .mt-20 {
    margin-top: 2rem;
  }
  .mt-30 {
    margin-top: 3rem;
  }
  .mt-80 {
    margin-top: 8rem;
  }
  .fs-18 {
    font-size: 1.8rem;
  }
  .mr-10{
    margin-right: 1rem;
  }
}
</style>