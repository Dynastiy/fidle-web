<template>
  <div>
    <div class="create-post-mask">
      <div class="create-post-container">
        <div class="create-post-content">
          <div class="logo mb-4">
            <img src="@/assets/img/logo.svg" width="50" alt="" />
          </div>
          <div v-if="!loading">
            <h4 class="font-weight-bold">Logout of Fidle?</h4>
            <p>You can always log back in at any time.</p>
            <div class="mt-4">
              <button class="secondary--btn w-100 py-3" @click="logout">
                Logout
              </button>
            </div>
            <div class="mt-4">
              <button class="following w-100 py-3" @click="close">
                Cancel
              </button>
            </div>
          </div>
          <div v-else>
            <p>Logging out ...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue2";
export default {
  components: {
    // Icon,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async logout() {
      
    this.loading = true;
      try {
        let res = await this.$axios.post("/auth/token/logout/");
        console.log(res);
        this.$store.dispatch("logout");
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
      this.$router.push("/sign-in");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
