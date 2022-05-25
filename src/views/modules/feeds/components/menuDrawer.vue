<template>
  <div>
    <div class="menu--component bg-white shadow-sm" id="feeds--component">
      <div>
        <ul class="list-unstyled menu--items">
          <li>
            <router-link to="/" class="d-flex align-items-center" style="gap:20px">
              <span>
                <Icon icon="bx:home-heart" width="24px" height="24px"/>
              </span>
              <span>Home</span></router-link
            >
          </li>
          <li>
            <router-link to="/explore" class="d-flex align-items-center" style="gap:20px">
              <span>
                <Icon icon="akar-icons:search" width="24px" height="24px"/>
              </span>
              <span>Explore</span>
            </router-link>
          </li>
          <!-- <li>
            <a href="javascript:void(0)" @click="openModal" class="d-flex align-items-center" style="gap:20px; color: var(--main-color)">
              <span>
                <Icon icon="bx:message-square-add" width="24px" height="24px"/>
              </span>
              <span>Post</span>
            </a>
          </li>
          <li>
            <router-link to="/menu" class="d-flex align-items-center" style="gap:20px">
              <span>
                <Icon icon="fluent:chat-32-regular" width="24px" height="24px"/>
              </span>
              <span>Message</span>
            </router-link>
          </li> -->
           <li>
            <router-link to="/wallet" class="d-flex align-items-center" style="gap:20px">
              <span>
                <Icon icon="clarity:wallet-line" width="24px" height="24px"/>
              </span>
              <span>Wallet</span>
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="d-flex align-items-center" style="gap:20px">
              <span>
                <Icon icon="iconoir:profile-circled" width="24px" height="24px"/>
              </span>
              <span>Profile</span>
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
    return {};
  },
  methods: {
    openModal(){
      this.$emit('toOpen')
    }
  }
};
</script>