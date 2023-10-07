import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "./header.css";
import categories from '../../data/category';

const Header = ({ category, setCategory, word, setWord, lightMode }) => {
  const theme = createTheme({
    palette: {
      mode: lightMode ? 'light' : 'dark',
      primary: {
        main: lightMode ? '#000' : '#fff'
      }
    },
  });

  const handleChangeLanguage = (e) => {
    setCategory(e.target.value);
    setWord("");
  }

  return (
    <header>
      <h1>{word ? word : 'Word hunt'}</h1>
      <div className="inputs">
        <ThemeProvider theme={theme}>
          <TextField
            className='search'
            label="Search word"
            variant="standard"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            className='select'
            select
            value={category}
            onChange={handleChangeLanguage}
            label="Language"
            variant='standard'
          >
            {
              categories.map((cat) => (
                <MenuItem key={cat.label} value={cat.label}>
                  {cat.value}
                </MenuItem>
              ))
            }
          </TextField>
        </ThemeProvider>
      </div>
    </header>
  )
}

export default Header;