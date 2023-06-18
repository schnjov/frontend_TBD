import Api from "~/services/Api";
import axios from "axios";
export default{
  getTasksByRegion(token,region) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return Api().get(`/api/tareas/region/${region}`);
    },
}

