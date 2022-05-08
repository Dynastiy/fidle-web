<template>
  <div>
    <div class="user-profile">
      <div>
        <div class="profile-image-container">
          <img
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
            class="profile--img"
            alt=""
          />
        </div>
        <div class="user--details mt-4 text-center">
            <div class="d-flex align-items-center justify-content-center" style="gap:10px">
                <h5 class="font-weight-bold"> {{ user.name }}  </h5> <Icon icon="carbon:edit" />
            </div>
             <p class="small text-secondary"> @{{ user.username }} </p>
            <p class="small"> {{ user.email }} </p>
        </div>

        <div class="wallet--details d-flex align-items-center justify-content-between mt-4">
            <div class="text-center">
                <h5 class="font-weight-bold"> {{ user.total_likes }} </h5>
                <p class="small">Likes</p>
            </div>
            <div class="text-center">
                <h5 class="font-weight-bold"> {{ user.followers_count }} </h5>
                <p class="small">Followers</p>
            </div>
            <div class="text-center">
                <h5 class="font-weight-bold"> {{ user.following_count }} </h5>
                <p class="small">Following</p>
            </div>
        </div>

        <div class="wallet--balance text-center mt-5">
            <h6>Your Balance</h6>
            <h3 class="font-weight-bold">NGN 300,000</h3>
            <div class="wallet--actions d-flex mt-4 justify-content-center" style="gap:10px">
                <button class="secondary--btn py-2">
                    Add Funds
                </button>
                <button class="following py-2">
                    Withdraw
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      user:{}
    };
  },
  methods: {
    async getUser(){
      try {
        let res = await this.$axios.get('users/me/')
        console.log(res.data);
        this.user = res.data
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    this.getUser();
  }
};
</script>
