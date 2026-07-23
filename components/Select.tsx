import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: string
  options: Array<{ value: string; label: string }>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      icon = 'expand_more',
      options,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-sm w-full">
        {label && (
          <label className="text-label-md font-label-md text-on-surface">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-md py-sm pr-lg appearance-none bg-surface-container-low border ${
              error ? 'border-error' : 'border-outline-variant'
            } rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer ${
              className || ''
            }`}
            {...props}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <span className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined pointer-events-none">
            {icon}
          </span>
        </div>

        {error && (
          <p className="text-label-sm text-error flex items-center gap-xs">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-label-sm text-on-surface-variant">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
