import { useState } from 'react';
import classes from './App.module.scss'
import Giphy from './components/Giphy/Giphy';
import Reddit from './components/Reddit/Reddit';

const pages = {
  giphy: 'giphy',
  reddit: 'reddit'
}

function App() {
  const [current, setCurrent] = useState(pages.giphy)

  const toggle = `
  img[name=${current}] {
    cursor: pointer;
    background: lightgreen;
    }
  `

  const top = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  return (
    <div>

      {/* Header */}
      <div className={classes.header}>
        <style>
          {toggle}
        </style>
        <h1>

          <img
            name='giphy'
            onClick={(event) => { setCurrent(pages.giphy) }}
            src={require('./assests/giphy.svg').default}
            alt="Giphy"
          />
          &nbsp;&nbsp;&nbsp;
          <img
            name='reddit'
            onClick={(event) => { setCurrent(pages.reddit) }}
            src={require('./assests/reddit.svg').default}
            alt="Reddit"
          />
        </h1>


      </div>
      {/* Header end */}

      {
        current === pages.giphy ?
          <Giphy />
          :
          <Reddit />
      }

      {/* <Giphy /> */}

      <img
        className={classes.arrow}
        src={`${require('./assests/arrow.svg').default}`}
        alt="Top"
        onClick={top}
      />
    </div>
  );
}

export default App;
