<template>
    <div>
      <div class="row no-gutters">
        <div class="col-2">
          <Nav/>
        </div>
        <div class="col-10">
          <listFO/>
        </div>
      </div>
    </div>
  </template>
  
    
    <script scoped>
    import Nav from './NavRp.vue';
    import listFO from '@/components/list/listFO.vue';
    export default {
      components: {
          Nav,
          listFO
      },
    }
    
    </script>
    
    <style scoped>
  
    
    </style>
    