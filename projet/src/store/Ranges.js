class Ranges{

    constructor(nomAmphi,nombrePlace) {
        this.nomAmphi = nomAmphi
        this.nombrePlace = nombrePlace
        this.places = new Array(26)
        for(let i=0;i<26;++i)
        {
            this.places[i] = new Array(10)
        }
    }





}

export default new Amphi('Fry',7)