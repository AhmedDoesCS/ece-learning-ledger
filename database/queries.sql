SELECT 
    c.name AS component_name,
    cc.quantity,
    c.category
FROM circuit_components cc
JOIN components c ON cc.component_id = c.id
WHERE cc.circuit_id = 3;

SELECT 
    circ.name AS circuit_name,
    SUM(c.quantity * comp.resistance) AS total_resistance
FROM circuits circ
JOIN circuit_components c ON circ.id = c.circuit_id
JOIN components comp ON c.component_id = comp.id
GROUP BY circ.id;

SELECT 
    circ.name AS circuit_name,
    comp.category,
    COUNT(*) AS count
FROM circuits circ
JOIN circuit_components c ON circ.id = c.circuit_id
JOIN components comp ON c.component_id = comp.id
GROUP BY circ.id, comp.category;

SELECT circ.name
FROM circuits circ
LEFT JOIN circuit_components c ON circ.id = c.circuit_id
WHERE c.component_id IS NULL;

SELECT circ.name, comp.name, comp.voltage_rating
FROM circuits circ
JOIN circuit_components c ON circ.id = c.circuit_id
JOIN components comp ON c.component_id = comp.id
WHERE comp.voltage_rating < circ.operating_voltage;
