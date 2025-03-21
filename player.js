const firebaseConfig = {
    apiKey: "AIzaSyBeOhO5fQIM0-6HsJsqy8UpD2DZuWzFKU4",
    authDomain: "aiwhtsapp.firebaseapp.com",
    databaseURL: "https://aiwhtsapp-default-rtdb.firebaseio.com",
    projectId: "aiwhtsapp",
    storageBucket: "aiwhtsapp.firebasestorage.app",
    messagingSenderId: "176143610558",
    appId: "1:176143610558:web:d2e9c84c9462de98e8a4ef",
    measurementId: "G-R63XQHV76C"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();


const linkBtn = document.getElementById('linkbtn');
const linkInput = document.getElementById('link');
const video = document.getElementById('video');


const minWidth = window.innerWidth;
console.log(minWidth)
if (minWidth > 1000) {
user = 'admin'
 buser = 'guest'
 video.setAttribute('controls', '');
} else {
     user = 'guest'
    buser = 'admin'
    
}




  linkBtn.addEventListener('click', () => {
    const linkValue = linkInput.value.trim();
    if (linkValue !== '') {
      db.ref('links').update({
        link: linkValue,
      }).then(() => {
       linkInput.value = '';
      }).catch((error) => {
        console.error('Error saving link:', error);
      });
    } else {
      console.log('Please enter a link');
    }
  });

  db.ref('links').child(buser).child('state').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue < 3) {
        video.pause();
    }
  });

  db.ref('links').child(buser).child('load').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue !== 'ready') {
        video.pause();
    }
  });

  db.ref('links').child(buser).child('time').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (user === 'guest') {
    const ctime = linkValue - video.currentTime;
    const post =  Math.abs(ctime);
    if (post > 3){
        video.currentTime = linkValue
    }
}
  });

  db.ref('links').child(buser).child('status').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (user === 'guest') {
    
    if (linkValue === false){
       video.play();
    } else {
        video.pause();
    }
}
  });


  const linksRef = db.ref('links').child('link')

linksRef.on('value', (dataSnapshot) => {
  const linkValue = dataSnapshot.val();
  video.src = linkValue;
  video.currentTime = 1
});

video.addEventListener('timeupdate', (event) => {
  
  const currentTime = video.currentTime;
  ready = 1
const buffered = video.buffered;
  for (let i = 0; i < buffered.length; i++) {
    if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
      console.log('ready')
      db.ref('links').child(user).update({
        load: 'ready',
        state: video.readyState
      
     })
     ready = 0
     
      break;
    } 
      
    
    
  }
  if (ready === 1) {
    db.ref('links').child(user).update({
      load: 'loading',
      state: video.readyState
    
   })
  }
    
    db.ref('links').child(user).update({
        time: currentTime,
        status : video.paused,
        state: video.readyState
       
        
      })
      db.ref('links').child(buser).child('time').on('value', (dataSnapshot) => {
        const linkValue = dataSnapshot.val();
        if (user === 'guest') {
        const ctime = linkValue - video.currentTime;
        const post =  Math.abs(ctime);
        if (post > 5){
            video.currentTime = linkValue
        }
    }
      });

      db.ref('links').child(buser).child('time').on('value', (dataSnapshot) => {
        const linkValue = dataSnapshot.val();
       
        const ctime = linkValue - video.currentTime;
        const post =  Math.abs(ctime);
        if (post > 3){
            video.pause();
        }
        
   })});

  video.addEventListener('waiting', () => {
    video.pause();
    db.ref('links').child(user).update({
        load: 'loading'
        
        
        
      })
  });
  
  

  video.addEventListener('stalled', () => {
    video.pause();
    db.ref('links').child(user).update({
        load: 'loading'
        
        
      })
  });
  video.addEventListener('loadstart', () => {
    video.pause();
    db.ref('links').child(user).update({
        load: 'loading'
        
        
      })
  });

  video.addEventListener('play', function() {
    db.ref('links').child(buser).child('state').on('value', (snapshot) => {
        const value = snapshot.val();
        if (value < 3) {
        video.pause();
        }
      });
      db.ref('links').child(buser).child('load').on('value', (dataSnapshot) => {
        const linkValue = dataSnapshot.val();
        if (linkValue !== 'ready') {
            video.pause();
        }
      });
      
    
  });
 


const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const g1 = document.getElementById('g1');
const g2 = document.getElementById('g2');

  db.ref('links').child('admin').child('load').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue !== 'ready') {
        a1.style.color = 'red';
    } else {
        a1.style.color = 'green';
    }
  });
 
  db.ref('links').child('admin').child('state').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue > 2) {
        a2.style.color = 'green';
    } else {
        a2.style.color = 'red';
    }
  });

  db.ref('links').child('guest').child('state').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue > 2) {
        g1.style.color = 'green';
    } else {
        g1.style.color = 'red';
    }
  });

  db.ref('links').child('guest').child('load').on('value', (dataSnapshot) => {
    const linkValue = dataSnapshot.val();
    if (linkValue !== 'ready') {
        g2.style.color = 'red';
    } else {
        g2.style.color = 'green';
    }
  });

  
  video.addEventListener('click', () => {
    video.requestFullscreen();
  });

  const messageInput = document.getElementById('message');
const scrollContainer = document.getElementById('chat-container');



messageInput.addEventListener('focus', () => {
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
});
 
window.addEventListener('resize', () => {
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
 } )

 const inputField = document.getElementById('message');
const button = document.getElementById('send');



  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const message = inputField.value
      db.ref('links').child(user).update({
            message: message
        
      }).then(inputField.value = '')
    }
  });

  const container = document.getElementById('chat-container');
  const label = document.createElement('label');

  db.ref('links').child('guest').child('message').on('value', (snapshot) => {
    
    const value = snapshot.val();
    if (user === 'guest') {
      const label = document.createElement('label');
      label.className = 'chat sent';
      label.textContent = value;
      container.appendChild(label);
      container.scrollTop = scrollContainer.scrollHeight;
    } else {
      const label = document.createElement('label');
      label.className = 'chat received';
      label.textContent = value;
      container.appendChild(label);
      container.scrollTop = scrollContainer.scrollHeight;
    }
  });

  db.ref('links').child('admin').child('message').on('value', (snapshot) => {
   
    const value = snapshot.val();
    if (user === 'admin') {
      const label = document.createElement('label');
      label.className = 'chat sent';
      label.textContent = value;
      container.appendChild(label);
      container.scrollTop = scrollContainer.scrollHeight;
    } else {
      const label = document.createElement('label');
      label.className = 'chat received';
      label.textContent = value;
      container.appendChild(label);
      container.scrollTop = scrollContainer.scrollHeight;
    }
  });