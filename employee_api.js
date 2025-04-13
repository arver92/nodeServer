const express = require('express');
const { createRecord, readRecords, updateRecord, deleteRecord, readRecordById } = require('./db/dbInteractions');
const { logInfo,logError,logWarning } = require('./logger');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

logInfo('Server started and listening on port 3000');

// Endpoint to get all employees
app.get('/employees', async (req, res) => {
    try {
        // Log the request details
        logInfo('Received request to fetch all employees');

        const employees = await readRecords('Employees');
        res.status(200).json(employees);
    } catch (err) {
        logError('Error fetching employees:', err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await readRecordById('Employees', employeeId);
        if (employee.length > 0) {
            res.status(200).json(employee[0]);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

// Endpoint to create a new employee
app.post('/employees', async (req, res) => {
    try {
        const employeeData = req.body;
        await createRecord('Employees', employeeData);
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        console.error('Error creating employee:', err);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

// Endpoint to update an employee by ID
app.put('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedData = req.body;
        await updateRecord('Employees', employeeId, updatedData);
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});

// Endpoint to delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        await deleteRecord('Employees', employeeId);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Employee API is running on http://localhost:${port}`);
    logInfo(`Employee API is running on http://localhost:${port}`);
});