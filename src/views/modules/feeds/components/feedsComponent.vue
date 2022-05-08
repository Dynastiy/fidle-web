<template>
  <div>
    <div class="feeds--component" id="feeds--component">
      <!-- Start a Post Box  -->
      <start-post @toOpen="openModal" :loading="loading" @addPost="submitPost"/>

      <!-- Main Feed -->
      <div
        class="loading mt-3 d-flex align-items-center"
        v-if="loading"
        style="gap: 30px"
      >
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h4>Fidle upload in progress . . .</h4>
      </div>
      <feed />
    </div>
  </div>
</template>

<script>
import StartPost from "./newPost.vue";
import Feed from "./feedComponent.vue";
export default {
  components: {
    StartPost,
    Feed,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openModal() {
      this.$emit("open");
    },
    async submitPost(){
        // this.loading = true;
      // this.close()
      let formData = new FormData()
      formData.append("content", this.payload.content);
      // formData.append("media", this.payload.media)
      try {
        let res = await this.$axios.post('/posts/', this.payload)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      
      // this.loading = false
    }
  },
};
</script>
