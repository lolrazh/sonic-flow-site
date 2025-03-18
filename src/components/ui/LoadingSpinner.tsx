interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  fullScreen = false,
  className = ""
}: LoadingSpinnerProps) {
  // Determine sizes based on the size prop
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  const spinnerElement = (
    <div className={`animate-spin rounded-full border-4 border-dark-600 border-t-accent-600 ${sizeClasses[size]} ${className}`}></div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-900">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
} 