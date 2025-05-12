import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-[#f12476] text-center text-white p-4">
      <h1 className="text-2xl">Checkpoint : frontend</h1>
      <Link to="/">Countries</Link>
    </header>
  );
}
