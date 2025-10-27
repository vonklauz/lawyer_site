import { useState, useRef, ChangeEvent, KeyboardEvent, JSX, useCallback, useEffect } from "react";

interface OTPInputProps {
    onOtpSubmit: (otp: number) => void;
}

export const OTPInput = ({onOtpSubmit}: OTPInputProps): JSX.Element => {
    const [values, setValues] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const isOtpFilled = () => values.every((item) => typeof item === 'string' && item.length > 0);

    useEffect(() => {
        if (isOtpFilled()) {
            const code = Number(values.join(''));
            onOtpSubmit(code)
        }
    }, [values]);

    const setRef = useCallback((index: number) => (element: HTMLInputElement | null) => {
        inputsRef.current[index] = element;
    }, []);

    const handleChange = (index: number, value: string): void => {
        if (!/^\d?$/.test(value)) return; // Разрешаем только одну цифру

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        // Переключение на следующее поле, если введено значение
        if (value && index < values.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
        // Возврат на предыдущее поле при Backspace
        if (e.key === "Backspace" && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleInputChange = (index: number) =>
        (e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value);

    return (
        <div className="flex space-x-1 space-x-2-md justify-between">
            {values.map((val, i) => (
                <input
                    key={i}
                    ref={setRef(i)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={handleInputChange(i)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-12 text-2xl font-bold text-center border border-gray-300 focus:border-black focus:outline-none"
                />
            ))}
        </div>
    );
}