<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>

            <div class="modale card">
                <div class="btn-modale btn btn-danger" @click="toggleModale">X</div>
                <h2> Reservation de la  {{chambre}} du {{arrive}} au {{depart}}</h2>
            </div>
        </div>
    
</template>
<script>
export default {
    name:'Modale',
    data() {
        return {
            
        }
    },
    props:['chambre','arrive','depart','revele','toggleModale']
}
</script>
<style scoped>
.bloc-modale {
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 8;
}
.overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
     top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
}
.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    

}
.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>