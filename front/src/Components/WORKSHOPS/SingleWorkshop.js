import React, { useEffect, useState } from 'react';
import { getWorkshopById } from './HandleApi';
import { WorkshopDetails } from './WorkshopDetails';
import { useParams } from 'react-router-dom';

const SingleWorkshop = () => {
  const [workshop, setWorkshop] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    getWorkshopById(id, setWorkshop);
  }, [id]);

  return (
    <div>
      {workshop ? (
        <WorkshopDetails
          key={workshop._id}
          id={workshop._id}
          name={workshop.title}
          duration={workshop.duration}
          price={workshop.price}
          description={workshop.description}
          capacity={workshop.capacity}
        />
      ) : (
        <p>Loading workshop details...</p>
      )}
    </div>
  );
};

export default SingleWorkshop;
