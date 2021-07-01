<template>
  <section class="container">
    <el-row>
      <Header v-if="showHeader" :header="header" @click:receiveProp="sendToParent($event)" ref="header"/>
      {{ dataFromChild }}
      <!--      <el-button @click="sendToChild">Send data to Child</el-button>-->
      <el-col :span="24" class="header">
        <h1 class="title-project">User Manager Real</h1>
        <el-button class="btn-add-custom" @click="redirectToAdduser">Add user</el-button>
        <div class="list-user">
          <el-table
            :data="users"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="50"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.no | toUpperCase }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
              width="280"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.name | toUpperCase }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              align="center">
            </el-table-column>
            <el-table-column
              prop="age"
              label="Age"
              align="center">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="Gender"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.gender | filterGender }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
              width="120" align="center">
              <template slot-scope="{row}">
                <span><i class="el-icon-edit hover-icon" @click="redirectEdit(row)"/></span>
                <span><i class="el-icon-delete-solid hover-icon" @click="removeUser(row.id)"/></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <Footer v-show="showFooter">
        <h1 slot="title">{{ titleFooter }}</h1>
        <h2 slot="content" v-custom:background.delay="'red'">This is content Footer</h2>
      </Footer>
    </el-row>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Header from '~/components/Header/index.vue'
import Footer from '~/components/Footer/index.vue'
import { mapState } from "vuex";

export default {
  components: {
    AppLogo,
    Header,
    Footer
  },
  data() {
    return {
      showHeader: false,
      showFooter: false,
      dataFromChild: '',
      titleFooter: ' This is H1',
      header: 'Hello'
    }
  },
  head() {
    return {
      title: 'User-Manager List User Real',
      meta: [
        {
          hid: 'List User Real',
          name: 'This is list user real',
          content: 'List user real description'
        }
      ]
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  //Use fetch
  // fetch(context){
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       users: [
  //         {
  //           id: 1,
  //           name: 'Tom',
  //           email: 'Tom@mail.com',
  //           age: 18,
  //           gender: 1
  //         },
  //         {
  //           id: 2,
  //           name: 'Jerry',
  //           email: 'Jerry@mail.com',
  //           age: 16,
  //           gender: 2
  //         }
  //       ]
  //     })
  //   }).then(data => {
  //     context.store.dispatch('users/setUsers', data.users)
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // },
  // computed: {
  //   users () {
  //     return this.$store.getters["users/lists"]
  //   }
  // },
//Use asyncData
//   asyncData(context){
//     return new Promise((resolve, reject) => {
//       resolve({
//         users: [
//           {
//             id: 1,
//             name: 'Tom',
//             email: 'Tom@mail.com',
//             age: 18,
//             gender: 1
//           },
//           {
//             id: 2,
//             name: 'Jerry',
//             email: 'Jerry@mail.com',
//             age: 16,
//             gender: 2
//           }
//         ]
//       })
//     }).then(data => {
//       return data
//     }).catch((e) => {
//       console.log(e)
//     })
//   },
//   created() {
//     this.$store.dispatch('users/setUsers', this.users)
//   },
  beforeUpdate() {
    console.log('beforeUpdate', this.showHeader)
  },
  async fetch({store, params}) {
    await store.dispatch('users/getUsers')
  },
  computed:{
    users() {
      return this.$store.state.users.lists
    }
  },
  methods: {
    redirectToAdduser() {
      this.$router.push('/user/real/add')
    },
    sendToParent(parents){
      this.dataFromChild = parents
    },
    sendToChild() {
      this.$refs.header.getDataFromParent('1234')
    },
    setMessage(value){
      console.log(value)
    },
    redirectEdit(row) {
      this.$router.push('/user/real/' + row.id)
    },
    removeUser(id) {
      this.$confirm('You are delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('users/removeUser', id)
        this.$message({
          type: 'success',
          message: 'Delete completed'
        });
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 24px;
}
.header{
  margin-top: 20px;
  .title-project{
    text-align: center;
    font-size: 32px;
  }
}
.list-user{
  margin-top: 30px;
  .hover-icon{
    zoom: 2;
  }
  i {
    &:hover {
     cursor: pointer;
    }
  }
}
.btn-add-custom{
  font-size: 18px;
  border-color: #41B883;
  background: #41B883;
  color: #ffffff;
  &:hover, &:focus {
    background-color: #41B883;
    color: #ffffff;
  }
}
</style>

