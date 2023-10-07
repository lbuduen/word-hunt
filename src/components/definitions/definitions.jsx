import "./definitions.css";

const Definitions = ({ word, category, meanings, lightMode }) => {
  console.log(meanings);
  return (
    <div className="meanings">
      {
        meanings[0] && word && category === 'en' && (
          <audio src={meanings[0].phonetics[0]?.audio} controls>
            Your browser doesn&apos;t support audio element
          </audio>
        )
      }
      {word === "" ? <span className="subTitle">Start by typing something in Search</span>
        :
        (
          meanings.map(mean => mean.meanings.map(item => item.definitions.map((def, i) => (
            <div
              className="single-mean"
              key={i}
              style={{
                backgroundColor: lightMode ? '#3b5360' : 'white',
                color: lightMode ? 'white' : 'black',
              }}
            >
              <b>{def.definition}</b>
              <hr />
              {def.example && (
                <span>
                  <b>Example: </b>
                  {def.example}
                </span>
              )}
              {def.synonyms && (
                <span>
                  <b>Synonyms: </b>
                  {def.synonyms.join(", ")}
                </span>
              )}
            </div>
          ))))
        )
      }
    </div>
  )
}

export default Definitions;