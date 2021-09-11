<template>
    <v-dialog
    
      v-model="choiceDialog"
      max-width="550px"
      height="400px"
      
    >
    <v-sheet class="mx-auto rounded-xl dense light" width="500px" height="300px">
            <template>
                <v-container fluid style="height:100%">
                    
                    <v-row class="ma-0" style="height:100%" >
                        <v-col class="ma-0 pt-50" cols="5">
                                <template>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#ECBA16;" d="M397.241,176.552H276.303L388.414,0H247.172L114.759,264.828h104.166L114.759,512L397.241,176.552z"
	/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                                </template>
                        </v-col>
                       <v-col cols="2"><div class="divid grey lighten-2"></div></v-col>
                       
                        <v-col cols="5">cote2</v-col>
                    </v-row>
                </v-container>
            </template>
    </v-sheet>
    </v-dialog>
</template>
<script>
export default {
    props:['choiceDialog']
}
</script>
<style scoped>
.divid{
    height: 100%;
    width:1px;
    border: 1px solid;
}
</style>