<template>
    <div>
        <div>
            <div class="messenger--component" id="messenger">
               <div class="d-flex align-items-center justify-content-center label--top py-4" style="gap:10px">
                    <div class="top text-center ">
                        <Icon icon="cryptocurrency:chat" style="font-size: 32px; color: var(--main-color)"/>
                    </div>
                    <div class="username">
                        <h6 class="small font-weight-bold" style="color:var(--main-color)">Messenger</h6>
                    </div>
               </div>
               <div class="username text-center pl-3">
                   <hr>
                   <div class="search--field mt-3">
                       <Icon icon="fe:search" />
                       <input type="search" placeholder="Find friends" name="" id="">
                   </div>
               </div>
               <div class="main-chat-area">
                   <div class="active--users d-flex align-items-center" style="gap:10px">
                       <div class="active-img" >
                            <!-- <img v-if="feed"
                                :src="feed.user.current_profile_image.media.file"
                                class="avatar--image"
                                alt=""
                            /> -->
                            <img 
                                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                                class="avatar--image"
                                alt=""
                            />
                            <div class="online"></div>
                        </div>
                        <div class="username">
                            <h6 class="small">John Doe</h6>
                        </div>
                   </div>
                   <div role="button" @click="toggleMenu" >
                       <div class="main--togle">
                           <Icon icon="icons8:angle-left" class="p-2" style="font-size: 34px; color:#fff;  background: linear-gradient(45deg, var(--main-color), var(--dark-color)); border-radius: 50%;"/>
                       </div>
                       <div class="username">
                            <div  class="d-flex align-items-center" style="gap:10px">
                                <Icon icon="icons8:angle-right" class="p-2" style="font-size: 34px; color:#fff;  background: linear-gradient(45deg, var(--main-color), var(--dark-color)); border-radius: 50%;"/>
                                <h6 class="small font-weight-bold">Collapse</h6>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        </div>

        <!-- Main Chat Interface -->
        <div class="chat--interface">
            <div>
                <div class="top d-flex justify-content-between">
                 <div class="d-flex align-items-center" style="gap:10px">
                     <div class="active-img" >
                        <!-- <img v-if="feed"
                            :src="feed.user.current_profile_image.media.file"
                            class="avatar--image"
                            alt=""
                        /> -->
                        <img 
                            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                            class="rounded-circle"
                            alt=""
                            width="40px"
                            height="40px"
                        />
                        <div class="online"></div>
                    </div>
                    <div>
                        <h6 class="small text-dark font-weight-bold">John Doe</h6>
                        <p class="small text-muted">Online</p>  
                    </div>
                 </div>
                <div>
                    <Icon icon="codicon:close" style="font-size:25px" color="red"/>
                </div>
            </div>
            <hr>
            </div>

            <!-- Chat Area -->
            <div>

            </div>

            <div>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" placeholder="Write your message">
                    <div role="button">
                        <Icon icon="akar-icons:send"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  components:{
    Icon,
  },
  data(){
      return{
          feed:{}
      }
  },
  methods:{
      toggleMenu(){
          let menu = document.getElementById('messenger');
          menu.classList.toggle('active')
      }
  }
}
</script>