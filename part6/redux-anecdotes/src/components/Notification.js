import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificacionReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => {
        clearTimeout(timer);
        dispatch(clearNotification());
      };
    }
  }, [notification, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none', // Mostrar el contenedor solo cuando hay una notificación
  };

  const handleNotificationClick = () => {
    dispatch(clearNotification());
  };

  return (
    <div style={style} onClick={handleNotificationClick}>
      {notification}
    </div>
  );
};

export default Notification;
