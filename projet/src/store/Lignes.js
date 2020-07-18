class Amphi{

    constructor(nomAmphi,nombrePlace) {
        this.nomAmphi = nomAmphi
        this.nombrePlace = nombrePlace
        this.places = new Array(26)
        for(let i=0;i<26;++i)
        {
            this.places[i] = new Array(10)
        }
    }

    generatePlaces(){
        let p = this.nombrePlace
        /*let i = p/10
        if((p%10) != 0)
        {
            i++
        }*/
        //let indice = i-1
        let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        let e = 1
        let k = 0
        while(p!=0)
        {

            this.places[k][e-1] = alphabet[k]+''+e
            e++
            if(e > 10) {
                e = 1
                k++
            }
            p--
        }

        console.log(this.places)

    }



}

export default new Amphi('Fry',7)