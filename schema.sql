-- SQL Schema for My CRM 

CREATE DATABASE IF NOT EXISTS myCRM;
USE myCRM;

-- Creating Customers Table
CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    rating INT,
    updated_on DateTime
);

-- Creating Departments Table
CREATE TABLE IF NOT EXISTS Departments (
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Creating Employees Table
CREATE TABLE IF NOT EXISTS Employees (
    employee_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    department_id INT UNSIGNED,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Creating EmployeeCustomer Table
CREATE TABLE IF NOT EXISTS EmployeeCustomer (
    employee_id INT UNSIGNED,
    customer_id INT UNSIGNED,
    PRIMARY KEY (employee_id, customer_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


