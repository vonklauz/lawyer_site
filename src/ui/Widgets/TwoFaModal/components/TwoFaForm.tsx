import { Button } from "@/ui/Components/Button";
import { Input } from "@/ui/Components/Input";
import { useActivation2faEmailActivationPost, useActivation2faTotpActivationPost } from "@generated/lawyersSiteApiComponents";
import { useEffect, useState } from "react";

export const TwoFaForm: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(72); // 1:12
    const { mutate, data } = useActivation2faTotpActivationPost();
    console.log('2faData', data)
    const send2faRq = () => {
        mutate({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    }

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleResend = () => {
        // логика повторной отправки кода
        setTimer(72);
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };
    const base64 = "iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAEI0lEQVR4nO2cW4qlSBCGvxh9V+gF1FJ0B7OkYpY0O9Cl1AIa9LFAiXnIq6eZF7U5fTh/QBXePvIIQWT+EWGac8Hmv67QIFy4cOHChQsXLvxe3KK12Lia2chuzP1uNoa7LWb9brCmR8f7Rhf+bjju7s7g7u5L4z4BPnUb4doE4Qho4iOFmF763YU/C09etwDD0jh0G+4LQLela8nhyqm8Tvh9uE80ztyTXI/dGPzbmD82Quj7faMLfw+8/eXKajD43towNQ5rszFb4zZ8tdvdowt/Tzx5XefACgbNBiHgLdjwL9jg4HPfhEfrvPJLv7vwJ+OzmZn1wLCAjWuLfX7lQLi22OcCNrIHCXvr6MLfDA+OVcKXzx/fxtxjQU3Ano/Aj5Hu2T9e+IviWcM27r4Q9EI4ct/wqavvMvhGVLPSsMJPW/C6kBvJ/jfx4HpbdLip8xjs5HXCz1twtpIgjing7GsLweHSv3TX5XXCz1rWsN8G3c/WhmlvHRq3YcENms2gcWPtcdYen/ufN40u/J1xsx7cv1qYe6qaK3Tf5lOQFO7MH6mQcePowt8Nr+uwYdGW5EMqkPnBQh1207pO+D14SNANy56CG4TT0GmSm1FsJC4C/6AfL/yV8EpNhML/lEv7MVXi7lO3VWrWpxz/FOuEn7JDvi61loSukpCWiw4XNezSeN0H9dLvLvxZeK5NbFgoQeQ6xNw3OOsPZx4bJ8pXzFlzqeyl3134s/A0w3pqY8pCIkQ4IGXpSiTs1NUp/JKV2kRczbknqdCl6lc+itlkzbDCb8CDSvjHzGxc65Y7s343nwAbIWbzRs2wwm/B1xb7dPe0rmtyV3t6cv74NoaFFP/uHF34e+F5hgWgOWaJoWjYuMwriWTNsMJP20NtIumKqCYe8ioHrSGvE37WUpaY/ClOnD4fglt0wtRap1gn/IJVGjY4V+7grFLFS/2wNKzw+2oT8TTlRoJz5c9jy2nB5HXCz9khfGXRcNCwsSIb3NFT+k5eJ/y01Wnh0ktS5tq0hovbTpQVnrxO+GlL5Yi8VOtKo3q0FNwOBQp5nfDzVqmJoXz7VZZ0HrN5MZuS+lCkJoRfsJI5idvphAk3ruHKgq9qfJq0rhN+zcocWjXZxa9g4RDc8jYnypwIv2Z+tHhtoc6XZCGRep6Q1wm/jJe9OqFzt7HbMOvTWm82M/cvM2JDp6r/wi9ZyY2UskSsyD4e5aiHssTCL1n0uoX6owhIorXaYiL3N1Va96XfXfifg69t9sTd7HPZLdZhw/YA7vHo94wu/B3wx706bVh6DMDnkbC7hLOCz/3izH8D2nFC+DX8f9Z1QLUvdvXxTpef0wwr/LSVfAml5p/LrWlKLali6nqZvE74Gftlr876JHU/xb/Gy6N+y+jChQsXLly4cOHC78L/A6ItgZQrXWJiAAAAAElFTkSuQmCC"
    const src = `data:image/png;base64,${base64}`;
    return (
        // <img
        //     src={src}
        //     alt="QR code"
        //     className="w-40 h-40 object-contain border rounded-lg"
        // />
        <div className="flex flex-col items-center gap-6 w-[380px] p-6">
            <h2 className="text-lg font-semibold text-center">
                Подключение 2FA по номеру телефона
            </h2>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <Input
                        label="Номер телефона"
                        // type="tel"
                        placeholder="+7 (000) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">Код из смс</label>
                    <Input
                        label="Код из смс"
                        placeholder="123-456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <div className="text-sm">
                        <button
                            className="text-blue-600 hover:underline disabled:text-gray-400"
                            onClick={handleResend}
                            disabled={timer > 0}
                        >
                            Отправить код еще раз
                        </button>
                        <p className="text-gray-500 text-xs mt-1">
                            Повторно смс можно отправить через - {formatTime(timer)}
                        </p>
                    </div>
                </div>
            </div>

            <Button
                // variant="destructive"
                className="w-full py-2 text-white font-medium"
                onClick={send2faRq}
            >
                Отправить
            </Button>
        </div>
    );
};
