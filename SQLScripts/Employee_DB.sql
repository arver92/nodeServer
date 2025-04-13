-- 1. Create Database
CREATE DATABASE Employee;
GO

-- 2. Use the Employee database
USE Employee;
GO

-- 3. Create Department Table
CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName NVARCHAR(100) NOT NULL
);
GO

-- 4. Create Employees Table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Email NVARCHAR(100),
    HireDate DATE,
    Salary DECIMAL(10, 2),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);
GO

-- 5. Insert Sample Data into Department
INSERT INTO Department (DepartmentName) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing');
GO

-- 6. Insert Sample Data into Employees
INSERT INTO Employees (FirstName, LastName, Email, HireDate, Salary, DepartmentID) VALUES
('John', 'Doe', 'john.doe@example.com', '2021-05-01', 60000, 2),
('Jane', 'Smith', 'jane.smith@example.com', '2022-03-15', 55000, 1),
('Michael', 'Brown', 'michael.brown@example.com', '2020-10-20', 72000, 2),
('Emily', 'Davis', 'emily.davis@example.com', '2023-01-10', 48000, 3),
('Daniel', 'Wilson', 'daniel.wilson@example.com', '2019-07-30', 51000, 4);
GO

-- 7. Query to verify the data
SELECT e.EmployeeID, e.FirstName, e.LastName, e.Email, e.HireDate, e.Salary, d.DepartmentName
FROM Employees e
JOIN Department d ON e.DepartmentID = d.DepartmentID;
GO

--------------------------------------

-- Step 1: Create a SQL Server login (at server level)
CREATE LOGIN Emp_Admin WITH PASSWORD = 'T9v#Lm2!qZr@Xw';
GO

-- Step 2: Use the Employee database
USE Employee;
GO

-- Step 3: Create a user in the Employee database for that login
CREATE USER admin_login FOR LOGIN Emp_Admin;
GO

-- Step 4: Grant db_owner role to that user (full access)
ALTER ROLE db_owner ADD MEMBER admin_login;
GO

--Stored procedure to get employee details by ID
CREATE PROCEDURE usp_GetEmployeeById
    @EmployeeID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Employees
    WHERE EmployeeID = @EmployeeID;
END;