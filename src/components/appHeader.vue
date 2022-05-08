<template>
  <div>
    <div class="">
      <div class="app--header shadow-sm">
        <div id="main-content">
          <div class="logo">
            <img src="@/assets/img/logo.svg" width="50" alt="" />
          </div>

          <div
            class="right--content d-flex align-items-center"
            style="gap: 30px"
          >
            <div class="search--area">
              <input type="search" placeholder="Search" />
              <span>
                <Icon icon="akar-icons:search" width="24px" height="24px" />
              </span>
            </div>
            <div
              class="user-details d-flex align-items-center"
              style="gap: 10px"
            >
              <div>
                <img v-if="userData.current_profile_image"
                  :src="userData.current_profile_image"
                  class="avatar--image"
                  alt=""
                />
                <img
                v-else
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                  class="avatar--image"
                  alt=""
                />
              </div>
              <div class="personal--data">
                <h6 class="font-weight-bold mb-0">{{ userData.first_name}} {{ userData.last_name}} </h6>
                <p role="button" class="small" @click="logout">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Logout v-show="logout_confirmation" @close="closeConfirmBox"/>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import Logout from '@/components/modals/logOut.vue'
export default {
  components: {
    Icon, Logout
  },
  data() {
    return {
      logout_confirmation: false
    };
  },
  methods:{
    logout() {
   this.logout_confirmation = !this.logout_confirmation
  },
  closeConfirmBox() {
   this.logout_confirmation = !this.logout_confirmation
  },
  },
  computed:{
    userData(){
     return this.$store.getters.getUser
    }
  }

};
</script>
