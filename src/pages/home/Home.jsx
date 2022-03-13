import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import Sidebar from "../../components/sidebar/Sidebar";
import { getMovie, getDetailMovie } from "../../redux/actions/movie";
import Modal from "react-bootstrap/Modal";
import "./style.css";

export default function Home() {
  const emptyImagePoster = require("../../assets/images/emptyImage.jpeg");
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [allMovie, setAllMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailedMovie, setDetailedMovie] = useState({});
  const [showModalDetailMovie, setShowModalDetailMovie] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [favoritedMov, setFavoritedMov] = useState([]);

  const movies = JSON.parse(localStorage.getItem("movies"));

  const { isLoading } = useSelector((state) => state.movie);

  const HeaderTitle = () => {
    return (
      <div className="typeTitle">
        <p className="titleWrapping">Title</p>
        <p className="otherWrapping">Year</p>
        <p className="otherWrapping">imDB ID</p>
        <p className="otherWrappingAction">Action</p>
      </div>
    );
  };

  const onChangeSearch = (val) => {
    setInputSearch(val.target.value);
  };

  const searchMovie = () => {
    setAllMovie([]);
    dispatch(getMovie(inputSearch)).then((el) => {
      const newAllMovie = el.map((i) => {
        for (let j = 0; j < movies.length; j++) {
          if (i.imdbID === movies[j].imdbID) {
            i = { ...movies[j], favorited: true };
          }
        }
        return i;
      });
      setAllMovie(newAllMovie);
    });
  };

  const handleLike = (el) => {
    setFavoritedMov([...favoritedMov, el]);
    localStorage.setItem("movies", JSON.stringify(favoritedMov));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const movieWithFavorit = allMovie.map((val) => {
        for (let j = 0; j < favoritedMov.length; j++) {
          if (val.imdbID === favoritedMov[j].imdbID) {
            val = { ...favoritedMov[j], favorited: true };
          }
        }
        return val;
      });
      setAllMovie(movieWithFavorit);
    }, 600);
  }, [favoritedMov]);

  const handleToDetail = (el) => {
    setShowModalDetailMovie(true);
    setLoadingDetail(true);
    setTimeout(() => {
      dispatch(getDetailMovie(el.imdbID)).then((val) => {
        setDetailedMovie(val);
        setLoadingDetail(false);
      });
    }, 3000);
  };

  const handleRemoveLike = (el) => {
    let newFavorite = allMovie.filter((e) => e.imdbID !== el.imdbID);
    setTimeout(() => {
      localStorage.setItem("movies", JSON.stringify(newFavorite));
      setAllMovie(newFavorite);
    }, 300);
  };

  const renderSearchValue = () => {
    return (
      <div className="wrappingCard">
        {isLoading || loading ? (
          <div class="d-flex justify-content-center loadingPosition">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : allMovie.length > 0 ? (
          allMovie.map((el, index) => {
            return (
              <Card
                favorited={el.favorited}
                key={index}
                poster={el.Poster}
                title={el.Title}
                type={el.Type}
                year={el.Year}
                id={el.imdbID}
                onClick={() =>
                  el.favorited ? handleRemoveLike(el) : handleLike(el)
                }
                onPress={() => handleToDetail(el)}
              />
            );
          })
        ) : (
          <h1>Please Search movie above...</h1>
        )}
      </div>
    );
  };

  const handleFavorited = () => {
    setLoading(true);
    let arr = [];
    movies.map((el) => {
      el = { ...el, favorited: true };
      arr.push(el);
    });
    setTimeout(() => {
      setLoading(false);
      setAllMovie(arr);
    }, 1000);
  };

  const handleSearchMovie = () => {
    setAllMovie([]);
  };

  const RenderDescMovie = ({ leftTitle, rightValue }) => {
    return (
      <div className="descriptionWrap">
        <p className="leftTitle">{leftTitle} :</p>
        <p className="rightValue">{rightValue}</p>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="inputWrap">
        <input
          type="text"
          name="search"
          placeholder="Search.."
          className="inputBar"
          onChange={onChangeSearch}
        />
        {isLoading ? (
          <button class="btn btn-dark" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Loading...</span>
          </button>
        ) : (
          <button type="button" className="btn btn-dark" onClick={searchMovie}>
            Search
          </button>
        )}
      </div>
    );
  };

  const renderAllDesc = () => {
    return (
      <>
        <RenderDescMovie leftTitle={"Year"} rightValue={detailedMovie.Year} />
        <RenderDescMovie
          leftTitle={"Released"}
          rightValue={detailedMovie.Released}
        />
        <RenderDescMovie
          leftTitle={"Director"}
          rightValue={detailedMovie.Director}
        />
        <RenderDescMovie
          leftTitle={"Actors"}
          rightValue={detailedMovie.Actors}
        />
        <RenderDescMovie leftTitle={"Plot"} rightValue={detailedMovie.Plot} />
        <RenderDescMovie
          leftTitle={"Awards"}
          rightValue={detailedMovie.Awards}
        />
      </>
    );
  };

  const RenderModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {loadingDetail ? (
          <div class="d-flex justify-content-center spinner">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Modal.Body>
              <div className="imageWrapper">
                <img
                  src={
                    detailedMovie.Poster === "N/A"
                      ? emptyImagePoster
                      : detailedMovie.Poster
                  }
                  alt="new"
                  style={{
                    width: 200,
                    height: 300,
                    borderRadius: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </div>
              <h4>{detailedMovie?.Title}</h4>
              {renderAllDesc()}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={props.onHide} class="btn btn-light">
                Close
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    );
  };

  return (
    <div className="homeWrap">
      <div className="insideWrap">
        <div className="searchBarWrap">{renderSearch()}</div>
        <div className="searchValue">
          <Sidebar onPress1={handleSearchMovie} onPress2={handleFavorited} />
          <div></div>
          <div className="value">
            <HeaderTitle />
            {renderSearchValue()}
            <RenderModal
              show={showModalDetailMovie}
              onHide={() => setShowModalDetailMovie(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
