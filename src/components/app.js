import { useEffect, useState } from 'react';
import Team from './team';
import Feature from './feature';
import Article from './article';
import pages from '../data/pages.json';
import teams from '../data/teams.json';

const getActivePage = (url = '') => {
  const page = pages.find(page => url.match(page.match));
  if (!page) return null;
  return {
    ...page,
    ...(page.teams && { teams: page.teams.map(team => teams[team]) }),
    ...(page.features && { features: page.features.map((feature, index) => ({
      id: index,
      ...feature,
      ...(feature.team && { team: teams[feature.team] }),
      ...(feature.contact && { contact: contacts[feature.contact] }),
    }))})
  };
};

const App = () => {
  const [tab, setTab] = useState(null);
  const [page, setPage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [articleId, setArticleId] = useState(null);

  useState(() => {
    if (chrome && chrome.runtime) {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'validated-features') {
          setFeatures([...message.features]);
        }
        if (message.type === 'article-id') {
          setArticleId(message.articleId);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        setTab(tab);
        setPage(getActivePage(tab.url));
      });
    }
  }, []);

  useEffect(() => {
    if (page && page.features && tab && tab.id) {
      if (chrome && chrome.tabs) {
        chrome.tabs.sendMessage(tab.id, { type: 'inject', features: page.features });
      }
    }
  }, [page]);

  const handleFocus = match => {
    if (chrome && chrome.tabs) {
      chrome.tabs.sendMessage(tab.id, { type: 'focus', match });
    }
  };

  if (!page) return <h1>Nothing to see here.</h1>;
  const { name, teams = [] } = page;

  return (
    <div className="container">
      <h1>{name}</h1>
      {articleId && <Article articleId={articleId} />}
      {teams.length > 0 && <h2>Teams</h2>}
      {teams.map((team, index) => <Team key={index} { ...team} />)}
      {features.length > 0 && <h2>Features</h2>}
      {features.map((feature, index) => <Feature key={index} handleFocus={handleFocus} {...feature} />)}
    </div>
  );
};

export default App;
