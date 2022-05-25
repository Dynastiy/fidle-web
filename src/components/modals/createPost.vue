<template>
  <div>
    <div class="start--post shadow-sm">
      <div class="top">
        <div class="profile--image" role="button">
          <img
          @click="goToProfile"
            :src="user.current_profile_image"
            class="avatar--image"
            alt=""
          />
        </div>
        <div role="button" class="post--button" @click="create_post = !create_post">
         Start a Post
        </div>
      </div>
    </div>

    <!-- Loader  -->
     <div
        class="loading mt-3 d-flex align-items-center"
        v-if="loading"
        style="gap: 30px"
      >
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h6 class="font-weight-bold">Posting your Fidle, Please Wait  . . .</h6>
      </div>

      <!-- Error Page  -->
      <h6 v-if="error" class="mt-3 text-dark text-center p-2 font-weight-bold" style="background-color:#f46a6aa0;  border-radius: 5px;">Something Went Wrong <span class="text-white" role="button" @click="close">Try Again</span></h6>


    <!-- Posts Modal -->
    <div class="create-post-mask"  v-show="create_post">
      <div class="create-post-container">
        <div class="create-post-content">
          <div class="text-right mb-3" @click="close" role="button">
            <Icon icon="clarity:window-close-line" width="30px" height="30px" />
          </div>
          <div class="top-address d-flex align-items-center" style="gap: 30px">
            <div class="profile--image">
              <img
                :src="user.current_profile_image"
                class="avatar--image"
                alt=""
              />
            </div>
            <div class="personal-data">
              <h5 class="font-weight-bold mb-2"> {{ user.name }} </h5>
            </div>
          </div>

          <div class="main-post-area mt-3">
            <label class="mb-3" for="">What do you want to talk about?</label>
            <!-- Image Preview COntainer  -->
              <div>
                <div id="img-preview" v-show="imgPreview">
                  <div class="text-right mb-3">
                  <button @click="closePreview" class="close--img"><Icon icon="clarity:window-close-line" width="30px" height="30px" /></button>
                  <img :src="imgSrc" alt="" srcset="">
                </div>
                </div>
              </div>
            <div class="text-area">
              <textarea
                class="form-control"
                name=""
                id="message"
                maxlength="200"
                @keyup="checkLength"
                v-model="payload.content"
                :class="{active: isActive}"
                :style="{'background-image': `linear-gradient(45deg, ${colorSplit(payload.color)}`}"
              ></textarea>
              <div
                class="
                  d-flex
                  align-items-center
                  justify-content-between
                  mt-3
                  mb-3
                "
              >
                <small>
                  <span id="lower" class="">{{ current_length }}</span
                  >/{{ max_length }}
                </small>
                <small v-show="max_characters" class="text-danger"
                  >Maximum Characters Reached</small
                >
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3">
            <div class="d-flex align-items-center preview" style="gap:30px">
              <div role="button">
                <input @change="onFileChange" type="file" accept="image/*" id="choose-file" name="choose-file" />
                <label for="choose-file"><Icon icon="bytesize:photo" class="file--icons" /></label>
              </div>
              <div class="d-flex align-items-center" style="gap:10px">
                <div class="rounded-lg d-flex align-items-center justify-content-center" @click="removeColor" role="button" style="width:20px; height:20px; background-color: rgb(255, 255, 240); box-shadow: inset 1px 1px 8px rgba(0, 0, 0, 0.1);">
                  x
                </div>
                <div class="rounded-lg" style="width:20px; height:20px; background: linear-gradient(45deg,  #41A844, #76E54B)" role="button" @click="selectColorOne">
                 
                </div>
                <div class="rounded-lg" style="width:20px; height:20px; background: linear-gradient(45deg,   #3C9077, #28E7AE)" role="button" @click="selectColorTwo">
                  
                </div>
                <div class="rounded-lg" style="width:20px; height:20px; background: linear-gradient(45deg,   #984E36, #DA6640)" role="button" @click="selectColorThree">
                  
                </div>
                <div class="rounded-lg" style="width:20px; height:20px; background: linear-gradient(45deg,   #B03E58, #E95375)" role="button" @click="selectColorFour">
                  
                </div>
                <div class="rounded-lg" style="width:20px; height:20px; background: linear-gradient(45deg,   #E95375, #AE5CFD)" role="button" @click="selectColorFive">
                  
                </div>
              </div>
            </div>
            <div class="make--post">
              <button @click="create_fidle()" type="submit">Post</button>
            </div>
          </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {colorSplit} from '@/plugins/filter'
