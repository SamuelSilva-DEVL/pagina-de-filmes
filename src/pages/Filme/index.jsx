import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'

export function Filme(){
  const { id } = useParams()
  const navigate = useNavigate()

  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmePorId(){
      await api.get(`/movie/${id}`,{
        params: {
          api_key: "9a30b070ea780b406fba5d9f2ca8836e",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data)
        setLoading(false)
      })
      .catch(() =>{
        navigate("/", { replace: true })
        return;
      })
    }

    loadFilmePorId()

    
  }, [id, navigate])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilme){
      toast.warn("Esse filme já está em sua lista!")
      return;
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className='info-filme'>
        <h1>Carregando detalhes do filme...</h1>
      </div>
    )
  }

  return(
    <div className="info-filme">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className='area-buttons'>
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a 
              href={`https://youtube.com/results?search_query=${filme.title} Trailer`} 
              target="blank"
              rel='external'
            >
              Trailer
            </a>
          </button>
      </div>
    </div>
  )
}