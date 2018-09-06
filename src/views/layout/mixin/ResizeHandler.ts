import { Component, Vue, Watch } from 'vue-property-decorator';
import { DeviceType, AppModule } from '@/store/modules/app';

const { body } = document;
const WIDTH = 1024;
const RATIO = 3;

@Component
export default class ResizeHandlerMixin extends Vue {
  get device() {
    return AppModule.device;
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  @Watch('$route')
  OnRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.CloseSideBar(false);
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile);
      AppModule.CloseSideBar(true);
    }
  }

  isMobile() {
    const rect = body.getBoundingClientRect();
    return rect.width - RATIO < WIDTH;
  }

  resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
      if (isMobile) {
        AppModule.CloseSideBar(true);
      }
    }
  }
}
