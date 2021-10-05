<template>
  <q-page class="q-pa-md q-pt-lg font_sans pageStyle" >
    
        <div v-if="isScruffy()">
            <div class="text-h4">
                Send normal announcement to everyone.
            </div>
            <div class="text-h6 q-mt-sm">
                Broadcast an announcement to everyone in the BCC guild.
            </div>
            <div class="q-mt-md" style="width: 100%">
                <q-input
                v-model="text"
                filled
                dark
                placeholder="Enter announcement here"
                type="textarea"
                />
            </div>
            <div class="fit row wrap justify-end items-end content-start q-mt-md q-mr-lg">
                <q-select rounded dark standout v-model="model" class="q-mr-sm" :options="channels" label="Select channel" label-color="white" />
                <q-btn  style="background-color: #5663F7;" rounded  class="text-h6" label="SEND" @click="sendAnnouncment()" />
            </div>
        </div>
     
      <q-dialog v-model="dialogOpen" position="bottom" >
        <birth-date-setter-dialog :userdata="userdata" />
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import BirthDateSetterDialog from 'components/BirthDateSetterDialog'

export default defineComponent({
  name: 'PageIndex',
  components: { BirthDateSetterDialog },
  data(){
      return {
          loggedIn:false,
          announcmentText:null,
          dialogOpen:false,
          birthdate: "2019/02/01",
          text:"",
          get userdata() {
            return JSON.parse(localStorage.getItem('userdata'));
          },
          model: JSON.parse(localStorage.getItem('channels')).map(item => item.channelName)[0],
          get channels() {
            return JSON.parse(localStorage.getItem('channels')).map(item => item.channelName);
          },
      }
  },
  computed:{
    isLoggedIn(){
      var userdata = localStorage.getItem('userdata')
      //this.userdata = JSON.parse(userdata)

      //console.log("Birthday: " + JSON.parse(userdata).birthday)

      return userdata != null || ""
    },
    
  },
  methods:{
    isScruffy(){
      var hasRole = this.userdata.roles.filter(item=>{
        return item.name == "scruffy"
      }).length

      return hasRole
    },
    
    sendAnnouncment(){
        const channels = JSON.parse(localStorage.getItem('channels'))
        const selectedChannelID = channels.find(item => item.channelName == this.model).channelId

        let postBody = JSON.stringify(
            {
                userdata:btoa(JSON.stringify(this.userdata)),
                text:this.text,
                channelId:selectedChannelID
            }
        )

        fetch("http://localhost:8084/notify",{
            method:"POST",
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
  },
  updated(){
    console.log("Updating!")
  },
  mounted(){
    window.onstorage = () => {
      this.userdata = localStorage.getItem('userdata');
    }
  }
})
</script>

<style>
.pageStyle{
  background-color: #2C2F33;
  color:white;
  font-family: 'customfont_productsans';
}

@font-face {
  font-family: customfont_productsans;
  src: url(../fonts/Product_Sans_Regular.ttf);
}

.font_sans{
  font-family: 'customfont_productsans';
}

</style>
