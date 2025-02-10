import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { JSX } from 'react';
import SearchInput from './components/SearchInput';
import CardBox from './components/CardBox';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { repositoriesData } from './slices/repoSlice';

const App = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState('');
  const { isLoading, error, status, hasNextPage } = useInfiniteScroll({
    searchInput,
  });

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100 my-3 overflow-hidden">
          <h1 className="display-4">GitHub Repository Finder</h1>
          <SearchInput
            isLoading={isLoading}
            error={error}
            status={status}
            searchInput={searchInput}
            changeInput={(val: string) => setSearchInput(val)}
          />
          <CardBox hasNextPage={hasNextPage} />
        </div>
      </div>
    </div>
  );
};

export default App;
