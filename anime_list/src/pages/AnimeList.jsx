import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/animes";

export default function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [novoAnime, setNovoAnime] = useState("");
  const [imagemAnime, setImagemAnime] = useState(null);

  // Carregar animes do backend
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setAnimes(data))
      .catch((error) => console.error("Erro ao carregar os animes:", error));
  }, []);

  // Adicionar Anime
  function adicionarAnime() {
    if (!novoAnime || !imagemAnime) return;

    const formData = new FormData();
    formData.append("nome", novoAnime);
    formData.append("imagem", imagemAnime);

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAnimes([...animes, data]);
        setNovoAnime("");
        setImagemAnime(null);
      })
      .catch((error) => console.error("Erro ao adicionar anime:", error));
  }

  // Remover Anime
  function removerAnime(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setAnimes(animes.filter((a) => a.id !== id));
      })
      .catch((error) => console.error("Erro ao remover anime:", error));
  }

  return (
    <div className="container">
      <h2>📺 Minha Anime List</h2>
      <div className="input-container">
        <input
          value={novoAnime}
          onChange={(e) => setNovoAnime(e.target.value)}
          placeholder="Nome do Anime"
        />
        <input
          type="file"
          onChange={(e) => setImagemAnime(e.target.files[0])}
        />
        <button onClick={adicionarAnime}>Adicionar</button>
      </div>

      <div className="anime-container">
        {animes.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img
              src={`http://localhost:5000${anime.imagem}`}
              alt={anime.nome}
              className="anime-image"
            />
            <h3>{anime.nome}</h3>
            <a href={`/anime-detail/${anime.id}`}>Ver Detalhes</a>
            <button onClick={() => removerAnime(anime.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
