<template>
    <div>
        <div>
            <div class="wallet--page shadow-sm">
                <div class="">
                    
                    <form action="">
                        <div class="mb-3">
                            <label for="">Input Receiver's Address</label>
                            <div class="d-flex wallet--address p-2 mt-3 rounded-lg">
                                <input type="text" v-model="qrtext">
                                <div class="bg-white p-1 rounded-lg">
                                    <Icon icon="codicon:copy" style="font-size:20px"/>
                                </div>
                            </div>
                        </div>
                         <div class="mb-3">
                            <label for="">Input Amount to Send</label>
                            <div class="d-flex wallet--address p-2 mt-3 rounded-lg">
                                <input type="text" v-model="qrtext">
                                <div class="bg-white p-1 rounded-lg">
                                    <Icon icon="codicon:copy" style="font-size:20px"/>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  components: {
    Icon
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
  computed:{
       
  }
};
</script>