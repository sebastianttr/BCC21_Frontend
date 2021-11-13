<template>
  <q-card style="width: 350px;background-color:#23272A;color:white;">
        <q-card-section class="flex-center">
        <div class="text-h5 q-ml-md q-mt-md">
            Set birthdate
        </div>
        <div class="text-h7 q-ml-md">
            You do not have to specify the year.
        </div>
            <div class="q-pa-md">
            <div class="q-gutter-md it row justify-center items-start content-between">
                <q-date
                v-model="userdata.birthday"
                dark
                :title="userdata.username"
                subtitle="Birthday"
                style="color:#5663F7;"
                mask="YYYY-MM-DD"
                />
            </div>
            </div>
            <q-btn class="q-ml-md q-mr-md" color="primary" v-close-popup style="width:91%; margin-top:15px;" rounded label="Set date" @click="sendBirthdate" />
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name:'BirthDateSetterDialog',
    data(){
        return {
            userdata:null,
        }
    },
    methods:{
        sendBirthdate(){
            //var userdata = JSON.parse(localStorage.getItem('userdata'))
            let userdataStorage = JSON.parse(localStorage.getItem('userdata'))
            userdataStorage.birthday = this.userdata.birthday + "T00:00:00.000Z"

            const stringifiedUserdata = JSON.stringify(userdataStorage)

            localStorage.setItem('userdata', stringifiedUserdata)

            const postBody = JSON.stringify(
                {
                    userdata:btoa(stringifiedUserdata)
                }
            )  

            fetch("http://localhost:8084/setBirthdate",{
                method:"POST",
                body: postBody,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    beforeMount(){
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
        //console.log(userdata)
    },
    
}
</script>

<style>

</style>