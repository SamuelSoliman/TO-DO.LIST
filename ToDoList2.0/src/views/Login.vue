<template>
   
    <v-container fluid fill-height class="login-container">
        <v-row align="center" justify="center">
            <v-col cols="125" md="4">
                <div align="center" class="text-h4 mb-4" outlined>Login</div>
                <v-text-field 
                    v-model="username" 
                    label="Username" 
                    placeholder="Enter your name" 
                    outlined 
                    color="primary" 
                    class="mb-3"></v-text-field>
                <v-btn color="primary" block @click="submitUsername">Login</v-btn>
            </v-col>
        </v-row>
    </v-container>

  </template>
<script>
  import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: ''
    };
  },
  computed: {
    //mapping data from the store
      ...mapState(['currentUser', 'tasks'])
    },
  methods: {
    //mapping adduser mutation from the store
    ...mapMutations(['ADD_USER']), 

    submitUsername() {
      if (this.username.trim() !== '') {
        this.ADD_USER(this.username); // send the username to the Vuex store
        this.$router.push('/tasks'); // redirect to the tasks page
      }
    }
  }
};
</script>
<style scoped>
.text-field-enhanced .v-input__control {
    min-height: 50px; 
}
</style>


  