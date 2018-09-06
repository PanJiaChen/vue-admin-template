import Cookies from 'js-cookie';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule {
  sidebar: IAppState['sidebar'] = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false,
  };
  device: IAppState['device'] = DeviceType.Desktop;

  @Mutation
  TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed');
    } else {
      Cookies.set('sidebarStatus', 'opened');
    }
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'CLOSE_SIDEBAR' })
  CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'TOGGLE_DEVICE' })
  ToggleDevice(device: DeviceType) {
    return device;
  }
}

export const AppModule = getModule(App.prototype);
