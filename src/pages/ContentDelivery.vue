<template>
  <q-page class=" q-pa-md q-pt-lg font_sans pageStyle" >
    <div class="text-h4">
      BCC Contents
    </div>
    <div class="text-h6 q-mt-sm q-mb-lg">
      All of our contents in one place
    </div>
    <ul id="myUL">
      <li v-for="item,index in structure.children" :key="index">
        <tree :node="item" v-if="item.type=='directory'"></tree>
      </li>
    </ul>
  </q-page>
</template>

<script>
import NodeTreeVue from 'components/NodeTree.vue'

export default {
    components:{
      //'folder-item':FolderItem
      'tree':NodeTreeVue
    },
    data(){
        return {
            slide: 1,
            autoplay: false,
            structure:{
              name:"ECM System",
              children:[],
              content:[]
            }
        }
    },
    beforeMount(){
      let v = this;
      fetch("http://localhost:8084/getFileSystemStructure")
      .then(res => res.json())
      .then(json => {
        //console.log("JSON Strucutre: " + JSON.stringify(json))
        v.structure.children = json.children;
      })
    }
}
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

  ul, #myUL {
      list-style-type: none;
  }

  #myUL {
      margin: 0;
      padding: 0;
  }

</style>