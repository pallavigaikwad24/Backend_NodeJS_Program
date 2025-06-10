const express = require('express');
const app = express();
require('dotenv').config();
const { getDB, connectDB } = require('./config/db');
const Student = require('./models/Student');

const dbName = process.env.DB_NAME;

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        return res.json(students);
    } catch (error) {
        console.log('Error fetching students:', error);
    }
});

app.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.patch('/:id', async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
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
