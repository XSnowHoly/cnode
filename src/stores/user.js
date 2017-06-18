import axios from 'axios'

const API = 'https://cnodejs.org/api/v1'

const userModule = {
    state: {
        userData: {},
        error:''
    },
    actions: {
        loginUser({ commit }, Accesstoken) {
            let { accesstoken } = Accesstoken;
            commit('saveUserData',{})
            commit('saveError','')
            axios.post(`${API}/${accesstoken}`,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `accesstoken=${accesstoken}`
            }).then(res => {
                if(res.status === 403){
                    commit('saveError','登录失败')
                }
                if(res.status === 200){
                    commit('saveUserData',res.data.data)
                }
            })
        }
    },
    mutations: {
        saveUserData (state,data){
            state.userData = data
        },
        saveError (state,str){
            state.error = str
        }
    }
}

export {
    userModule
}