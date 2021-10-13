<template>
  <q-page class="flex q-pa-md q-pt-lg font_sans pageStyle" >
      <div v-if="!isLoggedIn" class="q-mt-lg q-mb-sm">
        <div class="text-h4">
          Hmmm ...  You are not logged in. 
        </div>
        <div class="text-h6 q-mt-sm">
          Press on the user icon on the top-right, or ...
        </div>
        <q-btn style="background-color: #5663F7;" class="q-mt-md text-h6" icon="login" rounded label="LOG IN WITH DISCORD" @click="login" />
      </div>

      <div v-else>
          <div v-if="userdata.birthday.startsWith('1970-01-01')" class="q-mt-lg q-mb-lg">
            <div class="text-h5">
              Please set your birth date with the button down below.
            </div>
            <q-btn style="background-color: #5663F7;" class="q-mt-md text-h6" icon="calendar_today" rounded label="SET BIRTHDAY" @click="toggleDialog()" />
          </div>

          <div>
            <div class="text-h4">
              Daily Schedule
            </div>
            <div class="q-mt-sm q-mb-lg q-ml-none">
              <calendar-item 
                v-for="(item,index) in calendar" 
                :key="index+2000" 
                :title="getLectureName(item.description)"
                :from="composedTimeString(item.start)" 
                :to="composedTimeString(item.end)"
                :location="item.location"
                :lecturer="getLecturorName(item.description)"
                :color="getCourseColor(item.description)"
              />
              <calendar-item
                title="2D Game Mathematics and Physics"
                from="15:40" 
                to="23:59"
                location="Georgs Dungeon"
                lecturer="Zötloterer"
                color="#ABDDE2"
              />
            </div>
          </div>

          <div>
            <div class="text-h4">
              Good-to-knows
            </div>
            <div class="text-h6 q-mt-sm q-mb-lg">Nothing good to know at the moment.</div>
          </div>
          
      </div>

      <q-dialog v-model="dialogOpen" position="bottom" >
        <birth-date-setter-dialog :userdata="userdata" />
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import moment from 'moment';

import BirthDateSetterDialog from 'components/BirthDateSetterDialog'
import CalendarItem from 'components/CalendarItem'

export default defineComponent({
  name: 'PageIndex',
  components: { BirthDateSetterDialog, CalendarItem },
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
          get calendar(){
            return JSON.parse(localStorage.getItem('calendar'));
          }
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
    login(){
      window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=893113878685306930&redirect_uri=http%3A%2F%2Flocalhost%3A8084&response_type=code&scope=identify%20email%20connections%20guilds';
    },
    toggleDialog(){
      this.dialogOpen = true
    },
    getLectureName(lectureInfo){
      return lectureInfo.substring(lectureInfo.indexOf("Bezeichnung: ")+13,lectureInfo.indexOf("\nLehrfach:"))
    },
    getLecturorName(lectureInfo){
      return lectureInfo.substring(lectureInfo.indexOf("Vortragende: ")+13,lectureInfo.indexOf(",\nGruppen:"))
    },
    getCourseColor(lectureInfo){
      var lectureName = this.getLectureName(lectureInfo)

      switch(lectureName){
        case "Client-Side Coding":
          return "#B1D4BF"
        case "Game Design and Digital Storytelling":
          return "#F8DCB3"
        case "2D Game Mathematics and Physics":
          return "#ABDDE2"
        case "Graphics Design":
          return "#D2C6E3"
        case "Agile Software Life Cycle Management":
          return "#D1B4A4"
        case "2D Game Graphics":
          return "#97B5E1"
        case "2D Browser Game Coding":
          return "#E3E79A"
        case "Introduction to Web Technologies":
          return "#FCD0E9"
        case "Design Thinking":
          return "#F4B0AD"
        default:
          return "#384045"
      }

    },
    composedTimeString(time){
      var time = time.substring(time.indexOf("T")+1,time.indexOf("."))
      var timeMoment = moment(time,"hh:mm:ss")
      return `${timeMoment.hour()}:${timeMoment.minute()}`;
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
