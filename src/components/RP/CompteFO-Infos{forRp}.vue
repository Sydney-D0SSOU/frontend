<template>
  <div class="page-container">
      <div class="col-2 nav-column">
        <Nav />
      </div>
      <div class="col-10 content-column">
        <listFO />
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

