<template>
  <div class="container">
    <div class="chart">
      <h2>Statistiques Utilisateurs</h2>
      <apexchart type="bar" :options="barChartOptions" :series="barChartSeries"></apexchart>
    </div>
    <div class="chart">
      <h2>Graphique linéaire</h2>
      <apexchart type="line" :options="lineChartOptions" :series="lineChartSeries"></apexchart>
    </div>
    <div class="chart">
      <h2>Graphique en aire</h2>
      <apexchart type="area" :options="areaChartOptions" :series="areaChartSeries"></apexchart>
    </div>
    <div class="chart">
      <h2>Graphique en secteurs</h2>
      <apexchart type="pie" :options="pieChartOptions" :series="pieChartSeries"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      barChartOptions: {
        chart: {
          type: 'bar',
        },
        xaxis: {
          categories: ['Front_O', 'Personne_A', 'Civils'],
        },
      },
      barChartSeries: [],
      lineChartOptions: {
        chart: {
          type: 'line',
        },
        xaxis: {
          categories: ['Category 1', 'Category 2', 'Category 3'],
        },
      },
      lineChartSeries: [],
      areaChartOptions: {
        chart: {
          type: 'area',
        },
        xaxis: {
          categories: ['Category 1', 'Category 2', 'Category 3'],
        },
      },
      areaChartSeries: [],
      pieChartOptions: {
        chart: {
          type: 'pie',
        },
      },
      pieChartSeries: [],
    };
  },
  
  created() {
    this.fetchChartData(); // Appel de la méthode fetchChartData lors de la création du composant
  },

  methods: {
    async fetchChartData() {
      try {
     //   const adminResponse = await axios.get('http://localhost:8000/api/admin-pays');

        const frontOResponse = await axios.get('http://localhost:8000/api/front-offices');
        const personneAResponse = await axios.get('http://localhost:8000/api/legal-persons');
        const civilsResponse = await axios.get('http://localhost:8000/api/users/civil');

        console.log("Front_O data length:", frontOResponse.data.length);
        console.log("Personne_A data length:", personneAResponse.data.length);
        console.log("Civils data length:", civilsResponse.data.length);
       // console.log("adminPays data length:", adminResponse.data.admin_pays.length);

        // Bar Chart Data
        this.barChartSeries = [{
          name: 'Nombre d\'éléments',
          data: [frontOResponse.data.length, personneAResponse.data.length, civilsResponse.data.length],
        }];

        // Line Chart Data
        this.lineChartSeries = [{
          name: 'Series 1',
          data: [50, 30, 20], // Exemple de données
        }];

        // Area Chart Data
        this.areaChartSeries = [{
          name: 'Series 1',
          data: [30, 40, 35], // Exemple de données
        }];

        // Pie Chart Data
        this.pieChartSeries = [frontOResponse.data.length, personneAResponse.data.length, civilsResponse.data.length]; // Exemple de données

      } catch (error) {
        console.error("Erreur lors de la récupération des données des graphiques :", error);
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.chart {
  width: 45%;
  margin-bottom: 20px;
}
</style>
