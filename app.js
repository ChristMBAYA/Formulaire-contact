const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,'IHM')));

//Route pour la page d'accueil
app.get('/', (req, rep, next)=>{
    rep.sendFile(path.join(__dirname, 'IHM','index.html'));
    next();
});


/*app.post('/send-message', (req, rep)=>{
    const {nom, email, message} = req.body;
    //logique de traitement du message
    console.log(`Message de: ${nom} (${email}: ${message})`);
    //reponse de confirmation
    rep.json({message: 'Message envoyé avec succès!!!'})
    
})*/

// Route pour gérer la soumission du formulaire de contact
app.post('/send', (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Afficher les données reçues dans la console
    console.log(`Message reçu de ${name} (${email}): ${message}`);

    // Option : Stocker le message dans un fichier JSON
    const data = { name, email, message, date: new Date().toISOString() };

    fs.readFile('data.json', 'utf8', (err, fileData) => {
        const messages = fileData ? JSON.parse(fileData) : [];
        messages.push(data);

        fs.writeFile('data.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture dans le fichier:', err);
                return res.status(500).json({ error: 'Could not save message.' });
            }
            res.json({ message: 'Message sent successfully!' });
        });
    });
    next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`serveur à l'écoute de http://localhost:${PORT}`));