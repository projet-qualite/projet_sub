<template>
  <div>
<div>
  <fieldset>
<p><input id="file_json" accept="application/JSON" @change="onFileChange" type="file" value="parcourir" />
<button @click="enregistrer" class="same">Sauvegarder</button> </p>
  </fieldset>
</div>

<div id="amphi-car">
<body>
<p>
<label class="tab"> Liste des placements:  </label> 
<select v-model="selected_placement" class="inp_selec">
  <option @click="afficher" v-for="(plcs,y) in this.amphi._placements" :key="y">{{ plcs._libelle }}</option>
</select>
<button  class="same" @click="nvx_placement">Nouveau placements</button> 
<button  class="same" @click="modifier_placement">Modifier placements</button> 
<button  class="same" @click="supprimer_placement">Supprimer placements</button> 
<button @click="reinistialiser" class="same">Réinistialiser</button>
</p>
<fieldset class="FormPlacement" v-show="aficher_nvx_placements">
<p>
<label class="tab"> Libellé de placements:  </label><input class="inp_selec" v-model="lib_placement" />
<button @click="ajouter" class="btnForm">Ajouter</button>
<label class="tab"> Distance entre étudiants:  </label>  <input v-model="distance" class="inp_selec"/>   
<button @click="generer" class="btnForm">Génerer</button>
<button @click="annuler" class="btnForm">Annuler</button>
</p></fieldset>
<fieldset class="FormPlacement" v-show="affich_generer_modif">
<p>
<label class="tab"> Distance entre étudiants:  </label>  <input v-model="distance" class="inp_selec"/>   
<button @click="generer" class="btnForm">Génerer</button>
<button @click="modifier" class="btnForm">Modifier</button>
<button @click="annuler" class="btnForm">Annuler</button>
</p></fieldset>
</body>
</div>
<div id="glob" >
  <tbody>
    <tr v-for="(lignes,u) in amphi._lignes" v-bind:key="u" v-show="vrai">
      <td v-for="(places,b) in amphi._lignes[u]._places" v-bind:key="b"> 
        <span v-if="places._occupee==='oui'">
          <button class="btn_place_rempl"  v-if="places._id !==0" @click="changer_status_plcs(lignes._lettre,places._id)">{{ lignes._lettre+""+ places._id }}</button>
          <p  v-else ></p><br/><br/>
        </span>
        <span v-else-if="places._occupee==='non'">
          <button class="btn_place"  v-if="places._id !==0" @click="changer_status_plcs(lignes._lettre,places._id)">{{ lignes._lettre+""+ places._id }}</button>
          <p  v-else ></p><br/><br/>
        </span>
      </td>
      </tr>
  </tbody>
</div>
</div>
</template>

