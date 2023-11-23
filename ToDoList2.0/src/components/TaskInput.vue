<template>
    <div>
      <v-text-field color="secondary" v-model="taskText" placeholder="Add new task"></v-text-field>
      <v-btn color="primary" @click="addTask">Add Task</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskText: ''
      };
    },
    methods: {
      //add tasks and send to parent component TasksPage
      addTask() {
        if (this.taskText.trim() !== '') {
          this.$emit('taskAdded', this.taskText.trim());
          this.taskText = '';
        }
      }
    }
  }
  </script>
  