document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById('fileInput');
  const fileProgress = document.getElementById('fileProgress');
  const emailInput = document.getElementById('email');

  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0]; 

    if (file) {
      const totalSize = file.size; 
      let loaded = 0;

      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          loaded = event.loaded;
          const percent = (loaded / totalSize) * 100;
          fileProgress.value = percent;
          fileProgress.textContent = percent.toFixed(2) + '%';
        }
      };

      reader.onloadend = () => {
        // Unggahan selesai
        fileProgress.value = 100;
        fileProgress.textContent = '100%';

        let currentProgress = 0;
        const animationInterval = 100; 
        const animationDuration = 3000; 

        const animateProgress = () => {
          if (currentProgress < 100) {
            currentProgress += 1;
            fileProgress.value = currentProgress;
            fileProgress.textContent = currentProgress.toFixed(2) + '%';
            setTimeout(animateProgress, animationInterval);
          }
        };

        setTimeout(animateProgress, animationInterval);
      };

      reader.readAsDataURL(file);
    }
  });

  emailInput.addEventListener('focus', function () {
    emailInput.style.backgroundColor = ''; 
  });

  emailInput.addEventListener('blur', function () {
    const emailValue = emailInput.value;

    // Regular expression damel memeriksa format email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(emailValue)) {
      emailInput.style.backgroundColor = 'green'; // Ubah latar belakang menjadi hijau jika email valid
    } else {
      emailInput.style.backgroundColor = 'red'; // Ubah latar belakang menjadi merah jika email tidak valid
    }
  });
});
