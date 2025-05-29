import { useEffect, useState } from "react";
import axios from "axios";
import type { PessoasType, FilmsType } from "../../@types/dataTypes";

export function Home() {
  const [page, setPage] = useState<number>();
  const [pessoas, setPessoas] = useState<PessoasType[]>([]);
  const [filmes, setFilmes] = useState<FilmsType[]>([]);
  const [filterPessoas, setFilterPessoas] = useState<string[]>([]);
  const [filterFilms, setFilterFilms] = useState<string[] | undefined>();

  useEffect(() => {
    async function fetch() {
      try {
        const pessoasPromise = await axios.get('https://swapi.py4e.com/api/people');
        const filmesPromise = await axios.get('https://swapi.py4e.com/api/films');
        setPessoas(pessoasPromise?.data.results);
        setFilmes(filmesPromise?.data.results);

        // console.log('Pessoas:', pessoasPromise.data);
        // console.log('Filmes:', filmesRes.data.results);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [])

  function onHoverEnter(name: string) {
    const pessoa = pessoas.find((e) => e.name === name)
    if (!pessoa) {
      return console.log('error')
    }
    const urlPessoa = pessoa.url
    const filter = filmes.filter((filme) => filme.characters.includes(urlPessoa))
    const titles = filter.map((titles) => titles.title);
    return setFilterFilms(titles)
  }

  function avancarPagina() { }

  function voltarPagina() { }


  return (
    <>
      <h1 style={{ color: "#fff", marginBottom: "2rem" }}>📄 Dados dos personagems</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "auto" }}>

        <section style={{ width: "100%", marginBottom: "2rem", display: "flex" }}>
          <ul style={{
            display: "flex", flexDirection: "column",
            gap: "10px", alignItems: "center", margin: "0 auto"
          }}>
            {pessoas.map((item) => (
              <li key={item.key} style={{
                color: "#fff", font: "14px", fontFamily: "sans-serif",
                listStyle: "none", cursor: "pointer"
              }}>
                <p onMouseEnter={() => onHoverEnter(item.name)}
                // sonMouseLeave={() => ()}
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              background: "#000",
              width: "25rem",
              height: "100vh",
              position: "fixed",
              right: 0,
              top: 0,
            }}
          >
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {filterFilms?.map((item) => (
                <li key={item} style={{
                  color: "#fff", font: "14px", fontFamily: "sans-serif",
                  listStyle: "none", cursor: "pointer",
                  gap: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <p style={{ padding: "5px" }}
                  >{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}>
          <button
            type="button"
            onClick={voltarPagina}
            style={{
              padding: "8px", fontFamily: "sans-serif", fontWeight: "500", cursor: "pointer",
              border: "none", borderRadius: "3px", background: "#21042c", color: "#fff"
            }}
          >
            Anterior
          </button>

          <span style={{
            color: "#fff",
            fontFamily: "sans-serif"
          }}>Página {page}</span>

          <button
            type="button"
            onClick={avancarPagina}
            style={{
              padding: "8px", fontFamily: "sans-serif", fontWeight: "500", cursor: "pointer",
              border: "none", borderRadius: "3px", background: "#21042c", color: "#fff"
            }}
          >
            Próximo
          </button>
        </div>
      </div >
    </>
  );
}
