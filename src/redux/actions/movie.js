import { Api, http, BASE_URL } from "../../config/BaseURL";
import {
  GET_MOVIE_START,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILED,
  GET_DETAIL_MOVIE_START,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAILED,
} from "./const/movie";

const getMovieStart = () => ({
  type: GET_MOVIE_START,
});
const getMovieFailed = () => ({
  type: GET_MOVIE_FAILED,
});
const getMovieSuccess = (payload) => ({
  type: GET_MOVIE_SUCCESS,
  payload: payload,
});

const getDetailMovieStart = () => ({
  type: GET_DETAIL_MOVIE_START,
});
const getDetailMovieFailed = () => ({
  type: GET_DETAIL_MOVIE_FAILED,
});
const getDetailMovieSuccess = (payload) => ({
  type: GET_DETAIL_MOVIE_SUCCESS,
  payload: payload,
});

export const getMovie = (param) => (dispatch) => {
  const path = `${BASE_URL}/?s=${param}${Api.apikey}`;
  const config = {
    headers: {
      Accept: "/",
    },
  };
  dispatch(getMovieStart());
  return new Promise((resolve, reject) => {
    return http
      .get(path, {}, config)
      .then((res) => {
        dispatch(getMovieSuccess(res.data.Search));
        return resolve(res.data.Search);
      })
      .catch((err) => {
        dispatch(getMovieFailed());
        throw reject(err);
      });
  });
};

export const getDetailMovie = (param) => (dispatch) => {
  const path = `${BASE_URL}/?i=${param}${Api.apikey}`;
  const config = {
    headers: {
      Accept: "/",
    },
  };
  dispatch(getDetailMovieStart());
  return new Promise((resolve, reject) => {
    return http
      .get(path, {}, config)
      .then((res) => {
        dispatch(getDetailMovieSuccess(res.data));
        return resolve(res.data);
      })
      .catch((err) => {
        dispatch(getDetailMovieFailed());
        throw reject(err);
      });
  });
};
