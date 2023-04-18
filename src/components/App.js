import React, { useEffect, useReducer } from "react";
import "../styles/App.css";
import { Loader } from "./Loader";
import { PhotoFrame } from "./PhotoFrame";

const reducerFunction = (state, action) => {
  if (action.type === "fetch") {
    return {
      title: action.title,
      url: action.url,
      isLoading: state.isLoading,
      id: state.id,
    };
  }
  if (action.type === "trigger") {
    return {
      title: state.title,
      url: state.url,
      isLoading: state.isLoading,
      id: action.id,
    };
  }
  if (action.type === "startLoading") {
    return {
      title: state.title,
      url: state.url,
      isLoading: true,
      id: state.id,
    };
  }
  if (action.type === "stopLoading") {
    return {
      title: state.title,
      url: state.url,
      isLoading: false,
      id: state.id,
    };
  }
  return state;
};

const App = () => {
  const [apiData, dispatch] = useReducer(reducerFunction, {
    title: "",
    url: "",
    isLoading: false,
    id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "startLoading" });
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${apiData.id}`
      );
      const data = await response.json();
      dispatch({ type: "stopLoading" });
      dispatch({ type: "fetch", title: data.title, url: data.url });

      console.log(data);
    };
    if (apiData.id !== null && apiData.id !== "") {
      fetchData();
    }
  }, [apiData.id]);

  const inputChangeHandler = (e) => {
    dispatch({ type: "trigger", id: e.target.value });
  };
  return (
    <>
      <label htmlFor="idNumber">Id number</label>
      <input id="idNumber" type="number" onChange={inputChangeHandler} />
      {apiData.id !== null && !apiData.isLoading && (
        <PhotoFrame url={apiData.url} title={apiData.title} />
      )}
      {apiData.isLoading && <Loader />}
    </>
  );
};

export default App;
