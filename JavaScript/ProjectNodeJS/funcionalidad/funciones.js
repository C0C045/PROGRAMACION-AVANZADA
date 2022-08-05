let fs = require("fs")
let cursos = require("../BD/cursos.json")
let estudiantes = require("../BD/estudiantes.json")
let router = require("express").Router()

let rutaC = "./BD/cursos.json"
let rutaE = "./BD/estudiantes.json"

//Poder subir archivos json
const FileController = require('./FileController');
const fileController = new FileController();
router.get('/insertarData', (req, res) => {
    res.render("insertarData.ejs")
});
router.post('/subir-archivo', fileController.subirArchivo);

//Inicio
router.get('/', (req, res) => {
    res.render("index.ejs", {
        estudiantes,
        dataP:calcularPromedio(), 
        dataI:sinInscripcion()
    })
});

//Mejores promedios
function calcularPromedio() {
    let listaE = {}
    estudiantes.forEach(est => {
        if(Object.keys(est.notas).length > 0){
            let numerador = 0;
            let denominador = 0;
            for (const nombreC in est.notas) {
                let curso = cursos.filter((curso) => curso.nombre == nombreC)
                numerador += curso[0].creditos*est.notas[nombreC][est.notas[nombreC].length-1]
                denominador += curso[0].creditos
            }
            listaE[est.codigo] = +(Math.round(numerador/denominador + "e+1")  + "e-1")
        }
    });

    //Organizar diccionario menor a mayor promedio
    var items = Object.keys(listaE).map(function(key) {
        return [key, listaE[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    return items.slice(0, 10);
}

//Estudiantes sin Inscripcion
function sinInscripcion() {
    let listaI = []
    estudiantes.forEach(est => {
        if(Object.keys(est.notas).length == 0){
            listaI.push(est)
        }
    });
    return listaI
}

//Filtros en cursos
//Nota total menor a 3
router.get('/menoresTres', (req, res) => {
    const nombre = req.query.nombre
    let estudiantesAux = []
    let curso = cursos.filter((curso) => curso.nombre == nombre)
    estudiantes.forEach(est => {
        if(curso[0].estudiantes.includes(est.codigo)){
            let total = est.notas[nombre][est.notas[nombre].length-1];
            if(total < 3){
                estudiantesAux.push(est)
            }
        }
    });
    res.render("consulta.ejs", {data:estudiantesAux, cursoN:nombre, nombre:"Nota menor a tres"})
});

//Nota ordenador por mejor nota
router.get('/ordenarMejor', (req, res) => {
    const nombre = req.query.nombre
    let estudiantesAux = []
    let curso = cursos.filter((curso) => curso.nombre == nombre)
    estudiantes.forEach(est => {
        if(curso[0].estudiantes.includes(est.codigo)){
            estudiantesAux.push(est)
        }
    });
    estudiantesAux.sort(function (a, b) {
        aAux = a.notas[nombre][a.notas[nombre].length-1]
        bAux = b.notas[nombre][b.notas[nombre].length-1]
        if (aAux > bAux) {
          return -1;
        }
        if (aAux < bAux) {
          return 1;
        }
        return 0;
    });
    res.render("consulta.ejs", {data:estudiantesAux, cursoN:nombre, nombre:"Ordenar por nota"})
})

router.get('/agregarE', (req, res) => {
    const nombre = req.query.nombre;
    let resultado = cursos.filter((curso) => curso.nombre == nombre)
    res.render("agregarE.ejs", {data:resultado[0], dataE:estudiantes})
});

router.post('/insertarEstudiante', (req,res)  => {
    let notas = [];

    const { nombre, codigo, nota1, nota2, nota3 } = req.body;

    notas.push(parseFloat(nota1))
    notas.push(parseFloat(nota2))
    notas.push(parseFloat(nota3))

    if(req.body.nota4){
        const nota4 = req.body.nota4;
        notas.push(parseFloat(nota4))
    }

    let encontradoE = false;
    let encontradoC = false;

    let cursosMod = cursos.filter((curso)=>{
        if(curso.nombre == nombre){
            encontradoC = true;
            estudiantesMod = estudiantes.filter((estudiante)=>{
                if(estudiante.codigo == codigo){
                    estudiante.notas[nombre] = notas
                    let nota1 = estudiante.notas[nombre][0]
                    let nota2 = estudiante.notas[nombre][1]
                    let nota3 = estudiante.notas[nombre][2]
                    if(curso.tipo == "teórico"){
                        total = (nota1*.35)+(nota2*.35)+(nota3*.30)
                    }else{
                        let nota4 = estudiante.notas[nombre][3]
                        total = (nota1*.30)+(nota2*.25)+(nota3*.20)+(nota4*.25)
                    }
                    (estudiante.notas[nombre]).push(+(Math.round(total + "e+1")  + "e-1"))
                    curso.estudiantes.push(parseFloat(codigo))
                    encontradoE = true;
                }
                return estudiante
            })
        }
        return curso
    })
    
    if(encontradoE && encontradoC){
        fs.writeFile(rutaC, JSON.stringify(cursosMod, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al agregar el estudiante al curso.");
                res.redirect("/curso/buscar/?nombre="+nombre)
            } else {
                fs.writeFile(rutaE, JSON.stringify(estudiantesMod, null, 4), 'utf8', (err) => {
                    if (err) {
                        req.toastr.error("Error al agregar el estudiante al curso.");
                    } else {
                        req.toastr.success("Estudiante agregado correctamente al curso.");
                    }
                    res.redirect("/curso/buscar/?nombre="+nombre)
                });
            }
        });
    }
    else {
        req.toastr.error("Error al agregar el estudiante al curso.");
        res.redirect("/curso/buscar/?nombre="+nombre)
    }
});

router.get('/actualizarN', (req,res)  => {
    let { nombre, codigo } = req.query; //Nombre del curso y Codigo del estudiante
    //Obtener las notas del curso del estudiante
    let resultado = estudiantes.filter((est) => est.codigo == codigo)
    let curso = cursos.filter((curso) => curso.nombre == nombre)
    let notas = resultado[0].notas[nombre]
    res.render("actualizarNotas.ejs", {data:req.query, dataC:curso[0], dataN:notas })
});

router.post('/actualizarNotas', (req,res)  => {
    let notas = [];

    const { nombre, codigo, nota1, nota2, nota3 } = req.body;

    notas.push(parseFloat(nota1))
    notas.push(parseFloat(nota2))
    notas.push(parseFloat(nota3))

    if(req.body.nota4){
        const nota4 = req.body.nota4;
        notas.push(parseFloat(nota4))
    }

    let encontradoE = false;
    let estudiantesMod = estudiantes.filter((estudiante)=>{
        if(estudiante.codigo == codigo){
            let curso = cursos.filter((curso)=> curso.nombre == nombre)
            if(curso[0].tipo == "teórico"){
                total = (notas[0]*.35)+(notas[1]*.35)+(notas[2]*.30)
            }else{
                total = (notas[0]*.30)+(notas[1]*.25)+(notas[2]*.20)+(notas[3]*.25)
            }
            notas.push(+(Math.round(total + "e+1")  + "e-1"))
            estudiante.notas[nombre] = notas
            encontradoE = true;
        }
        return estudiante
    })
    
    if(encontradoE){
        fs.writeFile(rutaE, JSON.stringify(estudiantesMod, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al actualizar notas.");
            } else {
                req.toastr.success("Notas actualizadas correctamente.");
            }
            res.redirect("/curso/buscar/?nombre="+nombre)
        });
    }
    else {
        req.toastr.error("Error al actualizar notas.");
        res.redirect("/curso/buscar/?nombre="+nombre)
    }
});

router.get('/eliminarEstudianteCurso', (req, res) => {    
    let { nombre, codigo } = req.query; //Nombre del curso y Codigo del estudiante
    
    let encontradoE = false;
    let encontradoC = false;
    
    let cursosMod = cursos.filter((curso)=>{
        if(curso.nombre == nombre){
            encontradoC = true;
            estudiantesMod = estudiantes.filter((estudiante)=>{
                if(estudiante.codigo == codigo){
                    eval(`delete (estudiante.notas).${nombre}`)
                    curso.estudiantes.splice(curso.estudiantes.indexOf(parseInt(codigo)),1)
                    encontradoE = true;
                }
                return estudiante
            })
        }
        return curso
    })
    
    if(encontradoE && encontradoC){
        fs.writeFile(rutaC, JSON.stringify(cursosMod, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al eliminar estudiante del curso.");
                res.redirect("/curso/buscar/?nombre="+nombre)
            } else {
                fs.writeFile(rutaE, JSON.stringify(estudiantesMod, null, 4), 'utf8', (err) => {
                    if (err) {
                        req.toastr.error("Error al eliminar estudiante del curso.");
                    } else {
                        req.toastr.success("Estudiante eliminado correctamente del curso.");
                    }
                    res.redirect("/curso/buscar/?nombre="+nombre)
                });
            }
        });
    }
    else {
        req.toastr.error("Error al eliminar estudiante del curso.");
        res.redirect("/curso/buscar/?nombre="+nombre)
    }
});

module.exports = router;