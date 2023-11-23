<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="task-item"  >
      
      <!-- Task text and editing option -->
      <div class="task-text-section" >
        <input 
          v-if="taskBeingEdited === task.id" 
          v-model="editedTaskText" 
          @keyup.enter="confirmRename(task.id)"
          class="edit-task-input"
        >
        <span v-else>{{ task.text }}</span>
      </div>

      <!-- Tasks options buttons -->
      <div class="task-actions">
        <v-btn color="primary"
          v-if="taskBeingEdited !== task.id" 
          @click="editTask(task.id, task.text)"
        >
          Rename
        </v-btn>

        <v-btn color="primary"
          v-if="taskBeingEdited === task.id" 
          @click="cancelEdit"
        >
          Cancel
        </v-btn>

        <v-btn color="primary" @click="deleteTask(task.id)">Delete</v-btn>
        <v-btn color="primary"
          @click="toggleTaskCompletion(task.id)" 
          v-if="!task.completed"
        >
          Complete
        </v-btn>
        <v-btn color="primary"
          @click="archiveTask(task.id)" 
          v-if="task.completed && !task.archived"
        >
          Archive
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px; 
  }

  .task-text-section {
    flex: 1;
  }
/* adds space between the buttons */
  .task-actions button {
    margin-left: 5px; 
  }

  .edit-task-input {
    width: 100%;
  }
</style>

  
  <script>
  export default {
    props:  ['tasks'] ,
    data() {
    return {
      taskBeingEdited: null,
      editedTaskText: ''
    }  },
    methods: {
      //Rename optin
        editTask(taskId, taskText) {
      this.taskBeingEdited = taskId;
      this.editedTaskText = taskText;
    },
    confirmRename(taskId) {
      if (this.editedTaskText.trim()) {
        this.$store.commit('RENAME_TASK', { 
          username: this.$store.state.currentUser,
          taskId: taskId,
          newText: this.editedTaskText 
        });
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.taskBeingEdited = null;
      this.editedTaskText = '';
    }
        ,// sending data to parent component TasksPage
      toggleTaskCompletion(taskId) {
        this.$emit('toggleCompletion', taskId);
      },
      archiveTask(taskId) {
        this.$emit('archive', taskId);
      },
      
      deleteTask(taskId) {
        this.$emit('delete', taskId);
      }
    }
  }
  </script>
  