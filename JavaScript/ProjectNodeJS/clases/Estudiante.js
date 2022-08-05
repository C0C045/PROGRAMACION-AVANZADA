class Estudiante {
    constructor(nombre, apellido, codigo, notas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.codigo = codigo;
        this.notas = notas;
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getApellido(){
        return this.apellido;
    }

    set setApellido(apellido){
        this.apellido = apellido;
    }

    get getCodigo(){
        return this.codigo;
    }

    set setCodigo(codigo){
        this.codigo = codigo;
    }

    get getNotas(){
        return this.notas;
    }

    set setNotas(notas){
        this.notas = notas;
    }
}

module.exports = Estudiante