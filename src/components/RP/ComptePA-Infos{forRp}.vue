<template>
    <div>
      <div class="row no-gutters">
        <div class="col-2">
          <Nav/>
        </div>
        <div class="col-10">
          <listPA/>
        </div>
      </div>
    </div>
  </template>
  
    
    <script scoped>
    import Nav from './NavRp.vue';
    import listPA from '@/components/list/listPA.vue';
    export default {
      components: {
          Nav,
          listPA
      },
    }
    
    </script>
    
    <style scoped>
  
    
    </style>
    