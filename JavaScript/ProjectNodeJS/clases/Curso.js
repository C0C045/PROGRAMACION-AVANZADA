class Curso {
    constructor(nombre, tipo, creditos, estudiantes){
        this.nombre = nombre;
        this.tipo = tipo;
        this.creditos = creditos;
        this.estudiantes = estudiantes;
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getTipo(){
        return this.tipo;
    }

    set setTipo(tipo){
        this.tipo = tipo;
    }

    get getCreditos(){
        return this.creditos;
    }

    set setCreditos(creditos){
        this.creditos = creditos;
    }

    get getEstudiantes(){
        return this.estudiantes;
    }

    set setEstudiantes(estudiantes){
        this.estudiantes = estudiantes;
    }
}

module.exports = Curso