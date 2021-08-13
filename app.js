const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "bd_inmo",
});

connection.connect();

app.get("/pruebas", (req, res) => {
  const consulta = "SELECT * FROM tb_prueba";
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});

app.get("/prueba/:id", (req, res) => {
  const { id } = req.params;

  const consulta = `SELECT * FROM tb_prueba WHERE id_prueba=${id}`;
  connection.query(consulta, (error, resultado) => {
    if (error) throw error;
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.send("No hay un ID que matchee con la base");
    }
  });
});

app.post("/pruebas", (req, res) => {
  const consulta = `INSERT INTO tb_prueba SET ?`;
  const customObject = {
    nombre: req.body.name,
  };

  connection.query(consulta, customObject, (error) => {
    if (error) throw error;
    res.send("Se insertó el registro!");
  });
});

app.put("/pruebas/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const consulta = `UPDATE tb_prueba SET nombre="${name}" WHERE id_prueba=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send("Se actualizó la tabla!");
  });
});

app.delete("/pruebas/:id", (req, res) => {
  const { id } = req.params;

  consulta = `DELETE FROM tb_prueba WHERE id_prueba=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send("Se eliminó el registro");
  });
});

app.listen(PORT, () => {
  console.log(`La app está corriendo en el puerto ${PORT}`);
});
