
export class Amphi{

    constructor(nom,lignes,placements)
    {
        this.nom = nom;
        this.lignes = lignes;
        this.placements = placements;
    }

    //getters
    get nom()
    {
        return this._nom;
    }

    get lignes()
    {
        return this._lignes;
    }
    get placements()
    {
        return this._placements;
    }

    
    //setters
    set nom(value)
    {
        this._nom = value;
    }

    set lignes(value)
    {
        this._lignes = value;
    }
    set placements(value)
    {
        this._placements=value;
    }
    //méthodes

    //représente le nombre de place réels d'un amphi
    nombre_place_reels_amphi()
    {
        let p = 0
        for(let i=0;i<this.lignes.length;i++)
        {
            p+= this.lignes[i].nombre_place_reels_ligne()
        }

        return p
    }

    chercher_placement(libelle)
    {
        for(let placement of this._placements)
        {
            if(placement._libelle === libelle)
            {
                return placement._places;
            }
        }
    }
    chercher_ligne(lettre)
    {
        for(let ligne of this._lignes)
        {
            if(ligne._lettre === lettre)
            {
                return ligne;
            }
        }
    }
    modifier_ligne_place(lettre,id,occupee)
    {
        for(let ligne of this._lignes)
        {
            if(ligne._lettre === lettre)
            {
                ligne.moifier_place(id,occupee);
            }
        }
    }
    reinistialiser_placements()
    {
        for(let ligne of this._lignes)
        {
            for(let plc of ligne._places)
            {
                plc._occupee="non";
            }
        }
    }
    Ajouter_placement(placement)
    {
        this._placements.push(placement);
    }
    trouver_places_occupee()
    {
        let places =[];
        for(let ligne of this._lignes)
        {
            for(let plc of ligne._places)
            {
                if(plc._occupee==="oui")
                {
                    places.push(ligne._lettre+plc._id);
                }
            }
        }
        return places;
    }
    modifier_placements(libelle,places)
    {
        for(let placement of this._placements)
        {
            if(placement._libelle === libelle)
            {
                placement._places=places;
            }
        }
    }
    supprimer_placements(libelle)
    {
        for(let i=0;i<this._placements.length;i++)
        {
            if(this._placements[i]._libelle === libelle)
            {
                this._placements.splice(i,1);
            }
        }
    }
}

export default new Amphi("",[])