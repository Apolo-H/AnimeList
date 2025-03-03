const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "animes.json");

// Configuração do Multer para armazenar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Diretório para armazenar as imagens
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = Date.now() + fileExtension; // Nome único para o arquivo
        cb(null, fileName);
    }
});

const upload = multer({ storage });

// Usar JSON e CORS
app.use(express.json());
app.use(cors());

// 📌 Rota para obter a lista de animes
app.get("/animes", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler o arquivo" });
        res.json(JSON.parse(data));
    });
});

// 📌 Rota para obter um anime específico pelo ID
app.get("/animes/:id", (req, res) => {
    const animeId = parseInt(req.params.id);  // Converte o ID da URL para número
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler o arquivo" });

        const animes = JSON.parse(data);
        const anime = animes.find(a => a.id === animeId);  // Encontra o anime pelo ID

        if (!anime) {
            return res.status(404).json({ error: "Anime não encontrado!" });
        }

        res.json(anime);  // Retorna o anime encontrado
    });
});

// 📌 Rota para adicionar um novo anime (imagem opcional)
app.post("/animes", upload.single("imagem"), (req, res) => {
    const { nome } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : null; // Caso imagem não seja enviada, será null

    if (!nome) return res.status(400).json({ error: "Nome do anime é obrigatório" });

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler o arquivo" });

        const animes = JSON.parse(data);
        const novoAnime = { id: Date.now(), nome, imagem }; // Armazena a imagem, se existir
        animes.push(novoAnime);

        fs.writeFile(DATA_FILE, JSON.stringify(animes, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar o arquivo" });
            res.json(novoAnime);
        });
    });
});

// 📌 Rota para remover um anime
app.delete("/animes/:id", (req, res) => {
    const animeId = parseInt(req.params.id);

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler o arquivo" });

        let animes = JSON.parse(data);
        animes = animes.filter(anime => anime.id !== animeId);

        fs.writeFile(DATA_FILE, JSON.stringify(animes, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar o arquivo" });
            res.json({ message: "Anime removido com sucesso" });
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
