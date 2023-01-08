import { Link } from "react-router-dom";

const padding = {
  padding: 5,
};

const Navigation = () => {
  return (
    <div style={{ backgroundColor: "grey", height: "2em" }}>
      <Link style={padding} to="/users">
        users
      </Link>
      <Link style={padding} to="/">
        home
      </Link>
    </div>
  );
};

export default Navigation;
