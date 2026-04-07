import type React from "react";
import { useState, type ChangeEvent, type ChangeEventHandler } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import PropertySliders from "./components/PropertySliders";
import { useNavigate } from "react-router-dom";

interface formProps {
  sliders: {
    name: string;
    dimension: string;
    value: number;
    handler: ChangeEventHandler<HTMLInputElement>;
    id: number;
  }[];
  speciesState: {
    speciesValue: string;
    setSpeciesFunction: React.Dispatch<React.SetStateAction<string>>;
  };
}


const Form: React.FC<formProps> = ({ sliders, speciesState }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const [ sepalLength, sepalWidth, petalLength, petalWidth] = sliders.map(({value}) => value);
    const data = {
      sepal_length: sepalLength,
      sepal_width: sepalWidth,
      petal_length: petalLength,
      petal_width: petalWidth,
    };

    const response = await axios.post("http://localhost:8000/prediction", data);
    console.log(response.data);
    speciesState.setSpeciesFunction(response.data.species);
    navigate("/prediction");
  };

  return (
    <div className="container">
      <h1>IRIS PREDICTOR WEB APP</h1>
      <PropertySliders sliders={sliders} />
      <button id="prediction-button" onClick={handleClick}>
        PREDICTION
      </button>
    </div>
  );
};

const SpeciesPrediction : React.FC<formProps> | null = ({ speciesState : { speciesValue } }) => {
  switch (speciesValue) {
    case 'Setosa':
      return <img src="src/assets/iris+setosa+29.jpg" />
    case 'Versicolor':
      return <img src="src/assets/Blue_Flag,_Ottawa.jpg" />
    case 'Virginica':
      return <img src="src/assets/iris_virginica_virginica_lg.jpg" />
    default:
      return null;
  }
}

const Prediction: React.FC<formProps> = ({sliders, speciesState}) => {

  return (
    <div className="prediction-property-container">
      <SpeciesPrediction speciesState={speciesState} sliders={[]}/>
      {sliders.map(({name, dimension, value}) => <div className="prediction-property-box"> {name} {dimension}: {value}</div>)}
      <div className="result-box">
        RESULT: {speciesState.speciesValue}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [sepalLength, setSepalLength] = useState(5.0);
  const [sepalWidth, setSepalWidth] = useState(5.0);
  const [petalLength, setPetalLength] = useState(5.0);
  const [petalWidth, setPetalWidth] = useState(5.0);
  const [species, setSpecies] = useState("");

  const handleSepalLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalLength(parseFloat(newValue));
  };

  const handleSepalWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalWidth(parseFloat(newValue));
  };

  const handlePepalLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalLength(parseFloat(newValue));
  };

  const handlePetalWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalWidth(parseFloat(newValue));
  };

  const speciesState = {
    speciesValue: species,
    setSpeciesFunction: setSpecies,
  };

  const sliders = [
    {
      name: "Sepal",
      dimension: "Length",
      value: sepalLength,
      handler: handleSepalLengthChange,
      id: 1,
    },
    {
      name: "Sepal",
      dimension: "Width",
      value: sepalWidth,
      handler: handleSepalWidthChange,
      id: 2,
    },
    {
      name: "Petal",
      dimension: "Length",
      value: petalLength,
      handler: handlePepalLengthChange,
      id: 3,
    },
    {
      name: "Petal",
      dimension: "Width",
      value: petalWidth,
      handler: handlePetalWidthChange,
      id: 4,
    },
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={<Form sliders={sliders} speciesState={speciesState} />}
      />
      <Route path="/prediction" element={<Prediction sliders={sliders} speciesState={speciesState} />} />
    </Routes>
  );
};

export default App;
