<template>
    <div class=" row justify-start items-stretch content-start q-ma-sm cardStyle" style="margin-left:-10px;">
        <div class="col-auto column wrap justify-center items-center content-stretch q-ml-sm q-pa-sm timeCard">
            <div style="font-size:20px;">{{from}}</div>
            <div style="font-size:20px;">|</div>
            <div style="font-size:20px;">{{to}}</div>
        </div>
        
        <div class="col column wrap justify-stretch items-stretch content-stretch q-pa-sm q-pl-md q-pr-lg infoCard text-dark" :style="'background-color:'+color">
            <div style="font-size:30px;word-wrap:break-word;"><b>{{title}}</b></div>
            <div style="font-size:25px;word-wrap:break-word;">Lecturer: {{lecturer}}</div>
            <div style="font-size:25px;word-wrap:break-word;">Location: {{location}}</div>
        </div>
    </div>   
</template>

<script>
export default {
    props:{
        title:{type:String,default:"NaN"},
        from:{type:String,default:"NaN"},
        to:{type:String,default:"NaN"},
        location:{type:String,default:"NaN"},
        lecturer:{type:String,default:"NaN"},
        color:{type:String,default:"#384045"}
    }
}
</script>

<style>

.timeCard{
    background-color: #384045;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.cardStyle{
    border: transparent solid;
    border-radius: 12px;
    overflow:hidden;
}

.infoCard{
    width:100%;
    max-width: 500px;
}

</style>