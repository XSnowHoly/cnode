import axios from 'axios'

const allModule = {
    state: {
        allPage: 1,
        allData: []
    },
    actions: {
        getAllData({ commit }, Url) {
            let { url } = Url;
            console.log(url)
            axios.get(url).then((obj) => {
                if (obj.status === 200) {
                    commit('handleAllData', obj.data.data)
                    commit('handleAllPage')

                }
            })
        }
    },
    mutations: {
        handleAllData(state, data) {
            state.allData = [...state.allData, ...data]
            console.log(state.allData)
        },
        handleAllPage(state) {
            state.allPage++
        },
        initAllData(state, data) {
            state.allData = data
        }
    }
}

const goodModule = {
    state: {
        goodPage: 1,
        goodData: []
    },
    actions: {
        getGoodData({ commit }, Url) {
            let { url } = Url;
            axios.get(url).then((obj) => {
                if (obj.status === 200) {
                    commit('handleGoodData', obj.data.data)
                    commit('handleGoodPage')
                }
            })
        }
    },
    mutations: {
        handleGoodData(state, data) {
            state.goodData = [...state.goodData, ...data]
        },
        handleGoodPage(state) {
            state.goodPage++
        },
        initGoodData(state, data) {
            state.goodData = data
        }
    }
}

const shareModule = {
    state: {
        sharePage: 1,
        shareData: []
    },
    actions: {
        getShareData({ commit }, Url) {
            let { url } = Url;
            axios.get(url).then((obj) => {
                if (obj.status === 200) {
                    commit('handleShareData', obj.data.data)
                    commit('handleSharePage')
                }
            })
        }
    },
    mutations: {
        handleShareData(state, data) {
            state.shareData = [...state.shareData, ...data]
        },
        handleSharePage(state) {
            state.sharePage++
        },
        initShareData(state, data) {
            state.shareData = data
        }
    }
}

const askModule = {
    state: {
        askPage: 1,
        askData: []
    },
    actions: {
        getAskData({ commit }, Url) {
            let { url } = Url;
            axios.get(url).then((obj) => {
                if (obj.status === 200) {
                    commit('handleAskData', obj.data.data)
                    commit('handleAskPage')
                }
            })
        }
    },
    mutations: {
        handleAskData(state, data) {
            state.askData = [...state.askData, ...data]
        },
        handleAskPage(state) {
            state.askPage++
        },
        initAskData(state, data) {
            state.askData = data
        }
    }
}

const jobModule = {
    state: {
        jobPage: 1,
        jobData: []
    },
    actions: {
        getJobData({ commit }, Url) {
            let { url } = Url;
            axios.get(url).then((obj) => {
                if (obj.status === 200) {
                    commit('handleJobData', obj.data.data)
                    commit('handleJobPage')
                }
            })
        }
    },
    mutations: {
        handleJobData(state, data) {
            state.jobData = [...state.jobData, ...data]
        },
        handleJobPage(state) {
            console.log(4)
            state.JobPage++
        },
        initJobData(state, data) {
            state.jobData = data
        }
    }
}

export {
    allModule,
    goodModule,
    shareModule,
    askModule,
    jobModule
}