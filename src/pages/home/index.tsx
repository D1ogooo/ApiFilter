import { useEffect, useState } from "react";
import type { PessoasType, FilmsType } from "../../@types/dataTypes";
import { apiFilms, apiPessoas } from "../../service/api";
import { ListPessoas } from "../../components/listPessoas";
import { ListFilmes } from "../../components/listFilmes";

export function Home() {
  const [pessoas, setPessoas] = useState<PessoasType[]>([]);
  const [filmes, setFilmes] = useState<FilmsType[]>([]);
  const [actualPage, setActualPage] = useState<string | number>(1);
  const [pageUrl, setPageUrl] = useState<string>("https://swapi.py4e.com/api/people");
  const [filmesUrl, setFilmesUrl] = useState<string>("https://swapi.py4e.com/api/films")
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [filterFilms, setFilterFilms] = useState<string[] | undefined>();

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
    if(Number(actualPage) === 9) {
      return;
    }

    if (nextPage) {
      setActualPage(prev => Number(prev) + 1)
      setPageUrl(nextPage)
    }

  }


  function voltarPagina() {
    if(Number(actualPage) === 1) {
      return;
    }

    if (prevPage) {
      setPageUrl(prevPage)
    }
  }


  return (
    <>
      <h1 style={{ color: "#fff", marginBottom: "2rem" }}>📄 Dados dos personagems</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "auto" }}>

        <section style={{ width: "100%", marginBottom: "2rem", display: "flex" }}>
          <ListPessoas 
           pessoas={pessoas}
           setPessoas={setPessoas}
           setNextPage={setNextPage}
           setPrevPage={setPrevPage}
           pageUrl={pageUrl}
           onHoverEnter={onHoverEnter}
          />

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
           <ListFilmes
            filterFilms={filterFilms}
            setFilmesUrl={setFilmesUrl}
            setFilmes={setFilmes}
            filmesUrl={filmesUrl}
           />
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
