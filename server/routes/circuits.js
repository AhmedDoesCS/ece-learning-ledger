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
      cc.role
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

/**
 * GET /circuits/:id/total-resistance
 * Computes total resistance assuming series resistors
 */
router.get('/:id/total-resistance', (req, res) => {
  const circuitId = req.params.id;

  const sql = `
    SELECT 
      comp.resistance,
      cc.quantity
    FROM circuit_components cc
    JOIN components comp ON cc.component_id = comp.id
    WHERE cc.circuit_id = ?
      AND comp.resistance IS NOT NULL
  `;

  db.query(sql, [circuitId], (err, results) => {
    if (err) return res.status(500).send(err);

    let totalResistance = 0;

    results.forEach(row => {
      totalResistance += row.resistance_ohms * row.quantity;
    });

    res.json({
      circuit_id: circuitId,
      total_resistance_ohms: totalResistance
    });
  });
});

/**
 * GET /circuits/:id/voltage-check
 * Checks if any component exceeds voltage rating
 */
router.get('/:id/voltage-check', (req, res) => {
  const circuitId = req.params.id;

  const sql = `
    SELECT 
      comp.name,
      comp.voltage_rating,
      c.operating_voltage
    FROM circuit_components cc
    JOIN components comp ON cc.component_id = comp.id
    JOIN circuits c ON cc.circuit_id = c.id
    WHERE cc.circuit_id = ?
      AND comp.voltage_rating IS NOT NULL
  `;

  db.query(sql, [circuitId], (err, results) => {
    if (err) return res.status(500).send(err);

    const unsafe = results.filter(
      row => row.operating_voltage > row.voltage_rating
    );

    res.json({
      circuit_id: circuitId,
      operating_voltage: results[0]?.operating_voltage,
      safe: unsafe.length === 0,
      violations: unsafe
    });
  });
});

/**
 * GET /circuits/:id/summary
 * Returns a high-level circuit overview
 */
router.get('/:id/summary', (req, res) => {
  const circuitId = req.params.id;

  const sql = `
    SELECT 
      c.name,
      COUNT(cc.component_id) AS component_count
    FROM circuits c
    LEFT JOIN circuit_components cc ON c.id = cc.circuit_id
    WHERE c.id = ?
    GROUP BY c.id
  `;

  db.query(sql, [circuitId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});


module.exports = router;
