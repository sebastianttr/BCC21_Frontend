<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar style="background-color:#2C2F33">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="!isLoggedIn()"
        />

        <q-toolbar-title>
          BCC21 Dashboard
        </q-toolbar-title>

        <q-btn icon="perm_identity" flat round>
          <account-settings-menu  :openDialogCallback="toggleDialog"/>
        </q-btn>
      </q-toolbar>
    </q-header>

    
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      dark
    >
      <q-list>
        <q-item-label
          header
        >
          BCC21 
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="dialogOpen" position="bottom" >
      <birth-date-setter-dialog />
    </q-dialog>
    
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import AccountSettingsMenu from 'components/AccountSettingsMenu.vue'


const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: 'https://quasar.dev',
    to: "/"
  },
  {
    title: 'Make announcement',
    icon: 'edit',
    link: 'https://github.com/quas',
    to: "/annonce"
  },
  {
    title: 'Embed annoucement',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
    to: "/embedded"
  },
  {
    title: 'BCC Contents',
    icon: 'folder',
    link: 'contentDelivery',
    to: "/contentDelivery"
  },
  {
    title: 'About',
    icon: 'help',
    link: 'about',
    to: "/about"
  },
];

import { defineComponent, ref } from 'vue';
import BirthDateSetterDialog from 'components/BirthDateSetterDialog';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    AccountSettingsMenu,
    BirthDateSetterDialog
  },
  methods:{
    toggleDialog(){
        //console.log("Opening dialog")
        this.dialogOpen = true
      },
  },
  data(){
    return{
      dialogOpen:false,
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const dialogOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      
      isLoggedIn(){
        let userdata = localStorage.getItem('userdata')
        return userdata == null || ""
      }
    }
  }
})
</script>
