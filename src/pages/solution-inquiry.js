const SolutionInquiry = () => {
  // This component will never render since we redirect in getServerSideProps
  return null;
};

export const getServerSideProps = async (context) => {
  // Return 404 status and redirect to 404 page
  return {
    notFound: true,
  };
};

export default SolutionInquiry;
