<template>
  <div>
    <p class="text-center text-5xl mb-4 -mt-4">Presentadores</p>
    <div class="px-2">
      <div class="flex flex-wrap -mx-2" v-if="hosts != undefined && hosts.length != 0">
        <HostCard :host="host" :key="host.id" v-for="host in hosts" />
      </div>
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