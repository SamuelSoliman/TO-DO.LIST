<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Navigation Links -->
    <v-navigation-drawer app fixed clipped>
      <v-list>
        <v-list-item-group>
          <v-list-item router to="/">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router to="/tasks">
            <v-list-item-icon>
              <v-icon>mdi-format-list-checks</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Tasks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router to="/summary">
            <v-list-item-icon>
              <v-icon>mdi-chart-timeline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Summary</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
