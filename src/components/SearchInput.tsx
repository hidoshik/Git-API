import { useState } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';


const SearchInput = () => {
  const [searchInput, setSearchInput] = useState('');
  const { isLoading, error, status } = useInfiniteScroll({ searchInput });

  const errorMessage =
    error?.status === 404 ? 'User not found' : 'The connection has failed...';

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          {isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="addon-placeholder">@</div>
          )}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {status === 'error' && (
        <div className="d-flex justify-content-center align-items-center">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default SearchInput;
