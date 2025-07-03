// 5. Form Component
const Form = ({
  onSubmit,
  children,
  title,
  className = "",
  isSubmitting = false,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div
      className={`glass p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <div onKeyDown={handleKeyDown} className="space-y-4">
        {children}
        {isSubmitting && (
          <div className="flex items-center justify-center py-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Processing...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
