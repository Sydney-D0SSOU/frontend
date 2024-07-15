<template>
  <div class="page-container">
    <div class="nav-column">
      <Nav />
    </div>
    <div class="content-column">
      <listPA />
    </div>
  </div>
</template>

<script scoped>
import Nav from './NavAdmin.vue';
import listPA from '@/components/list/listPA.vue';

export default {
  components: {
    Nav,
    listPA
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100vh; /* Full viewport height */
}

.nav-column {
  width: 20%; /* Adjust width as needed */
  padding-right: 20px; /* Space between navigation and content */
  background-color: #f8f9fa; /* Optional: Background color for better visibility */
}

.content-column {
  width: 80%; /* Adjust width as needed */
  padding-left: 20px; /* Space between navigation and content */
  overflow-y: auto; /* Ensure content area handles overflow */
  height: 100%; /* Ensure full height */
}
</style>
