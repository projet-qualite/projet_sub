<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
     <p>Le nom:    <input id="nom" v-model="nom"/> Le nom est : {{ nom }} </p>
     <p>Le nombre de places:    <input v-model="places_amph" /> le nombre de places est: {{ places_amph }}  </p>
     <p>Le nombre de rangs:    <input v-model="rangs" /> le nombre de rangs: {{ rangs }} </p>
     <button name="ajouter" @click="AjouterRang">Ajouter rang:</button>
     <span v-html="HTMLcontent">
         
     </span>
    </div>
   </div>
</template>
<script>
export class Rangee{}
/*import {Rangee} from 'Range.js';*/
export default {
  name: "Amphi", 
   props: {
    msg: String,
    places_amph: String,
    rangs: String,
    nom: String,
    HTMLcontent: null,
    HTMLcontent1: null,
    lignes:String,
    ra: Rangee,
    rangees: Array,
    i:Number,
    lettre: String,
    plcs:String
  },
  data: function() {
    return {

    };
  },
  methods:{
      AjouterRang()
      {
        this.HTMLcontent='';
          this.HTMLcontent +='<p>Rang numero: '+this.i+' Le nombre de lignes:   <input v-model="lignes" />';
          this.HTMLcontent+='<button name="ajouter_l" v-on:click="@click="Ajouterlignes"">Ajouter ligne:</button> </p>';
      },
      Ajouterlignes()
      {
        this.HTMLcontent1='';
        for(let j=0;j<this.lignes;j++)
        {
          this.HTMLcontent1 +='<p>Ligne numero: '+j+' Lettre de la ligne:   <input v-model="lettre" /> Le nombre de places:   <input v-model="plcs" /></p>';
        }
      },
      valider()
      {
        this.i=1;
        this.ra = new Rangee(1,12);
        this.rangees.push(this.ra);
        this.i++;
        return this.rangees;
      }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
