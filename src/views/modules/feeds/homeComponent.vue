<template>
  <div>
    <div class="feeds-page mt-3">
      <div class="">
        <div class="">
          <div  class="">
            <feeds @open="modalOpen"/>
          </div>
          <div class="explore--component">
            <explore />
          </div>
        </div>
      </div>

      <div>
          <create-post v-show="createPostModal" @close="closeModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import feeds from "./components/feedComponent.vue";
import explore from "./components/exploreComponent.vue";
import CreatePost from "@/components/modals/createPost.vue";
export default {
  components: {
    feeds,
    explore,
    CreatePost,
  },
  data(){
    return{
      createPostModal: false,
    }
  },
  methods:{
     closeModal(){
      this.createPostModal = !this.createPostModal
    },
    modalOpen(){
      this.createPostModal = !this.createPostModal
    }
  }
};
</script>