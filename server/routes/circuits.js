const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * GET /circuits
 * Returns all circuits
 */
router.get('/', (req, res) => {
    db.query('SELECT * FROM circuits', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

/**
 * GET /circuits/:id/components
 * Returns all components in a circuit
 */
router.get('/:id/components', (req, res) => {
    const circuitId = req.params.id;

    const sql = `
    SELECT 
      c.name AS circuit_name,
      comp.name AS component_name,
      cc.quantity,
      cc.component_type
    FROM circuit_components cc
    JOIN circuits c ON cc.circuit_id = c.id
    JOIN components comp ON cc.component_id = comp.id
    WHERE cc.circuit_id = ?
  `;

    db.query(sql, [circuitId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
