import api from "./index"


const HTTP = {
    tinymce: () => {
        return new Promise((resolve, reject) => {
            api.get("/mgr/WeBASE-Node-Manager/group/general/1", {}, (r) => {
                resolve(r.data)
            })
        })
    }
}

export default HTTP