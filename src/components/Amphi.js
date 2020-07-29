import class Range{}
class Amphi
{
    constructor(nom, nombre_rangee,nbr_places)
    {
        this.nom=nom;
        this.nombre_rangee=nombre_rangee;
        this.nbr_places=nbr_places;
        this.rangee[nombre_rangee];
        for(let i=1;i<= nombre_rangee;i++)
        {
            ra= new Rangee(i);
            this.rangee.push(ra);
        }
    }
    get ranges()
    {
        return this.rangee;
    }
}