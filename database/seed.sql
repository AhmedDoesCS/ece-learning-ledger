USE ece_learning_ledger;

INSERT INTO components (name, type)
VALUES
('Resistor', 'Passive'),
('Capacitor', 'Passive'),
('Diode', 'Semiconductor');

INSERT INTO circuits (name, purpose)
VALUES
('Voltage Divider', 'Basic resistive divider'),
('RC Filter', 'Simple low-pass filter');

INSERT INTO circuit_components (circuit_id, component_id, quantity)
VALUES
(1, 1, 2),  -- Voltage Divider uses 2 resistors
(2, 1, 1),  -- RC Filter uses 1 resistor
(2, 2, 1);  -- RC Filter uses 1 capacitor

