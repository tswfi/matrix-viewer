<template>
  <v-app>
    <v-navigation-drawer
      :clipped="primaryDrawer.clipped"
      :mini-variant="primaryDrawer.mini"
      app
      overflow
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in primaryMenu"
          :key="item.to"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>Matrix-Viewer</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4"
        >&copy; {{ new Date().getFullYear() }} (built:
        {{ builtDate | formatDate }} )</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    builtDate: document.documentElement.dataset.buildTimestampUtc,
    primaryDrawer: {
      clipped: true,
      mini: true
    },
    footer: {
      inset: false
    },
    primaryMenu: [
      { to: "/", icon: "chat" },
      { to: "/config", icon: "settings_application" },
      { to: "/about", icon: "help_outline" }
    ]
  }),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
