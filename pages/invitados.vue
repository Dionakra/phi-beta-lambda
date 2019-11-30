<template>
  <div>
    <p class="text-center text-5xl mb-4 -mt-4">Invitados</p>
    <div class="px-2">
      <div class="flex flex-wrap -mx-2" v-if="guests != undefined && guests.length != 0">
        <GuestCard :guest="guest" :key="guest.id" v-for="guest in guests" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import GuestCard from "~/components/GuestCard";

export default {
  components: {
    GuestCard
  },
  asyncData() {
    return axios.get("/api/guests.json").then(x => {
      return { guests: x.data };
    });
  },
  data() {
    return {
      guests: []
    };
  }
};
</script>