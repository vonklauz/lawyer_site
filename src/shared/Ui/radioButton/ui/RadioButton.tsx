import styles from "./RadioInputStyles.module.css";
import { FC, useMemo, useRef, type ChangeEvent } from "react";
import { RadioProps } from "../model/types";

export const RadioButton: FC<RadioProps> = ({
  id,
  label,
  options,
  value,
  error,
  disabled,
  onChange,
}) => {
  const radioInputRef = useRef<HTMLInputElement | null>(null);
  const renderOptions = useMemo(
    () =>
      options?.map(({ id: choiceId, label: optionLabel }) => (
        <div className={styles.item} key={choiceId}>
          <input
            id={choiceId + id}
            className={styles.input}
            type="radio"
            value={choiceId}
            name={id}
            checked={value?.toString() === choiceId?.toString()}
            ref={radioInputRef}
            onChange={onChange}
          />
          <label htmlFor={choiceId + id} className={styles.optionLabel}>
            <span onClick={() => !disabled && radioInputRef?.current?.click()}>
              {optionLabel}
            </span>
          </label>
        </div>
      )),
    [options],
  );

  return (
    <div className="mb-[12px]">
      <label htmlFor={id ? id : ""} className={styles.label}>
        {label}
      </label>
      <div className={styles.options}>{renderOptions}</div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
