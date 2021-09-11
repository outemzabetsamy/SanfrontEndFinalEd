<template>
    
    <v-app >
        <v-overlay dark color="blue lighten-5" opacity="1">
        <v-container fluid> 
            
            <v-layout>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-tab v-for="(i,id) in tabs" :key="id">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginUsername"  label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                         <!--- hotel name and logo-->
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="getRegistration.nomHotel" :rules="[rules.required]" label="Hotel Name" maxlength="20" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input
                                            :rules="rules"
                                            accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Pick your logo here"
                                            prepend-icon="mdi-camera"
                                            label="Hotel logo"
                                            v-model="logo"
                                            @change="getTheLogo"

                                             ></v-file-input>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="getRegistration.nomGerant" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="getRegistration.prenomGerant" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>

                                   
                                        
                                        <v-col cols="12">
                                            <v-text-field v-model="getRegistration.userName"  label="User Name" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="getRegistration.email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="getRegistration.pw" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="getRegistration.adresseHotel"  label="Adress" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="getRegistration.nbEtoiles"  label=" Stars number" required></v-text-field>
                                        </v-col>
                                        
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="register">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
        
        </v-layout> 
        </v-container>
</v-overlay>
    </v-app>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';
//import {bus} from '../main'
export default {
    name:'Login',
    computed: {
    ...mapGetters(['getRegistration','getLogoInfo']),
    passwordMatch() {
      return () => this.getRegistration.pw === this.verify || "Password must match";
    },
    getLogoName(){
        return()=> this.getRegistration.logo=this.logo.name;
    }
  },
  created() {
      
  },
  methods: {
      ...mapActions(['login','addHotelRegistration','setLogoName']),
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        let user={username:this.loginUsername,password:this.loginPassword}
        console.log(user)
        this.login(user).then(res=>{
            console.log(res);
            this.$router.push({name:'Dashboard'})
           
        })
      }
    },
    getTheLogo(){
        console.log(this.logo.name)
        this.setLogoName(this.logo.name);
        this.dataUploading=new FormData();
        this.dataUploading.append('imageFile',this.logo,this.logo.name);
        console.log(this.dataUploading)
    },
    register(){
        console.log(this.getRegistration)
        console.log(JSON.parse(JSON.stringify(this.getRegistration)))
        let ar={registration:JSON.parse(JSON.stringify(this.getRegistration)),img:this.dataUploading}
        console.log(ar)
         console.log(ar.registration)
        this.addHotelRegistration(ar);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,
    dataUploading:"",
    logo: "",
    lastName: "",
    password:"",
    email: "",
    verify: "",
    loginPassword: "",
    loginUsername: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 4) || "Min 4 characters"
    }
  })   
}
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>