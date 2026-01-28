-- create sample data 
Use myCRM;

-- =========================
-- Departments
-- =========================
INSERT INTO Departments (name) VALUES
('PS'),
('SME'),
('SOE');

-- =========================
-- Employees
-- =========================
INSERT INTO Employees (first_name, last_name, department_id) VALUES
('Sarah', 'Jenkins', 1),
('Michael', 'Tan', 2),
('Thomas', 'Ellis', 3),
('Emily', 'Chen', 3);

-- =========================
-- Customers
-- =========================
INSERT INTO Customers (name, description, rating) VALUES
('ByteBloom Web Solutions', 'ByteBloom Web Solutions', 5),
('UrbanScape Greenery', 'UrbanScape Greenery', 4),
('SwiftSip Coffee House', 'SwiftSip Coffee Housem', 5),
('Apexio Solutions', 'Apexio Solutions', 3);

-- =========================
-- Employee to Customer (many-to-many) 
-- =========================
INSERT INTO EmployeeCustomer (employee_id, customer_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4);
