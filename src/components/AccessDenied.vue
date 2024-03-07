<template>
<div>
    <div id="">
        <Nav/>
        <center>

        <div id="box" class="mt-5">
            <h1 id="txt1" style="font-size: 30px; font-weight: bold">Votre session a expirée 😞</h1>
            <h4 id="txt2">Reconnectez vous</h4>
        </div>
    </center>

    </div>
    </div>
</template>

<script>
import Nav from '@components/BarreNav.vue';
export default {
    components: {
        Nav
    },
    methods: {
    }
}
</script>

<style scoped>
#page {
  /* background-color: #223b3e; */
    background-color: #808080ec;
  left: 0px;
  position: fixed;
  height: 950px;
  width: 1980px;
}

#nav {
  position: absolute;
}

#box {
    position: relative;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    height: 250px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 60px 60px rgba(0, 0, 0, 0.2);
    background-color: #000000;
}

#txt1 {
    position: absolute;
    color: white;
    top: 60px;
    left: 40px;
}

#txt2 {
    position: absolute;
    color: white;
    top: 130px;
    left: 125px;
}

</style>
