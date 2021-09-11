<template>
    <div class="monthAndYear overline text-center blue lighten-5 pt-1 pb-1">
        <v-btn v-on:click="prev" height="24"><v-icon light>mdi-chevron-left</v-icon></v-btn>
        {{months[cmonth]}} {{cyear}}
        <v-btn v-on:click="next" height="24" ><v-icon light>mdi-chevron-right</v-icon></v-btn>
    </div>
</template>
<script>
import {bus} from '../../main'
export default {
    data() {
        return {
         months: ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        }
    },props:['cmonth','cyear'],
    methods:{
        next:function(){
                bus.$emit('nextFired');
                bus.$emit('changeEvent')
                },
            prev:function(){
                bus.$emit('prevFired')
                bus.$emit('changeEvent')
                },
    }
}
</script>
<style scoped>

</style>