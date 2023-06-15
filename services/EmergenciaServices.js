import Api from "~/services/Api";

export default {
  findAll(token){
    console.log("token: "+token);
    return Api().get('/api/emergencias');
  },


}
