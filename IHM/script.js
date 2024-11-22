
document.getElementById('formulaireDeContact').addEventListener('submit', async(Event)=>{
    Event.preventDefault();
    const nom = document.getElementById('content').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    try{
        const reponse = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body:
            JSON.stringify({
                nom, email, message
            })
        });
        const resultat = await reponse.json();
        document.getElementById('reponseMessage').textContent = resultat.message;
    }catch(error){
        console.error('Erreur:',error);
        document.getElementById('reponseMessage').textContent = 'Erreur lors de l\'envoi du message.'; 
    }
});

/*const form = document.getElementById('formulaireDeContact');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message);  // Affiche le message de confirmation reçu du serveur
      } else {
        alert('Une erreur est survenue lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur réseau.');
    }
  });*/