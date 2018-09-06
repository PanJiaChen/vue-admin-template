import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule {
  token: IUserState['token'] = '';
  name: IUserState['name'] = '';
  avatar: IUserState['avatar'] = '';
  roles: IUserState['roles'] = [];

  @Mutation
  SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action({ commit: 'SET_TOKEN' })
  async Login(userInfo: { username: string, password: string}) {
    const username = userInfo.username.trim();
    const { data } = await login(username, userInfo.password);
    setToken(data.token);
    return data.token;
  }

  @Action({ commit: 'SET_TOKEN' })
  async FedLogOut() {
    removeToken();
    return '';
  }

  @MutationAction({ mutate: [ 'roles', 'name', 'avatar' ] })
  async GetInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const { data } = await getInfo(token);
    if (data.roles && data.roles.length > 0) {
      return {
        roles: data.roles,
        name: data.name,
        avatar: data.avatar,
      };
    } else {
      throw Error('GetInfo: roles must be a non-null array!');
    }
  }

  @MutationAction({ mutate: [ 'token', 'roles' ] })
  async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!');
    }
    await logout();
    removeToken();
    return {
      token: '',
      roles: [],
    };
  }
}

export const UserModule = getModule(User.prototype);
