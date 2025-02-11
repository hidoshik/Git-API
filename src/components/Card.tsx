import Star from './Star';

interface Card {
  url: string | undefined;
  description: string | null;
  stargazers_count: number | undefined;
  updated_at: string | undefined | null;
}

const Card = ({ url, description, stargazers_count = 0, updated_at }: Card) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="card-title">
          <h5>Repository Stars: {stargazers_count}</h5>
        </div>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {`Last update: ${updated_at && new Date(updated_at).toLocaleString()}`}
        </h6>
        <p className="card-text">{description}</p>
        <a href={url} className="card-link">
          Repository link
        </a>
        {stargazers_count > 0 && (
          <div>
            {Array.from({ length: stargazers_count })
              .slice(0, 56)
              .fill(0)
              .map((_, index) => (
                <Star key={index} />
              ))}
            {stargazers_count > 56 && '...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
