import Todo from "../components/Todo";
import clientPromise from "../lib/mongodb";

const HomePage = ({ isConnected, fetchedData }) => {
  return (
    <section className="mainContainer">
      <Todo fetchedData={fetchedData}></Todo>
    </section>
  );
};

export async function getStaticProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("next-project");

    const data = await db.collection("todo-collection").find({}).toArray();
    const data_processed = JSON.parse(JSON.stringify(data));

    return {
      props: {
        isConnected: true,
        fetchedData: data_processed,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { isConnected: false },
      revalidate: 1,
    };
  }
}

export default HomePage;
