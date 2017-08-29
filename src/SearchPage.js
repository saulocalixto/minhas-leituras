import React from 'react'
import SessaoDeLivros from './SessaoDeLivros.js'
import { Link } from 'react-router-dom'

class Searchpage extends React.Component{

  render(){
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={this.props.buscarLivro} 
            placeholder="Procure pelo título ou autor"/>
          
        </div>
      </div>
      <div className="search-books-results">
        <SessaoDeLivros 
          livros={ this.props.livros } 
          alteraStatus={ this.props.alteraStatus }/>
      </div>
    </div>
    )
  }
}
export default Searchpage;