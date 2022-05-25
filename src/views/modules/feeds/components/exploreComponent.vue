<template>
  <div>
    <div class="connect--component component" id="feeds--component">
      

      <!-- Main Cards for People to connect With  -->
      <div class="connect">
        <h5 class="font-weight-bold pl-1 pb-3">Connect with People</h5>
        <div class="connect--card mb-2 d-flex" v-for="item in explore" :key="item.id" style="gap:10px">
          <div>
            <img v-if="item.current_profile_image"
            :src="item.current_profile_image.media.file"
            class="avatar--image"
            alt=""
          />
          <img v-else
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
            class="avatar--image"
            alt=""
          />
          </div>
          <div>
            <h6 class="font-weight-bold text-capitalize m-0">
                {{ item.name }}
            </h6>
            <small class="small text-muted m-0">
            @{{ item.username }}
            </small>
          </div>
          <div class=" ml-auto">
            <button class="secondary--btn" v-if="!item.following" @click="followUser(item)">Follow</button>
              <button  class="disabled following" v-else disabled>Following</button>
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
      console.log(this.explore);
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