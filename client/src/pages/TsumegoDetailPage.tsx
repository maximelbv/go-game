import { useParams } from "react-router";
import { useTsumego } from "../providers/TsumegoProvider";
import TsumegoBoard from "../components/TsumegoBoard";
import { useUser } from "../providers/UserProvider";

const TsumegoDetailPage = () => {
  const { id } = useParams();
  const { tsumegos, loading } = useTsumego();
  const { user } = useUser();

  if (loading) return <p>Loading...</p>;

  const tsumego = tsumegos.find((t) => t.id === Number(id));

  if (!tsumego) return <p>Tsumego not found.</p>;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-2xl text-bold">{tsumego.title}</h1>
      {user && <TsumegoBoard data={tsumego.json_data} tsumegoId={tsumego.id} />}
    </div>
  );
};

export default TsumegoDetailPage;
