<template>
  <div>
    <div class="connect--component component" id="feeds--component">
      <h5 class="font-weight-bold pl-1 pb-3">Connect with People</h5>

      <!-- Main Cards for People to connect With  -->
      <div class="connect">
        <div class="connect--card shadow-sm mb-3" v-for="item in explore" :key="item.id">
          <img v-if="item.current_profile_image"
            :src="item.current_profile_image.media"
            class="avatar--image"
            alt=""
          />
          <img v-else
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
            class="avatar--image"
            alt=""
          />
          <h5 class="font-weight-bold mt-3 text-capitalize">
              {{ item.name }}
          </h5>
          <p class="small">
           @{{ item.username }}
          </p>
          <p class="small">
           Follower<span v-if="item.followers_count > 1">s</span> - {{ item.followers_count }} 
          </p>
          <p class="small">
           Following - {{ item.following_count }} 
          </p>
          <div class="mt-3">
            <button class="secondary--btn" v-if="!item.following" @click="followUser(item)">Follow</button>
              <button  class="disabled following" v-else>Following</button>
            </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      explore: []
    }
  },
  methods: {
    async getSuggestions(){
      try {
      let res = await this.$axios.get('/users-suggestion/')
      let data = res.data.results
      this.explore = data
    } catch (error) {
      console.log(error);
    }
    },
    async followUser(item){
      try {
        let res = await this.$axios.post(`users/${item.id}/follow/`);
        // console.log(res);
        this.getSuggestions()
        return res
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    this.getSuggestions()
  }
}
</script>