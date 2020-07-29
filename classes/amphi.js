class Amphi{

    constructor(nom,nbplace,ranges)
    {
        this.nom = nom;
        this.nbplace = nbplace;
        this.ranges = ranges;
    }

    get nom()
    {
        return this._nom;
    }

    get nbplace()
    {
        return this._nbplace;
    }

    get ranges()
    {
        return this._ranges;
    }

    set nom(value)
    {
        this._nom = value;
    }

    set nbplace(value)
    {
        this._nbplace = value;
    }

    set ranges(value)
    {
        this._ranges = value;
    }


}

export default new Amphi("YOO",0,[])