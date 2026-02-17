import { Gap } from "@/shared/Ui/Gap";
import { Table } from "@/shared/Ui/Table";



export default function Home() {
  return (
    <div>
      <h1>Статусы дел, находящихся в работе</h1>
      <Gap size={32} />
      <Table title="Заявления" />
    </div>
  );
}
