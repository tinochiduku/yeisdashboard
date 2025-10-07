export type FieldType = 'input' | 'select' | 'combobox' | 'checkbox' | 'textarea' | 'date';

interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  colSpan?: number;
  required?: boolean;
}

// Case 1: For select and combobox, `options` is required
interface FieldConfigWithOptions extends BaseFieldConfig {
  type: 'select' | 'combobox';
  options: { label: string; value: string }[];
}

// Case 2: For other types, `options` must not appear (or is optional but unused)
interface FieldConfigWithoutOptions extends BaseFieldConfig {
  type: Exclude<FieldType, 'select' | 'combobox'>;
  options?: never;
}

export type FieldConfig = FieldConfigWithOptions | FieldConfigWithoutOptions;
