import React from "react";

import "./styles.css";

function SingleUser({ first, last, email, avatar }) {
  return (
    <div className="single_user">
      <h2>
        {first} {last}
      </h2>
      <h3>{email}</h3>
      <img className="user_avatar" src={avatar} alt="" />
    </div>
  );
}

export default SingleUser;