<script>
/* eslint-disable */
import {Amphi} from "../classes/amphi.js"
import {Ligne} from "../classes/ligne.js"
import {Place} from "../classes/place.js"
import placement, {Placement} from "../classes/placement.js"
export default {
  name: "Amphi_placements",
  data: function() {
    return {
      donnees: Object,
      lignes: Array,
      placements:Array,
      amphi: Amphi,
      ligne: Ligne,
      place:Place,
      placement:Placement,
      places: Array,
      distance: "",
      selected_placement:"",
      affich_generer_modif:false,
      places_occupées:[],
      aficher_nvx_placements:false,
      lib_placement:"",
    };
  },
  methods:
  {
    //afficher les placements choisis dans la liste déroulante
    afficher()
    {
      this.reinistialiser();
      this.places_occupées= this.amphi.chercher_placement(this.selected_placement);
      for(let plc_occ of this.places_occupées)
      {
       for(let ligne of this.amphi._lignes) 
       {
         for(let place of ligne._places)
         {
           let lib_plc=ligne._lettre+place._id;
           if( lib_plc === plc_occ)
           {
             place._occupee="oui";
           }
         }
       }
      }
    },
    //Affiche le div pour donner à l'utilisateur la possibilité d'ajouter le libellé du placement et ses places
    nvx_placement()
    {
      this.selected_placement="";
      this.reinistialiser();
      this.aficher_nvx_placements=true;
    },
    ajouter()
    {
      this.places= this.amphi.trouver_places_occupee();
      this.amphi.Ajouter_placement(new Placement(this.lib_placement,this.places));
      this.aficher_nvx_placements=false;
      this.affich_generer_modif=false;
      this.reinistialiser();
    },
    //Affiche le div pour donner à l'utilisateur la possibilité de modifier le libellé du placement et ses places
    modifier_placement()
    {
      if(this.selected_placement !== "")
      {
      this.affich_generer_modif=true;
      this.aficher_nvx_placements=false;
      }else{
        alert("veuillez choisire un placement");
      }
    },
    modifier()
    {
      this.places= this.amphi.trouver_places_occupee();
      this.amphi.modifier_placements(this.selected_placement,this.places);
      this.affich_generer_modif=false;
    },
    supprimer_placement()
    {
      this.amphi.supprimer_placements(this.selected_placement);
      this.reinistialiser();
    },
    annuler()
    {
      this.aficher_nvx_placements=false;
      this.affich_generer_modif=false;
    },
    //changer manuellement si une place est occuppe ou pas
    changer_status_plcs(lettre,id)
    {
      this.ligne = this.amphi.chercher_ligne(lettre);
      this.place = this.ligne.chercher_place(id);
      if(this.place._occupee==='non')
      {
        this.amphi.modifier_ligne_place(lettre,id,'oui')
      }else
      {
        this.amphi.modifier_ligne_place(lettre,id,'non')
      }
      this.vrai=false;
      this.vrai=true;
    },
    //reinistialiser le plan de l'amphi pour que les places se vident
    reinistialiser()
    {
      this.amphi.reinistialiser_placements();
    },
   generer()
    {
      let longueur_plcs;
      //compteur d'indices en fonction de la distance choisie
      let cpt=0;
      this.reinistialiser();
      for(let j=0;j<this.amphi._lignes.length;j++)
      {
        if(  j%2 === 0 || j===0)
        {
          longueur_plcs=0;
          longueur_plcs = this.amphi._lignes[j]._places.length;
          cpt=0;
          for( let i=0; i<longueur_plcs;i++)
          {
            if(this.amphi._lignes[j]._places[i]._id === 0)
            {
              cpt++;
            }else{
              if(i!=0 && this.amphi._lignes[j]._places[i-1]._id === 0)
              {
                this.amphi._lignes[j]._places[i]._occupee="oui";
                cpt=i;
              }else{
                if(i===0)
                {
                  this.amphi._lignes[j]._places[i]._occupee="oui";
                }else{
                  cpt+=parseInt(this.distance)+1;
                  if(cpt<longueur_plcs)
                  {
                    this.amphi._lignes[j]._places[cpt]._occupee="oui";
                  }
                }
              }
            }
           
          }
        }
      }

    },
    //sauvegarder les données dans un fichier json 
    enregistrer()
    {
      this.reinistialiser();
      const data = JSON.stringify(this.amphi)
      let blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
      if (navigator.msSaveBlob) { // IE 10+
         navigator.msSaveBlob(blob, "Amphi.json")
      } else {
        let link = document.createElement('a')
        if (link.download !== undefined) 
        { // feature detection
      // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', "Amphi.json")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        }
     }
    },
    onFileChange(e) {
     let files = e.target.files || e.dataTransfer.files;
     if (!files.length) return;
     this.readFile(files[0]);
     this.vrai=true;
   },
   readFile(file) {
     let reader = new FileReader();
     reader.onload = e => {
       this.donnees = JSON.parse(e.target.result);
       this.remplir();
     };
     reader.readAsText(file);
   },
   //remplir une instance de la classe Amphi à partir du fichier json
   remplir()
   {
     this.lignes = new Array();
     this.places= new Array();
     this.placements= new Array();
          for(let j=0; j<this.donnees._lignes.length;j++)
          {
            for(let m=0;m<this.donnees._lignes[j]._places.length;m++)
            {
              this.place= new Place(this.donnees._lignes[j]._places[m]._id,this.donnees._lignes[j]._places[m]._occupee);
              this.places[m]= this.place;
            }
            this.ligne= new Ligne(this.donnees._lignes[j]._lettre,this.places);
            this.lignes[j]=this.ligne;
            this.places=[];
          }
          for(let j=0; j<this.donnees._placements.length;j++)
          {
            for(let m=0;m<this.donnees._placements[j]._places.length;m++)
            {
              this.places[m]= this.donnees._placements[j]._places[m];
            }
            this.placement=new Placement(this.donnees._placements[j]._libelle,this.places)
            this.placements[j]=this.placement;
            this.places=[];
          }
         this.amphi= new Amphi(this.donnees._nom,this.lignes,this.placements);
         this.lignes=[];
   }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.tab{
  margin-left: 30px;
}
#amphi-car{
  text-align: center;
}
.inp_selec{
  height: 25px;
  width: 150px;
  border-radius: 4px;
  border: 1px solid #555555;
  font-size: 15px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 20px;
}
.FormPlacement{
  color: black;
}
.same{
  height: 30px;
  width: 190px;
  border-radius: 4px;
  background-color:lightskyblue;
  border: 1px solid #555555;
  font-size: 15px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 20px;
}
.btnForm{
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
#glob{
  text-align: center;
}
.div_rang{
  margin: 10px;;
  border: 1px solid black;
  display: inline-block;
  padding: 5;
}
.btn_place{
  border: 0.5px solid black;
  width: 40px;
  height:40px;
  border-radius: 7px;
}
.btn_place_rempl
{
  border: 0.5px solid black;
  width: 40px;
  height:40px;
  border-radius: 7px;
  background-color:cornflowerblue ;
}
#affich{
  text-align: center;
}
</style>