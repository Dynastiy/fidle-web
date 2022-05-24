<template>
  <div>
    <div class="signup--page">
      <div>
        <img
          src="@/assets/img/login-top-left.png"
          class="image-1"
          width="210"
          alt=""
          srcset=""
        />
      </div>
      <div class="sign-up-content">
        <div class="registration--form">
          <form action="" @submit.prevent="register">
            <div class="mb-5">
              <img src="@/assets/img/logo.svg" class="mb-4" width="60" alt="" />
              <h2 class="font-weight-bold">Create your Account</h2>
              <h6>Create Original Posts To Earn Money.</h6>
            </div>
            <div class="mb-3">
              <div class="d-flex" style="gap: 10px">
                <div class="">
                  <label for=""
                    >First Name<span class="text-danger">*</span>
                  </label>
                  <input
                    class="login-input"
                    v-model="credentials.first_name"
                    type="text"
                    name=""
                  />
                  <small
                    class="text-danger"
                    v-for="error in errors.first_name"
                    :key="error.id"
                    >{{ error }}
                  </small>
                </div>
                <div class="">
                  <label for=""
                    >Last Name<span class="text-danger">*</span>
                  </label>
                  <input
                    class="login-input"
                    v-model="credentials.last_name"
                    type="text"
                    name=""
                  />
                  <small
                    class="text-danger"
                    v-for="error in errors.last_name"
                    :key="error.id"
                    >{{ error }}
                  </small>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="">Email<span class="text-danger">*</span> </label>
              <input
                class="login-input"
                v-model="credentials.email"
                type="text"
                name=""
              />
              <small
                class="text-danger"
                v-for="error in errors.email"
                :key="error.id"
                >{{ error }}
              </small>
            </div>
            <div class="mb-3">
              <label for="">Username<span class="text-danger">*</span> </label>
              <input
                class="login-input"
                v-model="credentials.username"
                type="text"
                name=""
              />
              <small
                class="text-danger"
                v-for="error in errors.username"
                :key="error.id"
                >{{ error }}
              </small>
            </div>
            <div class="mb-4">
              <label for="">Password<span class="text-danger">*</span></label>
              <input
                class="login-input"
                v-model="credentials.password"
                type="password"
                placeholder="Minimum of 8 characters"
                name=""
              />
              <small
                class="text-danger"
                v-for="error in errors.password"
                :key="error.id"
                >{{ error }}
              </small>
            </div>
            <div class="mb-4">
              <label for=""
                >Confirm Password<span class="text-danger">*</span></label
              >
              <input
                class="login-input"
                v-model="credentials.re_password"
                type="password"
                placeholder="Minimum of 8 characters"
                name=""
              />
              <small
                class="text-danger"
                v-for="error in errors.re_password"
                :key="error.id"
                >{{ error }}
              </small>
            </div>
            <div class="mb-3 text-center">
              <small>
                By signing up you agree to our
                <span class="span">Terms</span> and
                <span class="span"> Policy </span></small
              >
            </div>
            <div v-if="loading" class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div class="mb-3" v-else>
              <button class="main--btn w-100">Signup</button>
            </div>

            <div class="text-center">
              <small
                >Already have an account?
                <router-link
                  :to="{ name: 'Login' }"
                  class="span font-weight-bold"
                  >Login</router-link
                ></small
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      credentials: {
        email: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        re_password: "",
      },
      errors: {},
      loading: false,
    };
  },
  methods: {
    async register() {
      this.loading =  true
      try {
        let res = await Axios.post("https://api.fidle.io/auth/users/", this.credentials);
        console.log(res);
         this.$toastify({
        text: 'Done',
        className: "info",
        style: {
            background: "green",
        }
    }).showToast();
    this.$router.push({ name: 'Login' })
    this.credentials = {}
      } catch (error) {
        console.log(error.response.data);
        this.errors = error.response.data;
      }
      this.loading =  false
      this.credentials = {}
    },
  },
};
</script>
