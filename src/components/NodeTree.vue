<template>
    <li class="node-tree">
        <span class="caret"></span>
        <div @click="handleClick" class="text-custom bgHover">
            <q-icon :name="arrowDown?'expand_more':'navigate_next'" />
            📁 {{node.name}}
        </div>

        <ul class="nested">
            <li v-for="(child,index) in node.children" :key="index">
                <node :node="child" v-if="child.type=='directory'"></node>
            </li>
            <li v-for="(content,index1) in node.children" :key="index1+1000" class="text-custom2 text-weight-light q-ma-xs">
                <div class="fit row wrap justify-between items-start content-start" v-if="content.type=='file'">
                    <div>
                        <q-icon name="description" style="font-size: 1.4 em;" /> <b> {{content.name}} </b>
                    </div>
                    <q-btn color="black"  icon="download" flat round  @click="handleFileClick(content)">
                        <q-tooltip class="bg-black">Download {{content.name}}</q-tooltip>
                    </q-btn>
                </div>  
            </li>
        </ul>
    </li> 
</template>

<script>
export default {
  name: "node",
  data(){
      return{
         nodePath:null,
         arrowDown:false
      }
  },
  props: {
    node: Object
  },
  methods: {
    isDirectory(data){
        console.log("Hello World");
    },
    handleClick(event){
        try{
            //console.log(event)
            event.target.parentElement.querySelector(".nested").classList.toggle("active");
            event.target.classList.toggle("caret-down");
            this.arrowDown = !this.arrowDown;
        }catch(e){
            //do nothing
        }
    },
    handleFileClick(content){
        const path = content.path.replaceAll('\\\\','\\')
        
        fetch(`http://localhost:8084/getFile?path=${path}`)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = content.name;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((e) => console.log(e));
    }
            
  },
};
</script>

<style scoped>

  ul, #myUL {
      list-style-type: none;
  }

  .text-custom{
      cursor: pointer;
      font-size: 140%;
  }

  .text-custom::before{
      cursor: pointer;
      font-size: 140%;
  }

  .text-custom2{
      font-size: 130%;
  }

  #myUL {
      margin: 0;
      padding: 0;
  }

  .bgHover {
      padding: 7px;
      transition-duration: 300ms;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
    }

  .bgHover:hover {
      background-color: #292929;
  }

  .caret::before {
      color: black;
      display: inline-block;
      margin-right: 6px;
  }

  .caret-down::before {
      transform: rotate(90deg);  
  }

  .nested {
      display: none;
  }

  .active {
      display: block;
  }
</style>