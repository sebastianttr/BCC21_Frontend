<template>
  <router-view class="my-font" />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  async mounted(){
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);

    fetch("https://bccbackend.wiredless.io/getAllChannels")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('channels',JSON.stringify(data))
    })


    if(params.get("userdata") == null || ""){
      try{
        let userRoles = JSON.parse(localStorage.getItem("userdata")).roles
        let calendar = await this.getCalendar(userRoles)
        localStorage.setItem("calendar",JSON.stringify(calendar))
      }
      catch(e){
        console.log("Cannot load calendar: " + e)
      }
      return
    }
    else {
      localStorage.setItem('userdata', atob(params.get("userdata")));

      let userRoles = JSON.parse(localStorage.getItem("userdata")).roles
      let calendar = await this.getCalendar(userRoles)
      localStorage.setItem("calendar",JSON.stringify(calendar))
      let newURL = window.location.href.split("?")[0];
      window.history.pushState('object', document.title, newURL);
    }
  },
  methods:{
    isLoggedIn(){
      let userdata = localStorage.getItem('userdata')
      return userdata == null || ""
    },
    async getCalendar(userRoles){
      let isGroupA = true

      userRoles.every((role)=>{
        if(role.name == "group A"){
          isGroupA = true
          return false;
        }
        else{
          isGroupA = false
          return true
        }
      })

      /*
      fetch("http://localhost:8084/getDailyCalendar?group=" + ((isGroupA)?"a":"b"))
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })

      */
      const response = await fetch("https://bccbackend.wiredless.io/getCalendar?group=" + ((isGroupA)?"a":"b") + "&type=daily");
      const calendar = await response.json();
      return calendar;

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
