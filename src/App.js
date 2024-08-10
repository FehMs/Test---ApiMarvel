import React, { useEffect, useState } from "react";
import { fetchCharacters } from "./components/api/Marvel"; 
import lupaIcon from './assets/busca/Lupa/Shape.png';

function App() {
  const [personagens, setPersonagem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOrdenado, setIsOrdenado] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [showFavoritos, setShowFavoritos] = useState(false);
  const [limiteFavorito, setLimiteFavorito] = useState(false); 

  useEffect(() => {
    const getCharacters = async () => {
      const characters = await fetchCharacters();
      setPersonagem(characters);
    };

    getCharacters();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersonagens = personagens.filter((personagem) =>
    personagem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPersonagens = filteredPersonagens.sort((a, b) => {
    if (isOrdenado) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const toggleSortOrder = () => {
    setIsOrdenado(!isOrdenado);
  };


  const toggleFavorito = (personagem) => {
    if (favoritos.includes(personagem)) {
      setFavoritos(favoritos.filter((fav) => fav !== personagem));
      setLimiteFavorito(false);
    } else {
      if (favoritos.length < 5) {
        setFavoritos([...favoritos, personagem]);
        setLimiteFavorito(false);
      } else {
        setLimiteFavorito(true);
      }
    }
  };

  const toggleShowFavoritos = () => {
    setShowFavoritos(!showFavoritos);
  };

  return (
    <div className="App">
      <header>
        <h1>Marvel Comics</h1>
        <form className="search-bar">
          <input
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar personagem" 
            className='search-input'
          />
          <img className="icon-lupa" src={lupaIcon} alt="Pesquisar"/>
        </form>
      </header>
      <div className="filtros">
        <button onClick={toggleShowFavoritos} className="button-filtro">
          {showFavoritos ? "Ocultar Favoritos | |" : "Mostrar Favoritos | |"}
        </button>
        <button onClick={toggleSortOrder} className="button-filtro">
          Ordenar por Nome {isOrdenado ? " ⇧" : " ⇩"}
        </button>
      </div>
      {showFavoritos && (
        <div className="favoritos-section">
          <h2>Favoritos</h2>
          <div className="cards-container">
            {favoritos.map((personagem) => (
              <div key={personagem.id} className="card">
                <img
                  src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} 
                  alt={personagem.name}
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">{personagem.name}</h2>
                  <button 
                    onClick={() => toggleFavorito(personagem)} 
                    className="favorito"
                  >
                    ❤️ Remover Favorito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {limiteFavorito && (
        <p className="limite-mensagem">Você atingiu o limite de 5 favoritos.</p>
      )}
      <div className="cards-container">
        {sortedPersonagens.map((personagem) => (
          <div key={personagem.id} className="card">
            <img
              src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} 
              alt={personagem.name}
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">{personagem.name}</h2>
              <button 
                onClick={() => toggleFavorito(personagem)} 
                className="favoritar"
              >
                {favoritos.includes(personagem) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
