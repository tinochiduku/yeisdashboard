import * as XLSX from 'xlsx';

interface ExcelImportOptions {
  sheetName?: string;
  dateColumns?: string[];
  booleanColumns?: string[];
  jsonColumns?: string[];
  numberColumns?: string[];
}

/**
 * Converts Excel file to JSON data with proper type conversion
 */
export function excelToJson<T extends Record<string, any>>(
  filePath: string,
  options: ExcelImportOptions = {}
): T[] {
  // Read the workbook
  const workbook = XLSX.readFile(filePath);
  
  const {
    sheetName = workbook.SheetNames[0],
    dateColumns = [],
    booleanColumns = [],
    jsonColumns = [],
    numberColumns = []
  } = options;

  // Get the specified worksheet
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in the Excel file`);
  }

  // Convert worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    raw: false, // Get formatted strings for dates
    defval: null // Default value for empty cells
  }) as Record<string, any>[];

  // Process each row with type conversion
  const processedData = jsonData.map(row => {
    const processedRow: Record<string, any> = {};
    
    Object.keys(row).forEach(key => {
      const value = row[key];
      processedRow[key] = convertExcelValue(value, key, {
        dateColumns,
        booleanColumns,
        jsonColumns,
        numberColumns
      });
    });
    
    return processedRow as T;
  });

  return processedData;
}

/**
 * Converts Excel cell values to proper JavaScript types
 */
function convertExcelValue(
  value: any,
  columnName: string,
  options: {
    dateColumns: string[];
    booleanColumns: string[];
    jsonColumns: string[];
    numberColumns: string[];
  }
): any {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const { dateColumns, booleanColumns, jsonColumns, numberColumns } = options;

  // Handle date columns
  if (dateColumns.includes(columnName)) {
    return parseDateValue(value);
  }

  // Handle boolean columns
  if (booleanColumns.includes(columnName)) {
    return parseBooleanValue(value);
  }

  // Handle JSON columns
  if (jsonColumns.includes(columnName)) {
    return parseJsonValue(value);
  }

  // Handle number columns
  if (numberColumns.includes(columnName)) {
    return parseNumberValue(value);
  }

  // Auto-detect types for unconfigured columns
  return autoDetectType(value);
}

/**
 * Parses date values from Excel
 */
function parseDateValue(value: any): Date | string | null {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    // Try to parse as ISO date string
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }

    // Try to parse as Excel serial date (if it's a number string)
    const num = Number(value);
    if (!isNaN(num)) {
      return XLSX.SSF.parse_date_code(num);
    }

    return value; // Return as string if can't parse
  }

  if (typeof value === 'number') {
    // Excel dates are stored as numbers
    return XLSX.SSF.parse_date_code(value);
  }

  return null;
}

/**
 * Parses boolean values from Excel
 */
function parseBooleanValue(value: any): boolean | null {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase().trim();
    if (['true', 'yes', '1', 'y'].includes(lowerValue)) return true;
    if (['false', 'no', '0', 'n'].includes(lowerValue)) return false;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  return null;
}

/**
 * Parses JSON values from Excel
 */
function parseJsonValue(value: any): any {
  if (typeof value === 'object') {
    return value;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value; // Return as string if not valid JSON
    }
  }

  return value;
}

/**
 * Parses number values from Excel
 */
function parseNumberValue(value: any): number | null {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const num = parseFloat(value.replace(/,/g, ''));
    return isNaN(num) ? null : num;
  }

  return null;
}

/**
 * Auto-detects type for unconfigured columns
 */
function autoDetectType(value: any): any {
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value;

  if (typeof value === 'string') {
    // Check if it's a number
    const num = parseFloat(value);
    if (!isNaN(num) && value.trim() === num.toString()) return num;

    // Check if it's a boolean
    const lowerValue = value.toLowerCase().trim();
    if (['true', 'false', 'yes', 'no'].includes(lowerValue)) {
      return parseBooleanValue(value);
    }

    // Check if it's a date
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;

    return value;
  }

  return value;
}