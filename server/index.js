const express = require('express');
const cors = require('cors');

const circuitsRoutes = require('./routes/circuits');
const componentsRoutes = require('./routes/components');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/circuits', circuitsRoutes);
app.use('/components', componentsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
