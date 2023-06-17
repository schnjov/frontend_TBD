import Api from "~/services/Api";
import axios from "axios";

export default {
  findAll(token){
    console.log("token: "+token);
    // Configurar el token en los encabezados de Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return Api().get('/api/emergencias');
  },
  toggleEmergencia(token,id) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return Api().put('/api/emergencias/cambiar/estado/'+String(id));
  },
  countTasks(token,id_emergencia) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return Api().get('/api/emergencias/count/'+String(id_emergencia));
  }


}
