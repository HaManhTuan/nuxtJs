import axios from "axios";
export const state = () => ({
  lists: [],
  user: {}
})

export const mutations = {
  GET_USER(state, users) {
    state.lists = users
  },
  REMOVE_USER(state, id) {
    state.lists = state.lists.filter(item => item.id !== id)
  },
  ADD_USER(state, objUser) {
    let max = 0
    state.lists.forEach(list => {
      if (list.no > max) {
        max = list.no;
      }
    })
    var no = { no: max + 1}
    Object.assign(objUser, no);
    state.lists.push(objUser)
  },
  EDIT_USER(state, objUser) {
    state.lists.forEach(list => {
      if (list.id === objUser.id) {
        list.name = objUser.name
        list.age = objUser.age
        list.email = objUser.email
        list.gender = objUser.gender
      }
    })
  },
  SHOW_USER(state, user ){
    state.user = user
  }
}

export const actions = {
  showUser({commit}, id){
    return axios.get(`https://user-manager-c67d2-default-rtdb.firebaseio.com/users/${id}.json`).then((response) => {
      commit('SHOW_USER', response.data)
    }).catch((error) => {
      console.log(error)
    });
  },
  getUsers({commit}, lists){
    return axios.get('https://user-manager-c67d2-default-rtdb.firebaseio.com/users.json').then((response) => {
      const listsArray = []
      for(const key in response.data){
        listsArray.push({ ...response.data[key], id: key})
      }
      listsArray.map((item, index) => {
        item.no = ++index
      })
      commit('GET_USER', listsArray)
    }).catch((error) => {
      console.log(error)
    });
  },
  addUser({commit}, objUser) {
    return axios.post('https://user-manager-c67d2-default-rtdb.firebaseio.com/users.json', objUser).then((response) => {
      commit('ADD_USER', {...objUser, id: response.data.name} )
    }).catch((error) => {
      console.log(error)
    });
  },
  editUser({commit}, objUser) {
    return axios.put('https://user-manager-c67d2-default-rtdb.firebaseio.com/users/'+ objUser.id +'.json', objUser).then((response) => {
      commit('EDIT_USER', response.data)
    }).catch((error) => {
      console.log(error)
    });
  },
  removeUser({commit}, id) {
    return axios.delete('https://user-manager-c67d2-default-rtdb.firebaseio.com/users/'+ id +'.json').then((response) => {
      commit('REMOVE_USER', id)
    }).catch((error) => {
      console.log(error)
    });
  }
}

export const getters = {
  lists(state) {
    return state.lists
  }
}

