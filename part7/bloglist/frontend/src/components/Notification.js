import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);

  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
