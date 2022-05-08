<template>
  <div>
    <div class="login--page">
      <div class="login-container">
        <!-- Positioned Images  -->
        <div>
          <img
            src="@/assets/img/login-top-left.png"
            class="image-1"
            width="210"
            alt=""
            srcset=""
          />
          <img src="@/assets/img/login-coin.png" class="image-2" alt="" />
          <div>
            <img
              src="@/assets/img/small-coin-login.png"
              class="image-3"
              width="120"
              alt=""
              srcset=""
            />
          </div>
          <div class="login-footer"></div>
          <img src="@/assets/img/chat-human.png" alt="" class="image-4" />
          <img
            src="@/assets/img/small-logo.png"
            width="150"
            alt=""
            class="image-5"
          />
        </div>

        <!-- main Login Form -->
        <div class="login-form-area">
          <div class="login-form">
            <form action="" @submit.prevent="login">
              <div class="mb-5">
                <img
                  src="@/assets/img/logo.svg"
                  class="mb-4"
                  width="60"
                  alt=""
                />
                <h2 class="login--header font-weight-bold">Login</h2>
                <h6>Create Original Posts To Earn Money.</h6>
              </div>
              <div class="error-alert mb-2" role="alert" v-for="error in errors.non_field_errors" :key="error.id">
                {{ error }}
              </div>
              <div class="mb-3">
                <label for=""
                  >Username<span class="text-danger">*</span>
                </label>
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
                  id=""
                />
                <small
                class="text-danger"
                v-for="error in errors.password"
                :key="error.id"
                >{{ error }}
              </small>
              </div>
              <div
                class="mb-5 d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center" style="gap: 10px">
                  <input type="checkbox" name="" />
                  <small class="font-weight-bold">Remember Me</small>
                </div>
                <div>
                  <small class="span font-weight-bold"
                    ><router-link to="/forgot-password"
                      >Forgot Password?</router-link
                    ></small
                  >
                </div>
              </div>
              <div v-if="loading" class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="mb-3" v-else>
                <button class="main--btn w-100">Login</button>
              </div>
              <div>
                <small
                  >Not registered Yet?
                  <router-link to="/register" class="span font-weight-bold"
                    >Create an Account</router-link
                  ></small
                >
              </div>
            </form>
          </div>
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
        username: "",
        password: "",
      },
      errors: {},
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        let res = await Axios.post("https://api.fidle.io/api/auth/token/login/", this.credentials);
        console.log(res.data);
        const user = res.data.user
        const token = res.data.auth_token
        console.log(user);
        console.log(token);
        this.$store.dispatch("login", {token, user});
        //  localStorage.setItem("token", token);
        this.$toastify({
          text: `Welcome ${user.first_name} ${user.last_name}`,
          className: "info",
          style: {
            background: "green",
          },
        }).showToast();
        this.$router.push({ name: "feeds" });
        this.credentials = {}
      } catch (error) {
        console.log(error.response.data);
        this.errors = error.response.data;
      }
      this.loading = false;
      this.credentials = {}
    },
  },
};
</script>
