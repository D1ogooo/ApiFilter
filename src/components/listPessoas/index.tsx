import { useEffect } from "react";
import { apiPessoas } from "../../service/api";
import type { PessoasType } from "../../@types/dataTypes";

export function ListPessoas({
    pessoas,
    onHoverEnter,
    setPessoas,
    setNextPage,
    setPrevPage,
    pageUrl
}: any) {
    useEffect(() => {
        async function fetchPessoas() {
          try {
            const res = await apiPessoas.get(pageUrl)
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

    return (
    <>
    <ul style={{
        display: "flex", flexDirection: "column",
        gap: "10px", alignItems: "center", margin: "0 auto"
      }}>
        {pessoas.map((item: PessoasType) => (
          <li key={item.key} style={{
            color: "#fff", font: "14px", fontFamily: "sans-serif",
            listStyle: "none", cursor: "pointer"
          }}>
            <p onMouseEnter={() => onHoverEnter(item.name)}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </>
 )
}