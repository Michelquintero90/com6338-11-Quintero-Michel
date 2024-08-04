const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());
const makeTag = tag => str => `<${tag}>${str}</${tag}>`;
const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makePoemHTML = (poemJSON) => {
  const poem = poemJSON[0];
  const { title, author, lines } = poem;

  const makeH2 = makeTag('h2');
  const makeH3 = makeTag('h3');
  const makeEm = makeTag('em');
  const makeP = makeTag('p');

  const titleHTML = makeH2(title);
  const authorHTML = makeH3(makeEm(`by ${author}`));

  const linesHTML = lines
    .reduce((paragraphs, line) => {
      if (line === "") {
        paragraphs.push("");
      } else {
        if (paragraphs.length === 0) {
          paragraphs.push(line);
        } else {
          paragraphs[paragraphs.length - 1] += (paragraphs[paragraphs.length - 1] ? '<br>' : '') + line;
        }
      }
      return paragraphs;
    }, [])
    .map(makeP)
    .join('');

  return `${titleHTML}${authorHTML}${linesHTML}`;
};

getPoemBtn.onclick = async function() {
  const poemJSON = await getJSON(poemURL);
  poemEl.innerHTML = makePoemHTML(poemJSON);
};
