<template>
    <div>
      <div class="row no-gutters">
        <div class="col-2">
          <Nav/>
        </div>
        <div class="col-10">
          <listRP/>
        </div>
      </div>
    </div>
  </template>
  
    
    <script scoped>
    import Nav from './NavAdmin.vue';
    import listRP from '@/components/list/listRP.vue';
    export default {
      components: {
          Nav,
          listRP
      },
    }
    
    </script>
    
    <style scoped>
  
    
    </style>
    