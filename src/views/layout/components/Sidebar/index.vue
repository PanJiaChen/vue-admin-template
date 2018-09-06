<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';

@Component({
  components: {
    SidebarItem,
  },
})
export default class SideBar extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    return (this.$router as any).options.routes;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>
