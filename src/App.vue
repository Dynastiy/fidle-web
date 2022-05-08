<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
export default {
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
    // let token = localStorage.getItem("token");
    // console.log(token);
    // if (token !== '' ) {
    //      this.$toastify({
    //        text: `Please Login`,
    //        className: "alert",
    //        style: {
    //          background: "red",
    //        },
    //      }).showToast();
    //    this.$router.push("/sign-in");
    // }
   }
}
</script>
