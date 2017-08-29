import React from 'react'

class SessaoDeLivros extends React.Component {
  
  render() {
    return (
      <ol className="books-grid">
        {this.props.livros.map((livro, index) => (
          <li key={index}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                 backgroundImage: `url(${livro.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select 
                  name={ livro.id }
                  value={ livro.shelf }
                  onChange={this.props.alteraStatus}
                  >
                    <option value="none" disabled>Mover para...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
              </div>
              <div className="book-title" >{livro.title}</div>
              <div className="book-authors">{livro.authors}</div>
            </div>
          </li>
        ), this)}
      </ol>
    ) 
  }
}

export default SessaoDeLivros;