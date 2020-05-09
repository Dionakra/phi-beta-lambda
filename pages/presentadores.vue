<template>
  <div class="flex flex-wrap" v-if="hosts != undefined && hosts.length != 0" role="list">
    <HostCard :host="host" :key="host.id" v-for="host in hosts" />
  </div>
</template>

<script>
import axios from "axios";
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
  asyncData() {
    return axios.get(`/api/hosts.json`).then(res => {
      return { hosts: res.data };
    });
  },
  data() {
    return {
      hosts: []
    };
  }
};
</script>