<template>
  <div class="flex flex-wrap" v-if="hosts != undefined && hosts.length != 0" role="list">
    <HostCard :host="host" :key="host.id" v-for="host in hosts" />
  </div>
</template>

<script>
import HostCard from "~/components/HostCard";

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | Presentadores",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Descripción y rol de los presentadores en el programa"
        }
      ]
    };
  },
  components: {
    HostCard
  },
  created() {
    fetch(`/api/hosts.json`)
      .then(response => response.json())
      .then(hosts => (this.hosts = hosts));
  },
  data() {
    return {
      hosts: []
    };
  }
};
</script>