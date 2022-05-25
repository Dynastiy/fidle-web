<template>
  <div>
    <div class="feeds-page mt-3">
      <div class="">
        <div class="">
          <Menu @toOpen="openModal"/>
        </div>
        <div class=""><router-view/></div>
        <div>
            <Messenger/>
          </div>
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

import Messenger from '@/components/messengerModal.vue'
export default {
  components: {
    Menu,
    CreatePost,
    Messenger
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