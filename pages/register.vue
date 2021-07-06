<template>
  <section class="container">
    <el-row>
      <el-col :span="24" class="header">
        <el-row>
          <h1>Register</h1>
          <div>{{ error }}</div>
          <el-col :span="24">
            <div class="add-user">
              <el-form ref="AddForm" :rules="rules" :model="formRegister" label-width="100px" class="form-add-user">
                <el-form-item label="Email" prop="email">
                  <el-input v-model="formRegister.email"/>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                  <el-input v-model="formRegister.password" show-password/>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn-add-custom btn-save" @click="submitForm('AddForm')">Register</el-button>
                  <el-button class="btn-add-custom btn-save" @click="redirectToLogin">Back to Login</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  layouts: 'public',
  data() {
    return {
      error: '',
      formRegister: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { type: 'email', required: true, message: 'Please input Activity email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input Activity password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['AddForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('users/authenticatorUser', {
            email: this.formRegister.email,
            password: this.formRegister.password,
            isLogin: false
          }).then(result => {
            if (result.success) this.$router.push('user/real')
          }).catch(({ response: err }) => {
            this.error = err.data.error.message
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    redirectToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
h1{
  text-align: center;
}
.header{
  margin-top: 40px;
}
.add-user {
  margin-top: 30px;

  .form-add-user {
    width: 50%;
    margin: 0 auto;
  }

  .btn-save {
    text-align: center;
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
}
</style>
