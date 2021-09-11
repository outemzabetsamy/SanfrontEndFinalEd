<template>
  <v-dialog v-model="dialog" persistent max-width="330">
    <v-card>
      <v-card-title class="text-wrap">{{ dialogTitle }}</v-card-title>
      <v-card-text>{{ dialogText }}</v-card-text>
      <v-card-actions>
        <v-btn
          class="green--text darken-1"
          text="text"
          @click.native="$emit('onConfirm')"
          >Confirm</v-btn
        >
        <v-btn
          class="orange--text darken-1"
          text="text"
          @click.native="$emit('onCancel')"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    props:['dialog','dialogText','dialogTitle'],
    data() {
        return {
            
        }
    },
}
</script>