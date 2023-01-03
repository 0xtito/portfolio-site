import { MongoClient } from "mongodb";
import ChooseFromList from "../../src/components/ChooseFromList";
import DisplayDescription from "../../src/components/DisplayDescription";
import MainPage from "../index";  

const DB_PW = process.env.MONGO_PW;

function DescriptionData(props) {
  return (
    <DisplayDescription
      descriptions={props.allDescriptions}
      choosenDescription={props.selectedDescription}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/portfolio?retryWrites=true&w=majority`
  );
  const db = client.db();

  const descriptionCollection = db.collection("descriptions");

  const descriptions = await descriptionCollection.find({}).toArray();
  console.log(descriptions)

  client.close();

  return {
    fallback: false,
    paths: descriptions.map((des) => ({ params: { title: des.title } })),
  };
}

export async function getStaticProps(context) {
  const title = context.params.title;

  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/portfolio?retryWrites=true&w=majority`
  );
  const db = client.db();

  const descriptionCollection = db.collection("descriptions");

  const allDescriptions = await descriptionCollection.find({}).toArray();

  const selectedDescription = await descriptionCollection.findOne({
    title: title,
  });

  client.close();

  return {
    props: {
      clickedDescription: {
        title: selectedDescription.title,
        description: selectedDescription.description,
      },
      allDescriptions: allDescriptions.map((des) => ({
        title: des.title,
        description: des.description,
      })),
    },
  };
}

export default DescriptionData