import { Icon } from "@iconify/vue2";
import axios from "axios";
export default {
  components: {
    Icon,
  },
  data(){
    return {
      colorSplit,
      dataModel: {},
      formData: new FormData(),
      content: '',
       payload: {
        media: null,
        content: "",
        color: "",
      },
      user: {},
      current_length: "",
      max_length: "",
      max_characters: false,
      user_location: {
        latitude: "",
        longitude: "",
      },
      imgPreview: false,
      imgSrc: null,
     
      create_post: false,
      loading: false,
      error: false,
      new_color: '',
      isActive: false,
    };
  },
  methods: {
    selectColorOne(){
      if (this.isActive === false) {
         this.isActive = true;
      }
      this.payload.color = "#41A844 #76E54B"
      console.log(this.payload.color);
     
    },
    selectColorTwo(){
      if (this.isActive === false) {
         this.isActive = true;
      }
      this.payload.color = '#3C9077 #28E7AE'
      console.log(this.payload.color);
    },
    selectColorThree(){
      if (this.isActive === false) {
         this.isActive = true;
      }
      this.payload.color = '#984E36 #DA6640'
      console.log(this.payload.color);
    },
    selectColorFour(){
      if (this.isActive === false) {
         this.isActive = true;
      }
      this.payload.color = '#B03E58 #E95375'
      console.log(this.payload.color);
    },
    selectColorFive(){
      if (this.isActive === false) {
         this.isActive = true;
      }
      this.payload.color = '#E95375 #AE5CFD'
      console.log(this.payload.color);
    },
    goToProfile(){
      this.$router.push('/profile')
    },
    removeColor(){
      this.isActive = false
      console.log(this.payload.color);
      console.log(this.isActive);
    },
    checkLength() {
      const messageEle = document.getElementById("message");
      //   const target = e.target;

      // Get the `maxlength` attribute
      const maxLength = messageEle.getAttribute("maxlength");

      // Count the current number of characters
      const currentLength = messageEle.value.length;
      this.current_length = currentLength;
      this.max_length = maxLength;

      if (currentLength == maxLength) {
        this.max_characters = true;
      } else {
        this.max_characters = false;
      }

      // console.log(this.max_length);
      // console.log(this.current_length);
    },
    close(){
      // this.$emit('close')
      this.create_post = !this.create_post
      this.error = false
    },
    onFileChange(e) {
      // alert('Hello World')
      this.imgPreview = true;
      var input = e.target;
      this.payload.media = input.files[0];
      console.log(this.payload.media);
      if (e.target.files.length > 0) {
        var src = URL.createObjectURL(e.target.files[0]);
        this.imgSrc = src;
        this.isActive = false;
      document.getElementById('message').style.backgroundImage = null;
      this.payload.color = "";
      }

      
    },
    closePreview(){
      this.formData.media = null;
      this.imgPreview = false
    },
    
    create_fidle(){
      this.create_post = !this.create_post
      this.loading = true
      this.$emit('getPosts');
      let formData = new FormData();
      formData.append("content", this.payload.content);
      formData.append("color", this.payload.color);
      formData.append("media", this.payload.media);
            fetch( 'https://api.fidle.io/posts/', {
          method: 'POST',
          headers: {
              'Authorization': 'Token '+this.$store.state.token,
              'Accept': 'application/json',
              // 'Content-Type': 'application/json;charset=utf-8'
          },
          // body: JSON.stringify( this.payload )
          body: formData
      })
      .then((res)=>{
          console.log(res);
      }).catch((err)=>{
        console.log(err);
        this.error = true
      })
      this.loading = false
    },
     async getUser(){
      try {
        let res = await this.$axios.get('auth/users/me/')
        // console.log(res.data);
        this.user = res.data
      } catch (error) {
        console.log(error);
      }
    }
  },
   
  mounted() {
    this.getUser();
    this.current_length = 0;
    const messageEle = document.getElementById("message");
    //   const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = messageEle.getAttribute("maxlength");

    this.max_length = maxLength;

    function getAddress(latitude, longitude) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng="+
            latitude +
            "," +
            longitude +
            "&key=" +
            "AIzaSyCy3_JwoM7ZCRg4T1pjLn9rGbbx1mSYTLw"
        )
        .then(
          function success(response) {
            // console.log("User's Address Data is ", response);
            return response
          },
          function fail(status) {
            // console.log("Request failed.  Returned status of", status);
            return status
          }
        );
    }

    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          // console.log(
          //   "latitude",
          //   position.coords.latitude,
          //   "longitude",
          //   position.coords.longitude
          // );

          //   this.longitude = new_position.coords.longitude;
          //   this.latitude = new_position.coords.latitude
          //   console.log(this.latitude, this.longitude);
          getAddress(position.coords.latitude, position.coords.longitude);
        },

        function error(error_message) {
          // for when getting location results in an error
          console.error(
            "An error has occured while retrieving location ",
            error_message
          );
        }
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log("geolocation is not enabled on this browser");
    }
  },
};
</script>