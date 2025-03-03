import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailAnime() {
  const { id } = useParams(); // Obtém o 'id' da URL
  const [anime, setAnime] = useState(null); // Estado para armazenar os dados do anime
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Fetch data when the component is mounted or the 'id' changes
  useEffect(() => {
    // Inicia a requisição
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/animes/${id}`);

        if (!response.ok) {
          throw new Error("Anime não encontrado!"); // Mensagem caso o anime não seja encontrado
        }

        const data = await response.json();
        setAnime(data); // Armazena os dados do anime
        setLoading(false); // Atualiza o estado para 'carregado'
      } catch (err) {
        setError(err.message); // Captura erro, se houver
        setLoading(false); // Atualiza o estado para 'carregado'
      }
    };

    fetchAnimeDetails(); // Chama a função de fetch
  }, [id]); // A requisição será feita novamente sempre que o 'id' mudar

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      {anime ? (
        <>
          <h1>{anime.nome}</h1>
          <p>ID: {anime.id}</p> {/* Exibe o ID também */}
        </>
      ) : (
        <p>Anime não encontrado.</p> // Exibe mensagem caso o anime não seja encontrado
      )}
    </div>
  );
}
