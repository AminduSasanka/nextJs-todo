import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("next-project");

  if (req.method === "GET") {
    try {
      const fetchedData = await db
        .collection("todo-collection")
        .find({})
        .toArray();
      const todoList = JSON.parse(JSON.stringify(fetchedData));
      res.status(200).json({ todoList: todoList });
    } catch (error) {
      res.status(500).json({ error: error });
    }
    //
  } else if (req.method === "POST") {
    try {
      const result = await db.collection("todo-collection").insertOne(req.body);
      res.status(201).json({ response: result });
    } catch (error) {
      res.status(500).json({ error: error });
    }
    //
  } else if (req.method === "DELETE") {
    try {
      const result = await db
        .collection("todo-collection")
        .deleteOne({ id: req.body });
      res.status(204).json({ response: result });
    } catch (error) {
      res.status(500).json({ error: error });
    }
    //
  } else if (req.method === "PATCH") {
    try {
      const { id, content } = req.body;
      console.log(id, content, "api data");
      const result = await db
        .collection("todo-collection")
        .updateOne(
          { id: req.body.id },
          { $set: { content: req.body.content } }
        );
      res.status(200).json({ response: result });
    } catch (error) {
      res.status(500).json({ error: error });
    }
    //
  } else if (req.method === "PUT") {
    try {
      console.log(req, "req coming");
      const result = await db.collection("todo-collection").deleteMany({});
      res.status(204).json({ response: result });
      deleteMany({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
