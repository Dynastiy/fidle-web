<template>
  <div>
    <div class="user--profile">
      <div class="row">
        <div class="col-md-9">
          <div class="user--data shadow-sm bg-white">
            <profile-header class="sticky-top" />
            <hr />
            <div id="main-content">
              <router-view />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="user-profile-card shadow-sm">
            <User-Profile/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from './components/userProfile.vue'
import ProfileHeader from "./components/profileHeader.vue";
export default {
  components: {
    ProfileHeader, UserProfile
  },
};
</script>