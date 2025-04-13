const sql = require('mssql');

// Configuration for the SQL Server connection
const config = {
    user: 'Emp_Admin', 
    password: 'T9v#Lm2!qZr@Xw', 
    server: 'localhost', 
    database: 'Employee',
    options: {
        encrypt: false, // Set to true if using Azure SQL or require encryption
        trustServerCertificate: true // Set to true for local development
    }
};

// Function to connect to the database
async function connectToDatabase() {
    try {
        console.log('Connecting to SQL Server...');
        const pool = sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

// Create operation
async function createRecord(tableName, data) {
    try {
        const pool = await connectToDatabase();
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        const query = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
        await pool.request().query(query);
        console.log('Record created successfully');
    } catch (err) {
        console.error('Error creating record:', err);
    }
}

// Read operation
async function readRecords(tableName) {
    try {
        const pool = await connectToDatabase();
        const query = `SELECT * FROM ${tableName}`;
        const result = await pool.request().query(query);
        console.log('Records retrieved:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error reading records:', err);
    }
}

// Read operation with filtering by EmployeeID using a stored procedure
async function readRecordById(tableName, employeeId) {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('EmployeeID', sql.Int, employeeId) // Pass the EmployeeID as an input parameter
            .execute('usp_GetEmployeeById'); // Call the stored procedure
        console.log('Record retrieved:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error reading record:', err);
    }
}
// Update operation
async function updateRecord(tableName, id, data) {
    try {
        const pool = await connectToDatabase();
        const updates = Object.entries(data)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(', ');
        const query = `UPDATE ${tableName} SET ${updates} WHERE EmployeeID = ${id}`;
        await pool.request().query(query);
        console.log('Record updated successfully');
    } catch (err) {
        console.error('Error updating record:', err);
    }
}

// Delete operation
async function deleteRecord(tableName, id) {
    try {
        const pool = await connectToDatabase();
        const query = `DELETE FROM ${tableName} WHERE EmployeeID = ${id}`;
        const result = await pool.request().query(query);
        console.log('Rows affected:', result.rowsAffected);
        console.log('Record deleted successfully');
    } catch (err) {
        console.error('Error deleting record:', err);
    }
}

// Exporting the CRUD functions
module.exports = {
    createRecord,
    readRecords,
    updateRecord,
    deleteRecord,
    readRecordById
};