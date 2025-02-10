import { useSelector } from 'react-redux';
import Card from './Card';
import { repositoriesData } from '../slices/repoSlice';

const CardBox = () => {
  const {repositories, username} = useSelector(repositoriesData);

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
      {repositories.length >= 20 && <div id="scroll" className="">next page ...</div>}
    </div>
  );
};

export default CardBox;
