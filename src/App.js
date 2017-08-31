import React from 'react'
import Searchpage from './SearchPage.js'
import PaginaInicial from './PaginaInicial.js'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  estantes = [
    {
      nome: 'Currently Reading',
      value: 'currentlyReading'
    },
    {
      nome: 'Want to Read',
      value: 'wantToRead'
    },
    {
      nome: 'Read',
      value: 'read'
    }
  ]
  state = {
    livros: [],
    livrosBuscados: []
  }
  
  componentDidMount() {
    this.pegarLivros();
  }

  componentWillReceiveProps() {
    this.setState({livrosBuscados: []})
  }

  pegarLivros = () => {
    BooksAPI.getAll().then((livros) => {
      this.setState({ livros })
    })
  }


  alteraStatus = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const livro = this.state.livros.filter(x => x.id === name).map(x => ({...x, shelf: value})).find(x => x);

    const livrosAtuais = this.state.livros.filter(x => x.title !== livro.title).concat([livro]);

    this.atualizaLivro(value, livro, livrosAtuais);
  }

  adicionaLivro = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    const livro = this.state.livrosBuscados.find(x => x.id === name);
    livro.shelf = value;

    const livros = this.state.livros.filter(x => x.id !== name).concat([livro]);
    this.atualizaLivro(value, livro, livros);
  }

  atualizaLivro = (value, livro, livros) => {
    BooksAPI.update(livro, value).then(() => {
      this.setState({ livros })
    })
  }

  buscarLivro = (event) => {
    const value = event.target.value;

    if(value === "") {
      this.atualizaResultado([]);
    } else {
      this.efetuaBuscas(value);
    }
  }

  atualizaResultado = (livrosBuscados) => {
    this.setState({ livrosBuscados })
  }

  efetuaBuscas = (value) => {
    let livrosAtt = [];
    BooksAPI.search(value, 10)
      .then((livrosBuscados) => {
        try {
          livrosBuscados.forEach(function (element) {
            let livro = this.state.livros.find(x => x.id === element.id);
            if (livro !== undefined) {
              livrosAtt.push(livro)
            } else {
              element.shelf = 'none'
              livrosAtt.push(element);
            }
          }, this);

          this.atualizaResultado(livrosAtt);
        }
        catch (err) {
        }
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={({ history }) => (
          <Searchpage
            livros={this.state.livrosBuscados}
            alteraStatus={this.adicionaLivro}
            buscarLivro={this.buscarLivro} />
        )} />
        <Route exact path='/' render={() => (
          <PaginaInicial 
          estantes={ this.estantes }
          livros={ this.state.livros } 
          alteraStatus={ this.alteraStatus }/>
        )} />

      </div>
    )
  }
}

export default BooksApp
