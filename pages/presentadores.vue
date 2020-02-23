<template>
  <div>
    <h1 class="text-center text-red text-4xl mb-4 -mt-4">Presentadores</h1>
    <div class="px-2">
      <div class="flex flex-wrap -mx-2" v-if="hosts != undefined && hosts.length != 0" role="list">
        <HostCard :host="host" :key="host.id" v-for="host in hosts" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HostCard from "~/components/HostCard";

export default {
  head() {
    return {
      title: "Comedia Perpetua - Phi Beta Lambda | Presentadores",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Descripción y rol de los presentadores en el programa"
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