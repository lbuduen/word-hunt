import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { grey } from '@mui/material/colors';
import { alpha, styled } from '@mui/material';

import axios from 'axios';

import Header from "./components/header/header";
import Definitions from './components/definitions/definitions';
import useDebounce from './hooks/useDebounce';

function App() {
  const [category, setCategory] = useState("en");
  const [word, setWord] = useState("");
  const debouncedWord = useDebounce(word, 750);
  const [meanings, setMeanings] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const dictionryApi = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${category}/${debouncedWord}`;
    try {
      const req = await axios.get(url);
      setMeanings(req.data);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (debouncedWord) {
      dictionryApi();
    }
  }, [debouncedWord, category]);

  const GreySwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[600],
      '&:hover': {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[600],
    },
  }));

  return (
    <div
      className='App'
      style={{
        height: '100vh',
        backgroundColor: lightMode ? '#fff' : '#282c34',
        color: lightMode ? 'black' : 'white',
        transition: 'all 0.5s linear'
      }}
    >
      <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly' }}>
        <div style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}>
          <span>{lightMode ? 'Dark' : 'Light'} mode</span>
          <GreySwitch checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        </div>
        <Header category={category} setCategory={setCategory} word={word} setWord={setWord} lightMode={lightMode} />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode} />
        )}
      </Container>
    </div>
  )
}

export default App;