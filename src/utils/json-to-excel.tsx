import * as XLSX from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';

interface ExcelExportOptions {
  sheetName?: string;
  dateFormat?: string;
  headerStyle?: any;
}

/**
 * Converts JSON data to Excel file with dynamic headers and proper data type handling
 */
export function jsonToExcel<T extends Record<string, any>>(
  data: T[],
  options: ExcelExportOptions = {}
): WorkBook {
  if (!data || data.length === 0) {
    throw new Error('No data provided for Excel export');
  }

  const {
    sheetName = 'Sheet1',
    dateFormat = 'YYYY-MM-DD',
    headerStyle = { font: { bold: true } }
  } = options;

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet: WorkSheet = {};

  // Extract headers from the first object
  const headers = Object.keys(data[0]);
  
  // Prepare data for Excel with proper formatting
  const excelData = data.map(row => {
    const processedRow: Record<string, any> = {};
    
    headers.forEach(header => {
      const value = row[header];
      processedRow[header] = formatValueForExcel(value);
    });
    
    return processedRow;
  });

  // Convert JSON to worksheet
  const ws = XLSX.utils.json_to_sheet(excelData, { header: headers });

  // Apply header styling
  if (ws['!ref']) {
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
      if (!ws[cellAddress].s) {
        ws[cellAddress].s = headerStyle;
      }
    }
  }

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, ws, sheetName);

  return workbook;
}

/**
 * Formats different data types for Excel export
 */
function formatValueForExcel(value: any): any {
  if (value === null || value === undefined) {
    return '';
  }

  // Handle Date objects
  if (value instanceof Date) {
    return value;
  }

  // Handle string timestamps
  if (typeof value === 'string' && isIsoDateString(value)) {
    return new Date(value);
  }

  // Handle boolean values
  if (typeof value === 'boolean') {
    return value;
  }

  // Handle numbers
  if (typeof value === 'number') {
    return value;
  }

  // Handle JSON objects/arrays
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  // Handle string values
  return String(value);
}

/**
 * Checks if a string is an ISO date string
 */
function isIsoDateString(str: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
  return isoRegex.test(str);
}

/**
 * Saves workbook to file
 */
export function saveWorkbook(workbook: WorkBook, filename: string): void {
  XLSX.writeFile(workbook, filename);
}