import React from 'react'
import SessaoDeLivros from './SessaoDeLivros.js'
import Searchpage from './SearchPage.js'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
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

  constructor(props) {
    super(props)
    this.alteraStatus = this.alteraStatus.bind(this);
    this.buscarLivro = this.buscarLivro.bind(this);
    this.adicionaLivro = this.adicionaLivro.bind(this);
  }
  
  componentDidMount() {
    this.pegarLivros();
  }

  componentWillReceiveProps() {
    this.setState({livrosBuscados: []})
  }

  pegarLivros() {
    BooksAPI.getAll().then((livros) => {
      this.setState({ livros })
    })
  }


  alteraStatus(event) {
    let value = event.target.value;
    let name = event.target.name;

    let livro = this.state.livros.find(x => x.id === name);
    livro.shelf = value

    let livrosAtuais = this.state.livros.filter(x => x.title !== livro.title);
    livrosAtuais.push(livro)

    BooksAPI.update(livro, value).then(() => {
      this.setState({ livros: livrosAtuais })
    })
  }

  adicionaLivro(event) {
    let livro = this.state.livrosBuscados.find(x => x.id === event.target.name);
    livro.shelf = event.target.value;
    let livros = this.state.livros.filter(x => x.id !== event.target.name);
    livros.push(livro);
    BooksAPI.update(livro, event.target.value).then(() => {
      this.setState({ livros })
    })
  }

  buscarLivro(event) {
    BooksAPI.search(event.target.value, 10)
      .then((livrosBuscados) => {
        try {
          let livrosAtt = [];
          livrosBuscados.forEach(function (element) {
            let livro = this.state.livros.find(x => x.id === element.id);
            if (livro !== undefined) {
              livrosAtt.push(livro)
            } else {
              element.shelf = ''
              livrosAtt.push(element);
            }
          }, this);

          this.setState({ livrosBuscados: livrosAtt })
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
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.estantes.map((sessao) => (
                  <div className="bookshelf" key={sessao.value}>
                    <h2 className="bookshelf-title">{sessao.nome}</h2>
                    <div className="bookshelf-books">
                      <SessaoDeLivros livros={this.state.livros.filter(x => x.shelf === sessao.value)}
                        alteraStatus={this.alteraStatus} />
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
        )} />

      </div>
    )
  }
}

export default BooksApp
