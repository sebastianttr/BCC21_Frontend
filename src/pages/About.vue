<template>
  <q-page class=" q-pa-md q-pt-lg font_sans pageStyle" >
      <div class="text-h5">
          A joint venture between ...
      </div>

      <div>
          
          <div class="text-h4 q-mt-md">
            Sebastian Tatar
          </div>
          <div class="text-h6 q-mt-sm">
            Web: <a class="text-primary" href="https://wiredless.io"> https://wiredless.io </a>
          </div>
      </div>

      <div class="text-h5 q-mt-md">
          and
      </div>

      <div>
          
          <div class="text-h4 q-mt-md">
            Georg Becker
          </div>
          <div class="text-h6 q-mt-sm">
            Web: <a class="text-primary" href=" https://www.shellrider.com"> https://www.shellrider.com </a>
          </div>
      </div>
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
          
      }
  },
  computed:{
  },
  methods:{
    
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
