<template>
  <div>
    <div class="feeds-page mt-3">
      <div class="">
        <div class="">
          <Menu @toOpen="openModal"/>
        </div>
        <div class="main-feeds"><router-view/></div>
      </div>

      <div>
          <create-post v-show="createPostModal" @close="closeModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./components/menuDrawer.vue";
import CreatePost from "@/components/modals/createPost.vue";
export default {
  components: {
    Menu,
    CreatePost
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
    openModal(){
      this.createPostModal = !this.createPostModal
    }
  }
};
</script>