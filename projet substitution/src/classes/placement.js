export class Placement{

    constructor(libelle,places)
    {
        this.libelle = libelle;
        this.places = places;
    }


    //getters
    get libelle()
    {
        return this._libelle;
    }

    get places()
    {
        return this._places;
    }

    //setters
    set libelle(value)
    {
        this._libelle = value;
    }

    set places(value)
    {
        this._places = value;
    }


}


export default new Placement("",[]);