import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";

const defaultImage = "https://via.placeholder.com/350x150";
const API_URL =
  "https://gist.githubusercontent.com/roxcity/300697399059a6f54a983d1e9af5f459/raw/d81a2c42f8de6ca439f3cd3a5b0e809fd34f31bc/users.json";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        if (res.status !== 200) {
          setError(res.statusText);
          setLoading(false);
          return;
        }
        const users = res.data.map((user) => {
          user.currentSrc = 0;
          user.photos.push({ url: defaultImage });
          return user;
        });
        setUsers(users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleError = (index) => {
    const finalUsers = [...users];
    // If we dont want to push default image for every user use this
    // if (finalUsers[index].currentSrc === finalUsers[index].photos.length - 1) {
    //   finalUsers[index].photos.push({
    //     url: "https://via.placeholder.com/350x150",
    //   });
    // }
    finalUsers[index].currentSrc++;
    setUsers(finalUsers);
  };
  return (
    <div className="user">
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {users.map(({ firstName, lastName, photos, currentSrc }, index) => {
        return (
          <div className="card">
            <img
              onError={() => handleError(index)}
              src={photos[currentSrc].url}
              alt=""
            />
            <p>
              {firstName} {lastName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default User;
