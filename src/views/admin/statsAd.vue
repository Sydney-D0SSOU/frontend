<template>
    <div>
      <div class="row no-gutters">
        <div class="col-2">
          <Nav/>
        </div>
        <div class="col-10">
          <charts/>
        </div>
      </div>
    </div>
  </template>
  
    
    <script scoped>
    import Nav from './NavAdmin.vue';
    import charts from '@/components/stats/charts.vue';
    export default {
      components: {
          Nav,
          charts
      },
    }
    
    </script>
    
    <style scoped>
  
    
    </style>  
    