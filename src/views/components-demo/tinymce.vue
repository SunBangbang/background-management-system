<template>
  <div class="tinymce">
    <div class="top">
      <div class="item_image">
        <img src="@/assets/image/three.png" alt />
        <div class="title_box">
          <div>{{ info_list.nodeCount }}</div>
          <span>节点个数</span>
        </div>
      </div>
      <div class="item_image">
        <img src="@/assets/image/forme.png" alt />
        <div class="title_box">
          <div>{{ info_list.contractCount }}</div>
          <span>已部署的智能合约</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="item_image">
        <img src="@/assets/image/one.png" alt />
        <div class="title_box">
          <div>{{ info_list.transactionCount }}</div>
          <span>区块数量</span>
        </div>
      </div>
      <div class="item_image">
        <img src="@/assets/image/tow.png" alt />
        <div class="title_box">
          <div>{{ info_list.latestBlock }}</div>
          <span>存证信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info_list: {
        nodeCount: "",
        contractCount: "",
        transactionCount: "",
        latestBlock: "",
      },
    };
  },
  async created() {
    this.$api.get(
      "/mgr/WeBASE-Node-Manager/group/general/1",
      {},
      ({ data }) => {
        this.info_list = data.data;
      }
    );
  },
};
</script>
<style lang="scss">
.tinymce {
  color: #fff;
  margin-top: 9rem;
  .top {
    display: flex;
    justify-content: center;
  }
  .bottom {
    display: flex;
    justify-content: center;
  }
  .item_image {
    position: relative;
  }
  .title_box {
    position: absolute;
    top: 3.875rem;
    left: 2.9375rem;
    div {
      height: 80px;
      font-size: 64px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
