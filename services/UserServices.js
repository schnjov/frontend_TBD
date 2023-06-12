import Api from "~/services/Api";

export default {
  matchUser(data){
    return Api().post('/api/login',data);
  },
  register(data){
    return Api().post('api/register',data)
  }
}
