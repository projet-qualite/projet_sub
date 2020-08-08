class Ligne{

    constructor(lettre,places)
    {
        this.lettre = lettre;
        this.places = places;
    }


    //getters
    get lettre()
    {
        return this._lettre;
    }

    get places()
    {
        return this._places;
    }

    //setters
    set lettre(value)
    {
        this._lettre = value;
    }

    set places(value)
    {
        this._places = value;
    }

    //methodes 

    //représente le nombre de place réels d'une ligne
    nombre_place_reels_ligne()
    {
        let p = 0
        for(let i=0;i<this.places.length;i++)
        {
            if(this.places[i].vide == "non")
            {
                p+=1
            }
        }

        return p
    }
    


}


export default new Ligne("",[]);