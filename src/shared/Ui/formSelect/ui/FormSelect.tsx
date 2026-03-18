import { FormSelectProps } from "../model/types";
import styles from "./FormSelect.module.css";

export const FormSelect = ({
  label,
  id,
  name,
  error,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Выберите значение",
  className = "",
}: FormSelectProps) => {
  return (
    <div className="mb-[12px]">
      <label htmlFor={id ? id : name ? name : ""} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <select
          className={`${styles.input} cursor-pointer ${className}`}
          value={value && value !== "" ? value : ""}
          onChange={onChange}
          disabled={disabled || options.length === 0}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              className="cursor-pointer"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
