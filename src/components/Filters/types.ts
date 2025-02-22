export interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    label: string;
  }
  
  export interface DateChangeParams {
    type: 'from' | 'to';
    value: string;
  }