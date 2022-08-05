class FileController{
  subirArchivo = async (req, res, next) =>{
    const archivo1 = req.files.archivo1;
    const archivo2 = req.files.archivo2;
    const fileName1 = "estudiantes.json";
    const fileName2 = "cursos.json";
    const path1 = __dirname + '/../BD/' + fileName1;
    const path2 = __dirname + '/../BD/' + fileName2;

    try {
      archivo1.mv(path1, (error) => {
        if (error) {
          console.error(error);
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
        return res.status(200).send({ status: 'success', path:'/BD/' + fileName1 });
      });
      archivo2.mv(path2, (error) => {
        if (error) {
          console.error(error);
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
        return res.status(200).send({ status: 'success', path:'/BD/' + fileName2 });
      });
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }
}

module.exports = FileController;