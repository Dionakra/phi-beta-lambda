<template>
  <div class="mx-auto">
    <!-- INPUT -->
    <div class="w-full md:w-1/2 lg:w-4/6 mx-auto">
      <input
        class="transition focus:outline-0 border border-transparent focus:bg-white focus:border-red placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
        type="text"
        placeholder="Busca un/a cómico/a"
        autocomplete="off"
        spellcheck="false"
        aria-label="search input"
        v-model="searchTerm"
        @keyup="updateList()"
      />
    </div>
    <!-- END INPUT -->

    <!-- FILTERS -->
    <div class="md:w-full lg:w-4/6 mx-auto flex flex-inline flex-wrap justify-between text-sm pl-2">
      <div class="my-2">
        <p class="text-red text-xs">Mostrar...</p>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="comedianOfTheDay ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="comedianOfTheDay = !comedianOfTheDay; updateList()"
        >Cómic@ del día</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="thankYou ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="thankYou = !thankYou; updateList()"
        >Thank you...</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="giraFestivales ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="giraFestivales = !giraFestivales; updateList()"
        >Gira de festivales</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="mostRecent ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="mostRecent = !mostRecent; mostMentions = !(!mostRecent || mostMentions); updateList()"
        >Más recientes</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="mostMentions ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="mostMentions = !mostMentions; mostRecent = !(!mostMentions || mostRecent); updateList()"
        >Más menciones</button>
      </div>

      <div class="my-2">
        <p class="text-red text-xs">Órden alfabético</p>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="ascending === true ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="ascending = true; updateList()"
        >Ascendente</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="ascending === false ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="ascending = false; updateList()"
        >Descendente</button>
      </div>
    </div>
    <!-- END FILTERS -->

    <!-- DROPDOWNS -->
    <div
      class="md:w-full lg:w-4/6 mx-auto flex flex-inline flex-wrap justify-between text-sm mb-3 px-2"
    >
      <!-- STYLE -->
      <div>
        <p class="text-red text-xs">Estilo</p>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-6 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="selectedGenre"
            @change="addGenre(selectedGenre)"
          >
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <!-- END STYLE -->

      <!-- SUBJECT -->
      <div>
        <p class="text-red text-xs">Temática</p>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-6 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="selectedSubject"
            @change="addSubject(selectedSubject)"
          >
            <option
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
            >{{subject.name}}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <!-- END SUBJECT -->
    </div>
    <!-- END DROPDOWNS -->

    <!-- SELECTED FILTERS -->
    <div
      class="md:w-full lg:w-4/6 mx-auto flex flex-wrap justify-between text-sm mt-1 mb-4 pl-2"
      v-if="selectedSubjects.length + selectedGenres.length > 0"
    >
      <!-- GENRES -->
      <div class="w-1/2 flex flex-wrap">
        <div class="flex flex-wrap">
          <div
            class="relative mb-2"
            :key="genre.id"
            v-for="genre in selectedGenres"
            @click="removeGenre(genre.id)"
          >
            <span
              class="bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1 pr-8"
            >{{genre.name}}</span>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current text-gray-700 h-3 w-3 -ml-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
              >
                <path f d="M28 22l-8-8 8-8-6-6-8 8-8-8-6 6 8 8-8 8 6 6 8-8 8 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- END SELECTED GENRES -->

      <!-- SUBJECTS -->
      <div class="w-1/2 border-l">
        <div class="flex flex-wrap">
          <div
            class="relative mb-2"
            :key="subject.id"
            v-for="subject in selectedSubjects"
            @click="removeSubject(subject.id)"
          >
            <span
              class="bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1 pr-8"
            >{{subject.name}}</span>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current text-gray-700 h-3 w-3 -ml-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
              >
                <path f d="M28 22l-8-8 8-8-6-6-8 8-8-8-6 6 8 8-8 8 6 6 8-8 8 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- END SELECTED SUBJECTS -->
    </div>
    <!-- END SELECTED FILTERS -->

    <div
      class="mx-auto"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <div class="flex flex-inline flex-wrap mx-auto justify-center" role="list">
        <ComedianCard :comedian="comedian" :key="comedian.id" v-for="comedian in showing" />
      </div>
    </div>
  </div>
