export class Ligne{

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
    
    chercher_place(id)
    {
        for(let plc of this._places)
        {
            if(plc._id === id)
            {
                return plc;
            }
        }
    }

    moifier_place(id,occupee)
    {
        for(let plc of this._places)
        {
            if(plc._id === id)
            {
                plc.modifier(occupee);
            }
        }
    }
}


export default new Ligne("",[]);