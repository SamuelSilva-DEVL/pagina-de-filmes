import { Link } from "react-router-dom";
import './erro.css'

export function Erro(){
  return(
    <div className="not-found">
      <h1>Erro</h1>
      <h2>Página não encontrada</h2>

      <Link to="/">Veja todos os filmes!</Link>
    </div>
  )
}