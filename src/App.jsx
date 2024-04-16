
import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Movie';
import Papa from 'papaparse';
import loadAndRenderTimelineElements from './parse.jsx';
import fetchAndParseCSV from './store.jsx';

function TimelineComponent() {
  const [data, setData] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchAndParseCSV('src/data/imdb_top_1000.csv')
      .then(fetchedData => {
        sortData(fetchedData);
        console.log("Fetched Data: ", fetchedData);
        loadAndRenderTimelineElements(fetchedData);
      })
      .catch(error => console.error('Failed to load or parse CSV:', error));
  }, [sortAsc]);

  function sortData(fetchedData) {
    const sortedData = fetchedData.sort((a, b) => {
      // Ensure both values are numbers by converting them with parseInt
      const yearA = parseInt(a.Released_Year, 10);
      const yearB = parseInt(b.Released_Year, 10);
  
      // Check if yearA or yearB is NaN and handle accordingly
      if (isNaN(yearA) || isNaN(yearB)) {
        return isNaN(yearA) ? 1 : -1;  // Push NaN values to the end
      }
  
      // Sort ascending or descending based on sortAsc
      return sortAsc ? yearA - yearB : yearB - yearA;
    });
    console.log("Sorted Data: ", sortedData);
    setData(sortedData);
  }

  return (
    <div>
      <button onClick={() => setSortAsc(!sortAsc)}>Toggle Year Sorting</button>
      <VerticalTimeline>
        {data.map((item, index) => (
          <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date={item.Released_Year}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<WorkIcon />}
          >
          <h3 className="vertical-timeline-element-title">{item.Series_Title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{item.Released_Year}</h4>
          <p>{item.Overview}</p>
        </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default TimelineComponent;