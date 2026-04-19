import { cn } from '@/utils/cn';

interface FormInputProps {
  className?: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'email';
}

export const FormInput = ({ className, name, placeholder, type = 'text' }: FormInputProps) => (
  <input
    className={cn(
      'w-full rounded-pill border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none',
      className,
    )}
    name={name}
    placeholder={placeholder}
    type={type}
  />
);