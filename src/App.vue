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

    fetch("http://localhost:8084/getAllChannels")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('channels',JSON.stringify(data))
    })
    
    if(params.get("userdata") == null || ""){
      try{
        var userRoles = JSON.parse(localStorage.getItem("userdata")).roles
        var calendar = await this.getCalendar(userRoles)
        localStorage.setItem("calendar",JSON.stringify(calendar))
      }
      catch(e){
        console.log("Cannot load calendar: " + e)
      }
      return
    }
    else {
      localStorage.setItem('userdata', atob(params.get("userdata")));

      var userRoles = JSON.parse(localStorage.getItem("userdata")).roles
      var calendar = await this.getCalendar(userRoles)
      localStorage.setItem("calendar",JSON.stringify(calendar))
      var newURL = window.location.href.split("?")[0];
      window.history.pushState('object', document.title, newURL);

    }

  },
  methods:{
    isLoggedIn(){
      var userdata = localStorage.getItem('userdata')
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
      const response = await fetch("http://localhost:8084/getDailyCalendar?group=" + ((isGroupA)?"a":"b"));
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
