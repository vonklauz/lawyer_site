import styles from "./FormSelect.module.css";

export const FormSelect = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
}) => {
  return (
    <div className="mb-[12px]">
      <label htmlFor={id ? id : name ? name : ""} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <select
          className={`${styles.input} cursor-pointer ${className}`}
          value={value}
          onChange={onChange}
        >
          {/* {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )} */}
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
    </div>
  );
};
