<template>
  <div>
    <div class="menu--component" id="feeds--component">
      <div class="colored--area">
        
      </div>
      <div>
        <div class="logo text-center">
          <img src="@/assets/img/logo.svg" width="50" alt="" />
        </div>
      </div>
      <div class="main-user-profile shadow-lg">
        <div class="logo text-center mb-4">
           <div >
                <img v-if="user.current_profile_image"
                  :src="user.current_profile_image.media.file"
                  class=""
                  alt=""
                />
                <img v-else
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                  class=""
                  alt=""
                />
              </div>
        </div>
        <div class="mb-2 text-center">
          <!-- <h5 class="font-weight-bold text-dark"> {{ user.first_name }} {{ user.last_name }} </h5> -->
          <h6 class="text-muted">@{{user.username}}</h6>
          <small>Basic Fidler</small>
        </div>
        <hr>
        <div class="d-flex align-items-center justify-content-center" style="gap:20px">
          <div class="text-center">
            <h4> {{ user.followers_count }} </h4>
            <small class="text-muted">Followers</small>
          </div>
          <div class="text-center">
            <h4> {{ user.following_count }} </h4>
            <small class="text-muted">Following</small>
          </div>
        </div>
      </div>
      <div>
        <ul class="list-unstyled menu--items row">
          <li class="col-md-6">
            <router-link to="/" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="bx:home-heart" width="20px" height="20px"/>
              </span>
              <span class="small">Home</span></router-link
            >
          </li>
          <li class="col-md-6">
            <router-link to="/explore" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="akar-icons:search" width="20px" height="20px"/>
              </span>
              <span class="small">Explore</span>
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link to="/wallet" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="clarity:wallet-line" width="20px" height="20px"/>
              </span>
              <span class="small">Wallet</span>
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link to="/profile" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="iconoir:profile-circled" width="20px" height="20px"/>
              </span>
              <span class="small">Profile</span>
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link to="/wallet" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="akar-icons:video" width="20px" height="20px"/>
              </span>
              <span class="small">Reels</span>
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link to="/profile" class="d-flex flex-column align-items-center" >
              <span>
                <Icon icon="healthicons:market-stall-outline" width="20px" height="20px"/>
              </span>
              <span class="small">NFT Market Place</span>
            </router-link>
          </li>
        </ul>
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
      user: '',
    };
  },
  methods: {
    openModal(){
      this.$emit('toOpen')
    }
  },
  mounted(){
    this.user = this.$store.getters.getUser;
    console.log(this.user);
  }
};
</script>