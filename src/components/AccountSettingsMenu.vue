<template>
    <q-menu  class="menuCard font_sans">
        <div v-if="loggedIn" class="fit column justify-center items-center content-center q-pa-md" >
            <div class="column justify-center items-center content-center q-ma-md" style="width:250px;">
                <q-avatar size="120px">
                    <img :src="userdata.avatarURL">
                </q-avatar>

                <div class="text-h4 q-mt-md q-mb-xs">{{userdata.username}}</div>
            </div>
            <div class="fit column justify-start items-start content-start" >
                <div class="fit row wrap justify-center items-start content-start truncate-chip-labels" style="max-width: 300px">
                    <q-chip v-for="item,index in userdata.roles" :key="index+200" square  text-color="white" :style="'word-wrap:break-word;background-color:#'+item.color">
                        <div class="ellipsis">
                            {{item.name.toUpperCase()}}
                            <q-tooltip>{{item.name.toUpperCase()}}</q-tooltip>
                        </div>
                    </q-chip>                    
                </div>
                
                <div class="fit column justify-center items-center content-center">
                    <hr style="background-color:gray; width:95%;margin-bottom:20px; "> 
                    <div class="fit column content-start items-center">
                        <div class="fit row  content-start items-center q-pa-xs accountCard" v-close-popup style="cursor: pointer;" @click="openDialogCallback()">
                            <q-icon name="calendar_today" size="xs" class="q-ml-sm" />
                            <div class="text-h6 q-ml-sm" >
                                Set birth date
                            </div>
                        </div>
                        <div class="fit row  content-start items-center q-pa-xs accountCard" style="cursor: pointer;" @click="logout()">
                            <q-icon name="logout" size="xs" class="q-ml-sm" />
                            <div class="text-h6 q-ml-sm">
                                Log out
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="column justify-center items-center content-center q-ma-md" style="max-width:300px; text-align: center;">
                <div class="text-h6 q-mt-md q-mb-xs">You are not logged in with your discord account!</div>
                <q-btn style="background-color: #5663F7;" class="q-ma-sm" icon="login" rounded label="LOG IN WITH DISCORD" @click="login" />
            </div>
        </div>
    </q-menu>
</template>

<script>
export default {
    name:'AccountSettingsMenu',
    props: {
        openDialogCallback: { type: Function }
    },
    data(){
        return {
            loggedIn:false,
            userdata:null
        }
    },
    beforeMount(){
        var userdata = localStorage.getItem('userdata')

        if(userdata == null || ""){
            return
        }
        else{
            this.loggedIn = true
            this.userdata = JSON.parse(userdata)
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("userdata")
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=893113878685306930&redirect_uri=https%3A%2F%2Fbccbackend.wiredless.io&response_type=code&scope=identify%20email%20connections%20guilds';
        },
        login(){
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=893113878685306930&redirect_uri=https%3A%2F%2Fbccbackend.wiredless.io&response_type=code&scope=identify%20email%20connections%20guilds';
        },
    }
    
}
</script>

<style>

    .accountCard{
        border-radius: 10px;
        transition: 300ms;
    }

    .accountCard:hover{
        background: #40444a;
        transition: 300ms;
    }

    .menuCard{
        border-radius: 15px;
        background-color: #23272A;
        color:white;
    }

    .truncate-chip-labels > .q-chip{
        max-width: 140px
    }

</style>