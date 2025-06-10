const express = require('express');
const app = express();
require('dotenv').config();
const { getDB, connectDB } = require('./config/db');

const dbName = process.env.DB_NAME;

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        console.log(`Fetching students from ${dbName} database...`);
        const db = getDB(); // Don't forget the parentheses
        const students = await db.collection('students').find().toArray();
        console.log("✅ Students fetched successfully");
        console.log(students);
        res.json(students);
    } catch (error) {
        console.log('Error fetching students:', error);
    }
});

app.post('/', async (req, res) => {
    try {

        const db = getDB(); // Don't forget the parentheses
        const students = await db.collection('students').insertOne({
            name: req.body.name,
            age: req.body.age,
        });
        res.json(students);
    } catch (error) {
        console.log('Error fetching students:', error);
    }
});
app.patch('/:id', async (req, res) => {
    try {

        const { ObjectId } = require('mongodb');
        const id = new ObjectId(req.params.id);
        const updateData = req.body;
        const result = await collection().updateOne({ _id: id }, { $set: updateData });
        res.json(result);
    } catch (error) {
        console.log('Error fetching students:', error);
    }
});
app.delete('/:id', async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const id = new ObjectId(req.params.id);
        const result = await collection().deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        console.log('Error fetching students:', error);
    }
});

const PORT = process.env.PORT || 3500;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
