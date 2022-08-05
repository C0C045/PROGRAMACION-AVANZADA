let fs = require("fs")
let Estudiante = require("../clases/Estudiante")
let cursos = require("../BD/cursos.json")
let estudiantes = require("../BD/estudiantes.json")
let router = require("express").Router()

let rutaC = "./BD/cursos.json"
let rutaE = "./BD/estudiantes.json"

router.get('/estudiantes', (req, res) => {
    let estudiantes = fs.readFileSync(rutaE, "utf8");
    const data = JSON.parse(estudiantes)
    res.render("estudiantes.ejs", {data:data})
});

router.get('/crearEstudiante', (req, res) => {
    res.render("crearE.ejs")
});

router.post('/estudiante/crear/', (req, res) => {
    const {nombre, apellido, codigo} = req.body;

    let resultado = estudiantes.filter((estudiante) => estudiante.codigo == codigo)

    if(resultado.length == 0){
        let estudiantes = fs.readFileSync(rutaE, "utf8");
        let estudiantesJson = JSON.parse(estudiantes);
        let nuevoEstudiante = new Estudiante(nombre,apellido,parseInt(codigo),{});

        estudiantesJson.push(nuevoEstudiante);
        let estudiantesMod = JSON.stringify(estudiantesJson, null, 4)
        fs.writeFile(rutaE, estudiantesMod, 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al crear el estudiante.");
            } else {
                req.toastr.success("Estudiante creado correctamente.");
            }
            res.redirect("/estudiantes")
        });
    }else{
        req.toastr.warning("Código repetido.");
        res.redirect("/estudiantes")
    }
});

router.get('/estudiante/buscar', (req, res) => {
    let codigo = req.query.codigo;
    let resultado = estudiantes.filter( (estudiante) => estudiante.codigo == codigo)

    if(resultado.length != 0){
        res.render("estudiante.ejs",{data:resultado[0]})
    }
    else{
        res.status(404).send("No se encontró el estudiante")
    }
});

router.get('/actualizarEstudiante', (req, res) => {
    let codigo = req.query.codigo;
    let data = estudiantes.filter((estudiante) => estudiante.codigo == codigo)
    res.render("actualizarE.ejs", {data:data[0]})
});

router.post('/estudiante/actualizar/', (req, res) => {
    let {codigoAux, nombre, apellido, codigo} = req.body;

    let resultado = estudiantes.filter((estudiante) => estudiante.codigo == codigo)
    let resultado2 = resultado.filter((estudiante) => estudiante.codigo != codigoAux)

    if(resultado2.length == 0){
        let encontrado = false;
        let estudiantesMod = estudiantes.map((estudiante)=>{
            if(estudiante.codigo == codigoAux){
                estudiante.nombre = nombre;
                estudiante.apellido = apellido;
                estudiante.codigo = parseInt(codigo);
                estudiante.notas = estudiante.notas;
                encontrado = true;
            }
            return estudiante
        })

        if(encontrado){
            fs.writeFile(rutaE, JSON.stringify(estudiantesMod, null, 4), 'utf8', (err) => {
                if (err) {
                    req.toastr.error("Error al actualizar el estudiante.");
                } else {
                    req.toastr.success("Estudiante actualizado correctamente.");
                }
                res.redirect("/estudiantes")
            });
        }
        else {
            req.toastr.error("El estudiante no existe");
            res.redirect("/estudiantes")
        }
    }else{
        req.toastr.warning("Código repetido");
        res.redirect("/estudiantes")
    }
});

router.get('/estudiante/eliminar/', (req, res) => {
    let codigo = req.query.codigo;

    let encontrado = false
    estudiantes = estudiantes.filter(estudiante => {
        if(estudiante.codigo != codigo){
            return true;
        }
        else{
            encontrado = true;
            estAux = estudiante;
            
            return false;
        }
    })

    if(encontrado){
        for (var nombreCurso in estAux.notas) {
            cursosMod = cursos.filter(curso => {
                if(curso.nombre == nombreCurso){
                    curso.estudiantes.splice(curso.estudiantes.indexOf(parseInt(codigo)),1)
                }
                return curso
            })
        };

        fs.writeFile(rutaE, JSON.stringify(estudiantes, null, 4), 'utf8', (err) => {
            if (err) {
                req.toastr.error("Error al eliminar el estudiante.");
                res.redirect("/estudiantes")
            } else {
                req.toastr.success("Estudiante eliminado correctamente.");
                if(Object.keys(estAux.notas).length > 0){
                    fs.writeFile(rutaC, JSON.stringify(cursosMod, null, 4), 'utf8', (err) => {
                        if (err) {
                            req.toastr.error("Error al eliminar datos.");
                        } else {
                            req.toastr.success("Datos eliminados correctamente.");
                        }
                    });
                }
                res.redirect("/estudiantes")
            }
        });
    }
    else {
        req.toastr.error("El estudiante no existe.");
        res.redirect("/estudiantes")
    }
});

module.exports = router;