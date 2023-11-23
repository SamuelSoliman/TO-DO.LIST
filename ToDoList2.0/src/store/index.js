import { createStore } from 'vuex';

// Initial state
const state = {
  userNames: [], // Array of registered usernames.
  tasks: {},
  archivedTasks: {},
  completedTasks: {}, // Object with key as username and value as array of tasks.
  currentUser: null // This is to keep track of the currently logged in user.
};

// Mutations
const mutations = {
  ADD_USER(state, username) { // Add a new user to the store while checking for duplicates.
    if (!state.userNames.includes(username)) {
      state.userNames.push(username);
      state.tasks[username] = []; // Initialize empty tasks array for the user.
      state.currentUser = username; // Set current user
    }
  },
  ADD_TASK(state, { username, task }) {
    state.tasks[username].push({
      id: Date.now(), // Using timestamp as a quick way to get unique IDs.
      text: task,
      completed: false,
      archived: false
    });
  },
  RENAME_TASK(state, { username, taskId, newText }) { //renaming the task
    const task = state.tasks[username].find(t => t.id === taskId);
    if (task) task.text = newText;
  },
  TOGGLE_TASK_COMPLETED(state, { username, taskId }) { //completion task
    const task = state.tasks[username].find(t => t.id === taskId);
      if (task) {
      task.completed = !task.completed;
      
      if (!state.completedTasks[username]) {
        state.completedTasks[username] = [];
      }
      
      const indexInCompleted = state.completedTasks[username].findIndex(t => t.id === taskId);
  
      if (task.completed && indexInCompleted === -1) {
        state.completedTasks[username].push(task);
      } else if (!task.completed && indexInCompleted !== -1) {
        state.completedTasks[username].splice(indexInCompleted, 1);
      }
    
  }
  },
  ARCHIVE_TASK(state, { username, taskId }) { //archive the task
    const task = state.tasks[username].find(t => t.id === taskId);
    if (task) {
    task.archived = !task.archived;
    
      if (!state.archivedTasks[username]) {
        state.archivedTasks[username] = [];
      }
      const alreadyinArchived = state.archivedTasks[username].findIndex(t => t.id === taskId);
      if (task.archived && alreadyinArchived === -1) {
        state.archivedTasks[username].push(task);
      } else if (!task.archived && alreadyinArchived !== -1) {
        state.archivedTasks[username].splice(alreadyinArchived, 1);
      }
    
  }

  },
  DELETE_TASK(state, { username, taskId }) { //delete the task
    const taskIndex = state.tasks[username].findIndex(t => t.id === taskId);
    if (taskIndex !== -1) state.tasks[username].splice(taskIndex, 1);
    const completedTaskIndex = state.completedTasks[username].findIndex(t => t.id === taskId);
    if (completedTaskIndex !== -1) state.completedTasks[username].splice(completedTaskIndex, 1);
    const archivedTaskIndex = state.archivedTasks[username].findIndex(t => t.id === taskId);
    if (archivedTaskIndex !== -1) state.archivedTasks[username].splice(archivedTaskIndex, 1);
  }
};

// Getters
const getters = {
  getTasksForUser: (state) => (username) => {
    return state.tasks[username] || [];
  },
  getCurrentUser: (state) => {
    return state.currentUser;
  }
};

export default createStore({
  state,
  mutations,
  getters
});