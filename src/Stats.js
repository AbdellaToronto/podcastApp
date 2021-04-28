//FUNCTIONAL IMPORTS
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

//DESIGN IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { faWalking } from "@fortawesome/free-solid-svg-icons";

// API CALL
const Stats = () => {
  const [startChoice, setStartChoice] = useState("");
  const [endChoice, setEndChoice] = useState("");
  const [results, setResults] = useState([]);
  const [bicycleTime, setBicycleTime] = useState("");
  const [pedestrianTime, setPedestrianTime] = useState("")

  const handleRoute = (event) => {
    // setResults(event.target.value);
  };

  useEffect(() => {
    axios({
      url: "http://www.mapquestapi.com/directions/v2/route?",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG",
        routeType: "bicycle",
        // from: `${startPoint}`,
        // to: `${endPoint}`,
        from: "Toronto",
        to: "Hamilton",
        ambiguities: "ignore",
      },
    }).then((res) => {
      console.log(res.data.route)
      const distanceData = res.data.route.distance;
      setResults(distanceData);
      const bikeTime = res.data.route.formattedTime;
      setBicycleTime(bikeTime);
    });
  }, []);

  console.log(results);
  console.log(bicycleTime)

  useEffect(() => {
    axios({
      url: "http://www.mapquestapi.com/directions/v2/route?",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG",
        routeType: "pedestrian",
        // from: `${startPoint}`,
        // to: `${endPoint}`,
        from: "Toronto",
        to: "Hamilton",
        ambiguities: "ignore",
      },
    }).then((res) => {
      const walkingTime = res.data.route.formattedTime;
      setPedestrianTime(walkingTime);
    });
  }, []);

  
  console.log(pedestrianTime)

  return (
    <div>
      <section className="wrapper">
        <form action="">
          <div className="inputBox">
            <label name="startingPoint" aria-label="starting point">
              <input
                type="text"
                placeholder="Starting Point"
                // value= {startPoint}
                name="startingPoint"
                className="nameInput"
              />
            </label>

            <label name="destination" aria-label="destination">
              <input
                type="text"
                placeholder="Destination"
                // value="from"
                name="destination"
                className="nameInput"
              />
            </label>
          </div>
          <button type="submit"> Find a Podcast</button>
          {/* onClick={(event) => handleClick(event, )} */}
        </form>
      </section>

      <div className="wrapper statsContainer">
        <h2>Distance: {results} miles </h2>
        <div>
          <div className="iconImage">
            <div className="iconBorder icon">
              <FontAwesomeIcon className="i" icon={faBicycle} size="3x" />
            </div>
          </div>

          <div className="statsBox">
            <p>Time: {bicycleTime}</p>
          </div>
        </div>

        <div>
          <div className="iconImage">
            <div className="iconBorder icon">
              <FontAwesomeIcon className="i" icon={faWalking} size="3x" />
            </div>
          </div>
          <div className="statsBox">
            <p>Time: {pedestrianTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
