import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h2>❌ Página não encontrada!</h2>
            <p>Oops! Parece que você se perdeu.</p>
            <Link to="/">🔙 Voltar para a Home</Link>
        </>
    );
}
