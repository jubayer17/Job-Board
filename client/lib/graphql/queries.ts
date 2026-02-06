import { gql } from '@apollo/client';

export const GET_EMPLOYER_JOBS = gql`
  query GetEmployerJobs($userId: String!) {
    myJobs(userId: $userId) {
      id
      title
      type
      location
      postedAt
      status
      applicantsCount
    }
  }
`;

export const GET_EMPLOYER_DASHBOARD_DATA = gql`
  query GetEmployerDashboardData($employerId: String!) {
    employerJobs(employerId: $employerId) {
      id
      title
      type
      location
      postedAt
      status
      applicantsCount
    }
    employerStats(employerId: $employerId) {
      activeJobs
      totalApplicants
      profileViews
      avgTimeToHire
    }
  }
`;

export const GET_EMPLOYER_PROFILE = gql`
  query GetEmployerProfile($id: String!) {
    employer(id: $id) {
      id
      contactName
      contactEmail
      contactDesignation
      contactMobile
      companies {
        id
        companyName
        description
        industryType
        websiteUrl
        address
        tradeLicense
        yearOfEstablishment
      }
    }
  }
`;
