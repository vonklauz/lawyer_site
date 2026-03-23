import { InputMask } from "@react-input/mask";
import styles from "../../Input/Input.module.css";
import { IMaskedInputProps } from "../model/types";

export const MaskedInput = ({
  label,
  type = "text",
  name,
  id,
  value,
  error,
  onChange,
  placeholder,
  children,
  mask,
  replacement,
  showMask,
  ...props
}: IMaskedInputProps) => {
  const maskProps = mask ? { mask, replacement } : { replacement };

  return (
    <div className="mb-[12px]">
      <label htmlFor={id ? id : name ? name : ""} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <InputMask
          {...maskProps}
          showMask={showMask}
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${props.disabled ? styles.readOnly : ""}`}
          {...props}
        />
        {children}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
