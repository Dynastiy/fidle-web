<template>
  <div>
    <div>
        <!-- Posts  -->
      <div class="post--content shadow-sm mt-3" v-for="(feed, index) in feeds" :key="index">
        <div v-if="feed.media">
            <div v-for="(media_item, index) in feed.media" :key="index">
              <video
              controls
              style="width: 100%"
              v-if="media_item.extension === 'mp4'"
              :src="media_item.file"
              ></video>
              <img 
              v-else
              :src="media_item.file"
              alt=""
              srcset=""
              class="post--image"
            />
            </div>
        
        </div>
        <div class="main--post">
            <div class="main-writeup" :class="{ active: (feed.media.length === 0 ) }" :style="{'background-image': `linear-gradient(45deg, ${colorSplit(feed.color)}`}">
                <p class="">
                {{ feed.content }}.
                <!-- <span class="span-2"
                  ><router-link to="/">See More</router-link></span
                > -->
              </p>
            </div>
          <div class="user-info mt-3 d-flex align-items-center justify-content-between" style="padding:0 1.5rem 1.5rem 1.5rem">
            <div class="left-user-info d-flex align-items-center" style="gap:20px">
              <div >
                <img v-if="feed.user.current_profile_image"
                  :src="feed.user.current_profile_image.media.file"
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
                <h6 class="text-capitalize font-weight-bold"> {{ feed.user.first_name }} {{ feed.user.last_name }} </h6>
                <p class="small text-capitalize"> {{ timeRange(new Date(feed.date_created*1000.0)) }}   </p>
              </div>
              <div class="amount small">{{dollarFilter(feed.worth) }} </div>
            </div>
            <div
              class="right-user-info d-flex align-items-center"
              style="gap: 20px"
            >
              <div class="d-flex align-items-center">
                <!-- <img v-if="feed.has_liked" src="@/assets/img/liked-fidle.svg" class="mr-1"  alt="" srcset="" /> -->
                <div v-if="feed.liked" >
                  <Icon icon="flat-color-icons:like" style=" font-size: 24px !important;" />
                </div>
                <div v-else  @click="likePost(feed)">
                  <Icon icon="icon-park-outline:like" style="color: red; font-size: 24px !important;" role="button" />
                </div>
                
                <!-- <img @click="like" role="button" v-else src="@/assets/img/like-fidle.svg" class="mr-1"  alt="" srcset="" /> -->
                <sup> {{ feed.likes_count }} </sup>
              </div>
              <span @click="getComments(feed)" role="button">
                <!-- <img src="@/assets/img/comment-fidle.svg" class="mr-1"  alt="" srcset="" /> -->
                <Icon icon="fa:comment-o" style="color: var(--main-color); font-size: 18px !important;" />
                <sup> {{ feed.comments_count }} </sup>
              </span>
              <span>
                <!-- <img src="@/assets/img/share-fidle.svg" class="mr-1"  alt="" srcset="" /> -->
                <img src="@/assets/img/share-fidle.svg" class="mr-1"  alt="" srcset="" />
                <sup> {{ feed.share_count }} </sup>
              </span>
            </div>
          </div>
           <div class="comment--area mt-3" v-show="comments === feed.id " style="padding:0 1.5rem 1.5rem 1.5rem">
              <input type="text" v-model="payload.content" placeholder="Add a comment..." v-on:keyup.enter="postComment(feed)">
              <div class="comment mt-3" v-for="comment in commentsList" :key="comment.id">
                <p class="mb-2">
                  {{comment.content}}
                </p>
                <div class="comment-content d-flex align-items-center justify-content-between">
                  <div class="commenter">
                    <div class="left-user-info d-flex align-items-center" style="gap:20px">
                      <div >
                        <img v-if="comment.user.current_profile_image"
                          :src="comment.user.current_profile_image.media.file"
                          class="content--image"
                          alt=""
                          width="30px"
                          height="30px"
                        />
                        <img v-else class="rounded-circle" src="https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg" width="30px"
                          height="30px" alt="" srcset="">
                      </div>
                      <div>
                        <h6 class="text-capitalize font-weight-bold"> {{ comment.user.first_name }} {{ comment.user.last_name }} </h6>
                        <p class="small"> {{ timeRange(comment.timestamp) }}   </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                  <div v-if="comment.has_liked" >
                    <Icon icon="bxs:like" style="background-color: var(--main-color); font-size: 24px !important;" />
                  </div>
                  <div v-else  @click="likePost(comment)">
                    <Icon icon="ant-design:like-outlined" style="color: var(--main-color); font-size: 24px !important;" role="button" />
                  </div>
                  <sup> {{ comment.likes_count }} </sup>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timeRange, sliceContent, dollarFilter, colorSplit} from '@/plugins/filter'
import { Icon } from "@iconify/vue2";
export default {
  components:{
    Icon
  },
  data(){
    return{
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      feeds: [],
       payload: {
        content: ''
      },
      comments: false,
      commentsList: []
    }
  },
  methods:{
    async getFeeds(){
      try {
        const res = await this.$axios.get('/user/posts/');
        this.feeds = res.data.results;
        // console.log(this.feeds);
      } catch (error) {
        console.log(error);
      }
    },
    async postComment(feed){
      try {
        let res = await this.$axios.post(`posts/${feed.id}/comments/`, this.payload)
        console.log(res);
        this.getFeeds()
        this.getComments(feed)
      } catch (error) {
        console.log(error);
      }
      this.payload = {}
    },
    async getComments(feed){
    this.comments = ( this.comments === feed.id ) ? null : feed.id;
     if (this.comments) {
        
        try {
            let res = await this.$axios.get(`/posts/${feed.id}/comments/`)
            console.log(res);
          this.commentsList = res.data.results
        } catch (error) {
          console.log(error);
        }
     }
     else {
       this.commentsList = []
     }
    
    },
    async likePost(feed){
      try {
        let res = await this.$axios.post(`posts/${feed.id}/likes/`)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.getFeeds()
    },
  },
  mounted(){
    this.getFeeds()
  }
}
</script>