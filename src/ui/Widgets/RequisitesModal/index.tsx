import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { format } from "date-fns";

export const RequisitesModal = ({ isOpen, schema, details, onConfirm, onEdit }: {
  isOpen: boolean;
  schema: {};
  details: {};
  onConfirm: () => void;
  onEdit: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font-light" onClose={onEdit}>
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-1 p-4-lg">
          <DialogPanel
            transition
            className="w-full max-w-lg  bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black text-center mb-5">

            </DialogTitle>
            <div className="flex flex-col gap-4 bg-white rounded-2xl w-full max-w-md">
              <h2 className="text-center text-lg font-medium">
                Проверьте реквизиты перед сохранением
              </h2>

              <div className="text-sm text-gray-700 space-y-3">
                {/**@ts-expect-error позже типизировать */}
                {schema?.map(({ title, type, name }) => (
                  <div key={name}>
                    <p className="font-medium">{title}</p>
                    {/**@ts-expect-error позже типизировать */}
                    <p className="text-gray-500 mt-1">{type !== 'date' ? details[name] : details[name] && format(details[name], 'dd.MM.yyyy')}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Все правильно</span>
              </label>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={onConfirm}
                  disabled={!checked}
                  className={`py-2 rounded-md font-medium text-white transition ${checked
                    ? "blue-bg"
                    : "bg-indigo-300 cursor-not-allowed! "
                    }`}
                >
                  Сохранить
                </button>

                <button
                  onClick={onEdit}
                  className="py-2 rounded-md font-medium text-white red-bg transition"
                >
                  Вернуться к редактированию
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

  );
}
