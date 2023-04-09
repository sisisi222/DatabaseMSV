const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./databasepg");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require("express");
const auth = express.Router();
const fs = require('fs');
const routes = require('./routes');

const saltRounds = 10;
const jwtSecret = 'secret-key';

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
})


//search flight base on origin and destination
app.get('/search', async(req, res) =>{
    const {origin, destination} = req.query;
    const query = "SELECT * FROM flights WHERE LOWER(origin) = LOWER($1) AND LOWER(destination) = LOWER($2)";
    pool.query(query, [origin, destination], (err, data) =>{
        if (err){
            return (res.json(err));
        }
        else{
            return (res.json(data));
        }
    })
})

//view all the available flights
app.get('/allflights', async(req, res) =>{
    const query = "SELECT * FROM flights";
    pool.query(query, (err ,results) => {
        if(!err){
            const jsonData = JSON.parse(results);
            for (let i = 0; i < jsonData.length(); i++){
                console.log(jsonData[i].origin);
            }
            return (res.json(results))
        }
        else{
            return (res.json(err));
        }
    })
})

//sign up options for customers  
app.post("/signup", async (req, res) => {
    const { username, password, userType, fname, lname, address } = req.body;
    try {
      // Check if user already exists
      const existingUser = await pool.query(
        "SELECT * FROM login WHERE username = $1",
        [username]
      );
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user into login table
      const newUser = await pool.query(
        "INSERT INTO login (username, password, type) VALUES ($1, $2, $3) RETURNING id",
        [username, hashedPassword, userType]
      );
  

      // Determine user type and insert into appropriate table
      const userId = newUser.rows[0].id;
  
      if (userType === "customer") {
        const newCustomer = await pool.query(
          "INSERT INTO customer (custid, fname, address, lname) VALUES ($1, $2, $3, $4)",
          [userId, fname, address, lname]
        );
      } else if (userType === "employee") {
        const newEmployee = await pool.query(
          "INSERT INTO employee (sid) VALUES ($1)",
          [userId]
        );
      } else {
        return res.status(400).json({ message: "Invalid user type" });
      }
  
      res.json({ message: "User created successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error creating user" });
    }
  });


  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query database for customer with matching username and password
    const customer = db.customers.find(c => c.username === username && c.password === password);
  
    if (customer) {
      // Generate JWT token with customer ID as payload
      const token = jwt.sign({ customerId: customer.id }, 'secret_key');
  
      // Return success message and token to client
      res.json({ message: 'success', token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
// module.exports = auth;

app.listen(4000, () => {console.log("Server started on port 4000")})

// module.exports = { searchFlights };
