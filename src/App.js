import './App.scss';
import { useState } from 'react';
import Header from './Components/Header';
import Main from "./Components/Main";
import jobsData from "./assets/data.json";

function App() {
  const [jobs, setJobs] = useState(jobsData);
  const [filters, setFilters] = useState([]);

  // {type: "role", value: "Senior"}
  const filterJobs = (jobs, updatedFilters) => {
    const filteredJobs = jobs.filter(job => {
      let levelCheck, roleCheck, languagesCheck, toolsCheck = false;

      if (updatedFilters.some(filter => filter.type === 'level')) {
        levelCheck = true;
      }

      if (updatedFilters.some(filter => filter.type === 'role')) {
        roleCheck = true;
      }

      if (updatedFilters.some(filter => filter.type === 'language')) {
        languagesCheck = true;
      }

      if (updatedFilters.some(filter => filter.type === 'tool')) {
        toolsCheck = true;
      }

      return (
        (levelCheck ? job.level === updatedFilters.find(filter => filter.type === "level").value : true) && 
        (roleCheck ? job.role === updatedFilters.find(filter => filter.type === "role").value : true) &&
        (toolsCheck ? updatedFilters.filter(f => f.type === "tool").every(f => job.tools.indexOf(f.value) > -1) : true )
        &&
        (languagesCheck ? updatedFilters.filter(f => f.type === "language").every(f => job.languages.indexOf(f.value) > -1) : true)
      )
    })

    setJobs(filteredJobs);
  
  }

  const addFilter = (data) => {
    const dataExisting = filters.some(filter => filter.type === data.type && filter.value === data.value);
    if (!dataExisting) {
      
      const updatedFilters = [...filters, data];
      setFilters(updatedFilters);

      filterJobs(jobs, updatedFilters)
    }
  }

  const clearFilters = () => {
    setFilters([]);
    setJobs(jobsData)
  }

  const removeFilter = (filterData) => {
    const updatedFilters = filters.filter( (filterItem) => {
      return (filterItem.type !== filterData.type && filterItem.value !== filterData.value)
    })
    setFilters(updatedFilters);
    
    filterJobs(jobsData, updatedFilters);
  }

  return (
    <>
      <Header filters={filters} clearFilters={clearFilters} removeFilter={removeFilter} />
      <Main jobs={jobs} addFilter={addFilter} />
    </>
  );
}

export default App;
