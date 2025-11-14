import { conmysql } from "../db.js";

// 🔹 Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM categorias ORDER BY cat_nombre");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Registrar una nueva categoría
export const createCategoria = async (req, res) => {
  try {
    const { cat_nombre, cat_descripcion } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO categorias (cat_nombre, cat_descripcion) VALUES (?, ?)",
      [cat_nombre, cat_descripcion]
    );
    res.json({ id: result.insertId, cat_nombre, cat_descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
