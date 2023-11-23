<template>
  <div class="task-page-container" >
    <!-- Welcome Header -->
    <v-card class="mb-4">
      <v-card-title class="justify-center text-center">
        <h2 >Welcome, {{ currentUser }}! </h2>
      </v-card-title>
    </v-card>
    
    <!-- Task Input  -->
    <TaskInput @taskAdded="addTask" />

    <!--  Line -->
    <v-divider class="my-4"></v-divider>

    <!-- Task List  -->
    <TaskList 
      :tasks="currentUserTasks"
      @toggleCompletion="toggleTaskCompletion"
      @archive="archiveTask"
      @rename="rename"
      @delete="deleteTask"
    />

  
    <v-divider class="my-4"></v-divider>

    <!-- Completed Tasks Section -->
    <v-list two-line subheader>
      <v-subheader class="text-h6 mb-2">Completed Tasks</v-subheader>
      <v-list-item-group v-for="task in currentUserCompletedTasks" :key="task.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ currentUser }} completed: {{ task.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Divider Line -->
    <v-divider class="my-4"></v-divider>

    <!-- Archived Tasks Section -->
    <v-list two-line subheader>
      <v-subheader class="text-h6 mb-2">Archived Tasks</v-subheader>
      <v-list-item-group v-for="task in currentUserArchivedTasks" :key="task.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ currentUser }} archived: {{ task.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<style scoped>
.task-page-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>




  
  <script>
  import { mapState, mapMutations,mapGetters } from 'vuex';
  import TaskInput from '@/components/TaskInput.vue';
  import TaskList from '@/components/TaskList.vue';
  
  export default {
    // child components
    components: {
      TaskInput,
      TaskList
    },
    computed: {
      //mapping data and getters from the store
      ...mapState(['currentUser', 'tasks', 'archivedTasks','completedTasks','userNames']),
      ...mapGetters(['getTasksForUser']),
      currentUserTasks() { return this.getTasksForUser(this.currentUser);},
    currentUserCompletedTasks() { return this.completedTasks[this.currentUser] || []; },
    currentUserArchivedTasks() { return this.archivedTasks[this.currentUser] || []; }
    },
    methods: {
      //mapping mutations from the store
      ...mapMutations(['ADD_TASK', 'TOGGLE_TASK_COMPLETED', 'ARCHIVE_TASK', 'DELETE_TASK', 'RENAME_TASK']),
      addTask(taskText) {
        this.ADD_TASK({ username: this.currentUser, task: taskText });
      },
      rename(taskId, newText) {
        this.RENAME_TASK({ username: this.currentUser, taskId, newText });
      },
      toggleTaskCompletion(taskId) {
        this.TOGGLE_TASK_COMPLETED({ username: this.currentUser, taskId });
      },
      archiveTask(taskId) {
        this.ARCHIVE_TASK({ username: this.currentUser, taskId });
      },
      deleteTask(taskId) {
        this.DELETE_TASK({ username: this.currentUser, taskId });
      }
    }
  }
  </script>
  