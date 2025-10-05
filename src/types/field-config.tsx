// types/field-config.ts
export type FieldType = 'input' | 'select' | 'combobox' | 'checkbox' | 'textarea' | 'date';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  colSpan?: number;
  required?: boolean;
}