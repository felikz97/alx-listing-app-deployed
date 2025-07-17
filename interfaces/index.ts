// Global TypeScript Interfaces

export interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
  // Add more fields as needed for specific card variations
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
  // Add more fields as needed for specific card variations
}
//         <Loader2 className="animate-spin" />
//       )}
//       {children}
//     </button>
