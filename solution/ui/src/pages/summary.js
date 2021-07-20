import Layout from "components/Layout";

const page = {
  title: "Demo Summary Page",
  description: "Demo Summary goes here",
};

export default function Summary() {
  return (
    <Layout metaHeader={{ ...page }} title={page.title}>
      summary is here
    </Layout>
  );
}
