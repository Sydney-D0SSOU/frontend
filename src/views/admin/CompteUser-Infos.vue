<template>
  <div>
    <div class="row no-gutters">
      <div class="col-2">
        <Nav/>
      </div>
      <div class="col-10">
        <listCivil/>
      </div>
    </div>
  </div>
</template>

  
  <script scoped>
  import Nav from './NavAdmin.vue';
  import listCivil from '@/components/list/listCivil.vue';
  export default {
    components: {
        Nav,
        listCivil
    },
  }
  
  </script>
  
  <style scoped>

  
  </style>
  