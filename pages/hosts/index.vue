<template>
  <div class="container">
    <h1 class="title">{{ $t("menu.hosts") }}</h1>
    <div class="columns" v-if="hosts != undefined && hosts.length != 0">
      <HostCard :host="host" :key="host.id" v-for="host in hosts" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HostCard from "~/components/HostCard";

export default {
  components: {
    HostCard
  },
  asyncData({ params }) {
    return axios.get(`/db/hosts.json`).then(res => {
      return { hosts: res.data };
    });
  },
  data: {
    hosts: []
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
