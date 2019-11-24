<template>
  <div class="container">
    <div class="columns">
      <!-- Programas -->
      <div class="column">a</div>

      <!-- Secciones -->
      <div class="column">b</div>

      <!-- Info para añadir a las secciones -->
      <div class="column">c</div>

      <!-- Info para añadir a las secciones -->
      <div class="column">d</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData() {
    return {
      cope: []
    }
  },
  data() {
    return {
      cope: []
    };
  }
};
</script>
