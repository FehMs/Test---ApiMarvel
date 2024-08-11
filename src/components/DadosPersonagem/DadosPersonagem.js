import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCharacterById } from '../api/Marvel';
import { Footer } from '../Footer/Footer';
import './DadosPersonagem.css'
import Logo from '../../assets/logo/Group.png';
import lupaIcon from '../../assets/busca/Lupa/Shape.png';
import five from '../../assets/review/Group 4.png'


const DadosPersonagem = () => {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getDadosPersonagem = async () => {
      const data = await fetchCharacterById(id);
      setPersonagem(data);
    };

    getDadosPersonagem();
  }, [id]);

  if (!personagem) {
    return <div className='loading'>Loading...</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className='dados-container'>
        <header className='dados-header'>
          <Link to="/"><img src={Logo} alt="logo" /></Link>
          <div className="search-container-dados">
            <form className="search-bar-dados">
              <img className="icon-lupa-dados" src={lupaIcon} alt="Pesquisar" /> 
              <input
                type="text" 
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Procure por heróis" 
                className='search-input-dados'
              />
            </form>
          </div>
        </header>
        <div className="personagem-dados">
          <div className="dados-container-personagem">
            <h1>{personagem.name}</h1>
            <p className="descricao">{personagem.description}</p>
            <h3>Rating: <img src={five} alt='fivestars' /> </h3>
            <h2 className='ultimos'>Últimos quadrinhos</h2>
            <ul>
              {personagem.comics.items.map((comic, index) => (
                <li key={index}>{comic.name}</li>
              ))}
            </ul>
          </div>
          <div className='personagem-img'>
            <img
            src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} className='img-personagem' alt='foto-personagem'/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DadosPersonagem;
