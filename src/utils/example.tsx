import { excelToJson } from "./excel-to-json";
import { jsonToExcel, saveWorkbook } from "./json-to-excel";

// Example 1: Export JSON to Excel
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    active: true,
    salary: 50000.50,
    birthDate: new Date('1990-01-15'),
    createdAt: '2023-01-01T10:00:00Z',
    metadata: { department: 'IT', role: 'admin' }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    active: false,
    salary: 60000.75,
    birthDate: new Date('1985-05-20'),
    createdAt: '2023-01-02T14:30:00Z',
    metadata: { department: 'HR', role: 'manager' }
  }
];

// Create Excel file
const workbook = jsonToExcel(sampleData, { sheetName: 'Employees' });
saveWorkbook(workbook, 'employees.xlsx');

// Example 2: Import Excel to JSON
const importedData = excelToJson('employees.xlsx', {
  dateColumns: ['birthDate', 'createdAt'],
  booleanColumns: ['active'],
  jsonColumns: ['metadata'],
  numberColumns: ['id', 'salary']
});

console.log(importedData);
// This will output properly typed JSON data ready for database insertion