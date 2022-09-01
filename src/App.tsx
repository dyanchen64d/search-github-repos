import React, { useCallback, useEffect, useState } from 'react';
// import './App.css';
import { Octokit } from "octokit";
import ResultTable, { Item } from './components/ResultTable';
import SearchForm from './components/SearchForm';

const octokit = new Octokit({
  auth: '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'
})

const PER_PAGE = 50;

type ResultData = {
  items: Item[];
  total_count: number;
  incomplete_results: boolean;
} | null

const App: React.FC = () => {
  const [data, setData] = useState<ResultData>(null);

  const [currPage, setCurrPage] = useState(0);

  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(false);

  const submit = (q: string) => {
    setCurrPage(0);
    setQuery(q);
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    setCurrPage(newPage);
  }

  const doSearch = useCallback(async () => {
    if (currPage >= 0 && query) {
      setLoading(true);
      try {
        const result = await octokit.request('GET /search/repositories', {
          q: query,
          per_page: PER_PAGE,
          page: currPage + 1,
        })
        setData(result.data as ResultData);
      } catch (e) {
        console.log('error', e);
        setData(null);
      }
      setLoading(false);
    }
  }, [currPage, query])

  useEffect(() => {
    doSearch();
  }, [doSearch, currPage])

  return (
    <div className="App">
      <SearchForm submit={submit} />
      {
        data && (
          <ResultTable rows={data.items} total={data.total_count} page={currPage} perpage={PER_PAGE} changePage={handleChangePage} />
        )
      }
      {
        loading && (
          <div style={{ position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: 30 }}>Loading...</span>
          </div>
        )
      }
    </div>
  );
}

export default App;
