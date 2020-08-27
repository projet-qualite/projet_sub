<template>
  <div id="app">
   <label class="custom-file-input" for="file_json" ></label>
    <input id="file_json" @change="changer" type="file"  style="visibility: hidden"/>

    
    <select class="select-css" v-model="selected" @change="send_ligne(selected)">
	<option disabled value="" selected>Choisir la ligne</option>
	<option v-for="(lignes,u) in amphi_theatre._lignes" v-bind:key="u">
      Ligne  {{ lignes._lettre }}
    </option>
</select><br/><br/>
<p>
            </p>
            <span v-if="ligne_chosen">
                <AfficherLignesDetails :ligne = "ligne_sent"></AfficherLignesDetails>
            </span>
  <span id="ligne">

    <tbody v-if="vrai">
        
        
        

          <tr  v-for="(lignes,u) in amphi_theatre._lignes" v-bind:key="u">

                  <td v-for="(places,b) in amphi_theatre._lignes[u]._places" v-bind:key="b"> 
                
                <button id="bouton2" v-if="places._id !== 0">{{ amphi_theatre._lignes[u]._lettre+""+ places._id }}</button>
                <p  id="bouton" v-else ></p><br/><br/>
            
            </td>

            
        </tr><br>

  
      
    </tbody>

  </span>
    



    
    
  </div>
</template>


<script>


import amphi from '../classes/amphi.js'
import AfficherLignesDetails from './AfficherLignesDetails.vue'

var amphi_json;


export default {
  name: 'AfficherAmphi',
  data (){
    return {
      vrai: false,
      amphi_theatre: amphi,
      ligne_chosen: false,
      selected: '',
      ligne_sent: Object
      
      
  }
  },
  components:{
      AfficherLignesDetails

  },
  methods:{
    

    //Sert à renvoyer la ligne qu'on doit afficher en détail
    send_ligne(ligne){
        this.ligne_chosen = true
        this.vrai = false

        //let l = ligne.split(' ') : Une ligne choisie est de la forme "Ligne F" on coupe la chaîne pour recupérer la lettre de la ligne
        let l = ligne.split(' ');
        let line = l[l.length-1]

        //on parcours le tableau des lignes pour selectionner la liste à afficher au composant qui va l'afficher en détail
        for(let i=0;i<this.amphi_theatre._lignes.length;i++)
        {
            if(this.amphi_theatre._lignes[i]._lettre === line)
            {
                this.ligne_sent = this.amphi_theatre._lignes[i]
            }
        }

    },


    //permet de charger le json et l'afficher
    changer() {
        
      // eslint-disable-next-line no-unused-vars
      const input = document.querySelector('input[type="file"]');
      const reader = new FileReader();
      reader.onload = (eve) => {
        amphi_json = JSON.parse(eve.target.result);

        this.amphi_theatre = amphi_json

        
      };
      reader.readAsText(input.files[0]);

      this.vrai = true
      

    },
    
    
  }
}
</script>

<style scoped lang="scss">
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


</style>
