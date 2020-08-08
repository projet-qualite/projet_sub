export class Place
{
    constructor(id,vide,occupee)
    {
        this.id = id;
        this.vide = vide;
        this.occupee = occupee
    }

    get id()
    {
        return this._id;
    }

    get vide()
    {
        return this._vide;
    }

    get occupee()
    {
        return this._occupee;
    }

    set id(value)
    {
        this._id = value;
    }

    set vide(value)
    {
        this._vide = value;
    }

    set occupee(value)
    {
        this._occupee = value;
    }
}
export default new Place(0,"non","non");