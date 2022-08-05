let fs = require("fs")
let Curso = require("../clases/Curso")
let cursos = require("../BD/cursos.json")
let estudiantes = require("../BD/estudiantes.json")
let router = require("express").Router()

let rutaC = "./BD/cursos.json"
let rutaE = "./BD/estudiantes.json"

router.get('/cursos', (req, res) => {
    let cursos = fs.readFileSync(rutaC, "utf8");
    const data = JSON.parse(cursos)
    res.render("cursos.ejs", {data:data})
});

router.get('/crearCurso', (req, res) => {
    res.render("crearC.ejs")
});

router.get('/actualizarCurso', (req, res) => {
    let nombre = req.query.nombre;
    let data = cursos.filter((curso) => curso.nombre == nombre)
    res.render("actualizarC.ejs", {data:data[0]})
});

router.post('/curso/crear/', (req, res) => {
    let cursos = fs.readFileSync(rutaC, "utf8");
    let cursosJson = JSON.parse(cursos);

    let nuevoCurso = new Curso(
        req.body.nombre,
        req.body.tipo,
        parseInt(req.body.creditos),
        []
    );
    cursosJson.push(nuevoCurso);

    let cursosMod = JSON.stringify(cursosJson, null, 4)

    fs.writeFile(rutaC, cursosMod, 'utf8', (err) => {
        if (err) {
            req.toastr.error("Error al crear el curso.");
        } else {
            req.toastr.success("Curso creado correctamente.");
        }
        res.redirect("/cursos")
    });
});

router.get('/curso/buscar/', (req, res) => {
    let nombre = req.query.nombre;
    let resultado = cursos.filter((curso) => curso.nombre == nombre)

    if(resultado.length != 0){
        let lista = [];
        resultado[0].estudiantes.forEach(element => {
            estudiantesMod = estudiantes.filter(estudiante => {
                if(estudiante.codigo == element){
                    lista.push(estudiante);
                }
            })
        });
        res.render("curso.ejs",{data:resultado[0],dataE:lista})
    }
    else{
        res.status(404).send("No se encontró el curso")
    }
});

router.post('/curso/actualizar/', (req, res) => {
    let {nombreAux, nombre, creditos} = req.body;
    
    let encontrado = false;
    let cursosMod = cursos.map((curso)=>{
        if(curso.nombre == nombreAux){
            curso.nombre = nombre;
            curso.creditos = parseInt(creditos);
            curso.estudiantes = curso.estudiantes;
            encontrado = true;
        }
        return curso
    })

    if(encontrado){
        fs.writeFile(rutaC, JSON.stringify(cursosMod, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al actualizar el curso.");
            } else {
                req.toastr.success("Curso actualizado correctamente.");
            }
            res.redirect("/cursos")
        });
    }
    else {
        req.toastr.error("El curso no existe.");
        res.redirect("/cursos")
    }
});

router.get('/curso/eliminar/', (req, res) => {
    let nombre = req.query.nombre;

    let encontrado = false
    cursos = cursos.filter(curso => {
        if(curso.nombre != nombre){
            return true;
        }
        else{
            encontrado = true;
            cursoAux = curso;
            return false;
        }
    })

    if(encontrado){
        cursoAux.estudiantes.forEach(element => {
            estudiantesMod = estudiantes.filter(est => {
                if(est.codigo == element){
                    eval(`delete (est.notas).${nombre}`)
                }
                return est
            })
        });

        fs.writeFile(rutaC, JSON.stringify(cursos, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al eliminar el curso.");
                res.redirect("/cursos")
            } else {
                req.toastr.success("Curso eliminado correctamente.");
                if((cursoAux.estudiantes).length > 0){
                    fs.writeFile(rutaE, JSON.stringify(estudiantesMod, null, 4), 'utf8', (err) => {
                        if (err) {
                            req.toastr.error("Error al eliminar datos.");
                        } else {
                            req.toastr.success("Datos eliminados correctamente.");
                        }
                    });
                }
                res.redirect("/cursos")
            }
        });
    }
    else {
        req.toastr.warning("El curso no existe.");
        res.redirect("/cursos")
    }
});

module.exports = router;