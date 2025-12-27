SELECT 
    c.name AS component_name,
    cc.quantity,
    c.type
FROM circuit_components cc
JOIN components c ON cc.component_id = c.id
WHERE cc.circuit_id = 3;

