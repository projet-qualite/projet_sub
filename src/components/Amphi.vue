<template>
<div>
<h1>{{ msg }}</h1>
<div>
    <p><input id="file_json" accept="application/JSON" @change="onFileChange" type="file"/><br/>
    <button @click="valider">Valider</button> </p>
</div>
<div>
<p>Le nom:    <input v-model="nom_A" /> Le nom est : {{ nom_A }} </p>
<p>Le nombre de places:    <input v-model="places_amph" /> le nombre de places est: {{ places_amph }}  </p>
<p>Le nombre de rangs:    <input v-model="rangs" /> le nombre de rangs: {{ rangs }} </p>
<span v-for="rangs in donnees.ranges" :key="rangs" v-show="vrai">
 Numero du rang:  <input v-bind:value="rangs.id"/><br><br>
 <span v-for="lig in rangs.lignes" :key="lig">
  Lettre de la ligne:  <input v-bind:value="lig.lettre"/> &nbsp; &nbsp;
  Nombres de places: <input v-bind:value="lig.nbr_places"/><br><br>
  </span>
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
    lignes:String,
    ra: Rangee,
  },
   data: function() {
    return {
      vrai: false,
      donnees: Object,
      nom_A: "",
      places_amph: "",
      rangs: "",
    };
  },
  methods: {
    valider() {
      this.nom_A= this.donnees.nom;
      this.places_amph= this.donnees.nombre_places;
      this.rangs = this.donnees.nombre_range;
      this.vrai=true;
      //this.amphi.generatePlaces()
    },
     Enregistrer()
      {
        let ra,i=1;
        let rangees=[];
        this.HTMLcontent='';
          this.HTMLcontent +='<p>Rang numero: '+i+' Le nombre de lignes:   <input v-model="lignes" />';
          this.HTMLcontent+='<button name="ajouter_l" v-on:click="Ajouter_l">Ajouter ligne:</button> </p>';
        ra = new Rangee(1,);
        rangees.push(ra);
        i++;
      },
     onFileChange(e) {
     let files = e.target.files || e.dataTransfer.files;
     if (!files.length) return;
     this.readFile(files[0]);
   },
   readFile(file) {
     let reader = new FileReader();
     reader.onload = e => {
       //console.log(e.target.result);
       this.donnees = JSON.parse(e.target.result);
     };
     reader.readAsText(file);
   }
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
div{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-top: 10px;
}
</style>
