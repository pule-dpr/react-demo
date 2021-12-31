import { observable, action, makeObservable, configure } from 'mobx';
import moment from 'moment';
interface userinfo{
  id?:string,
  uname?:string,
  sex?:string,
  name?:string,
  age?:string,
  pwd?:string,  
  hobby?:string[]
}
class AppStore {
  @observable time = moment().format('YYYY-MM-DD HH:mm:ss');
  @observable isLogin = false
  @observable userinfo:userinfo = {}
  constructor() {
    //mbox 6后需要添加这个组件才会更新
    makeObservable(this);
    // 不允许在动作之外进行状态修改
    configure({ enforceActions: "observed" })
  }
  @action login = () => {
    this.isLogin = true
  }
  @action logout = () => {
    this.isLogin = false
  }
  @action setuser = (userinfo: userinfo) => {
    this.userinfo = userinfo
  }
  @action getNow() {
    this.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }
}



const store = new AppStore()
setInterval(() => {
  store.getNow()
}, 1000)
//到处 自定义的store类型
export type StoreInstance = typeof store
export { store }