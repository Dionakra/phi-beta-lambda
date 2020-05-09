<template>
  <div class="flex flex-wrap -mx-2" v-if="guests != undefined && guests.length != 0" role="list">
    <GuestCard :guest="guest" :key="guest.id + guest.episode" v-for="guest in guests" />
  </div>
</template>


<script>
import GuestCard from "~/components/GuestCard";

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | Invitad@s al programa",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Lista de invitad@s al programa, ordenados por orden descendente de aparición"
        }
      ]
    };
  },
  components: {
    GuestCard
  },
  created() {
    fetch("/api/guests.json")
      .then(response => response.json())
      .then(guests => (this.guests = guests));
  },
  data() {
    return {
      guests: []
    };
  }
};
</script>