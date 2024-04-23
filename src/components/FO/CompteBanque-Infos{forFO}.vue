<template>
    <div>
      <div class="row no-gutters">
        <div class="col-2">
          <Nav/>
        </div>
        <div class="col-10">
          <listBank/>
        </div>
      </div>
    </div>
  </template>
  
    
    <script scoped>
    import Nav from './NavFO.vue';
    import listBank from '@/components/list/listBank.vue';
    export default {
      components: {
          Nav,
          listBank
      },
    }
    
    </script>
    
    <style scoped>
  
    
    </style>
    