const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Create User
exports.createUser = async (req, res) => {
    const { name, phone_no, address, user_id, password
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const querys = 
            `INSERT INTO users (name, phone_no, address, user_id, password
             ) 
            VALUES ('${name}', '${phone_no}', '${address}', '${user_id}',
             '${hashedPassword}')`;
        console.log("Query:", querys);
        const [result] = await pool.query(querys);
        res.status(201).json({ 
            message: 'User added successfully...',
            id: result.insertId 
        });
    } catch (err) {
        console.error('Error inserting users:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Get All User
exports.getUser = async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching User:', err.message);
        res.status(500).json({ error: err.message });
    }
};


// Get User By ID
exports.getUserById = async (req, res) => {
    
    try {
        const {id} = req.params;
        console.log("XYDDD:-",req.params);
        
        const query = `SELECT * FROM users WHERE id = '${id}'`;
        const [rows] = await pool.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = rows[0];
        console.log(user);

       res.status(200).json({ message: 'User findbyId successful', user: user });
    }  catch (err) {
        console.error('Error fetching user by ID:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Update User 
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phone_no, address, user_id, password,
        //  updated_by, status
        } = req.body;

    try {
        let query = `
            UPDATE users 
            SET name = '${name}', 
                phone_no = '${phone_no}', 
                address = '${address}', 
                user_id = '${user_id}',

                // updated_by = '${updated_by}', 
                // status = '${status}'
                `;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += `, password = '${hashedPassword}'`;
        }

        query += ` WHERE id = '${id}'`;
        console.log(query);

        const [result] = await pool.query(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating User:', err.message);
        res.status(500).json({ error: err.message });
    }
};


// Delete User
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
   
    try {
        const {id} = req.params;
        console.log("XYDDD:-",req.params);
        
        const query = `DELETE FROM users WHERE id = '${id}'`;
        const [rows] = await pool.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = rows[0];
        console.log(user);

       res.status(200).json({ message: 'User deleted successfully', user: user });
    }  catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { user_id, password } =await req.body;
        console.log(user_id);
        

        if(!user_id || !password){
            return res.status(400).send({message: "Please enter user Id and password"});
        }
        
        const query = `SELECT * FROM users WHERE user_id = '${user_id}'`;
        const [rows] = await pool.query(query);
        

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not registered...' });
        }

        const user = rows[0];
        console.log(user);
        
    
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', id: user.id });
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ error: err.message });
    }
};
