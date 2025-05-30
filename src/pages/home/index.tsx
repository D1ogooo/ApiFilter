import { useEffect, useState } from "react";
import axios from "axios";
import type { PessoasType, FilmsType } from "../../@types/dataTypes";

export function Home() {
  const [page, setPage] = useState<number>(1);
  const [pessoas, setPessoas] = useState<PessoasType[]>([]);
  const [filmes, setFilmes] = useState<FilmsType[]>([]);
  const [filterPessoas, setFilterPessoas] = useState<string[]>([]);
  const [actualPage, setActualPage] = useState<string | number>(1);
  const [pageUrl, setPageUrl] = useState("https://swapi.py4e.com/api/people");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [filterFilms, setFilterFilms] = useState<string[] | undefined>();

  //pessoas
  useEffect(() => {
    async function fetchPessoas() {
      try {
        const res = await axios.get(pageUrl)
        console.log(res)
        setPessoas(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      } catch (e) {
        console.error(e);
      }
    }
    fetchPessoas();
  }, [pageUrl])


  //filmes
  useEffect(() => {
    async function fetch() {
      try {
        const filmesPromise = await axios.get('https://swapi.py4e.com/api/films');
        setFilmes(filmesPromise?.data.results);
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

  function avancarPagina() {
    if (nextPage) {
      setActualPage(prev => Number(prev) + 1)
      setPageUrl(nextPage)
    }
  }


  function voltarPagina() {
    if (prevPage) {
      setPageUrl(prevPage)
    }
  }


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
          }}>Página {Number(actualPage)}</span>

          <button
            type="button"
            onClick={() => avancarPagina()}
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
