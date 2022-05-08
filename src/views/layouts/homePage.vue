<template>
    <div>
        <app-header class="sticky-top"/>
        <div id="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/appHeader.vue'
export default {
    components:{
        AppHeader
    },
   
}
</script>