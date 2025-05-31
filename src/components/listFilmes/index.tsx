import { useEffect } from "react";
import { apiFilms } from "../../service/api";

export function ListFilmes({
    filterFilms,
    filmesUrl,
    setFilmes,
}: any) {
    useEffect(() => {
        async function fetch() {
          try {
            const filmesPromise = await apiFilms.get(filmesUrl);
            setFilmes(filmesPromise?.data.results);
          } catch (e) {
            console.error(e);
          }
        }
        fetch();
      }, [])

    return (
       <>
         <ul style={{ display: "flex", flexDirection: "column" }}>
        {filterFilms?.map((item: any) => (
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
       </>
    )
}