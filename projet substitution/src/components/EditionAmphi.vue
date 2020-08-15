<template>
  <div id="app">
      <br/><br/>
    <input id="file_json" @change="changer" type="file"/><br/><br/><br/>
    

    
    <select class="select-css" v-model="selected" @change="send_ligne(selected)">
	<option disabled value="" selected>Choisir la ligne</option>
	<option v-for="(lignes,u) in amphi_theatre._lignes" v-bind:key="u">
      Ligne  {{ lignes._lettre }}
    </option>
</select><br/>

  <div id="actions">
    
    <button
    v-if="isEdited"
      id="boutonAjoutLigne"
      type="button"
      class="btn"
      @click="deletePlace(place.position,place.ligne)"
    >
      Supprimer
    </button>

    <button
      id="boutonAjoutLigne"
      type="button"
      class="btn"
      @click="add_ligne"
    >
      Ajouter une ligne
    </button>

    <button
      id="boutonAjoutLigne"
      type="button"
      class="btn"
      @click="enregistrer"
    >
      Sauvegarder
    </button>
    <div class="box">

  <select class="select-css" id="select_place" v-model="selected_place" v-if="isPlace" @change="send_place(selected_place)">
	<option disabled value="first" selected>Type</option>
    <option value="space" selected>Espace</option>
              <option value="place">Place</option>
</select>

<select class="select-css" v-model="selected_ligne" @change="send_ligne"  v-if="isLigne">
<option value="" disabled selected>Ligne {{ prochaine_ligne}}</option>
<option value="" selected>Ok</option>
</select>

</div>
    
 

  </div>
  

<br/>
      
  <span id="ligne">

    <tbody v-if="vrai">
        
        
       

          <tr  v-for="(lignes,u) in amphi_theatre._lignes" v-bind:key="u">
            
            <button id="bouton2" @click="add_place(selected_place,u)">+</button>

                  <td v-for="(places,b) in amphi_theatre._lignes[u]._places" v-bind:key="b"> 
                
                <button id="bouton2" @click="showPlace(b,u,places._id)" v-if="places._id !== 0">{{ amphi_theatre._lignes[u]._lettre+""+ places._id }}</button>
                <p  id="bouton" v-else ></p><br/><br/>
            
            </td>

            
        </tr><br>

  
      
    </tbody>

  </span>
    



    
    
  </div>
</template>


<script>
/* eslint-disable */
import amphi from '../classes/amphi.js'
import ligne from '../classes/ligne.js'
import saveAs from '../FileServer.js'

var amphi_json;


export default {
  name: 'EditionAmphi',
  data (){
    return {
      // sert à afficher l'Amphi et les boutons
      vrai: false,

      //objet amphi
      amphi_theatre: amphi,
      selected: '',
      nextLine: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      yo: 'Ajouter une ligne',
      isModalVisible: false,
      prochaine_ligne:'',
      selected_place:'',
      isPlace: false,
      isLigne: false,
      place:{position: 0, id:0, ligne:0},
      selected_ligne:'',
      isEdited: false

      
      
  }
  },
  
  methods:{
    
    /*
      Vu que les lignes sont classées par ordre alphabétique
      cette methode renvoie la lettre de la prochaine ligne
    */
    addNextLine(line){
          for(let i=0;i<this.nextLine.length;i++)
          {
              if(this.nextLine[i] == line)
              {
                  return this.nextLine[i+1]
              }
          }

      },

      // Elle ajoute une ligne dans la classe Amphi
    send_ligne(){
        this.isLigne = false
        // let l = ligne : Recupère une ligne vide via : Export default de la classe Ligne
        let l = ligne 
      l._lettre = this.prochaine_ligne
      //this.amphi_theatre._lignes.push(JSON.parse(JSON.stringify(l))) : Permet de faire une copie profonde
        this.amphi_theatre._lignes.push(JSON.parse(JSON.stringify(l)))

    },
    send_place(){
      this.isPlace = false
      if(this.selected_place == 'space')
      {
        this.amphi_theatre._lignes[this.place.position]._places.push({_id: 0})
      }
      else{
        this.amphi_theatre._lignes[this.place.position]._places.push({_id: this.place.id,_occupee:"non"})
      }

      this.selected_place = "first"
      
       

    },
    //Elle permet d'ajouter une ligne
    add_ligne(){
        this.isLigne = true
        this.prochaine_ligne = this.addNextLine(this.amphi_theatre._lignes[this.amphi_theatre._lignes.length - 1]._lettre)

    },

    //Elle permet de connaître le prochain numéro de place à entrer sur une ligne
    nextPlace(ligne_id)
    {
      let nb


      //on verifie d'abord si cette ligne contient des places
      //dans ce cas on renvoit la dernière place non nul
      if(this.amphi_theatre._lignes[ligne_id]._places.length != 0 )
      {
        nb = this.amphi_theatre._lignes[ligne_id]._places[0]._id
      console.log(nb)

      let p = this.amphi_theatre._lignes[ligne_id]._places.length
      for(let i=1;i<p;i++)
      {
        if(nb<this.amphi_theatre._lignes[ligne_id]._places[i]._id)
        {
          nb = this.amphi_theatre._lignes[ligne_id]._places[i]._id
        }
      }
      }

      // sinon on renvoit 0
      else{
        nb = 0
      }
      
      nb+=1

      return nb
    },

    // Elle permet d'afficher un select qui va nous permettre de savoir si c'est une colonne ou une ligne
    add_place(place,u){
      this.isPlace = true

      this.place.position = u
      this.place.id =  this.nextPlace(u) 

    },

    // Lorsque l'on clique sur une place, elle permet de stocker la positiond de cette place et afficher le bouton d'édition
    showPlace(id,ligne,id_place)
    {

      this.isEdited = true
      this.place.id = id_place
      this.place.ligne = ligne
      this.place.position = id


    },

    //Elle sert à supprimer une place grace à l'indice de la ligne et de la place
    //On lui passe l'id = 0 qui correspond à l'espace vide
    deletePlace(id,ligne)
    {
      console.log(id)
      console.log(ligne)
      this.amphi_theatre._lignes[ligne]._places[id]._id = 0
    },
    
    // Elle sert à charger le fichier JSOn et à le parser en objet
    changer() {
        
      // eslint-disable-next-line no-unused-vars
      const input = document.querySelector('input[type="file"]');
      const reader = new FileReader();
      reader.onload = (eve) => {
        amphi_json = JSON.parse(eve.target.result);

        this.amphi_theatre._nom = amphi_json._nom
        this.amphi_theatre._lignes = amphi_json._lignes

        
      };
      reader.readAsText(input.files[0]);


      //pour afficher la div
      this.vrai = true
      

    },

    enregistrer: function()
    {
      let tableau = JSON.stringify(this.amphi_theatre)


var filename = this.amphi_theatre._nom+".json";

var blob = new Blob([tableau], {
 type: "text/plain;charset=utf-8"
});

saveAs(blob, filename);
    }
    
    
  }
}
</script>

<style>
@import '../assets/style.css';

#bouton {
    background-color: white;
    width: 50px;
}
#bouton2{
    border-radius: 6px;
    width:50px;
    height: 50px;
}
#ligne {
    margin-top: 500px;
    margin-left: 400px;
    margin-right: 400px;
}
#place{
    margin-top: 30px;
}

#boutonAjoutLigne{
  border-radius: 6px;
    width:120px;
    height: 45px;
}

#boutonAjoutPlace{
  border-radius: 6px;
    width:40px;
    height: 45px;
}



</style>
