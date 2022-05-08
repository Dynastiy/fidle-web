<template>
  <div>
    <div class="create-post-mask">
      <div class="create-post-container">
        <div class="create-post-content">
          <div class="text-right mb-3" @click="close" role="button">
            <Icon icon="clarity:window-close-line" width="30px" height="30px" />
          </div>
          <div class="top-address d-flex align-items-center" style="gap: 30px">
            <div class="profile--image">
              <img
                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                class="avatar--image"
                alt=""
              />
            </div>
            <div class="personal-data">
              <h5 class="font-weight-bold mb-2">John Doe</h5>
              
              <!-- <div class="dropdown">
                <button
                  class="
                    d-flex
                    align-items-center
                    btn btn-visibility
                    dropdown-toggle
                  "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  style="gap: 10px"
                >
                  <Icon
                    icon="material-symbols:public"
                    width="18px"
                    height="18px"
                  />
                  <span>Anyone</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Anyone</a>
                  <a class="dropdown-item" href="#">Anyone</a>
                  <a class="dropdown-item" href="#">Anyone </a>
                </div>
              </div> -->
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

                <!-- <a
                  href="javascript:document.querySelector('input#file-ip-1').click()"
                  ><Icon icon="twemoji:artist-palette"
                /></a> -->
                <!-- <input
                class=""
                        type="color"
                        id="file-ip-1"
                    /> -->
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between mt-3">
            <div class="d-flex align-items-center" style="gap:30px">
              <div role="button">
                <!-- <Icon icon="bytesize:photo" class="file--icons" /> -->
                <input @change="onFileChange" type="file" accept="image/*" id="choose-file" name="choose-file" />
                <label for="choose-file"><Icon icon="bytesize:photo" class="file--icons" /></label>
              </div>
              <!-- <div role="button">
                <Icon icon="akar-icons:video" class="file--icons" />
              </div> -->
              <!-- <div role="button">
                <Icon icon="cil:location-pin" class="file--icons" />
              </div>
              <div role="button">
                <Icon icon="bi:emoji-laughing-fill" class="file--icons" />
              </div> -->
            </div>
            <div class="make--post">
              <button @click="submitPost">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Icon } from "@iconify/vue2";
import axios from "axios";
export default {
  props:['loading'],
  components: {
    Icon,
  },
  data() {
    return {
      loader: this.loading,
      current_length: "",
      max_length: "",
      max_characters: false,
      user_location: {
        latitude: "",
        longitude: "",
      },
      imgPreview: false,
      imgSrc: null,
      payload: {
        media: null,
        content: '',
      }
    };
  },
  methods: {
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
      this.$emit('close')
    },
    onFileChange(e) {
      this.imgPreview = true;
      var input = e.target;
      this.payload.media = input.files[0];
      console.log(this.payload.media);
      if (e.target.files.length > 0) {
        var src = URL.createObjectURL(e.target.files[0]);
        this.imgSrc = src;
      }
    },
    closePreview(){
      this.payload.media = null;
      this.imgPreview = false
    },
    // async submitPost(){
    //   this.$emit('addPost')
    // }
    async submitPost(){
        // this.loading = true;
      // this.close()
      let formData = new FormData()
      formData.append("content", this.payload.content);
      formData.append("media", this.payload.media)
      try {
        let res = await this.$axios.post('/posts/', this.payload)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      
      // this.loading = false
    }
  },
  mounted() {
    this.current_length = 0;
    const messageEle = document.getElementById("message");
    //   const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = messageEle.getAttribute("maxlength");

    this.max_length = maxLength;

    function getAddress(latitude, longitude) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
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