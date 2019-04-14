class University {
    constructor(public name:String, public dept: string) {};

    graduation(year: number) {
        console.log(`Graduating ${this.dept} ${year} students`)
    }
}

let mum = new University('MUM', 'CS');
mum.graduation(2000);