<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="">
        <div class="your--level d-flex align-items-end" style="gap: 5px">
          <span class="small m-0">Your Level: </span>
          <span class="font-weight-bold">Basic Fidler</span>
        </div>


        <div class="level--bar mt-2">
          <div class="level">
              <div :class="[levels.name]">

              </div>
          </div>
        </div>

        <!-- Level Boxes -->
        <div class="level--boxes mt-4">
            <div class="basic mb-4">
              <img v-if="levels.rank === 1 " src="@/assets/img/levels/basic-subscribed.png" width="250" alt="" srcset="">
                <img v-else src="@/assets/img/levels/basic-unsubscribed.png" width="250" alt="" srcset="">
                
            </div>
            <div class="premium mb-4">
              <img v-if="levels.rank === 2 " src="@/assets/img/levels/premium-subscribed.png" width="250" alt="" srcset="">
                <img v-else src="@/assets/img/levels/premium-unsubscribed.png" width="250" alt="" srcset="">
                
            </div>
            <div class="gold mb-4">
              <img v-if="levels.rank === 3 "  src="@/assets/img/levels/gold-subscribed.png" width="250" alt="" srcset="">
                <img v-else src="@/assets/img/levels/gold-unsubscribed.png" width="250" alt="" srcset="">
                
            </div>
            <div class="ultimate mb-4">
              <img v-if="levels.rank === 4 "  src="@/assets/img/levels/ultimate-subscribed.png" width="250" alt="" srcset="">
                <img v-else src="@/assets/img/levels/ultimate-unsubscribed.png" width="250" alt="" srcset="">
                
            </div>
            <div class="boss">
              <img v-if="levels.rank === 5 " src="@/assets/img/levels/boss-subscribed.png" width="250" alt="" srcset="">
                <img v-else src="@/assets/img/levels/boss-unsubscribed.png" width="250" alt="" srcset="">
                
            </div>
        </div>
    <!-- Upgrade Button  -->
    <div class="mt-4 text-center">
        <button class="secondary--btn py-3 px-5">
            Upgrade
        </button>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      levels:{}
    }
  },
  methods: {
    async getLevels(){
      try {
        let res = await this.$axios.get('users/me/')
        console.log(res.data.level);
        this.levels = res.data.level
      } catch (error) {
        console.log(error);
      }
    },
    async  getLevel(){
      let res = await this.$axios.get('levels')
      console.log(res);
    }
  },
  mounted(){
    this.getLevels();
    this.getLevel()
  }
}
</script>
