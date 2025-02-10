import { useState } from 'react';

interface Error {
  status: number;
  message: string;
}

interface SearchInputParams {
  isLoading: boolean;
  error: Error | null;
  status: 'success' | 'loading' | 'error';
  searchInput: string;
  changeInput: (val: string) => void;
}

const SearchInput = (params: SearchInputParams) => {
  const { isLoading, error, status, searchInput, changeInput } = params;
  

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
          onChange={(e) => changeInput(e.target.value)}
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
