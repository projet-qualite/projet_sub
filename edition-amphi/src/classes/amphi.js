class Amphi{

    constructor(nom,lignes)
    {
        this.nom = nom;
        this.lignes = lignes;
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


    
    //setters
    set nom(value)
    {
        this._nom = value;
    }

    set lignes(value)
    {
        this._lignes = value;
    }

    //mÃ©thodes

    //reprÃ©sente le nombre de place rÃ©els d'un amphi
    nombre_place_reels_amphi()
    {
        let p = 0
        for(let i=0;i<this.lignes.length;i++)
        {
            p+= this.lignes[i].nombre_place_reels_ligne()
        }

        return p
    }

    


}

export default new Amphi("",[])