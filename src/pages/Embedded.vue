<template>
  <q-page class="q-pa-md q-pt-lg font_sans pageStyle" >

        <div v-if="isScruffy()">

            <div class="text-h4">
                Send embedded announcement to everyone.
            </div>
            <div class="text-h6 q-mt-sm">
                Broadcast a prettier embedded announcement to everyone in the BCC guild.
            </div>
            <div style="margin-top:25px;" class="widthInputs">
                <div class="text-h5 q-mt-sm">
                    Title
                </div>
                <q-input
                    v-model="title"
                    filled
                    dark
                    placeholder="Enter title here"
                    class="q-mt-sm"
                />

                <div class="text-h5 q-mt-md">
                    Description
                </div>
                <q-input
                    v-model="description"
                    filled
                    dark
                    placeholder="Enter description here"
                    class="q-mt-sm"
                    type="textarea"
                />
                <div class="fit row wrap justify-end items-end content-start q-mt-md">
                    <q-select rounded dark standout v-model="model" class="q-mr-sm q-mb-sm" :options="channels" label="Select channel" label-color="white" />
                    <q-btn style="background-color: #5663F7; margins-left:10px;" rounded  class="text-h6  q-mb-sm" label="SEND" @click="sendAnnouncment()" />
                </div>
            </div>
        </div>

        <div v-else>
            <div class="text-h4">
                You cannot make announcements, because you are not a scruffy!
            </div>
            <div class="text-h6">
                If there is the need to annouce something, contact  one of the scruffies.
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
          title:"",
          description:""
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
                title:this.title,
                description:this.description,
                channelId:selectedChannelID
            }
        )

        fetch("https://bccbackend.wiredless.io/notifyEmbedded",{
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

.widthInputs{
    max-width:50%;
}

@media only screen and (max-width: 768px){
    .widthInputs{
        max-width:100%;
    }
}

</style>
