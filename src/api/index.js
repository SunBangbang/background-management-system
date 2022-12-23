// 引用axios
var axios = require('axios')
import { Message } from 'element-ui'
import store from '@/store'

function apiAxios(method, url, params, success, failure, noLoad, credentials) {
    let headers = {}

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'AuthorizationToken': `Token ${store.getters.token}`
        }
    } else {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'AuthorizationToken': `Token ${store.getters.token}`
        }
    }
    axios({
            method: method,
            url: url,
            headers,
            data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? params : null,
            params: method === 'GET' ? params : null,
            withCredentials: true
        })
        .then(function(res) {
            if (res) {
                if (success) {
                    success(res)
                }
            } else {
                console.log('failure', failure)
                if (failure) {
                    failure(res)
                }
            }
        })
}

/**
 * 节点监控专用
 */
function axiosMonitor(method, url, params, success, failure, noLoad, credentials) {
    axios({
            method: method,
            url: url,
            params: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'AuthorizationToken': `Token ${store.getters.token}`
            },
            withCredentials: true
        })
        .then(function(res) {
            if (res) {
                if (success) {
                    success(res)
                }
            } else {
                if (failure) {
                    failure(res)
                }
            }
        })
}


/**
 * 上传文件专用，接受参数形式为formData
 */
function uploadAxios(method, url, params, onUploadProgress, success, failure, noLoad, credentials) {
    axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'AuthorizationToken': `Token ${store.getters.token}`

            },
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            onUploadProgress: onUploadProgress,
            withCredentials: true
        })
        .then(function(res) {
            if (res) {
                if (success) {
                    success(res)
                }
            } else {
                if (failure) {
                    failure(res)
                }
            }
        })
}

/**
 * 下载文件专用，接受参数形式为formData
 */
function DownloadAxios(method, url, params, success, failure, noLoad, credentials) {
    axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'AuthorizationToken': `Token ${store.getters.token}`
            },
            data: params,
            responseType: 'arraybuffer'
        })
        .then(function(res) {
            if (res) {
                if (success) {
                    success(res)
                }
            } else {
                if (failure) {
                    failure(res)
                }
            }
        })
        .catch(function(err) {
            if (err) {
                Message.closeAll()
                return
            }
        })
}

export default {
    get: function(root, url, params, success, failure, noLoad) {
        return apiAxios('GET', root, url, params, success, failure, noLoad)
    },
    post: function(url, params, success, failure, noLoad, credentials) {
        return apiAxios('POST', url, params, success, failure, noLoad, credentials)
    },
    getMonitor: function(root, url, params, success, failure, noLoad) {
        return axiosMonitor('GET', root, url, params, success, failure, noLoad)
    },
    postUpload: function(url, params, onUploadProgress, success, failure, noLoad, credentials) {
        return uploadAxios('POST', url, params, onUploadProgress, success, failure, noLoad, credentials)
    },
    postDownload: function(url, params, success, failure, noLoad, credentials) {
        return DownloadAxios('POST', url, params, success, failure, noLoad, credentials)
    },
    put: function(root, url, params, success, failure, noLoad) {
        return apiAxios('PUT', root, url, params, success, failure, noLoad)
    },
    delete: function(url, params, success, failure, noLoad) {
        return apiAxios('DELETE', url, params, success, failure, noLoad)
    }
}
