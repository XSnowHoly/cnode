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
            // commit('saveUserData',{})
            commit('saveError','')
            axios.post(`${API}/accesstoken`,{
                accesstoken:`${accesstoken}`
            }).then(res => {
                if(res.status === 403){
                    commit('saveError',true)
                }
                if(res.status === 200){
                    commit('saveUserData',res.data)
                }
            })
        }
    },
    mutations: {
        saveUserData (state,data){
            state.userData = data
        },
        saveError (state,bol){
            state.error = bol
        }
    }
}

export {
    userModule
}