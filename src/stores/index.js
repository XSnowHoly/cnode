import Vue from 'vue'
import Vuex from 'vuex'
import { allModule,goodModule,shareModule,askModule,jobModule} from './contents.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules : {
        allModule,
        goodModule,
        shareModule,
        askModule,
        jobModule
    }
})



export default store;