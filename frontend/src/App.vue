<template>
  <v-app>
    <v-content>
      <DeadlyNote/>
    </v-content>
  </v-app>
</template>

<script>
import DeadlyNote from './components/DeadlyNote';

export default {
  name: 'App',
  components: {
    DeadlyNote
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Deadly Note'
    }
  }
};
</script>
