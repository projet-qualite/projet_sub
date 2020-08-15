export class Place
{
    constructor(id,occupee)
    {
        this.id = id;
        this.occupee=occupee;
    }

    get id()
    {
        return this._id;
    }


    set id(value)
    {
        this._id = value;
    }

    get occupee()
    {
        return this._occupee;
    }


    set occupee(value)
    {
        this._occupee = value;
    }

    modifier(occupee)
    {
        this.occupee=occupee;
    }
}
export default new Place(0,"non","non");