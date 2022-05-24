<template>
    <div>
        <div>
            <div class="wallet--page shadow-sm">
                <div class="wallet--address-page">
                    <div class="text-center">
                        <img src="@/assets/img/wallet.png" alt="">
                    </div>
                    <div>
                        <h4 class="font-weight-bold text-center">Wallet</h4>
                    </div>
                    <div class="text-center">
                        <h1 class="font-weight-bold text-secondary ">$0.00</h1>
                    </div>
                    <div class="d-flex align-items-center justify-content-center" style="gap:30px">
                        <button @click="goToSend" class="main--btn"> <Icon icon="ic:outline-file-upload" style="font-size:30px"/> <span style="font-size:20px">Send</span></button>
                        <button @click="goToReceive" class="main--btn"> <Icon icon="ic:outline-file-download" style="font-size:30px"/> <span style="font-size:20px">Receive</span> </button>
                    </div>
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
    goToSend(){
        this.$router.push('/wallet/send-funds')
    },
     goToReceive(){
        this.$router.push('/wallet/receive-funds')
    }
  }
};
</script>