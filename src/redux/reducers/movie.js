import {
  GET_MOVIE_START,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILED,
  GET_DETAIL_MOVIE_START,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAILED,
} from "../actions/const/movie";

const initialState = {
  allMovie: [],
  isDetailMovieLoading: false,
  isLoading: false,
  detailMovie: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MOVIE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allMovie: payload,
      };
    case GET_DETAIL_MOVIE_START:
      return {
        ...state,
        isDetailMovieLoading: true,
      };
    case GET_DETAIL_MOVIE_FAILED:
      return {
        ...state,
        isDetailMovieLoading: false,
      };
    case GET_DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        isDetailMovieLoading: false,
        detailMovie: payload,
      };
    default:
      return state;
  }
};
