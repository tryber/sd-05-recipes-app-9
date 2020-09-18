import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAreas } from '../services/api';
import { selectedArea } from '../actions';
import './DropDownArea.css';

export default function DropDownArea() {
  const [areas, setAreas] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAreas()
    .then((allAreas) => setAreas([{ strArea: 'All' }, ...allAreas.meals]));
  }, []);
  return (
    <div className="drop-down">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={(event) => dispatch(selectedArea(event.target.value))}
      >
        {areas.map(({ strArea }) =>
          <option
            data-testid={`${strArea}-option`}
            key={strArea}
          >
            {strArea}
          </option>)}
      </select>
    </div>
  );
}
