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
            <form action="" @submit.prevent="create_fidle()">
              <input type="text" name="" v-model="payload.content" required>
              <input type="file" @change="onFileChange" value="Select File">
              <input type="submit">
            </form>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Icon } from "@iconify/vue2";
import axios from "axios";
export default {
  components: {
    Icon,
  },
  data(){
    return {
      content: '',
       payload: {
        media: null,
        content: "",
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
    };
  },
  methods: {
    goToProfile(){
      this.$router.push('/profile')
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
    onFileChange() {
      alert('Hello World')
      // this.imgPreview = true;
      // var input = e.target;
      // this.payload.media = input.files[0];
      // console.log(this.payload.media);
      // if (e.target.files.length > 0) {
      //   var src = URL.createObjectURL(e.target.files[0]);
      //   this.imgSrc = src;
      // }
    },
    closePreview(){
      this.formData.media = null;
      this.imgPreview = false
    },
    create_fidle(){
      console.log(this.formData);
      let formData = new FormData();
      formData.append("content", this.formData.content);
      formData.append("media", this.formData.media);
      axios.post('https://api.fidle.io/posts/', formData,{
        headers:{
          "Authorization": "Token" + " " + this.$store.state.token,
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err)=>{
        console.log(err.response.data);
      })
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