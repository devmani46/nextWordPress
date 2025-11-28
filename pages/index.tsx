import { GetServerSideProps } from "next";

export default function Index() {
  return null; // never shown
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/home", // or "/landing", "about-us", etc.
      permanent: false,
    },
  };
};
