<template>
  <div>
    <div class="main-feeds px-5">

      <Stories class="mb-3"/>

        <CreatePost @toOpen="openModal" @getPosts="getFeeds" />
       
        <!-- Posts  -->
      <div class="post--content  mt-3" role="button" v-for="(feed, index) in feeds" :key="index" data-aos="fade-up">
      <!-- User Info  -->
      <div class="d-flex p-4 justify-content-between align-items-center">
        <div class="left-user-info d-flex align-items-center " style="gap:20px">
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
            
          </div>

          <div>
            
            <div class="btn-group dropleft">
              <div type="button" class="" data-toggle="dropdown" aria-expanded="false">
                <Icon icon="charm:menu-kebab" />
              </div>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Save</a>
                <a class="dropdown-item" href="#">Mint to NFT</a>
              </div>
            </div>
          </div>
      </div>
        <div v-if="feed.media">
            <div v-for="(media_item, index) in feed.media" :key="index" class="px-3">
              <video
              controls
              style="width: 100%"
              v-if="media_item.extension == 'mp4' || 'gif' || 'mov' || '3gp' "
              :src="media_item.file"
              height="300px"
               class="rounded-lg"
              ></video>
              <img 
              v-else
              :src="media_item.file"
              alt=""
              srcset=""
              class="post--image rounded-lg"
            />
            </div>
        
        </div>
        <div class="main--post px-3 ">
            <div class="main-writeup rounded-lg" :class="{ active: (feed.media.length === 0 ) }" :style="{'background-image': `linear-gradient(45deg, ${colorSplit(feed.color)}`}">
                <p class="">
                {{ feed.content }}.
                <!-- <span class="span-2"
                  ><router-link to="/">See More</router-link></span
                > -->
              </p>
            </div>
          <div class="user-info mt-3 d-flex align-items-center justify-content-between" style="padding:0 1.5rem 1.5rem 1.5rem">
            <div class="amount small">{{dollarFilter(feed.worth) }} </div>
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
                  <Icon icon="flat-color-icons:like" style=" font-size: 24px !important;" />
                </div>
                <div v-else  @click="likeComment(comment)">
                  <Icon icon="icon-park-outline:like" style="color: red; font-size: 24px !important;" role="button" />
                </div>
                  <sup> {{ comment.likes_count }} </sup>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>

        <!-- view More Posts -->
        <!-- <div class="mt-3 see-more-feeds text-center">
          <button @click="viewMore(page+1)">
            See More
          </button>
        </div> -->
      
    </div>
  </div>
</template>

<script>
// import Axios from 'axios'
import {timeRange, sliceContent, dollarFilter, colorSplit} from '@/plugins/filter'
import { Icon } from "@iconify/vue2";
import CreatePost from '@/components/modals/createPost.vue'
import Stories from '@/components/storiesView.vue'
export default {
  components:{
    Icon, 
    CreatePost,
    Stories
  },
  data(){
    return{
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      // isActive: false,
      formData: {
        media: null,
        content: "",
      },
      feeds: [],
      payload: {
        content: ''
      },
      comments: false,
      commentsList: [],
      page: 1,
      feed_id: ''
    }
  },
  methods:{
    onFileChange(e) {
      // this.imgPreview = true;
      var input = e.target;
      this.formData.media = input.files;
      console.log(this.formData.media);
      // if (e.target.files.length > 0) {
      //   var src = URL.createObjectURL(e.target.files[0]);
      //   this.imgSrc = src;
      // }
    },
    closePreview(){
      this.formData.media = null;
      this.imgPreview = false
    },
    openModal() {
      this.$emit("open");
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
      this.feed_id = feed.id
      console.log(this.feed_id);
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
    async getFeeds(){
      try {
        const res = await this.$axios.get('user/feeds/');
        this.feeds = res.data.results;
        console.log(res.data);
        // let feeds = res.data.results
        // this.$store.dispatch("addFeeds", { feeds });
      } catch (error) {
        console.log(error);
      }
    },
    async viewMore(page) {
       try {
        const res = await this.$axios.get('user/feeds/?page='+page);
        this.feeds = res.data.results;
        // let newfeeds = Object.assign({}, feedObj)
        // this.feeds.post(feedObj)
        // console.log(newfeeds);
        // this.feeds.push(newfeeds)
        // let feeds = res.data.results
        // this.$store.dispatch("addFeeds", { feeds });
      } catch (error) {
        console.log(error);
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
    async likeComment(comment){
      // console.log(comment);
      try {
        let res = await this.$axios.post(`posts/${this.feed_id}/comments/${comment.id}/like/`)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.getComments()
    },
    
  },
  beforeMount(){
    this.getFeeds()
  },
  mounted(){
    // this.getNextUser()
  }
 
}
</script>