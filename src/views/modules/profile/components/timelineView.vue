<template>
  <div>
    <div>
        <!-- First Post  -->
      <div class="post--content shadow-sm mt-3" v-for="(feed, index) in feeds" :key="index">
        <div v-if="feed.media.length !== 0 ">
          <img v-for="(media_item, index) in feed.media" :key="index"
          :src="media_item.media"
          alt=""
          srcset=""
          class="post--image"
        />
        </div>
        <div class="main--post">
          <p class="small">
            {{ feed.content }}
            <span class="span-2"
              ><router-link to="/">See More</router-link></span
            >
          </p>
          <div class="user-info mt-3 d-flex align-items-center justify-content-between">
            <div class="left-user-info d-flex align-items-center" style="gap:20px">
              <div >
                <img v-if="feed.user"
                  :src="feed.user.current_profile_image.media"
                  class="avatar--image"
                  alt=""
                />
              </div>
              <div>
                <h6 class="text-capitalize"> {{ feed.user.first_name }} {{ feed.user.last_name }} </h6>
                <p class="small"> {{ timeRange(feed.timestamp) }}  <span class="span">Lagos, Nigeria</span> <span>Edited</span> </p>
              </div>
              <div class="amount small">&#36;108.8</div>
            </div>
            <div
              class="right-user-info d-flex align-items-center"
              style="gap: 20px"
            >
              <span>
                <img v-if="feed.has_liked" src="@/assets/img/liked-fidle.svg" class="mr-1"  alt="" srcset="" />
                <img v-else src="@/assets/img/like-fidle.svg" class="mr-1"  alt="" srcset="" />
                <sup> {{ feed.likes_count }} </sup>
              </span>
              <span>
                <img src="@/assets/img/comment-fidle.svg" class="mr-1"  alt="" srcset="" />
                <sup> {{ feed.comments_count }} </sup>
              </span>
              <span>
                <!-- <img src="@/assets/img/share-fidle.svg" class="mr-1"  alt="" srcset="" /> -->
                <img src="@/assets/img/share-fidle.svg" class="mr-1"  alt="" srcset="" />
                <sup> {{ feed.share_count }} </sup>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timeRange, sliceContent} from '@/plugins/filter'
export default {
  data(){
    return{
      timeRange,
      sliceContent,
      feeds: [],
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
    }
  },
  mounted(){
    this.getFeeds()
  }
}
</script>