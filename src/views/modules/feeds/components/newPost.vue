<template>
  <div>
    <div class="start--post shadow-sm">
      <div class="top">
        <div class="profile--image">
          <img
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
            class="avatar--image"
            alt=""
          />
        </div>
        <div role="button" class="post--button" @click="openModal">
         Start a Post
        </div>
      </div>
      <div class="bottom mt-3">
          <div role="button" class="post--item d-flex align-items-center" style="gap:10px" @click="openModal">
              <Icon icon="bytesize:photo" />
               <span>Photo</span>
          </div>
           <div role="button" class="post--item d-flex align-items-center" style="gap:10px" @click="openModal">
             <Icon icon="akar-icons:video" /> 
             <span>
                 Video
             </span>
          </div>
           <div role="button" class="post--item d-flex align-items-center" style="gap:10px" @click="openModal">
             <Icon icon="cil:location-pin" />
             <span> Location</span>
          </div>
           <div role="button" class="post--item d-flex align-items-center" style="gap:10px" @click="openModal">
            <Icon icon="bi:emoji-laughing-fill" />
              <span>Stickers</span>
          </div>
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