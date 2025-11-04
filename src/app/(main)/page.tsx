import { Gap } from "@/ui/Components/Gap";
import { Table } from "@/ui/Components/Table";



export default function Home() {
  return (
    <div>
      <h1>Статусы дел, находящихся в работе</h1>
      <Gap size={32} />
      <Table title="Заявления" />
    </div>
  );
}
