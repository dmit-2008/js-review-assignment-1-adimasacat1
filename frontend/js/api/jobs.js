// your code goes here.
const BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL if needed

// Fetch all jobs or search with query
const getJobList = (query = '', filters = {}) => {
  let url = `${BASE_URL}/jobs?query=${query}`;
  if (filters.date) url += `&date=${filters.date}`;
  if (filters.jobType) url += `&jobType=${filters.jobType}`;
  if (filters.location) url += `&location=${filters.location}`;

  return fetch(url)
    .then(response => response.json());
};

// Fetch job details by ID
const getJobDetails = (id) => {
  return fetch(`${BASE_URL}/jobs/${id}`)
    .then(response => response.json());
};

// Save a job to the saved jobs list
const saveJob = (job) => {
  return fetch(`${BASE_URL}/saved-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  })
    .then(response => response.json());
};

// Fetch saved jobs
const getSavedJobs = () => {
  return fetch(`${BASE_URL}/saved-jobs`)
    .then(response => response.json());
};

// Delete a saved job by ID
const deleteJob = (id) => {
  return fetch(`${BASE_URL}/saved-jobs/${id}`, {
    method: 'DELETE'
  });
};

export { getJobList, getJobDetails, saveJob, getSavedJobs, deleteJob };

