<template>
    <div> 
        <div class="profile--header" id="myDIV">
            <div >
                <ul class="list-unstyled d-flex justify-content-between bg-white p-4" >
                <li class="nav--item active">
                    <a  href="javascript:void(0)"  @click="goToTimeline">
                        Timeline
                    </a>
                </li>
                <li class="nav--item">
                    <a  href="javascript:void(0)"  @click="transactionHistory">
                        Transaction History
                    </a>
                </li>
                <li class="nav--item">
                    <a  href="javascript:void(0)"  @click="levels">
                        Levels
                    </a>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goToTimeline(){
            this.$router.push({name: 'timeline', params:{query: 'timeline' }});
        },
        transactionHistory(){
            this.$router.push({name: 'transactions', params:{query: 'timeline' }});
        },
        levels(){
            this.$router.push({name: 'levels', params:{query: 'timeline' }});
        }
    },
    mounted() {
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("nav--item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  },
}
</script>