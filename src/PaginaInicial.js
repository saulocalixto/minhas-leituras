import React from 'react'
import SessaoDeLivros from './SessaoDeLivros.js'
import { Link } from 'react-router-dom'

const PaginaInicial = (props) => {
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {props.estantes.map((sessao) => (
              <div className="bookshelf" key={sessao.value}>
                <h2 className="bookshelf-title">{sessao.nome}</h2>
                <div className="bookshelf-books">
                  <SessaoDeLivros livros={props.livros.filter(x => x.shelf === sessao.value)}
                    alteraStatus={props.alteraStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='add-contact'
          >Adicionar livro</Link>
        </div>
      </div>
    )
}

export default PaginaInicial;