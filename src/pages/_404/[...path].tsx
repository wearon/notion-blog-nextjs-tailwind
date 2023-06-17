import { MAIN_SITE_URL } from "@/config";

export const Custom404 = () => {
  return <div></div>;
};

export const getServerSideProps = (context) => {
  return { redirect: { destination: MAIN_SITE_URL, permanent: false } };
};

export default Custom404;
