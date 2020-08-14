<template>
  <div id="app">

    <tbody>
      <span id="ligne">

          <tr>

                  <td v-for="(places,b) in ligne._places" v-bind:key="b"> 
                
                <button id="bouton2" v-if="places._id !== 0">{{ ligne._lettre+""+ places._id }}</button>
                <p  id="bouton" v-else ></p>
            
            </td>

              <br/><br/>

            
        </tr>

      </span>
    </tbody>


    
    
  </div>
</template>


<script>


import ligne from '../classes/ligne.js'



export default {
  name: 'AfficherLignesDetails',
  props:{

  msg: String,
  ligne: ligne
  },
  methods:{
    vide(e) {
      if(e==="non")
      {
          return true
      }
      else{
          return false
      }
      
      
    },
    
    
    
  }
}
</script>

<style>


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

</style>
