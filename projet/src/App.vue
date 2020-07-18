<template>
  <div id="app">
    <input id="file_json" @change="changer" type="file"/><br/>
    <button @click="valider">Valider</button>
    <tbody v-if="vrai">
    <span v-for="(item,a) in donnnes" v-bind:key="a">
      <td v-for="(ranges,u) in item.ranges" v-bind:key="u">
    <tr v-for="(ligne,b) in ranges.lignes" v-bind:key="b">
           {{ ligne.lettre }} <td v-for="n in ligne.nbr_places" v-bind:key="n"> <input type="checkbox" v-model="checked">
<label>{{ settings.runs[n] }}</label> </td>
    </tr>
        </td>
      </span>
    </tbody>
  </div>
</template>

<script>
var etudiant;


export default {
  data: function() {
    return {
      donnnes: [JSON],
      vrai: false,
      settings: {
        runs: [0,1, 2, 3,4,5,6,7,8]
      }

    };
  },

  methods: {
    valider() {
      for(let i=0;i<etudiant.length;++i)
      {
        this.donnnes.push(etudiant[i]);
      }

      this.vrai = true;
      //this.amphi.generatePlaces()
    },

    changer() {
      // eslint-disable-next-line no-unused-vars
      const input = document.querySelector('input[type="file"]');
      const reader = new FileReader();
      reader.onload = function() {
        etudiant = JSON.parse(reader.result);

        console.log(this.donnnes);
      };
      reader.readAsText(input.files[0]);
    }
  }
};
</script>
