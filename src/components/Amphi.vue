<template>
<div>
<h1>{{ msg }}</h1>
<div>
  <fieldset>
  
    <p><input id="file_json" accept="application/JSON" @change="onFileChange" type="file"  />
<button @click="valider">Valider</button> </p>
  </fieldset>
</div>

<div id="amphi-car">
<p><label > Le nom:</label>    <input v-model="nom_A" /><label class="tab"> Le nombre de places:  </label>  <input v-model="places_amph" /> 
<label class="tab">Le nombre de rangs:  </label>  <input v-model="rangs" />  </p>
</div>


<div>
<span v-for="dns in donnees" :key="dns" v-show="vrai">
<span v-for="rangs in dns.ranges" :key="rangs">
 Numero du rang:  <input v-bind:value="rangs.id"/><br><br>
 <span v-for="lig in rangs.lignes" :key="lig">
  Lettre de la ligne:  <input v-bind:value="lig.lettre"/> <br><br>
 <span v-for="plc in lig.places" :key="plc">
   chaise:  <input v-bind:value="plc"/><br><br>
  </span>
  </span>
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
      this.nom_A= this.donnees[0].nom;
      this.places_amph= this.donnees[0].nombre_places;
      this.rangs = this.donnees[0].nombre_range;
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
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:midnightblue;
  margin-top: 10px;
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
.tab{
  margin-left: 30px;
}
#amphi-car{
  text-align: center;
}
button{
  height: 30px;
  width: 120px;
  border-radius: 4px;
  background-color:lightskyblue;
  border: 1px solid #555555;
  font-size: 15px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 20px;
}
div{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-top: 10px;
}

#file_json{
    width: 200px;
    border:black;
}
fieldset{
  text-align: center;
  color: midnightblue;
}


</style>
