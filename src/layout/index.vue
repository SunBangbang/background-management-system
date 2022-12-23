<template>
  <div>
    <!-- <div style="display: flex;justify-content: space-between;align-items: center;background-color: #000;width: 100vw;height: 80px;position: fixed;top: 0;left: 0;z-index: 9999;padding: 0 40px 0 18px;">
      <h1 style="color: #FFF;">山东省公共资源交易中心联盟链</h1>
      <div style="display: flex;justify-content: space-evenly;align-items: center;width: 40%;height: 100%;">
        <div style="display: flex;flex-direction: column;align-items: center;">
          <div style="height: 36px;width: 36px;background-color: #FFF;" />
          <span style="color: #fff;font-size: 14px;margin-top: 5px;">数据大屏</span>
        </div>
        <div style="display: flex;flex-direction: column;align-items: center;">
          <div style="height: 36px;width: 36px;background-color: #FFF;" />
          <span style="color: #fff;font-size: 14px;margin-top: 5px;">数据大屏</span>
        </div>
        <div style="display: flex;flex-direction: column;align-items: center;">
          <div style="height: 36px;width: 36px;background-color: #FFF;" />
          <span style="color: #fff;font-size: 14px;margin-top: 5px;">数据大屏</span>
        </div>
        <div style="display: flex;flex-direction: column;align-items: center;">
          <div style="height: 36px;width: 36px;background-color: #FFF;" />
          <span style="color: #fff;font-size: 14px;margin-top: 5px;">数据大屏</span>
        </div>
        <div style="display: flex;flex-direction: column;align-items: center;">
          <div style="height: 36px;width: 36px;background-color: #FFF;" />
          <span style="color: #fff;font-size: 14px;margin-top: 5px;">数据大屏</span>
        </div>
      </div>
      <div style="display: flex;justify-content: space-around;align-items: center;width: 7%;">
        <span style="color: #fff;">群组: </span>
        <span style="color: #fff;">group1</span>
      </div>
      <div style="width: 2px;height: 80%;background-color: #999;" />
      <div style="display: flex;width: 7%;justify-content: space-between;">
        <div style="width: 40px;height: 40px;border-radius: 50%;background-color: #FFF;" />
        <div style="display: flex;flex-direction: column;">
          <span style="color: #fff;font-weight: bold;font-size: 18px;">user</span>
          <span style="color: #eee;font-size: 13px;">欢迎登陆</span>
        </div>
      </div>
    </div> -->
    <!-- <div style="height:80px;background-color: aquamarine;" /> -->
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
