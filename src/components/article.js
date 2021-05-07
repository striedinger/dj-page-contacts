const Article = ({ articleId, env }) => {
  const isProd = env === 'prod';
  const consumerToolsProxy = 'http://consumer-tools.dowjones.net/publishing/proxy?url=';
  const allessehPrefix = `https://allesseh-api.${isProd ? '' : 'dev.'}content.dowjones.io`;
  const allessehCapiLink = consumerToolsProxy + encodeURIComponent(allessehPrefix + '/api/Articles/v1/wsj/originid/' + articleId);
  const capiConverterLink = allessehCapiLink + '&convertCapi=true';
  const DJMLLink = `http://ed-web.${isProd ? "prod" : "int"}.pubedit.dowjones.io/article/Djml/by/sbId/${articleId}.xml`;
  const t1Prefix = isProd ? 'prod.t1contentsvc.virginia' : 't1contentsvc.shared';
  const t1Link = `http://${t1Prefix}.onservo.com/articles/v1/Articles/${articleId}`;
  const t1RefreshLink = `http://${t1Prefix}.onservo.com/refreshArticles?id=${articleId}`;
  const copyToClipboard = (text) => navigator.clipboard.writeText(text);
  return (
    <details className="card">
      <summary>Article Data Sources</summary>
      <div className="content">
        <ul>
          <li>
            ID: {articleId}
          </li>
          <li>
            <a href={allessehCapiLink} target="_blank">Allesseh</a>
          </li>
          <li>
            <a href={capiConverterLink} target="_blank">Capi Converter</a>
          </li>
          <li>
            <a href={DJMLLink} target="_blank">DJML</a>
          </li>
          <li>
            <a href={t1Link} target="_blank">T1</a>
          </li>
          <li>
            <a href={t1RefreshLink} target="_blank">T1 Refresh</a>
          </li>
        </ul>
      </div>  
    </details>
  )
};

export default Article;
