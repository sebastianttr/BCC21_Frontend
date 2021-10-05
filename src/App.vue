<template>
  <router-view class="my-font" />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  beforeMount(){
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);

    fetch("http://localhost:8084/getAllChannels")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('channels',JSON.stringify(data))
    })

    if(params.get("userdata") == null || ""){
      return
    }

    //console.log(atob(params.get("userdata"))) 

    localStorage.setItem('userdata', atob(params.get("userdata")));
    
    var newURL = window.location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);

    
  },
  methods:{
    isLoggedIn(){
      var userdata = localStorage.getItem('userdata')
      return userdata == null || ""
    }
  },
})
</script>

<style >
@font-face {
  font-family: customfont;
  src: url(./fonts/Uni_Sans_Heavy.otf);
}

@font-face {
  font-family: customfont;
  src: url(./fonts/Uni_Sans_Heavy.otf);
}

.my-font {
  font-family: 'customfont';
}
</style>
