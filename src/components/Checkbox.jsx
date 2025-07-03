// 3. Checkbox Component
import { Check } from 'lucide-react';

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  description,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label
            className={`font-medium ${
              disabled ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {label}
          </label>
          {description && (
            <p className={`${disabled ? "text-gray-300" : "text-gray-500"}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
