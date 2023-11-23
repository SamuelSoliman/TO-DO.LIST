<template>
    <div class="user-summary-container">
  
      <!-- Usernames dropdown list -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :items="userNames"
            label="Select user"
            v-model="selectedUser"
            outlined
          ></v-select>
        </v-col>
      </v-row>
  
      <!-- Display Archived Tasks -->
      <v-card v-if="archivedTasksForUser.length" class="my-4">
        <v-card-title class="headline">Archived Tasks:</v-card-title>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="task in archivedTasksForUser" :key="task.id">
              <v-list-item-content>
                <v-list-item-title>{{ task.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
  
      <!-- Display Completed Tasks -->
      <v-card v-if="completedTasksForUser.length" class="my-4">
        <v-card-title class="headline">Completed Tasks:</v-card-title>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="task in completedTasksForUser" :key="task.id">
              <v-list-item-content>
                <v-list-item-title>{{ task.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
  
    </div>
  </template>
  
  <style scoped>
  .user-summary-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        selectedUser: null
      };
    },
    computed: {
      //mapping getter from the store
      ...mapGetters(['getCurrentUser']),
      userNames() {
        return this.$store.state.userNames;
      },
      archivedTasksForUser() {
        return this.$store.state.archivedTasks[this.selectedUser] || [];
      },
      completedTasksForUser() {
        return this.$store.state.completedTasks[this.selectedUser] || [];
      }
    }
  }
  </script>
  