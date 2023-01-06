import { MongoClient } from "mongodb";
import ChooseFromList from "../../src/components/ChooseFromList";
import DisplayDescription from "../../src/components/DisplayDescription";
import MainPage from "../index";

const DB_PW = process.env.MONGO_PW;

function DescriptionData(props) {
  return (
    <DisplayDescription
      selectedDescription={props.selectedDescription}
      isVisible={props.isVisible}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );
  const db = client.db();
  console.log(db.collections.length);

  const descriptionCollection = db.collection("descriptions");

  const descriptions = await descriptionCollection
    .find({}, { title: "" })
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: descriptions.map((des) => ({ 
      params: { descriptionTitle: des.title } 
    })),
  };
}

export async function getStaticProps(context) {
  const title = context.params.descriptionTitle;
  // console.log(context);

  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );
  const db = client.db();

  const descriptionCollection = db.collection("descriptions");

  const descriptions = await descriptionCollection.find({
    title: title,
  }).toArray();
  
  const selectedDescription = descriptions[0]
  console.log(selectedDescription)

  client.close();

  return {
    props: {
      selectedDescription: {
        title: selectedDescription.title,
        description: selectedDescription.description,
      },
      isVisible: selectedDescription ? true : false
    },
  };
}

export default DescriptionData;
