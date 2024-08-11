import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacters } from "./components/api/Marvel"; 
import './index.css'
import { Footer } from "./components/Footer/Footer";
import lupaIcon from './assets/busca/Lupa/Shape.png';
import Heart from './assets/icones/heart/Path Copy 2.png';
import FullHeart from './assets/icones/heart/Path@1,5x.png';
import Logo from './assets/logo/Group.png';
import ToogleOn from './assets/toggle/Group 2@2x.png';
import ToogleOff from './assets/toggle/Group 6@2x.png';
import Heroi from './assets/icones/heroi/noun_Superhero_2227044.png';


function App() {
  const [personagens, setPersonagem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOrdenado, setIsOrdenado] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [showFavoritos, setShowFavoritos] = useState(false);
  const [limiteFavorito, setLimiteFavorito] = useState(false); 
  const navigate = useNavigate();

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
    return isOrdenado ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
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

  const handleCardClick = (personagemId) => {
    navigate(`/personagem/${personagemId}`);
  };

  return (
    <div>
      <div className="App">
        <header>
          <img src={Logo} alt="logo" />
          <h2>EXPLORE O UNIVERSO</h2>
          <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
          <div className="search-container">
            <form className="search-bar">
              <img className="icon-lupa" src={lupaIcon} alt="Pesquisar" /> 
              <input
                type="text" 
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Procure por heróis" 
                className='search-input'
              />
            </form>
          </div>
        </header>
        <div className="filtros-container">
          <div className="filtros-content">
            <h3>Encontrados {sortedPersonagens.length} heróis</h3>
            <div className="filtros">
              <img src={Heroi} alt="heroi" className="icon-heroi" />
              <button onClick={toggleSortOrder} className="button-filtro-Order">
                Ordenar por Nome - A/Z {isOrdenado ? <img src={ToogleOff} alt="toogle" className="icon-toogle" /> : <img src={ToogleOn} alt="toogle" className="icon-toogle" />}
              </button>
              <button onClick={toggleShowFavoritos} className="button-filtro">
                <img src={FullHeart} alt="FullHeart" className="icon-filtro" /> 
                {showFavoritos ? "Esconder Favoritos" : "Mostrar Favoritos"}
              </button>
            </div>
          </div>
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
                    <div className="card-info">
                      <h2 className="card-title">{personagem.name}</h2>
                      <button 
                        onClick={() => toggleFavorito(personagem)} 
                        className="favorito"
                      >
                        <img src={FullHeart} alt="FullHeart" />
                      </button>
                    </div>
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
            <div 
              key={personagem.id} 
              className="card"
              onClick={() => handleCardClick(personagem.id)}
            >
              <img
                src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} 
                alt={personagem.name}
                className="card-image"
              />
              <hr size="1" width="100%" align="center" color="red"></hr>
              <div className="card-content">
                <div className="card-info">
                  <h2 className="card-title">{personagem.name}</h2>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorito(personagem);
                    }} 
                    className="favoritar"
                  >
                    {favoritos.includes(personagem) ? <img src={FullHeart} alt="FullHeart"/> : <img src={Heart} alt="Heart"/> }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
