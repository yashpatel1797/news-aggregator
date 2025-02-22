export interface ButtonProps {
  onClick: () => void;
  label: string;
}
  
export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}