import { FC } from "react";
import { useGetInstanceFields } from "../api/useGetInstanceFields";
import { InstanceDetailFormProps } from "../types/model";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Input } from "@/shared/Ui/Input";

const MOCK_DATA = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Field 1",
    type: "STRING",
    required: true,
    options: [{}],
    key: "key1",
    value: "пример загруженных данных",
  },
  {
    id: "4ba85f64-5717-4562-b3fc-2c963f66afa7",
    name: "Field 2",
    type: "INTEGER",
    required: true,
    options: [{}],
    key: "key2",
    value: 42,
  },
  {
    id: "5ca85f64-5717-4562-b3fc-2c963f66afa8",
    name: "Field 3",
    type: "STRING",
    required: true,
    options: [{}],
    key: "key3",
    value: "Шаблонные данные для инстанса",
  },
  {
    id: "6da85f64-5717-4562-b3fc-2c963f66afa9",
    name: "Field 4",
    type: "INTEGER",
    required: true,
    options: [{}],
    key: "key4",
    value: 123,
  },
  {
    id: "7ea85f64-5717-4562-b3fc-2c963f66afaa",
    name: "Field 5",
    type: "STRING",
    required: true,
    options: [{}],
    key: "key5",
    value: "Ещё шаблонные данные",
  },
];

export const InstanceDetailForm: FC<InstanceDetailFormProps> = ({
  instanceId,
}) => {
  const { data: instance } = useGetInstanceFields(instanceId);
  console.log(instance);

  return (
    <>
      <h2>{instance?.data.title}</h2>
      <div className="flex justify-center mt-3 lg:mt-5">
        <FormWrapper className="w-[100%] max-w-[500px]">
          {MOCK_DATA.map(({ id, name, value }) => (
            <div className="w-[100%]" key={id}>
              <Input label={name} onChange={(e) => {}} value={String(value)} />
            </div>
          ))}
        </FormWrapper>
      </div>
    </>
  );
};
