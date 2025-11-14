import { Router } from "express";
import { conmysql as pool } from "../db.js";
import { verifyToken } from "../jwt/verifytoken.js";

const router = Router();

// 🔹 Obtener todas las categorías
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias ORDER BY cat_nombre');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Registrar una nueva categoría
router.post('/', verifyToken, async (req, res) => {
  try {
    const { cat_nombre, cat_descripcion } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categorias (cat_nombre, cat_descripcion) VALUES (?, ?)',
      [cat_nombre, cat_descripcion]
    );
    res.json({ id: result.insertId, cat_nombre, cat_descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Eliminar una categoría
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categorias WHERE cat_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
