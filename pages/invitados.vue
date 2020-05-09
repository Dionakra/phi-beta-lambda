<template>
  <div>
    <div class="px-2">
      <div class="flex flex-wrap -mx-2" v-if="guests != undefined && guests.length != 0" role="list">
        <GuestCard :guest="guest" :key="guest.id + guest.episode" v-for="guest in guests" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import GuestCard from "~/components/GuestCard";

export default {
  head() {
    return {
      title: 'Phi Beta Lambda - Comedia Perpetua | Invitad@s al programa',
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Lista de invitad@s al programa, ordenados por orden descendente de aparición"
        }
      ]
    }
  },
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