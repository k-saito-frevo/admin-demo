<template>
  <v-footer id="dashboard-core-footer" absolute>
    <v-container>
      <v-row align="center" no-gutters>
        <v-spacer class="hidden-sm-and-down" />
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2020- FrevoWorks.Inc All rights reserved
          </div>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
