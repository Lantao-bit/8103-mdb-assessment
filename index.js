const express = require('express');
const ejs = require("ejs");
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config();

const mysql2 = require("mysql2/promise");
const { createPool } = require("mysql2/promise");  // imports the function CreatePool

const app = express();          // initiate an instance of the express application 
app.set('view engine', 'ejs');  // look for filename.ejs in the views folder, allow dynamic content <%= %>
app.use(expressLayouts);
app.use(express.static('public'));  // middleware serves static assets from a drectory named 'public'
app.use(express.urlencoded({ extended: true })); // parsing http request body that are in the url encoded format

app.set('layout', 'layouts/base'); //wrap rendered pages inside a common template file at views/layouts/base.ejs

const connection = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Display list of Employees
app.get('/employees', async (req, res) => {
  const [employees] = await connection.query({
    sql: `
    SELECT * from Employees 
             JOIN Departments 
               ON Employees.department_id = Departments.department_id`,
  });

  res.render('employees/index', {
    employees: employees,
  });
});

// Display list of customers
app.get('/customers', async (req, res) => {
  const name = req.query.name;
  const description = req.query.description;
  const rating = req.query.rating;

  let sql = `
    SELECT * FROM Customers
      JOIN Employees
    ON Customers.employee_id = Employees.employee_id WHERE 1
  `;
  const bindings = [];
  if (name) {
    sql += ' AND name LIKE ?';
    bindings.push('%' + name + '%');
  }
  if (description) {
    sql += ' AND description LIKE ?';
    bindings.push('%' + description + '%');
  }
  if (rating) {
    sql += ' AND rating = ?';
    bindings.push(rating);
  }
  const [customers] = await connection.execute({
    sql, nestTables: true
  }, bindings);

  console.log(customers);
  console.log(req.query);

  res.render('customers/index', {
    customers: customers,
    searchParams: req.query
  });

});

// Add a customer - display form 
app.get('/customers/create', async (req, res) => {
  const [employees] = await connection.query('SELECT * from Employees');
  console.log(employees);
  res.render('customers/add', {
    employees: employees
  });
});

// Add a customer - post form
app.post('/customers/create', async (req, res) => {
  let { name, description, rating, employee_id } = req.body;
  let query = `INSERT INTO Customers (name, description, rating, updated_on, employee_id)
            VALUES (?, ?, ?, ?, ?)`;
  let bindings = [name, description, rating, new Date(), employee_id];
  await connection.execute(query, bindings);
  res.redirect('/customers');
});

// Update a customer - display form 
app.get('/customers/:customer_id/edit', async (req, res) => {
  let [customers] = await connection.execute('SELECT * from Customers WHERE customer_id = ?', [req.params.customer_id]);
  let [employees] = await connection.execute('SELECT * from Employees');
  let customer = customers[0];
  res.render('customers/edit', {
    customer: customer,
    employees: employees
  });
});

// Update a customer - post form
app.post('/customers/:customer_id/edit', async (req, res) => {
  let { name, description, rating, updated_on, employee_id } = req.body;
  console.log(req.params.customer_id);
  let query = 'UPDATE Customers SET name=?, description=?, rating=?, updated_on=?, employee_id=? WHERE customer_id=?';
  const newDateTime = new Date();
  let bindings = [name, description, rating, newDateTime, employee_id, req.params.customer_id];
  console.log(bindings);
  await connection.execute(query, bindings);
  res.redirect('/customers');
});


// Delete a customer - display form
app.get('/customers/:customer_id/delete', async (req, res) => {
  const [customers] = await connection.execute(
    'SELECT * FROM Customers WHERE customer_id = ?',
    [req.params.customer_id]
  );
  const customer = customers[0];
  res.render('customers/delete', {
    customer: customer
  });
});

// Delete a customer - post form
app.post('/customers/:customer_id/delete', async (req, res) => {
  await connection.execute('DELETE FROM Customers WHERE customer_id = ?', [req.params.customer_id]);
  res.redirect('/customers');
});





app.get("/", (req, res) => {
  res.render("landing");
});


app.listen(3000, () => {
  console.log(`Server running`);
});
