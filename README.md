Employee API  

Nodejs application that connect with SQL server to retrieve employee information and performs CRUD operations 

Package used in this app – express, winston, mssql  
 

API Documentation 

The Employee API provides endpoints to perform CRUD operations on the Employees table. 

Base URL 

http://localhost:3000 

Swagger 

To view the swagger file: https://editor.swagger.io/ 

Endpoints 

Get All Employees 

URL: /employees 

Method: GET 

Description: Fetches all employees from the database. 

Response: 

200 OK: Returns a list of employees. 

500 Internal Server Error: Failed to fetch employees. 

 

Get Employee by ID 

URL: /employees/:id 

Method: GET 

Description: Fetches a specific employee by their ID. 

Path Parameters: 

id (integer): The ID of the employee. 

Response: 

200 OK: Returns the employee details. 

404 Not Found: Employee not found. 

500 Internal Server Error: Failed to fetch employee. 

 

Create a New Employee 

URL: /employees 

Method: POST 

Description: Creates a new employee in the database. 

Request Body (JSON): 

{ 

    "EmployeeID": 6, 

    "FirstName": "Sarah", 

    "LastName": "Johnson", 

    "Email": "sarah.johnson@example.com", 

    "HireDate": "2025-04-13", 

    "Salary": 58000.00, 

    "DepartmentID": 3 

} 

 

Response: 

201 Created: Employee created successfully. 

500 Internal Server Error: Failed to create employee. 

 

Update an Employee by ID 

URL: /employees/:id 

Method: PUT 

Description: Updates an existing employee's details. 

Path Parameters: 

id (integer): The ID of the employee to update. 

Request Body (JSON): 

{ 

    "FirstName": "UpdatedName", 

    "LastName": "UpdatedLastName", 

    "Email": "updated.email@example.com", 

    "Salary": 60000.00 

} 

Response: 

200 OK: Employee updated successfully. 

500 Internal Server Error: Failed to update employee. 

 

Delete an Employee by ID 

URL: /employees/:id 

Method: DELETE 

Description: Deletes an employee from the database. 

Path Parameters: 

id (integer): The ID of the employee to delete. 

Response: 

200 OK: Employee deleted successfully. 

500 Internal Server Error: Failed to delete employee. 

 

Error Responses 

500 Internal Server Error: Indicates a failure in the database operation or server-side issue. 
