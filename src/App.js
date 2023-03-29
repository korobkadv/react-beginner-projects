import React from 'react';
import { Collection } from './Collection';
import { OnePhoto } from './OnePhoto';
import './index.scss';
import dots from './3dots.gif'
import back from './back.png'

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [allPage, setAllPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollertions] = React.useState([]);
  const [allCollections, setAllCollertions] = React.useState([]);
  const [photoOnePost, setPhotoOnePost] = React.useState({});

let collect = [];
searchValue === '' ? collect = collections : collect = allCollections;

  const categories = [
    { "name": "All" },
    { "name": "Sea" },
    { "name": "Mountains" },
    { "name": "Cities" },
    { "name": "Parks" }
  ];

  const categoriesParams = categoryId ? `category=${categoryId}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://6421a45034d6cd4ebd787d04.mockapi.io/photos?page=${page}&limit=3&${categoriesParams}`)
      .then((res) => res.json())
      .then((json) => {
        setCollertions(json);
      })
      .catch((error) => {
        console.warn(error);
        alert('Error getting data');
      }).finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  React.useEffect(() => {
    fetch('https://6421a45034d6cd4ebd787d04.mockapi.io/photos')
      .then((res) => res.json())
      .then((json) => {
        setAllCollertions(json);
        if (categoryId !== 0) {
          const filterCollection = json.filter((obj) => obj.category === categoryId);
          setAllPage(Math.ceil(filterCollection.length / 3));
          setPage(1);
        } else {
          setAllPage(Math.ceil(json.length / 3));
          setPage(1);
        }
      })
      .catch((error) => {
        console.warn(error);
        alert('Error getting data pages');
      });
  }, [categoryId]);

  React.useEffect(() => {
    if (searchValue) { setPage(1); }
  }, [searchValue]);

  return (
    <div className="App">
      <div className='wrapp'>
        {
          !photoOnePost.photos ? (

            <div className="top">
              <ul className="tags">
                {
                  categories.map((obj, i) => <li onClick={() => { setCategoryId(i); setSearchValue(''); }} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)
                }
              </ul>
              <input value={searchValue} onChange={e => { setSearchValue(e.target.value); setCategoryId(0);}} className="search-input" placeholder="Search" />
            </div>

          ) : (<div>
            <button onClick={() => setPhotoOnePost({})} className="buttunBack" > <img src={back} alt="back" /> Back</button>
            <h1> {photoOnePost.name} </h1>
          </div>)
        }
        <div className="content">
          {isLoading ? (<div> <h2>Loading</h2> <img src={dots} alt='3dots' className='dots' /> </div>) : (

            photoOnePost.photos ? (
              <OnePhoto photoOnePost={photoOnePost} />
            ) : (
              collect.filter(obj => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            }).map((obj, index) => (
              <div className="collection" onClick={() => setPhotoOnePost(obj)} key={index}>
                <Collection key={index}
                  name={obj.name}
                  images={obj.photos}
                />
              </div>
            ))
            )
          )}

        </div>
        <ul className="pagination">
          {
            searchValue !== '' || photoOnePost.photos ? '' :
              [...Array(allPage)].map((_, i) => <li className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)} key={i + 1}>{i + 1}</li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
