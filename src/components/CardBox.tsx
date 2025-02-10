import { useSelector } from 'react-redux';
import Card from './Card';
import { repositoriesData } from '../slices/repoSlice';

interface CardBoxParams {
  hasNextPage: boolean;
}

const CardBox = (params: CardBoxParams) => {
  const { hasNextPage } = params;
  const { repositories, username } = useSelector(repositoriesData);

  return (
    <div>
      {repositories.length === 0 && username.length !== 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <p>No public repository found</p>
        </div>
      ) : (
        repositories.map(
          ({ url, description, stargazers_count, updated_at }, index) => {
            return (
              <Card
                key={index}
                url={url}
                description={description}
                stargazers_count={stargazers_count}
                updated_at={updated_at}
              />
            );
          }
        )
      )}
      {repositories.length >= 20 && hasNextPage && (
        <div className="d-flex justify-content-center align-items-center">
          <div
            id="scroll"
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBox;
