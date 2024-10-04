// your code goes here.

// Import Bootstrap and API functions
import 'bootstrap/dist/css/bootstrap.min.css';
import { getJobList, getJobDetails, saveJob, getSavedJobs, deleteJob } from './api/jobs.js';

const jobListElement = document.querySelector('.job-list');
const jobDetailsElement = document.querySelector('#job-details-card');

//fetch and display jobs with optional search query and filters
function fetchJobs(query = '', filters = {}) {
  getJobList(query, filters).then((jobs) => {
    jobListElement.innerHTML = jobs.length ? jobs.map(renderJob).join('') : '<div class="text-dark">No Results Found</div>';
  });
}

//generate job card HTML
function renderJob(job) {
  return `
    <li class="job-card card my-1" style="width: 18rem;">
      <div class="card-header">${job.company}</div>
      <div class="card-body">
        <h5 class="card-title">${job.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.date}</h6>
        <button class="btn btn-primary view-job-button" data-job-id="${job.id}">View Job</button>
      </div>
    </li>
  `;
}

//display job details in a detailed view
function renderJobDetails(job) {
  jobDetailsElement.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title" data-job-id="${job.id}">${job.title}</h3>
        <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date}</h6>
        <h5 class="card-subtitle mb-2">Description</h5>
        <p class="card-text">${job.description}</p>
        <h5 class="card-subtitle mb-2">Qualifications</h5>
        <p class="card-text">${job.qualifications}</p>
        <button class="btn btn-success save-job">Save Job</button>
        <button class="btn btn-danger delete-job" data-job-id="${job.id}">Delete Job</button>
      </div>
    </div>
  `;
}

//form submission handler for job search
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const query = document.querySelector('input[name="search"]').value;
  fetchJobs(query);
});

//handle View Job button clicks
jobListElement.addEventListener('click', (event) => {
  const button = event.target.closest('.view-job-button');
  if (button) {
    const jobId = button.dataset.jobId;
    getJobDetails(jobId).then(renderJobDetails);
  }
});

//handle Save Job button click in job details
jobDetailsElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-job')) {
    const jobId = jobDetailsElement.querySelector('.card-title').dataset.jobId;
    getJobDetails(jobId).then((job) => saveJob(job));
  }
});

//handle Delete Job button click in job details
jobDetailsElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-job')) {
    const jobId = event.target.dataset.jobId;
    deleteJob(jobId).then(() => fetchJobs());
  }
});

//saved Jobs tab click handler
document.querySelector('#saved-jobs-tab').addEventListener('click', () => {
  getSavedJobs().then((savedJobs) => {
    jobListElement.innerHTML = savedJobs.map(renderJob).join('');
  });
});

//fetch all jobs on page load
document.addEventListener('DOMContentLoaded', () => fetchJobs());
