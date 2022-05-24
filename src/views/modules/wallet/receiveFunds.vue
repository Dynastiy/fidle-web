<template>
    <div>
        <div>
            <div class="wallet--page shadow-sm">
                <div class="">
                    <div class="text-center">
                        <img src="@/assets/img/qrcode.png" width="100" alt="">
                        <h4 class="text-center  mt-2">YOUR BANT WALLET ADDRESS</h4>
                    </div>
                    <div class="d-flex wallet--address p-2 mt-3 rounded-lg">
                        <input type="text" v-model="qrtext">
                        <div class="bg-white p-1 rounded-lg">
                            <Icon icon="codicon:copy" style="font-size:20px"/>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <h6 class="text-center  mt-2">YOUR BANT QR CODE ADDRESS</h6>
                        <div>
                            <vue-qr :text="qrtext"></vue-qr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import VueQr from 'vue-qr'
export default {
  components: {
    Icon,  VueQr
  },
  data() {
    return {
        qrtext:''
    };
  },
  methods: {
   
  },
  computed:{
       
  }
};
</script>