</template>

<script>
import ComedianCard from "~/components/ComedianCard";
const PAGE = 30;

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | Cómic@s",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Lista de cómic@s mencionados en el programa, indicando su número de menciones en total"
        }
      ]
    };
  },
  components: {
    ComedianCard
  },
  data() {
    return {
      comedians: [],
      searchTerm: "",
      searching: true,
      curPage: 1,
      showing: [],
      ascending: undefined,
      thankYou: false,
      comedianOfTheDay: false,
      mostRecent: true,
      mostMentions: false,
      giraFestivales: false,
      genres: [],
      selectedGenres: [],
      subjects: [],
      selectedSubjects: [],
      selectedGenre: "",
      selectedSubject: ""
    };
  },
  mounted() {
    fetch("/api/comedians.json")
      .then(response => response.json())
      .then(comedians => {
        this.comedians = comedians;
        this.showing = this.showComedians().slice(0, PAGE * this.curPage);
      });

    fetch("/api/genres.json")
      .then(response => response.json())
      .then(genres => {
        this.genres = genres;
      });

    fetch("/api/subjects.json")
      .then(response => response.json())
      .then(subjects => {
        this.subjects = subjects;
      });
  },
  methods: {
    showComedians() {
      this.searching = true;

      const res = this.comedians
        .filter(x => {
          let valid = true;
          if (this.thankYou) {
            valid = valid && x.tags.includes("#ThankYouForThisBeautifulComedy");
          }
          if (this.comedianOfTheDay) {
            valid = valid && x.tags.includes("#Cómic@DelDía");
          }
          if (this.giraFestivales) {
            valid = valid && x.tags.includes("#GiraDeFestivales");
          }
          if (this.searchTerm.trim().length != 0) {
            valid =
              valid &&
              x.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          }

          if (valid) {
            const genresNotInComedian = this.selectedGenres
              .map(g => g.id)
              .filter(g => !x.genres.includes(g));

            if (genresNotInComedian.length > 0) {
              valid = false;
            }
          }

          if (valid) {
            const subjectsNotInComedian = this.selectedSubjects
              .map(g => g.id)
              .filter(g => !x.subjects.includes(g));
            if (subjectsNotInComedian.length > 0) {
              valid = false;
            }
          }

          return valid;
        })
        .sort((a, b) => {
          let order = 0;

          if (this.mostRecent) {
            order = 1;
          } else if (this.mostMentions) {
            order = b.mentions - a.mentions;
          }

          if (order == 0) {
            if (this.ascending == undefined || this.ascending == true) {
              order = a.name.localeCompare(b.name);
            } else {
              order = b.name.localeCompare(a.name);
            }
          }

          return order;
        });
      this.searching = false;

      return res;
    },
    loadMore() {
      if (!this.searching) {
        this.curPage++;
        this.showing = this.showComedians().slice(0, PAGE * this.curPage);
      }
    },
    updateList() {
      this.curPage = 1;
      this.showing = this.showComedians().slice(0, PAGE * this.curPage);
    },
    addGenre(genre) {
      if (!this.selectedGenres.find(g => g.id == genre)) {
        this.selectedGenres.push(this.genres.find(g => g.id == genre));
        this.updateList();
      }
    },
    removeGenre(genre) {
      this.selectedGenres = this.selectedGenres.filter(g => g.id != genre);
      this.updateList();
    },
    addSubject(subject) {
      if (!this.selectedSubjects.find(g => g.id == subject)) {
        this.selectedSubjects.push(this.subjects.find(g => g.id == subject));
        this.updateList();
      }
    },
    removeSubject(subject) {
      this.selectedSubjects = this.selectedSubjects.filter(
        s => s.id != subject
      );
      this.updateList();
    }
  }
};
</script>
