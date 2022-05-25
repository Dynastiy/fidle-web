<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
    }
  },
   methods: {
     
  },
 
  async created(){
        if (!this.$store.getters.isLoggedIn) {
            this.$toastify({
          text: `Please Login`,
          className: "alert",
          style: {
            background: "red",
          },
        }).showToast();
      this.$router.push("/sign-in");
    }

   },
}
</script>
