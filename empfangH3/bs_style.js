



const readData = () => {
    let sql_query = {'type':"selectForBS"};
    return fetch(`http://192.100.100.30:8080/api/daten?variable=${JSON.stringify(sql_query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const tableNames = document.getElementById('tableNames');
        if (tableNames.innerHTML.trim() === '') {
          
          
          document.getElementById('text').style.fontSize = "70px"
          document.getElementById('text').style.paddingTop = "70px"
          document.getElementById('pic').style.height = "200%"
      } else {
        document.getElementById('text').style.paddingTop = "0px"
          document.getElementById('text').style.fontSize = "50px"
          document.getElementById('pic').style.height = "140%"
      }
        
        // Referenz zum HTML-Element, in das die Daten eingefügt werden sollen
        const tableContainer = document.getElementById('tableNames');
        tableContainer.style.display = 'flex';
        tableContainer.innerHTML = ''; // Leere die Dateiliste, um sie zu aktualisieren

        for (let i = 0; i < data.id.length; i++){

            id = data.id[i];
            
            let div = document.createElement('div');
            let span = document.createElement('span');
            let u = document.createElement('u');

            u.textContent = `${data.company[id]}`
            
            span.appendChild(u);
            div.appendChild(span);

            for (let i = 0; i < data.name[id].length; i++) {
              
              let li = document.createElement('li');

              li.textContent = data.name[id][i];
              div.appendChild(li);

            tableContainer.appendChild(div)
  
        }

}})
      
      .catch(error => {
        console.error('Fehler:', error);
        throw error; // Wird das Error-Objekt weiter werfen, damit es von anderen Promise-Ketten behandelt werden kann
      });

    }

setInterval(readData, 1000);
