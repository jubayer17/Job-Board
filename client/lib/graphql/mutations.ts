import { gql } from '@apollo/client';

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJob($data: CreateJobInput!, $employerId: String!, $isEmployer: Boolean) {
    createJob(data: $data, employerId: $employerId, isEmployer: $isEmployer) {
      id
      title
      company
      location
      type
      description
      salary
      tags
      postedAt
    }
  }
`;

export const CREATE_EMPLOYER_MUTATION = gql`
  mutation CreateEmployer($createEmployerInput: CreateEmployerInput!) {
    createEmployer(createEmployerInput: $createEmployerInput) {
      id
      contactName
      contactEmail
    }
  }
`;
