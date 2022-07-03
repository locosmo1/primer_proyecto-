let verdadero : boolean = true;

let numero: number = 1;

let nombre: string | null = "Juan";

let typeAny: any | null = '$1aa';

let arrayNumber : Array<number> = [1,2,3];

let arrayBoolean : Array<boolean> = [true,false,true];

let arrayString : Array<string> = ["Jhon","stiwar","pabon"];

let arrayAny : Array<any> = ["Jhonatan","25",true];

function sumar(n1: number, n2 : number): number {
    return n1 + n2;
}

console.log(sumar(50,30));