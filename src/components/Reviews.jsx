import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ReviewsContainer,
  ReviewsList,
  ReviewItem,
  ReviewerName,
  ReviewContent,
  ErrorMessage,
  NoReviews,
} from './ReviewsStyled';
const API_KEY = '9934d985d2071436695492f67313a303';
const BASE_URL = 'https://api.themoviedb.org/3';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError('Problems with fetching reviews');
      }
    };
    fetchReviews();
  }, [movieId]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (reviews.length === 0) {
    return <NoReviews>No reviews available</NoReviews>;
  }

  return (
    <ReviewsContainer>
      <h2>Reviews</h2>
      <ReviewsList>
        {reviews.map(review => (
          <ReviewItem key={review.id}>
            <ReviewerName>{review.author}</ReviewerName>
            <ReviewContent>{review.content}</ReviewContent>
          </ReviewItem>
        ))}
      </ReviewsList>
    </ReviewsContainer>
  );
};

export default Reviews;
